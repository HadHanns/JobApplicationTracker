"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  Plus,
  CheckCircle2,
  Circle,
  Building2,
  ExternalLink,
  Trash2,
  FileText,
} from "lucide-react";
import { useApplications } from "@/lib/application-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatRelativeDays } from "@/lib/utils";
import { JobApplication, InterviewSession } from "@/types/application";

interface InterviewListViewProps {
  onScheduleInterview: (app?: JobApplication) => void;
}

export const InterviewListView: React.FC<InterviewListViewProps> = ({
  onScheduleInterview,
}) => {
  const { applications, updateInterview, deleteInterview, setSelectedApplication } =
    useApplications();

  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("upcoming");

  // Flatten all interviews with application metadata
  const allInterviews = applications.flatMap((app) =>
    (app.interviews || []).map((intv) => ({
      ...intv,
      application: app,
    }))
  );

  const upcomingInterviews = allInterviews.filter((i) => !i.completed).sort((a, b) => a.date.localeCompare(b.date));
  const completedInterviews = allInterviews.filter((i) => i.completed).sort((a, b) => b.date.localeCompare(a.date));

  const displayedInterviews =
    filter === "upcoming"
      ? upcomingInterviews
      : filter === "completed"
      ? completedInterviews
      : [...upcomingInterviews, ...completedInterviews];

  const handleToggle = (intv: InterviewSession & { application: JobApplication }) => {
    updateInterview(intv.application.id, intv.id, {
      completed: !intv.completed,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400">
            <Calendar className="w-3.5 h-3.5" /> Interview & Recruiter Scheduling
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Interview Rounds & Follow-ups
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Keep track of upcoming HR calls, user interviews, case presentations, and preparation notes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            onClick={() => onScheduleInterview()}
            icon={<Plus className="w-4 h-4" />}
          >
            Schedule Interview
          </Button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs">
        <button
          onClick={() => setFilter("upcoming")}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
            filter === "upcoming"
              ? "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Upcoming ({upcomingInterviews.length})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
            filter === "completed"
              ? "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Completed ({completedInterviews.length})
        </button>
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
            filter === "all"
              ? "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          All ({allInterviews.length})
        </button>
      </div>

      {/* Interviews list */}
      {displayedInterviews.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/40 p-8 space-y-3">
          <Calendar className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">
            No interview rounds found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Schedule an interview for any of your active job applications to log rounds, meeting links, and prep notes.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onScheduleInterview()}
              icon={<Plus className="w-3.5 h-3.5" />}
            >
              Schedule Interview
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedInterviews.map((intv) => (
            <div
              key={intv.id}
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                intv.completed
                  ? "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-75"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs hover:border-purple-300 dark:hover:border-purple-700"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleToggle(intv)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-500 transition-colors"
                    title={intv.completed ? "Mark pending" : "Mark completed"}
                  >
                    {intv.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-purple-400" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4
                        onClick={() => setSelectedApplication(intv.application)}
                        className="font-bold text-base text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                      >
                        {intv.application.company}
                      </h4>
                      <Badge variant="status" status="Interview" size="sm">
                        {intv.stage}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {intv.application.position}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-bold ${
                      intv.completed
                        ? "text-slate-400"
                        : "text-purple-700 dark:text-purple-300"
                    }`}
                  >
                    {formatRelativeDays(intv.date) || formatDate(intv.date)}
                  </span>
                  {intv.time && (
                    <div className="text-[11px] text-slate-400">{intv.time} WIB</div>
                  )}
                </div>
              </div>

              {/* Meta information */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-1">
                {intv.interviewer && (
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Interviewer:</span>
                    <span className="font-medium">{intv.interviewer}</span>
                  </div>
                )}

                {intv.meetingLink && (
                  <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                    <Video className="w-3.5 h-3.5 shrink-0" />
                    <a
                      href={intv.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline truncate"
                    >
                      {intv.meetingLink}
                    </a>
                  </div>
                )}

                {intv.notes && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">
                      Prep notes:
                    </span>
                    {intv.notes}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <button
                  onClick={() => setSelectedApplication(intv.application)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View Application Details
                </button>
                <button
                  onClick={() => deleteInterview(intv.application.id, intv.id)}
                  className="p-1 text-slate-400 hover:text-rose-600"
                  title="Remove interview round"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

