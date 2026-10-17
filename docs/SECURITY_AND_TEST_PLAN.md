# SECURITY ARCHITECTURE & VERIFICATION TEST PLAN
**System Name:** Ruphaidah Shop Management System (RSMS)  
**Document Version:** 1.0.0  
**Status:** Approved for Implementation Planning  
**Target Environment:** PostgreSQL 15+ (Supabase) + React 19 Client  

> [!IMPORTANT]
> **Planning and Verification Specification Only.**  
> This document specifies the threat model, security guardrails, proposed authorization RPC contracts, and test plans. No database migrations, security policies, or backend functions have been deployed yet.

---

## 1. Threat Modeling & Attack Surface Analysis

Using the STRIDE methodology, we identify the following security threats and architectural mitigations:

| STRIDE Threat Category | Potential Vulnerability in Retail/MFS Context | Architectural & Database Mitigation |
| :--- | :--- | :--- |
| **Spoofing Identity** | Attacker crafts a fake JWT or impersonates an employee account to perform unauthorized sales or register fake stock adjustments. | Supabase Auth issues cryptographically signed RS256/ES256 JWTs. Client tokens are verified on every PostgreSQL request. Password brute-force protection and rate limiting enabled. |
| **Tampering with Data** | Staff modifies an existing sale record in PostgREST to show a lower cash total after pocketing the difference. | PostgreSQL triggers strictly disallow `UPDATE` or `DELETE` on posted transactions. Financial and stock movements are append-only. Voids create explicit compensating entries. |
| **Repudiation** | Staff denies performing a manual stock write-off or voiding an invoice. | Immutable `audit_logs` record the authenticated `actor_user_id`, IP address, exact previous/new state, and timestamp for all sensitive mutations. |
| **Information Disclosure** | Staff bypasses the UI to view wholesale supplier purchase costs, vendor identities, or shop net profit via the REST API. | Row Level Security (RLS) combined with column-level restrictions or secure views ensure `cost_price`, `supplier_id`, and financial profit statements are accessible only to the `owner` role. |
| **Denial of Service** | Malicious script bombards the checkout or barcode search endpoint with rapid requests, locking inventory rows. | Database connection pooling via Supabase PgBouncer / Supavisor; statement timeout set to 5000ms; client-side debouncing and PostgREST rate limiting. |
| **Elevation of Privilege** | Newly signed-up user manipulates local storage or API request to assign themselves the `owner` role on an existing shop. | User roles are stored exclusively in the server-side `shop_members` table protected by RLS. No user can insert or elevate their own membership record. |

---

## 2. Authentication, Account Creation & Tenant Isolation Guardrails

### 2.1 Secure Account Creation & Shop Registration Flow
1. **Zero Public Self-Assignment:** Public users who sign up via Supabase Auth have zero permissions in any existing shop.
2. **Atomic Onboarding RPC:** Shop creation is handled via an explicit, transactional PostgreSQL function:
   ```sql
   CREATE OR REPLACE FUNCTION register_new_shop(
     p_shop_name TEXT,
     p_owner_full_name TEXT,
     p_phone TEXT
   ) RETURNS UUID
   LANGUAGE plpgsql
   SECURITY DEFINER
   SET search_path = public
   AS $$
   DECLARE
     v_user_id UUID := auth.uid();
     v_shop_id UUID;
   BEGIN
     IF v_user_id IS NULL THEN
       RAISE EXCEPTION 'Not authenticated';
     END IF;
     
     -- 1. Create shop
     INSERT INTO shops (name, phone)
     VALUES (p_shop_name, p_phone)
     RETURNING id INTO v_shop_id;
     
     -- 2. Bind calling user as Owner
     INSERT INTO shop_members (shop_id, user_id, role, is_active)
     VALUES (v_shop_id, v_user_id, 'owner', true);
     
     -- 3. Create default cash account and default stock location
     INSERT INTO stock_locations (shop_id, name, code, is_default)
     VALUES (v_shop_id, 'Main Counter Store', 'LOC-MAIN', true);
     
     INSERT INTO financial_accounts (shop_id, account_code, account_name, account_type, is_system_account)
     VALUES (v_shop_id, '1010', 'Main Cash Drawer', 'asset', true);

     RETURN v_shop_id;
   END;
   $$;
   ```

### 2.2 Row Level Security (RLS) Standards
- Every newly created table must have `ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;`.
- Policies must explicitly specify `TO authenticated` and verify `shop_id` against active memberships.
- Standard RLS policy pattern:
  ```sql
  CREATE POLICY "tenant_read_access" ON products
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM shop_members sm 
      WHERE sm.shop_id = products.shop_id 
        AND sm.user_id = (SELECT auth.uid()) 
        AND sm.is_active = true
    )
  );
  ```

