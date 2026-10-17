import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingSpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  label = 'Loading...',
  size = 'md',
  className,
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('flex flex-col items-center justify-center gap-2 p-6', className)}
    >
      <Loader2 className={cn('animate-spin text-emerald-600 dark:text-emerald-400', sizes[size])} />
      {label && <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span>}
      <span className="sr-only">{label}</span>
    </div>
  );
};
