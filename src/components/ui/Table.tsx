import React, { type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Table: React.FC<HTMLAttributes<HTMLTableElement>> = ({ className, ...props }) => (
  <div className="relative w-full overflow-x-auto rounded-md border border-slate-200 dark:border-slate-800">
    <table className={cn('w-full caption-bottom text-xs', className)} {...props} />
  </div>
);

export const TableHeader: React.FC<HTMLAttributes<HTMLTableSectionElement>> = ({ className, ...props }) => (
  <thead className={cn('bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800', className)} {...props} />
);

export const TableBody: React.FC<HTMLAttributes<HTMLTableSectionElement>> = ({ className, ...props }) => (
  <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
);

export const TableRow: React.FC<HTMLAttributes<HTMLTableRowElement>> = ({ className, ...props }) => (
  <tr
    className={cn(
      'border-b border-slate-100 dark:border-slate-800/60 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/40',
      className
    )}
    {...props}
  />
);

export const TableHead: React.FC<ThHTMLAttributes<HTMLTableCellElement>> = ({ className, ...props }) => (
  <th
    className={cn(
      'h-8 px-3 text-left align-middle font-semibold text-[11px] text-slate-500 uppercase tracking-wider dark:text-slate-400 select-none',
      className
    )}
    {...props}
  />
);

export const TableCell: React.FC<TdHTMLAttributes<HTMLTableCellElement>> = ({ className, ...props }) => (
  <td className={cn('py-2 px-3 align-middle text-xs text-slate-700 dark:text-slate-300', className)} {...props} />
);

export const TableCaption: React.FC<HTMLAttributes<HTMLTableCaptionElement>> = ({ className, ...props }) => (
  <caption className={cn('mt-3 text-xs text-slate-500 dark:text-slate-400', className)} {...props} />
);
