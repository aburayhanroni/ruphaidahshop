import React from 'react';
import {
  ShieldCheck,
  Palette,
  Terminal,
  Calendar,
  Layers,
  ArrowRight,
  Database,
  Info,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatBDT, formatDhakaDate } from '@/lib/formatters';
import type { ViewId } from '@/types/navigation';

export interface FoundationDashboardProps {
  onNavigate: (view: ViewId) => void;
}

export const FoundationDashboard: React.FC<FoundationDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Top Banner: Explicit UI Foundation Labeling */}
      <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="md">
                Phase 1: Step 2 Complete
              </Badge>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                UI Foundation & Design System Ready
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Ruphaidah Shop Management System (RSMS)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
              This dashboard serves as the operational UI foundation, proving design tokens, responsive layout,
              Bengali typography, and BDT currency formatting. Real business tables and Supabase integrations are scheduled for Phase 1, Step 3.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate('design-system')}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Explore Design System
          </Button>
        </div>
      </div>

      {/* Architecture Readiness Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Platform Architecture
              </p>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                Vite 6 + React 19
              </h4>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                Strict TypeScript Verified
              </p>
            </div>
            <div className="rounded-md bg-slate-100 p-2.5 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Terminal className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Database Roadmap
              </p>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                Supabase / PostgreSQL
              </h4>
              <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-1">
                Schema Stage 3 Pending
              </p>
            </div>
            <div className="rounded-md bg-slate-100 p-2.5 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Database className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Design System Tokens
              </p>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                Tailwind CSS Retail
              </h4>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1">
                Accessible & Dark Mode
              </p>
            </div>
            <div className="rounded-md bg-slate-100 p-2.5 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Palette className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Localization & Timezone
              </p>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                BDT (৳) & Asia/Dhaka
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium mt-1">
                {formatDhakaDate(new Date())}
              </p>
            </div>
            <div className="rounded-md bg-slate-100 p-2.5 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Calendar className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dual Column Info: Milestone Status & Currency Format Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roadmap Progress Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Delivery Stages Checklist</CardTitle>
                <CardDescription>
                  Tracking progress against <code className="text-xs">docs/IMPLEMENTATION_ROADMAP.md</code>
                </CardDescription>
              </div>
              <Badge variant="primary">Stage 2 Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs p-2.5 rounded-md bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Stage 1: Architecture & Repository Discovery
                  </span>
                </div>
                <Badge variant="success" size="sm">Completed & Pushed</Badge>
              </div>

              <div className="flex items-center justify-between text-xs p-2.5 rounded-md bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="font-semibold text-emerald-900 dark:text-emerald-300">
                    Stage 2: Project Setup & Design System Foundation
                  </span>
                </div>
                <Badge variant="primary" size="sm">In Progress (Active)</Badge>
              </div>

              <div className="flex items-center justify-between text-xs p-2.5 rounded-md bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 opacity-70">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Stage 3: Supabase Foundation, Auth & RLS Guardrails
                  </span>
                </div>
                <Badge variant="neutral" size="sm">Upcoming Next</Badge>
              </div>

              <div className="flex items-center justify-between text-xs p-2.5 rounded-md bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 opacity-60">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Stage 4: Product Catalog & Barcode Management
                  </span>
                </div>
                <Badge variant="neutral" size="sm">Upcoming</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>Full 16-stage roadmap documented in docs/IMPLEMENTATION_ROADMAP.md</span>
            </p>
          </CardFooter>
        </Card>

        {/* Currency & Bengali Formatting Verification Card */}
        <Card>
          <CardHeader>
            <CardTitle>Bangla & Currency Tokens</CardTitle>
            <CardDescription>Live output of formatting helpers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 font-medium">Standard BDT (English):</span>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
                {formatBDT(12450.5)}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-medium">Bengali Numeral BDT:</span>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100 font-bengali">
                {formatBDT(12450.5, { locale: 'bn-BD' })}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-medium">Current Dhaka Time:</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {formatDhakaDate(new Date(), { showTime: true, timeStyle: 'medium' })}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">Bengali Typography Sample:</span>
              <p className="text-xs font-bengali text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                রূফাইদাহ শপ ম্যানেজমেন্ট সিস্টেমে আপনাকে স্বাগতম। আধুনিক রিটেইল পিওএস ও ডিজিটাল সেবা।
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
