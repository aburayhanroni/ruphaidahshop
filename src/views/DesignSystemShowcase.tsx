import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorAlert } from '@/components/ui/ErrorAlert';
import { formatBDT } from '@/lib/formatters';

export const DesignSystemShowcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [inputVal, setInputVal] = useState('1250.00');

  const toggleLoading = () => {
    setIsButtonLoading(true);
    setTimeout(() => setIsButtonLoading(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="primary">Design Tokens</Badge>
          <span className="text-xs text-slate-500">Retail System Foundations</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-1">
          UI Component System & Accessible Foundations
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Reusable, accessible, high-contrast UI primitives designed for high-speed POS checkouts and management workflows.
        </p>
      </div>

      {/* Buttons Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Button Primitives & States</CardTitle>
          <CardDescription>Variants, sizes, loading indicators, and touch-accessible mobile targets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary Emerald</Button>
            <Button variant="secondary">Secondary Slate</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="due">Due / Amber</Button>
            <Button variant="mfs">MFS Blue</Button>
            <Button variant="danger">Danger Rose</Button>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <Button size="sm">Small (h-8)</Button>
            <Button size="md">Medium (h-9)</Button>
            <Button size="lg">Large (h-11)</Button>
            <Button size="touch">Touch POS (min-h-44px)</Button>
            <Button
              isLoading={isButtonLoading}
              onClick={toggleLoading}
              leftIcon={<RotateCcw className="h-4 w-4" />}
            >
              {isButtonLoading ? 'Processing...' : 'Click to Test Loading'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Badges Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Status Badges & Tokens</CardTitle>
          <CardDescription>Compact, accessible status chips for inventory and payment states</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Completed / Paid</Badge>
            <Badge variant="due">Customer Due ("Baki")</Badge>
            <Badge variant="warning">Low Stock Alert</Badge>
            <Badge variant="danger">Defective / Voided</Badge>
            <Badge variant="mfs">bKash / MFS Active</Badge>
            <Badge variant="neutral">Neutral Shift</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Form Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Accessible Form Controls</CardTitle>
          <CardDescription>Inputs with BDT currency adornments, error states, and select dropdowns</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Selling Price"
            isBDT
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            helperText="Stored as exact NUMERIC(15, 2)"
          />

          <Input
            label="Manufacturer Barcode"
            placeholder="Scan or enter EAN/UPC..."
            helperText="USB HID scanner compatible"
          />

          <Input
            label="Validation Error State"
            defaultValue="Invalid format"
            error="Duplicate barcode detected in catalog"
          />

          <Select
            label="Product Category"
            options={[
              { value: 'acc', label: '1. Mobile Accessories' },
              { value: 'mfs', label: '2. Mobile Financial Services' },
              { value: 'rec', label: '3. Recharge / EasyLoad' },
              { value: 'sim', label: '4. SIM Cards & Swaps' },
              { value: 'sta', label: '5. Educational Stationery' },
              { value: 'dig', label: '6. Digital & Studio Services' },
            ]}
          />

          <Select
            label="Unit of Measure"
            options={[
              { value: 'pcs', label: 'Piece (pcs)' },
              { value: 'box', label: 'Box (20 pcs)' },
              { value: 'pkt', label: 'Packet' },
              { value: 'doz', label: 'Dozen (12 pcs)' },
            ]}
          />

          <Input
            label="Disabled Input"
            disabled
            defaultValue="Wholesale Cost Masked (Staff Role)"
          />
        </CardContent>
      </Card>

      {/* Table Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>High-Density Retail Table</CardTitle>
          <CardDescription>Responsive table formatted for dense product and transaction lists</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU / Barcode</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono text-xs font-semibold">RS-ACC-001</TableCell>
                <TableCell className="font-medium">Remax 20W Fast Charger USB-C</TableCell>
                <TableCell>Mobile Accessories</TableCell>
                <TableCell className="font-mono font-semibold">{formatBDT(450)}</TableCell>
                <TableCell>24 pcs</TableCell>
                <TableCell>
                  <Badge variant="success" size="sm">In Stock</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-xs font-semibold">RS-STA-014</TableCell>
                <TableCell className="font-medium">Matador Orbit Ballpen 0.5mm (Blue)</TableCell>
                <TableCell>Stationery (Bulk)</TableCell>
                <TableCell className="font-mono font-semibold">{formatBDT(6)}</TableCell>
                <TableCell>140 pcs</TableCell>
                <TableCell>
                  <Badge variant="success" size="sm">In Stock</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-xs font-semibold">RS-TEL-089</TableCell>
                <TableCell className="font-medium">GP 4G Replacement SIM Card</TableCell>
                <TableCell>SIM & Services</TableCell>
                <TableCell className="font-mono font-semibold">{formatBDT(200)}</TableCell>
                <TableCell>3 pcs</TableCell>
                <TableCell>
                  <Badge variant="warning" size="sm">Low Stock (3)</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Interactive Modal Test */}
      <Card>
        <CardHeader>
          <CardTitle>Dialogs & Feedback Elements</CardTitle>
          <CardDescription>Accessible modals, spinners, empty states, and dismissible error alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              leftIcon={<Sparkles className="h-4 w-4 text-emerald-600" />}
            >
              Open Sample Modal Dialog
            </Button>
            <span className="text-xs text-slate-500">
              Tests accessible focus lock, backdrop blur, and Escape key dismissal.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ErrorAlert
              title="Duplicate Transaction Idempotency Warning"
              message="A transaction with client_mutation_id 4fa2... has already been committed to the ledger."
              onRetry={() => alert('Simulating retry handler')}
            />

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-2">
              <LoadingSpinner label="Authenticating session tokens..." size="md" />
            </div>
          </div>

          <EmptyState
            icon={<ShoppingBag className="h-6 w-6 text-slate-400" />}
            title="Cart is currently empty"
            description="Scan a manufacturer barcode or press F2 to search products from the catalog."
            action={
              <Button size="sm" variant="primary">
                Search Products (F2)
              </Button>
            }
          />
        </CardContent>
      </Card>

      {/* Sample Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="POS Cash Drawer Reconciliation (Modal Test)"
        description="Verify physical currency in the counter drawer before closing current shift."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                alert('Modal confirmed!');
                setIsModalOpen(false);
              }}
              leftIcon={<CheckCircle2 className="h-4 w-4" />}
            >
              Confirm Balance
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            This modal demonstrates accessible keyboard focus management, backdrop clicking, and smooth animations.
          </p>
          <Input label="Actual Counted Cash" isBDT defaultValue="14850.00" />
          <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
            <span>Expected Drawer Cash: {formatBDT(14850.00)}. Zero variance detected.</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};
