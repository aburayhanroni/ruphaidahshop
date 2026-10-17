# OPEN BUSINESS QUESTIONS & ARCHITECTURAL DECISIONS
**System Name:** Ruphaidah Shop Management System (RSMS)  
**Document Version:** 1.0.0  
**Status:** Architectural Review  
**Date:** 2026-10-17  

> [!NOTE]
> None of the questions below block immediate project initialization (Stage 2: Project Setup and Design System). Sensible, safe defaults have been specified for each item so engineering can proceed without delay.

---

## 1. Catalog & Hardware Decisions

### Q-01: Barcode Label Sticker Printing Formats
- **Question:** Does the shop currently operate a dedicated thermal label printer (e.g., Xprinter XP-365B, Zebra) for printing adhesive barcode stickers on products that lack manufacturer barcodes, or will standard A4 sticker sheets be used?
- **Why It Matters:** Determines whether the sticker printing engine should target specific continuous roll dimensions (e.g., 38mm × 25mm, 50mm × 30mm) or multi-column A4 grid sheets.
- **Recommended Default:** Provide flexible CSS print templates supporting standard 38mm × 25mm single-column thermal labels, with a toggle for 2-column and 3-column sheets.
- **Blocks Next Stage?** **No.** (Relevant only in Stage 4: Product Catalog & Barcode).

### Q-02: Receipt Printer Interface (Direct ESC/POS vs. Browser Print)
- **Question:** What is the exact model and connection type of the counter receipt printer (USB, Network/LAN, Bluetooth, or Serial)?
- **Why It Matters:** Direct binary ESC/POS communication via Web Serial / Web USB enables silent, instant printing without the OS print dialog. Browser print dialog (`window.print()`) works universally across all platforms but requires an Enter key confirmation.
- **Recommended Default:** Build modern CSS print templates using standard 80mm and 58mm thermal dimensions first (universal compatibility across Windows, Mac, Android, and iOS). Introduce an optional direct Web Serial ESC/POS driver for one-click silent printing in Stage 7.
- **Blocks Next Stage?** **No.** (Relevant in Stage 7: Sales & POS).

---

## 2. Operational & Access Control Decisions

### Q-03: Staff Cost-Price Visibility
- **Question:** Should employees/cashiers ever be permitted to see wholesale purchase costs or supplier contact details under any circumstances?
- **Why It Matters:** In retail environments, staff knowledge of wholesale margins can lead to unauthorized discounts or competitive leakage. Restricting this requires column-level RLS masking.
- **Recommended Default:** Completely mask `unit_cost`, `line_cogs`, and supplier identities from all accounts with the `staff` role. Only the `owner` role can access purchase costs and profitability reports.
- **Blocks Next Stage?** **No.** (Relevant in Stage 4 and Stage 13).

### Q-04: Anonymous Customer Credit ("Baki") Policy
- **Question:** Can sales on credit ("Baki") ever be issued to an anonymous walk-in customer?
- **Why It Matters:** Credit sales without an identifiable customer entity create untraceable debts in the financial ledger.
- **Recommended Default:** Strictly forbid credit sales on anonymous transactions. The POS interface requires selecting or registering a named customer with a valid mobile phone number before allowing the "Due / Credit" tender button to be clicked.
- **Blocks Next Stage?** **No.** (Relevant in Stage 7 and Stage 9).

---

## 3. Financial & Service Operational Decisions

### Q-05: MFS Extra Customer Service Surcharge
- **Question:** For MFS transactions such as Utility Bill Pay or online application fee payments, does Ruphaidah Shop charge customers an extra manual service fee (e.g., 10–20 BDT per bill) in addition to carrier commissions?
- **Why It Matters:** Affects the transaction entry form and accounting allocation (extra fees are 100% shop service revenue, distinct from carrier commissions).
- **Recommended Default:** Include an optional `customer_fee_charged` field on the MFS transaction form. If entered, it credits `Digital Service Fee Revenue (4030)`; if zero, only standard carrier commission is computed.
- **Blocks Next Stage?** **No.** (Relevant in Stage 11: MFS & Digital Services).

### Q-06: Handling Concurrent Offline Overselling Discrepancies
- **Question:** If two offline cashier terminals sell the last remaining unit of an accessory simultaneously while the internet is down, how should the discrepancy be settled upon reconnection?
- **Why It Matters:** The physical item has already walked out the door with a paying customer. Canceling the second transaction creates an accounting cash surplus, while approving it creates a temporary negative inventory count.
- **Recommended Default:** Accept both financial sales (ensuring cash and customer receipts remain valid), record the inventory as a negative deficit (`stock_reconciliation_deficit`), and trigger an urgent notification on the Owner dashboard to verify if an unrecorded box was in the backroom or if an inventory adjustment is needed.
- **Blocks Next Stage?** **No.** (Relevant in Stage 14: Offline Synchronization).

---

## Summary of Decision Readiness

All 6 questions have clear, safe, production-grade defaults. **Zero questions block moving forward into Stage 2 (Project Setup and Design System).**
