export type ThemeMode = 'light' | 'dark' | 'system';

export type UserRole = 'owner' | 'staff';

export type ConnectivityStatus = 'online' | 'offline' | 'syncing';

export interface ShiftInfo {
  id: string;
  cashierName: string;
  role: UserRole;
  terminalCode: string;
  openedAt: string;
  status: 'active' | 'closed';
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}
