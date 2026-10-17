import React, { useState, useEffect } from 'react';
import type { ViewId } from '@/types/navigation';
import type { ConnectivityStatus, ShiftInfo } from '@/types/common';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ShiftStatusBar } from './ShiftStatusBar';

export interface AppShellProps {
  currentView: ViewId;
  onSelectView: (view: ViewId) => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentView,
  onSelectView,
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [connectivityStatus, setConnectivityStatus] = useState<ConnectivityStatus>('online');

  // Network listener
  useEffect(() => {
    const handleOnline = () => setConnectivityStatus('online');
    const handleOffline = () => setConnectivityStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setConnectivityStatus(navigator.onLine ? 'online' : 'offline');

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync dark mode class on HTML document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Global Keyboard Shortcuts (F2: Catalog, F4: POS)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore modified combinations so OS/browser shortcuts (e.g. Alt+F4, Ctrl+F4) function normally
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
        return;
      }

      // Check if target is inside an editable control or open dialog
      const target = e.target;
      const isElement = target instanceof Element;
      const isEditing = Boolean(
        isElement && (
          (target as HTMLElement).isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) ||
          target.closest('[role="dialog"], dialog')
        )
      );

      // Check if any modal dialog is currently open in the document
      const isDialogOpen = Boolean(document.querySelector('[role="dialog"], dialog[open]'));

      // If user is editing or interacting with a dialog, ignore shortcut and preserve normal browser behavior
      if (isEditing || isDialogOpen) {
        return;
      }

      if (e.key === 'F4') {
        e.preventDefault();
        onSelectView('pos');
      } else if (e.key === 'F2') {
        e.preventDefault();
        onSelectView('catalog');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectView]);

  const mockShiftInfo: ShiftInfo = {
    id: 'SHIFT-20261017-01',
    cashierName: 'Owner Operator (Abu Rayhan)',
    role: 'owner',
    terminalCode: 'COUNTER-POS-01',
    openedAt: new Date().toISOString(),
    status: 'active',
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex-col">
      <Header
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
        connectivityStatus={connectivityStatus}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          currentView={currentView}
          onSelectView={onSelectView}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/70 dark:bg-slate-950/70 focus:outline-none">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      <ShiftStatusBar shiftInfo={mockShiftInfo} />
    </div>
  );
};
