"use client";

import React from "react";
import {
  Clock,
  Calendar,
  Building2,
  ChevronRight,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { useApplications } from "@/lib/application-context";
import { JobApplication, ApplicationStatus } from "@/types/application";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatRelativeDays } from "@/lib/utils";

const PIPELINE_COLUMNS: {
  status: ApplicationStatus;
  title: string;
  dotColor: string;
}[] = [
  { status: "Wishlist", title: "Wishlist", dotColor: "bg-slate-400" },
  { status: "Applied", title: "Applied", dotColor: "bg-blue-500" },
  { status: "Assessment", title: "Assessment", dotColor: "bg-amber-500" },
  { status: "Interview", title: "Interview", dotColor: "bg-purple-500" },
  { status: "Offer", title: "Offer", dotColor: "bg-emerald-500" },
  { status: "Rejected", title: "Rejected", dotColor: "bg-rose-500" },
];

interface ApplicationPipelineProps {
  onEdit: (app: JobApplication) => void;
  onScheduleInterview: (app: JobApplication) => void;
}

export const ApplicationPipeline: React.FC<ApplicationPipelineProps> = ({
  onEdit,
  onScheduleInterview,
}) => {
  const {
    filteredApplications,
    updateApplication,
    setSelectedApplication,
    setIsCreateModalOpen,
  } = useApplications();

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    app: JobApplication
  ) => {
    const newStatus = e.target.value as ApplicationStatus;
    updateApplication(app.id, {
      status: newStatus,
      detailedProgress: newStatus,
    });
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
      {PIPELINE_COLUMNS.map((col) => {
        const columnApps = filteredApplications.filter((a) => a.status === col.status);

        return (
          <div
            key={col.status}
            className="flex-1 min-w-[280px] max-w-[320px] bg-slate-100/70 dark:bg-slate-900/60 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800 flex flex-col h-[750px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 px-1 border-b border-slate-200/60 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                  {col.title}
                </h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold shadow-2xs border border-slate-200/60 dark:border-slate-700">
                {columnApps.length}
              </span>
            </div>

            {/* Cards scroll area */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pt-3 pr-1">
              {columnApps.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No applications in this stage
                </div>
              ) : (
                columnApps.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApplication(app)}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer transition-all space-y-2.5 group"
                  >
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {app.company}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {app.position}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                        {app.jobType || "Fulltime"}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800/60 text-slate-500 border border-slate-200/60 dark:border-slate-700">
                        {app.referralSource || "Direct"}
                      </span>
                    </div>

                    {app.interviews && app.interviews.length > 0 && (
                      <div className="flex items-center gap-1 text-[11px] font-medium text-purple-600 dark:text-purple-400">
                        <Calendar className="w-3 h-3" />
                        <span>{app.interviews.length} interview round recorded</span>
                      </div>
                    )}

                    {app.followUpDate && (
                      <div className="text-[11px] flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                        <Clock className="w-3 h-3" />
                        <span>Follow-up {formatRelativeDays(app.followUpDate)}</span>
                      </div>
                    )}

                    {/* Footer with stage switcher */}
                    <div
                      className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="text-[11px] text-slate-400">
                        {formatDate(app.appliedDate)}
                      </span>

                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(e, app)}
                        className="text-[11px] px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-700 dark:text-slate-300 cursor-pointer focus:ring-1 focus:ring-indigo-500"
                      >
                        {PIPELINE_COLUMNS.map((p) => (
                          <option key={p.status} value={p.status}>
                            Move to {p.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quick Add in column footer */}
            <div className="pt-2 shrink-0">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full py-2 px-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-400 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add in {col.title}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

