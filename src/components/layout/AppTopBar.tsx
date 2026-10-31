"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Pencil,
  Check,
  Target,
  Upload,
  Download,
  Plus,
  Bell,
  Star,
  Sparkles,
  Menu,
  X,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { useApplications } from "@/lib/application-context";
import { Button } from "@/components/ui/Button";
import { formatDate, formatRelativeDays } from "@/lib/utils";

interface AppTopBarProps {
  onOpenMobileMenu?: () => void;
}

export const AppTopBar: React.FC<AppTopBarProps> = ({ onOpenMobileMenu }) => {
  const {
    workspaceTitle,
    setWorkspaceTitle,
    dailyGoal,
    setIsCreateModalOpen,
    setIsImportModalOpen,
    setIsExportModalOpen,
    sidebarCollapsed,
    stats,
    applications,
  } = useApplications();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(workspaceTitle);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationOpen]);

  const handleSaveTitle = () => {
    if (tempTitle.trim()) {
      setWorkspaceTitle(tempTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const goalPercentage = Math.min(
    100,
    Math.round((dailyGoal.current / dailyGoal.target) * 100)
  );

  return (
    <header className="h-14 px-4 sm:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Left: Mobile hamburger + Workspace Title */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {isEditingTitle ? (
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveTitle()}
              autoFocus
              className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-purple-500 focus:outline-hidden"
            />
            <button
              onClick={handleSaveTitle}
              className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 group">
            <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {workspaceTitle}
            </h1>
            <button
              onClick={() => {
                setTempTitle(workspaceTitle);
                setIsEditingTitle(true);
              }}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 opacity-60 group-hover:opacity-100 transition-opacity"
              title="Edit workspace title"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Right Controls (Exact match to reference) */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Daily Goal Pill */}
        <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5 font-medium">
            <Target className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Daily Goal</span>
          </div>
          {/* Progress bar */}
          <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${goalPercentage}%` }}
            />
          </div>
          <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono text-[11px]">
            {dailyGoal.current}/{dailyGoal.target}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors shadow-2xs"
            title="Import from Excel spreadsheet"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Import Excel</span>
          </button>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors shadow-2xs"
            title="Export to .xlsx spreadsheet"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Export .xlsx</span>
          </button>
        </div>

        {/* Primary CTA Button */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Job</span>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="flex items-center gap-1 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
            title="Notifications"
          >
            <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">
              {stats.upcomingInterviewsCount + stats.followUpsPendingCount}
            </span>
            <Bell className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {/* Notification Panel */}
          {isNotificationOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg z-50">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Notifications</h3>
                  <button
                    onClick={() => setIsNotificationOpen(false)}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {/* Upcoming Interviews */}
                {applications
                  .filter((app) => 
                    app.interviews && 
                    app.interviews.some((intv) => !intv.completed)
                  )
                  .map((app) =>
                    (app.interviews || [])
                      .filter((intv) => !intv.completed)
                      .map((intv) => (
                        <div
                          key={intv.id}
                          className="p-3 mb-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30"
                        >
                          <div className="flex items-start gap-2">
                            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                                {app.company} - {app.position}
                              </p>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                                {intv.stage} Interview
                              </p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatDate(intv.date)}
                                </span>
                                {intv.time && <span>{intv.time}</span>}
                              </div>
                              {intv.meetingLink && (
                                <a
                                  href={intv.meetingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 mt-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  Join Meeting
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                  )}

                {/* Follow-up Reminders */}
                {applications
                  .filter((app) => 
                    app.followUpDate && 
                    app.status !== "Offer" && 
                    app.status !== "Rejected" && 
                    app.status !== "Withdrawn"
                  )
                  .map((app) => (
                    <div
                      key={app.id}
                      className="p-3 mb-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30"
                    >
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                            {app.company} - {app.position}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                            Follow-up: {formatDate(app.followUpDate)}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {formatRelativeDays(app.followUpDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* No notifications */}
                {stats.upcomingInterviewsCount + stats.followUpsPendingCount === 0 && (
                  <div className="p-6 text-center text-xs text-slate-400 dark:text-slate-500">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No notifications</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

