"use client";

import React from "react";
import {
  BarChart3,
  TrendingUp,
  Briefcase,
  Clock,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  Target,
  ArrowUpRight,
} from "lucide-react";
import { useApplications } from "@/lib/application-context";
import { formatDate } from "@/lib/utils";

export const StatisticsView: React.FC = () => {
  const { applications, stats, dailyGoal, setDailyGoal } = useApplications();

  const total = applications.length;
  const activeCount = stats.applied + stats.assessment + stats.interview;
  const interviewRate = total > 0 ? Math.round((stats.interview / total) * 100) : 0;
  const offerRate = stats.interview > 0 ? Math.round((stats.offer / stats.interview) * 100) : 0;

  // Monthly breakdown
  const monthlyCounts: Record<string, number> = {};
  applications.forEach((a) => {
    const month = (a.appliedDate || "").slice(0, 7); // YYYY-MM
    if (month) {
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
    }
  });

  const sortedMonths = Object.entries(monthlyCounts).sort(([a], [b]) => a.localeCompare(b));
  const maxMonthCount = Math.max(...sortedMonths.map(([_, count]) => count), 1);

  // Status breakdown list
  const statusBreakdown = [
    { label: "Wishlist", count: stats.wishlist, color: "bg-emerald-500", text: "text-emerald-700" },
    { label: "Applied", count: stats.applied, color: "bg-purple-600", text: "text-purple-700" },
    { label: "Assessment", count: stats.assessment, color: "bg-amber-500", text: "text-amber-700" },
    { label: "Interviewing", count: stats.interview, color: "bg-blue-600", text: "text-blue-700" },
    { label: "Offer", count: stats.offer, color: "bg-teal-600", text: "text-teal-700" },
    { label: "Rejected", count: stats.rejected, color: "bg-rose-500", text: "text-rose-700" },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400">
            <BarChart3 className="w-3.5 h-3.5" /> Recruitment Analytics
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
            Application Statistics & Metrics
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Tracking active recruitment pipeline</span>
        </div>
      </div>

      {/* KPI Cards Row (Minimalist, compact) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-2xs">
          <div className="text-xs font-semibold text-slate-400">Total Applied</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            {stats.total}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">{stats.wishlist} in wishlist</div>
        </div>

        <div className="p-4 rounded-xl border border-purple-200/80 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20 shadow-2xs">
          <div className="text-xs font-semibold text-purple-600 dark:text-purple-400">Active Pipeline</div>
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">
            {activeCount}
          </div>
          <div className="text-[11px] text-purple-600/80 mt-1">In progress</div>
        </div>

        <div className="p-4 rounded-xl border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 shadow-2xs">
          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">Interviews</div>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">
            {stats.interview}
          </div>
          <div className="text-[11px] text-blue-600/80 mt-1">{interviewRate}% interview rate</div>
        </div>

        <div className="p-4 rounded-xl border border-teal-200/80 dark:border-teal-900/60 bg-teal-50/40 dark:bg-teal-950/20 shadow-2xs">
          <div className="text-xs font-semibold text-teal-600 dark:text-teal-400">Job Offers</div>
          <div className="text-2xl font-bold text-teal-900 dark:text-teal-100 mt-1">
            {stats.offer}
          </div>
          <div className="text-[11px] text-teal-600/80 mt-1">{offerRate}% offer conversion</div>
        </div>

        <div className="p-4 rounded-xl border border-rose-200/80 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 shadow-2xs col-span-2 md:col-span-1">
          <div className="text-xs font-semibold text-rose-600 dark:text-rose-400">Rejections</div>
          <div className="text-2xl font-bold text-rose-900 dark:text-rose-100 mt-1">
            {stats.rejected}
          </div>
          <div className="text-[11px] text-rose-600/80 mt-1">{stats.withdrawn} withdrawn</div>
        </div>
      </div>

      {/* Charts & Distributions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Breakdown Bar */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-2xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            Status Distribution
          </h3>

          <div className="space-y-3 pt-1">
            {statusBreakdown.map((item) => {
              const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
                    <span className="text-slate-500 font-mono">
                      {item.count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Over Time */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-2xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            Application Activity Over Time
          </h3>

          {sortedMonths.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No date data recorded yet
            </div>
          ) : (
            <div className="pt-4 flex items-end gap-3 h-48 border-b border-slate-100 dark:border-slate-700 pb-2">
              {sortedMonths.map(([month, count]) => {
                const heightPercent = Math.max(12, Math.round((count / maxMonthCount) * 100));
                return (
                  <div key={month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {count}
                    </span>
                    <div
                      className="w-full max-w-[36px] bg-purple-600 dark:bg-purple-500 rounded-t-lg group-hover:bg-purple-700 transition-all"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[10px] text-slate-400 font-mono truncate w-full text-center">
                      {month.slice(5)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-[11px] text-slate-400 text-center">
            Consistent submission rhythm increases interview callback likelihood.
          </div>
        </div>
      </div>
    </div>
  );
};

