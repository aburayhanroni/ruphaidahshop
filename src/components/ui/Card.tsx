import React, { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Card: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div
    className={cn(
      'rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow dark:border-slate-800 dark:bg-slate-900',
      className
    )}
    {...props}
  />
);

export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 p-4 border-b border-slate-100 dark:border-slate-800/60', className)} {...props} />
);

export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h3 className={cn('font-semibold text-base leading-none tracking-tight text-slate-900 dark:text-slate-100', className)} {...props} />
);

export const CardDescription: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p className={cn('text-xs text-slate-500 dark:text-slate-400', className)} {...props} />
);

export const CardContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('p-4', className)} {...props} />
);

export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex items-center p-4 pt-3 border-t border-slate-100 dark:border-slate-800/60', className)} {...props} />
);
