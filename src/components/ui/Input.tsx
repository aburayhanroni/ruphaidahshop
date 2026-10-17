import React, { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  isBDT?: boolean;
  size?: 'sm' | 'md';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftAddon,
      rightAddon,
      isBDT = false,
      size = 'md',
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const sizes = {
      sm: 'h-8 px-2.5 text-xs',
      md: 'h-9 px-3 text-sm',
    };

    return (
      <div className="w-full space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
            {required && <span className="text-rose-500 ml-0.5" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative flex items-center rounded-md shadow-sm">
          {isBDT && (
            <span
              className={cn(
                'pointer-events-none absolute inset-y-0 left-0 flex items-center font-semibold text-slate-500 dark:text-slate-400 select-none',
                size === 'sm' ? 'text-xs pl-2.5' : 'text-sm pl-3'
              )}
            >
              ৳
            </span>
          )}
          {!isBDT && leftAddon && (
            <div
              className={cn(
                'pointer-events-none absolute inset-y-0 left-0 flex items-center text-slate-400',
                size === 'sm' ? 'pl-2.5' : 'pl-3'
              )}
            >
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={cn(
              'block w-full rounded-md border transition-colors',
              'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400',
              'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
              'disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed',
              sizes[size],
              isBDT && (size === 'sm' ? 'pl-6' : 'pl-7'),
              !isBDT && leftAddon && (size === 'sm' ? 'pl-8' : 'pl-9'),
              rightAddon && (size === 'sm' ? 'pr-8' : 'pr-9'),
              error
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                : 'border-slate-300 dark:border-slate-700',
              className
            )}
            {...props}
          />
          {rightAddon && (
            <div
              className={cn(
                'absolute inset-y-0 right-0 flex items-center text-slate-400',
                size === 'sm' ? 'pr-2.5' : 'pr-3'
              )}
            >
              {rightAddon}
            </div>
          )}
        </div>
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-rose-600 dark:text-rose-400 font-medium">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="text-xs text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
