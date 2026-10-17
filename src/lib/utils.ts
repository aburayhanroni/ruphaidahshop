import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges multiple Tailwind and conditional class names safely without collision.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
