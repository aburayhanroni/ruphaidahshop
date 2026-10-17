import React from 'react';
import {
  Menu,
  Moon,
  Sun,
  Wifi,
  WifiOff,
  Store,
  Clock,
} from 'lucide-react';
import type { ConnectivityStatus } from '@/types/common';
import { APP_NAME } from '@/lib/constants';

export interface HeaderProps {
  onToggleSidebar: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  connectivityStatus: ConnectivityStatus;
  currentShopName?: string;
  activeTerminalCode?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  isDarkMode,
  onToggleDarkMode,
  connectivityStatus,
  currentShopName = 'Ruphaidah Shop (Main Counter)',
  activeTerminalCode = 'POS-01',
}) => {
  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 no-print">
      {/* Left: Mobile menu button + Shop Name */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-sm shadow-sm dark:bg-emerald-500">
            <Store className="h-4 w-4" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold leading-tight text-slate-900 dark:text-slate-100">
              {APP_NAME}
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {currentShopName}
            </p>
          </div>
        </div>
      </div>

      {/* Right: Terminal, Network Pill, Theme Toggle, Profile */}
      <div className="flex items-center gap-2.5">
        {/* Terminal Badge */}
        <div className="hidden md:flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
          <Clock className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
          <span>{activeTerminalCode}</span>
        </div>

        {/* Connectivity Status Indicator */}
        <div
          role="status"
          aria-label={`Network status: ${connectivityStatus}`}
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border ${
            connectivityStatus === 'online'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300'
              : connectivityStatus === 'offline'
              ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300'
              : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300'
          }`}
        >
          {connectivityStatus === 'online' ? (
            <Wifi className="h-3.5 w-3.5" />
          ) : connectivityStatus === 'offline' ? (
            <WifiOff className="h-3.5 w-3.5" />
          ) : (
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
          )}
          <span className="capitalize">{connectivityStatus}</span>
        </div>

        {/* Dark Mode Toggle */}
        <button
          type="button"
          onClick={onToggleDarkMode}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
};
