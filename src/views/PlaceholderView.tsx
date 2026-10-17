import React from 'react';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { ViewId } from '@/types/navigation';
import { NAV_ITEMS } from '@/lib/constants';

export interface PlaceholderViewProps {
  viewId: ViewId;
  onNavigate: (view: ViewId) => void;
}

const STAGE_MAPPING: Record<ViewId, { stage: string; title: string; prereq: string }> = {
  dashboard: { stage: 'Stage 2', title: 'Foundation Dashboard', prereq: 'Stage 1' },
  pos: { stage: 'Stage 7', title: 'Sales and Point of Sale (POS)', prereq: 'Stage 5 & Stage 6' },
  catalog: { stage: 'Stage 4', title: 'Product Catalog and Barcode Management', prereq: 'Stage 3' },
  inventory: { stage: 'Stage 6', title: 'Purchasing and FIFO Inventory Management', prereq: 'Stage 4' },
  purchasing: { stage: 'Stage 6', title: 'Purchasing and Goods Receiving Notes', prereq: 'Stage 4' },
  mfs: { stage: 'Stage 11', title: 'Mobile Financial Services (MFS) & Agency Operations', prereq: 'Stage 7 & Stage 10' },
  warranty: { stage: 'Stage 9 & 12', title: 'Warranty Claims & Service-Center Handover', prereq: 'Stage 8 & Stage 9' },
  customers: { stage: 'Stage 9', title: 'Customer Ledger & Dues ("Baki") Tracking', prereq: 'Stage 7' },
  suppliers: { stage: 'Stage 8', title: 'Supplier Ledger & Returns/Exchanges', prereq: 'Stage 6' },
  accounting: { stage: 'Stage 10', title: 'Double-Entry Accounting & Operating Expenses', prereq: 'Stage 7, 8 & 9' },
  reports: { stage: 'Stage 15', title: 'Executive Reports & Business Intelligence', prereq: 'Stages 7-14' },
  'design-system': { stage: 'Stage 2', title: 'UI Design System Showcase', prereq: 'Stage 1' },
  settings: { stage: 'Stage 13', title: 'Shop Configuration & Role Permissions', prereq: 'Stage 3' },
};

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ viewId, onNavigate }) => {
  const navItem = NAV_ITEMS.find((n) => n.id === viewId);
  const stageInfo = STAGE_MAPPING[viewId];
  const Icon = navItem?.icon ?? Clock;

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6">
      <Card className="border-dashed border-2">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 mb-3 shadow-sm">
            <Icon className="h-7 w-7" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="primary">{stageInfo.stage}</Badge>
            <span className="text-xs text-slate-500 font-medium">Scheduled Architecture Milestone</span>
          </div>
          <CardTitle className="text-xl mt-2">{navItem?.label}</CardTitle>
          <CardDescription className="text-sm font-bengali text-slate-500">
            {navItem?.labelBn}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <div className="max-w-md mx-auto rounded-lg bg-slate-50 p-4 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs space-y-2 text-slate-600 dark:text-slate-300">
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              Target Milestone: {stageInfo.title}
            </p>
            <p>
              Prerequisites: <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">{stageInfo.prereq}</span>
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
              In accordance with project scope rules, real business tables, live mutations, and database schemas
              are created only during their designated roadmap stages. No simulated or fake data is presented.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('dashboard')}
            leftIcon={<BookOpen className="h-4 w-4" />}
          >
            Back to Foundation Overview
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate('design-system')}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Explore Design System Tokens
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
