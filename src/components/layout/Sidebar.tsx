import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import type { ViewId, NavItem } from '@/types/navigation';
import { NAV_ITEMS, APP_SHORT_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export interface SidebarProps {
  currentView: ViewId;
  onSelectView: (view: ViewId) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  isOpen,
  onClose,
}) => {
  const renderNavSection = (section: NavItem['section'], title: string, titleBn: string) => {
    const items = NAV_ITEMS.filter((item) => item.section === section);
    if (items.length === 0) return null;

    return (
      <div className="space-y-1 py-2">
        <div className="px-3 py-1 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {title}
          </span>
          <span className="text-[10px] font-bengali text-slate-400 dark:text-slate-600">
            {titleBn}
          </span>
        </div>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectView(item.id);
                onClose();
              }}
              className={cn(
                'group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors select-none',
                isActive
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm dark:bg-emerald-500'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60'
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={cn(
                    'h-4 w-4 shrink-0 transition-colors',
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                  )}
                />
                <div className="truncate flex flex-col">
                  <span className="truncate leading-tight">{item.label}</span>
                  <span
                    className={cn(
                      'text-[10px] font-bengali truncate leading-tight',
                      isActive ? 'text-emerald-100' : 'text-slate-400 dark:text-slate-500'
                    )}
                  >
                    {item.labelBn}
                  </span>
                </div>
              </div>

              {item.badge && (
                <Badge
                  variant={isActive ? 'neutral' : (item.badgeVariant ?? 'neutral')}
                  size="sm"
                  className={cn(
                    'ml-2 shrink-0 text-[10px]',
                    isActive && 'bg-white/20 text-white border-transparent'
                  )}
                >
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out dark:border-slate-800 dark:bg-slate-900 lg:static lg:translate-x-0 no-print',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Top Header inside Sidebar for Mobile */}
        <div className="flex h-14 items-center justify-between border-b border-slate-100 px-4 dark:border-slate-800 lg:hidden">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {APP_SHORT_NAME} Navigation
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-2">
          {renderNavSection('operations', 'Operations', 'দৈনন্দিন কার্যক্রম')}
          <div className="my-1 border-t border-slate-100 dark:border-slate-800/80" />
          {renderNavSection('management', 'Management', 'ব্যবস্থাপনা ও রেকর্ড')}
          <div className="my-1 border-t border-slate-100 dark:border-slate-800/80" />
          {renderNavSection('foundation', 'System & UI', 'সিস্টেম ও ফাউন্ডেশন')}
        </nav>

        {/* Footer info in sidebar */}
        <div className="border-t border-slate-100 p-3 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="truncate">
              <p className="font-medium truncate text-slate-700 dark:text-slate-300">Phase 1: Step 2</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">UI Foundation & Tokens</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
