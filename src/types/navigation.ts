import type { ComponentType } from 'react';

export type ViewId =
  | 'dashboard'
  | 'pos'
  | 'catalog'
  | 'inventory'
  | 'purchasing'
  | 'mfs'
  | 'warranty'
  | 'customers'
  | 'suppliers'
  | 'accounting'
  | 'reports'
  | 'design-system'
  | 'settings';

export interface NavItem {
  id: ViewId;
  label: string;
  labelBn: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeVariant?: 'primary' | 'due' | 'mfs' | 'neutral';
  section: 'operations' | 'management' | 'foundation';
  requiresOwner?: boolean;
}
