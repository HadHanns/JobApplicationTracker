"use client";

import React, { useState } from "react";
import {
  Building2,
  Calendar,
  ExternalLink,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  Plus,
  Clock,
  MapPin,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { useApplications } from "@/lib/application-context";
import { JobApplication, ApplicationStatus } from "@/types/application";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate, formatRelativeDays } from "@/lib/utils";

interface ApplicationTableProps {
  onEdit: (app: JobApplication) => void;
  onScheduleInterview: (app: JobApplication) => void;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({
  onEdit,
  onScheduleInterview,
}) => {
  const {
    filteredApplications,
    deleteApplication,
    setSelectedApplication,
    setIsCreateModalOpen,
    setIsImportModalOpen,
  } = useApplications();

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  if (filteredApplications.length === 0) {
    return (
      <div className="py-16 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/40 p-8 space-y-4">
        <Building2 className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
            No applications match your criteria
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query, clearing filters, or adding a new job application.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsImportModalOpen(true)}
          >
            Import from Excel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop & Tablet Table */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-4 w-12 text-center">#</th>
              <th className="py-3.5 px-4">Company & Role</th>
              <th className="py-3.5 px-4">Stage & Status</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Channel</th>
              <th className="py-3.5 px-4">Applied Date</th>
              <th className="py-3.5 px-4">Follow-up</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredApplications.map((app, idx) => (
              <tr
                key={app.id}
                onClick={() => setSelectedApplication(app)}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors group"
              >
                {/* Index */}
                <td className="py-4 px-4 text-center text-xs text-slate-400 font-mono">
                  {idx + 1}
                </td>

                {/* Company & Role */}
                <td className="py-4 px-4 min-w-[220px]">
                  <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {app.company}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs mt-0.5">
                    {app.position}
                  </div>
                  {app.jobUrl && (
                    <a
                      href={app.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline mt-1"
                    >
                      Job posting <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </td>

                {/* Status */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <Badge variant="status" status={app.status}>
                      {app.detailedProgress || app.status}
                    </Badge>
                    {app.interviews && app.interviews.length > 0 && (
                      <div className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
                        {app.interviews.length} round{app.interviews.length > 1 ? "s" : ""} recorded
                      </div>
                    )}
                  </div>
                </td>

                {/* Job Type */}
                <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-600 dark:text-slate-300">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 font-medium">
                    {app.jobType || "Fulltime"}
                  </span>
                </td>

                {/* Referral Source */}
                <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                  {app.referralSource || "Direct"}
                </td>

                {/* Applied Date */}
                <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {formatDate(app.appliedDate)}
                </td>

                {/* Follow-up */}
                <td className="py-4 px-4 whitespace-nowrap text-xs">
                  {app.followUpDate ? (
                    <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatRelativeDays(app.followUpDate)}</span>
                    </div>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>

                {/* Action buttons */}
                <td
                  className="py-4 px-4 text-right whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onScheduleInterview(app)}
                      title="Schedule interview round"
                      className="p-1.5 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/50 rounded-lg transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(app)}
                      title="Edit application"
                      className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete application for ${app.company}?`)) {
                          deleteApplication(app.id);
                        }
                      }}
                      title="Delete application"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List (< md screens) */}
      <div className="md:hidden space-y-3">
        {filteredApplications.map((app) => (
          <div
            key={app.id}
            onClick={() => setSelectedApplication(app)}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3 active:bg-slate-50 dark:active:bg-slate-800/60"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">
                  {app.company}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {app.position}
                </p>
              </div>
              <Badge variant="status" status={app.status} size="sm">
                {app.detailedProgress || app.status}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-medium">
                {app.jobType || "Fulltime"}
              </span>
              <span className="text-slate-400">•</span>
              <span>{app.referralSource || "Direct"}</span>
              <span className="text-slate-400">•</span>
              <span>{formatDate(app.appliedDate)}</span>
            </div>

            {app.followUpDate && (
              <div className="text-xs flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Follow-up {formatRelativeDays(app.followUpDate)}</span>
              </div>
            )}

            <div
              className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => onScheduleInterview(app)}
                className="text-xs font-semibold text-purple-600 dark:text-purple-400 inline-flex items-center gap-1 hover:underline"
              >
                <Calendar className="w-3.5 h-3.5" /> Interview
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(app)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete application for ${app.company}?`)) {
                      deleteApplication(app.id);
                    }
                  }}
                  className="p-1.5 text-rose-500 hover:text-rose-700 rounded-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

