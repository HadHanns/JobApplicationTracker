"use client";

import React from "react";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Send,
  Calendar,
  AlertCircle,
  Plus,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  Building2,
  ExternalLink,
} from "lucide-react";
import { useApplications } from "@/lib/application-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatRelativeDays } from "@/lib/utils";

export const DashboardOverview: React.FC = () => {
  const {
    applications,
    stats,
    setIsCreateModalOpen,
    setIsImportModalOpen,
    setIsExportModalOpen,
    setSelectedApplication,
    setViewMode,
  } = useApplications();

  // Active in-progress applications
  const inProgress = applications.filter(
    (a) => a.status === "Applied" || a.status === "Assessment" || a.status === "Interview"
  );

  // Conversion Funnel calculations
  const total = applications.length;
  const appliedCount = total - stats.wishlist;
  const assessmentCount = stats.assessment + stats.interview + stats.offer;
  const interviewCount = stats.interview + stats.offer;
  const offerCount = stats.offer;

  const interviewRate = appliedCount > 0 ? Math.round((interviewCount / appliedCount) * 100) : 0;
  const offerRate = interviewCount > 0 ? Math.round((offerCount / interviewCount) * 100) : 0;

  // Upcoming interviews from all applications
  const allInterviews = applications
    .flatMap((app) =>
      (app.interviews || []).map((intv) => ({
        ...intv,
        company: app.company,
        position: app.position,
        applicationId: app.id,
      }))
    )
    .filter((intv) => !intv.completed)
    .sort((a, b) => a.date.localeCompare(b.date));

  // Follow-up reminders
  const followUpApps = applications
    .filter(
      (app) =>
        app.followUpDate &&
        app.status !== "Offer" &&
        app.status !== "Rejected" &&
        app.status !== "Withdrawn"
    )
    .sort((a, b) => (a.followUpDate || "").localeCompare(b.followUpDate || ""));

  // Referral breakdown
  const referralCounts: Record<string, number> = {};
  applications.forEach((a) => {
    const src = a.referralSource || "Other";
    referralCounts[src] = (referralCounts[src] || 0) + 1;
  });
  const referralList = Object.entries(referralCounts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Welcome & Quick Action Bar */}
      <section
        aria-label="Overview Banner"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-slate-800"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide border border-indigo-500/30">
              <TrendingUp className="w-3.5 h-3.5" /> Career Journey & Recruitment Tracker
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Recruitment Dashboard
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Track applications, upcoming interview rounds, offers, and sync data seamlessly with your Excel templates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              className="bg-slate-800/80 border-slate-700 text-white hover:bg-slate-700 hover:text-white"
              onClick={() => setIsImportModalOpen(true)}
              icon={<FileSpreadsheet className="w-4 h-4 text-emerald-400" />}
            >
              Import Excel
            </Button>
            <Button
              variant="outline"
              className="bg-slate-800/80 border-slate-700 text-white hover:bg-slate-700 hover:text-white"
              onClick={() => setIsExportModalOpen(true)}
              icon={<FileSpreadsheet className="w-4 h-4 text-indigo-400" />}
            >
              Export .xlsx
            </Button>
            <Button
              variant="primary"
              onClick={() => setIsCreateModalOpen(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Add Application
            </Button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      </section>

      {/* Top Key Metrics Grid */}
      <section aria-label="Key Statistics" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Applications */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Total Applications</span>
            <Briefcase className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {stats.total}
            </span>
            <span className="text-xs text-slate-500">records</span>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <span className="font-medium text-slate-700 dark:text-slate-300">{stats.wishlist}</span> in wishlist
          </p>
        </div>

        {/* In Progress */}
        <div className="p-5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 shadow-xs">
          <div className="flex items-center justify-between text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <span>Active Pipeline</span>
            <Send className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-blue-900 dark:text-blue-100">
              {inProgress.length}
            </span>
            <span className="text-xs text-blue-600 dark:text-blue-400">in process</span>
          </div>
          <p className="mt-2 text-xs text-blue-700/80 dark:text-blue-300/80">
            {stats.applied} applied · {stats.assessment} assessment
          </p>
        </div>

        {/* Interviews Active */}
        <div className="p-5 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20 shadow-xs">
          <div className="flex items-center justify-between text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <span>Interviews</span>
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-purple-900 dark:text-purple-100">
              {stats.interview}
            </span>
            <span className="text-xs text-purple-600 dark:text-purple-400">stages</span>
          </div>
          <p className="mt-2 text-xs text-purple-700/80 dark:text-purple-300/80">
            {stats.upcomingInterviewsCount} upcoming sessions scheduled
          </p>
        </div>

        {/* Offers Secured */}
        <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs">
          <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <span>Job Offers</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100">
              {stats.offer}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400">offers</span>
          </div>
          <p className="mt-2 text-xs text-emerald-700/80 dark:text-emerald-300/80">
            {stats.rejected} rejected · {stats.withdrawn} withdrawn
          </p>
        </div>
      </section>

      {/* Conversion Funnel & Recruitment Funnel */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recruitment Conversion Funnel */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                Recruitment Funnel & Conversion Rates
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Progression from submitted application to final job offer
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300">
                {interviewRate}% Interview Rate
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
                {offerRate}% Offer Rate
              </span>
            </div>
          </div>

          <div className="space-y-3.5 pt-2">
            {/* Step 1: Applications */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                <span>Submitted Applications</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{appliedCount}</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${appliedCount > 0 ? 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Step 2: Assessments & Responses */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                <span>Tests & Assessments / Initial Shortlist</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {assessmentCount} ({appliedCount > 0 ? Math.round((assessmentCount / appliedCount) * 100) : 0}%)
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${appliedCount > 0 ? (assessmentCount / appliedCount) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Step 3: Interview Stages */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                <span>Interview Stages (HR, User, Presentation)</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {interviewCount} ({interviewRate}%)
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${appliedCount > 0 ? (interviewCount / appliedCount) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Step 4: Offer */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                <span>Job Offers Received</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {offerCount} ({appliedCount > 0 ? Math.round((offerCount / appliedCount) * 100) : 0}%)
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${appliedCount > 0 ? (offerCount / appliedCount) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800">
            <span className="text-slate-500">Pipeline health: Healthy activity across multiple stages</span>
            <button
              onClick={() => setViewMode("pipeline")}
              className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Open Pipeline View <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Referral Channels Breakdown */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
              Application Channels
            </h2>
            <span className="text-xs text-slate-500 font-medium">{referralList.length} platforms</span>
          </div>

          <div className="space-y-3">
            {referralList.slice(0, 5).map((item) => {
              const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
              return (
                <div key={item.source} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700 dark:text-slate-300">{item.source}</span>
                    <span className="text-slate-500">
                      {item.count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
            Matching original template channels: LinkedIn, Jobstreet, Deals, Job Fair, Referral.
          </div>
        </div>
      </section>

      {/* Action Center: Upcoming Interviews & Follow-up Deadlines */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Interviews Box */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                Scheduled Interview Rounds
              </h2>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-medium">
              {allInterviews.length} upcoming
            </span>
          </div>

          {allInterviews.length === 0 ? (
            <div className="py-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
              <Clock className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                No upcoming interviews scheduled
              </p>
              <p className="text-xs text-slate-400">
                Add an interview stage to any application to track rounds here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {allInterviews.slice(0, 4).map((intv) => (
                <div
                  key={intv.id}
                  onClick={() => {
                    const found = applications.find((a) => a.id === intv.applicationId);
                    if (found) setSelectedApplication(found);
                  }}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 bg-slate-50/60 dark:bg-slate-800/40 cursor-pointer transition-colors flex items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
                        {intv.company}
                      </span>
                      <Badge variant="status" status="Interview" size="sm">
                        {intv.stage}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {intv.position} · {intv.interviewer || "Interviewer TBA"}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-semibold text-purple-700 dark:text-purple-300">
                      {formatRelativeDays(intv.date) || formatDate(intv.date)}
                    </div>
                    {intv.time && (
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {intv.time} WIB
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Follow-up Reminders */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                Follow-Up & Action Reminders
              </h2>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-medium">
              {followUpApps.length} pending
            </span>
          </div>

          {followUpApps.length === 0 ? (
            <div className="py-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500/50 mx-auto" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                All follow-ups clear!
              </p>
              <p className="text-xs text-slate-400">
                Set a follow-up date on applications to get reminder notifications here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {followUpApps.slice(0, 4).map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApplication(app)}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 bg-slate-50/60 dark:bg-slate-800/40 cursor-pointer transition-colors flex items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
                        {app.company}
                      </span>
                      <Badge variant="status" status={app.status} size="sm">
                        {app.detailedProgress || app.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {app.position} · {app.notes || "No notes"}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                      Due {formatRelativeDays(app.followUpDate) || formatDate(app.followUpDate)}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Applied {formatDate(app.appliedDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