### 2.3 Secrets Management
- **Frontend Code (`src/`):** Contains **ONLY** `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (publishable key).
- **Service-Role Key:** Never checked into Git, never bundled into Vite, never stored in environment variables accessible to the browser.
- `.env` files are added to `.gitignore`. An example template `.env.example` contains only empty placeholder keys.

---

## 3. Enforcement and Test Plan for 15 Mandatory Business Invariants

The following 15 business invariants are non-negotiable. Each invariant specifies its technical enforcement layer and automated test strategy:

| # | Invariant Rule | Technical Enforcement Mechanism | Automated Verification Test Plan |
| :-: | :--- | :--- | :--- |
| **1** | **A posted sale must not deduct stock twice.** | Atomic `post_sale` RPC execution. State transition trigger asserts sale cannot transition from `completed` to `completed`. Stock deduction is executed in the exact same database transaction as sale creation. | **Test 1.1:** Trigger identical `post_sale` request twice. First succeeds; second fails or returns cached idempotency receipt. Verify stock quantity decrements exactly once. |
| **2** | **A posted purchase must not add stock twice.** | Goods receiving is tracked via `goods_receipts` linked 1:1 with specific purchase items. Trigger validates `received_quantity <= ordered_quantity`. | **Test 2.1:** Attempt to call `receive_purchase_goods` multiple times for the same item. Verify database rejects over-receipt and stock increments only by verified received quantity. |
| **3** | **A purchase that has not been received must not increase available inventory.** | Creating a Purchase Order (`purchases`) inserts items with status `ordered`. Stock and FIFO layers are generated **strictly** by the `receive_purchase_goods` RPC upon goods intake. | **Test 3.1:** Create a draft and an approved PO. Query `fifo_cost_layers` and `stock_movements`. Verify zero records exist until goods receipt note is posted. |
| **4** | **FIFO consumption must use the oldest eligible remaining cost layers first.** | `post_sale` query selects cost layers `WHERE remaining_quantity > 0 ORDER BY received_at ASC, id ASC FOR UPDATE`. Deductions consume oldest batch before moving to subsequent batches. | **Test 4.1:** Seed Batch 1 (10 units @ 100 BDT, received Jan 1) and Batch 2 (10 units @ 120 BDT, received Jan 2). Sell 15 units. Verify Batch 1 remaining = 0, Batch 2 remaining = 5, total COGS = (10x100 + 5x120) = 1,600 BDT. |
| **5** | **Concurrent sales must not consume the same stock or cost-layer quantity twice.** | Row-level locking (`SELECT ... FOR UPDATE`) on target `fifo_cost_layers` and `product_inventory` records within the PostgreSQL transaction. | **Test 5.1:** Concurrently dispatch 10 parallel HTTP requests selling 1 unit each for a product with only 5 units in stock. Verify exactly 5 requests succeed, 5 fail with `Insufficient Stock`, and final inventory is 0 (never negative). |
| **6** | **A customer return must reference a valid original sale or an explicitly approved exception.** | `post_sale_return` RPC requires `original_sale_id` and validates that returned quantity <= sold quantity minus previously returned quantity. Standalone returns require Owner role flag. | **Test 6.1:** Attempt customer return without `sale_id`; verify rejected. Attempt to return 3 units of an item where only 2 were purchased; verify rejected with `Return Quantity Exceeds Sale`. |
| **7** | **Supplier returns and exchanges must not duplicate inventory movements or financial credits.** | `post_supplier_exchange` executes in a single transaction: decrements returned product, increments replacement product, and generates a single balanced ledger adjustment. | **Test 7.1:** Execute exchange of Item A for Item B. Verify exactly one stock out movement for A, one stock in movement for B, and exactly one supplier ledger entry for the net cost variance. |
| **8** | **Opening stock must not be double-counted as a purchase.** | Opening stock entries bypass `purchases` and `suppliers` entirely. They insert directly into `fifo_cost_layers` with `source_type = 'opening_stock'` and credit `Opening Equity`. | **Test 8.1:** Post 250,000 BDT of opening stock. Inspect `suppliers` and `supplier_ledger_entries`. Verify supplier payable balance remains 0.00 BDT and trial balance shows `Inventory = Equity`. |
| **9** | **Supplier handover alone must not create an automatic financial credit.** | Defective warranty handover records status `handed_to_supplier` in `service_handovers`. Financial supplier credit notes are restricted to the subsequent `warranty_resolutions` table. | **Test 9.1:** Record handover of 10 defective chargers to supplier. Verify supplier payable balance does not change. Post resolution with credit note; verify balance updates only then. |
| **10** | **MFS transaction principal must not be mistaken for commission income.** | `post_mfs_transaction` transfers principal between `Counter Cash` and `MFS Wallet Float`. Only `commission_earned` is credited to `MFS Commission Revenue (4020)`. | **Test 10.1:** Execute 10,000 BDT bKash Cash In with 41 BDT commission. Verify Cash Drawer +10,000, bKash Float -10,000, Revenue +41. Verify sales income report does NOT include 10,000 BDT. |
| **11** | **Retrying the same offline operation must not duplicate a sale, payment, stock movement, or ledger posting.** | Unique `client_mutation_id` (UUID v4) stored in `sync_idempotency_store`. Duplicate incoming IDs return the stored response without re-executing. | **Test 11.1:** Send the same offline sale payload 5 times in a row. Verify only 1 sale record, 1 set of stock movements, and 1 receipt number are generated; all 5 calls return 200 OK with identical payload. |
| **12** | **Employees must not access records outside their authorized shop or permissions.** | RLS filters on `shop_id`. Role checks restrict `staff` from reading `cost_price` columns and financial balance sheets. | **Test 12.1:** Create User A (Staff at Shop 1) and User B (Owner at Shop 2). Attempt cross-shop queries using User A's token. Verify zero rows returned. Verify User A cannot access `purchases` table. |
| **13** | **Every posted financial transaction must have consistent ledger entries.** | Database constraint trigger on `journal_entries` validates that `SUM(debit_amount) == SUM(credit_amount)` upon transaction commit. Unbalanced transactions are aborted. | **Test 13.1:** Attempt to insert a journal entry with 500 BDT Debit and 400 BDT Credit. Verify transaction aborts with `Unbalanced Journal Entry Exception`. |
| **14** | **Corrections to posted transactions must use controlled reversal/correction workflows.** | Database triggers reject `UPDATE` or `DELETE` on completed sales/purchases. `void_sale` RPC creates linked reversing journal entries and restock movements with mandatory reason notes. | **Test 14.1:** Issue direct `UPDATE sales SET grand_total = 0`; verify rejected by trigger. Execute `void_sale(id, 'Cashier Scan Error')`; verify original sale marked `voided` and reversal entries posted. |
| **15** | **Inventory quantities, inventory statuses, FIFO cost layers, and stock movements must remain consistent.** | Stock totals in `product_inventory` are reconciled with `SUM(remaining_quantity)` in `fifo_cost_layers` and `SUM(quantity)` in `stock_movements`. Periodic integrity check query. | **Test 15.1:** Run automated consistency audit query: `ASSERT (inventory.available_qty == SUM(active_cost_layers.remaining_qty))`. Verify zero discrepancies across 500 test transactions. |

---

## 4. Offline Retry, Conflict & Blackout Testing

### 4.1 Blackout Simulation Protocol
1. **Network Disconnect Test:**
   - Disconnect client browser network via Chrome DevTools (`Offline` mode).
   - Cashier scans 5 products and completes checkout.
   - Verify transaction writes to Dexie `mutation_outbox`.
   - Verify local cached stock decrements to prevent immediate local oversell.
   - Verify offline receipt renders with offline watermark.
2. **Reconnection & Drain Test:**
   - Restore network connection.
   - Verify `SyncManager` automatically detects online state and submits outbox batch.
   - Verify server confirms transaction, records database rows, and outbox clears.
3. **Concurrent Offline Overselling Resolution Test:**
   - Disconnect Terminal 1 and Terminal 2 simultaneously when only 1 unit of Product X remains in stock.
   - Both terminals sell 1 unit offline.
   - Reconnect Terminal 1: Sale commits, remaining stock becomes 0.
   - Reconnect Terminal 2: Sale commits with `stock_reconciliation_deficit` anomaly flag; inventory shows -1; high-priority Owner alert generated; financial sale preserved.

---

## 5. Backup, Disaster Recovery & Restore Verification

1. **Daily Automated Snapshots:** Supabase daily logical dumps and WAL streaming.
2. **Local Cold-Export Verification Test:**
   - Test Owner backup utility: click "Download Shop Data Archive".
   - System outputs encrypted JSON containing products, customers, balances, and sales history.
   - In a test database, verify that running the restore script recreates exact state with zero data loss.
3. **Disaster Recovery Drill:**
   - Simulate complete loss of active database.
   - Restore latest snapshot to fresh Supabase project.
   - Verify data integrity check passes across all 15 invariants.

---

## 6. Definition of Done (DoD) for Implementation Stages

An implementation stage is marked **DONE** if and only if all the following conditions are met:
1. **Code Completeness:** All features specified in the stage deliverables are implemented in TypeScript/React/PostgreSQL.
2. **Strict Typing:** Zero TypeScript compiler errors (`tsc --noEmit` exits with code 0).
3. **RLS & Security Coverage:** 100% of newly introduced database tables have RLS enabled with explicit tenant policies.
4. **Invariant Verification:** Automated unit or integration tests for relevant business invariants pass.
5. **No Floating-Point Money:** All financial computations use exact integer cents or `NUMERIC(15, 2)` types.
6. **Responsive Layout:** UI verified on desktop (1920x1080), tablet (1024x768), and mobile (375x667).
7. **Clean Git State:** Code committed with descriptive, conventional commit messages; no leftover debug logs or exposed secrets.
