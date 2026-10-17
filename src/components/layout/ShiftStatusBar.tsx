import React from 'react';
import { User, ShieldAlert, Cpu } from 'lucide-react';
import type { ShiftInfo } from '@/types/common';

export interface ShiftStatusBarProps {
  shiftInfo: ShiftInfo;
}

export const ShiftStatusBar: React.FC<ShiftStatusBarProps> = ({ shiftInfo }) => {
  return (
    <div className="flex flex-wrap items-center justify-between border-t border-slate-200 bg-slate-100/80 px-4 py-1.5 text-[11px] text-slate-600 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-400 no-print">
      {/* Left: User & Shift Info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
          <User className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
          <span>{shiftInfo.cashierName}</span>
          <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] uppercase font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {shiftInfo.role}
          </span>
        </div>
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <div className="hidden sm:flex items-center gap-1">
          <span>Shift:</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400 capitalize">
            {shiftInfo.status}
          </span>
        </div>
      </div>

      {/* Center / Right: Keyboard Shortcuts & System mode */}
      <div className="flex items-center gap-4">
        {/* Foundation Notice */}
        <div className="hidden md:flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-medium">
          <ShieldAlert className="h-3 w-3 text-amber-500" />
          <span>UI Foundation Active (Mock / Design Mode)</span>
        </div>

        {/* Keyboard Helper */}
        <div className="hidden lg:flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <Cpu className="h-3 w-3" />
          <span>Keys:</span>
          <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            F2: Search
          </kbd>
          <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            F4: POS
          </kbd>
        </div>
      </div>
    </div>
  );
};
