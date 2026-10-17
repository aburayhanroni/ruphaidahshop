import {
  ShoppingCart,
  Package,
  Layers,
  Truck,
  Smartphone,
  ShieldAlert,
  Users,
  Building2,
  BookOpen,
  BarChart3,
  Palette,
  Settings,
  LayoutDashboard,
} from 'lucide-react';
import type { NavItem } from '@/types/navigation';

export const APP_NAME = 'Ruphaidah Shop Management';
export const APP_SHORT_NAME = 'RSMS';
export const DEFAULT_CURRENCY = 'BDT';
export const DEFAULT_TIMEZONE = 'Asia/Dhaka';

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Overview',
    labelBn: 'ওভারভিউ',
    icon: LayoutDashboard,
    section: 'operations',
  },
  {
    id: 'pos',
    label: 'Point of Sale (POS)',
    labelBn: 'পয়েন্ট অফ সেল',
    icon: ShoppingCart,
    badge: 'F4',
    badgeVariant: 'primary',
    section: 'operations',
  },
  {
    id: 'mfs',
    label: 'MFS & Digital Services',
    labelBn: 'এমএফএস ও ডিজিটাল সেবা',
    icon: Smartphone,
    section: 'operations',
  },
  {
    id: 'warranty',
    label: 'Warranty & Replacement',
    labelBn: 'ওয়ারেন্টি ও রিপ্লেসমেন্ট',
    icon: ShieldAlert,
    section: 'operations',
  },
  {
    id: 'catalog',
    label: 'Product Catalog & Barcodes',
    labelBn: 'পণ্য তালিকা ও বারকোড',
    icon: Package,
    section: 'management',
  },
  {
    id: 'inventory',
    label: 'Inventory & FIFO Cost',
    labelBn: 'মজুদ ও ফিফো খরচ',
    icon: Layers,
    section: 'management',
  },
  {
    id: 'purchasing',
    label: 'Purchases & Receiving',
    labelBn: 'ক্রয় ও গ্রহণ',
    icon: Truck,
    section: 'management',
  },
  {
    id: 'customers',
    label: 'Customers & Dues (Baki)',
    labelBn: 'গ্রাহক ও বাকি হিসাব',
    icon: Users,
    section: 'management',
  },
  {
    id: 'suppliers',
    label: 'Suppliers & Ledger',
    labelBn: 'সরবরাহকারী ও লেজার',
    icon: Building2,
    section: 'management',
  },
  {
    id: 'accounting',
    label: 'Accounting & Expenses',
    labelBn: 'হিসাব ও খরচ',
    icon: BookOpen,
    section: 'management',
    requiresOwner: true,
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    labelBn: 'রিপোর্ট ও বিশ্লেষণ',
    icon: BarChart3,
    section: 'management',
    requiresOwner: true,
  },
  {
    id: 'design-system',
    label: 'UI Design System',
    labelBn: 'ডিজাইন সিস্টেম',
    icon: Palette,
    badge: 'Foundation',
    badgeVariant: 'neutral',
    section: 'foundation',
  },
  {
    id: 'settings',
    label: 'System Settings',
    labelBn: 'সিস্টেম সেটিংস',
    icon: Settings,
    section: 'foundation',
    requiresOwner: true,
  },
];
