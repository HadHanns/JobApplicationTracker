"use client";

import React, { useState } from "react";
import {
  Building2,
  Calendar,
  ExternalLink,
  MapPin,
  DollarSign,
  Clock,
  Pencil,
  Trash2,
  Plus,
  CheckCircle2,
  Circle,
  Video,
  FileText,
  UserCheck,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JobApplication, ApplicationStatus, InterviewSession } from "@/types/application";
import { useApplications } from "@/lib/application-context";
import { formatDate, formatRelativeDays } from "@/lib/utils";

interface ApplicationDetailModalProps {
  application: JobApplication | null;
  onClose: () => void;
  onEdit: (app: JobApplication) => void;
  onAddInterview: (app: JobApplication) => void;
}

export const ApplicationDetailModal: React.FC<ApplicationDetailModalProps> = ({
  application,
  onClose,
  onEdit,
  onAddInterview,
}) => {
  const { updateApplication, deleteApplication, updateInterview, deleteInterview } =
    useApplications();

  if (!application) return null;

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    updateApplication(application.id, {
      status: newStatus,
      detailedProgress: newStatus,
    });
  };

  const toggleInterviewComplete = (interview: InterviewSession) => {
    updateInterview(application.id, interview.id, {
      completed: !interview.completed,
    });
  };

  return (
    <Modal
      isOpen={!!application}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {application.company}
            </div>
            <div className="text-sm font-normal text-slate-500 dark:text-slate-400">
              {application.position}
            </div>
          </div>
        </div>
      }
      maxWidth="2xl"
    >
      <div className="space-y-6 pt-2">
        {/* Status bar & quick status switcher */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Stage:
            </span>
            <Badge variant="status" status={application.status}>
              {application.detailedProgress || application.status}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Move to:</span>
            <select
              value={application.status}
              onChange={(e) => handleStatusChange(e.target.value as ApplicationStatus)}
              className="px-2.5 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold cursor-pointer"
            >
              <option value="Wishlist">Wishlist</option>
              <option value="Applied">Applied</option>
              <option value="Assessment">Assessment</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
              <option value="Withdrawn">Withdrawn</option>
            </select>
          </div>
        </div>

        {/* Key Info Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-slate-400 font-medium">Applied Date</span>
            <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
              {formatDate(application.appliedDate)}
            </p>
          </div>

          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-slate-400 font-medium">Job Type</span>
            <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
              {application.jobType || "Fulltime"}
            </p>
          </div>

          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-slate-400 font-medium">Channel</span>
            <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
              {application.referralSource || "Direct"}
            </p>
          </div>

          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-slate-400 font-medium">Follow-Up</span>
            <p className="mt-1 font-semibold text-amber-600 dark:text-amber-400">
              {application.followUpDate ? formatRelativeDays(application.followUpDate) : "-"}
            </p>
          </div>
        </div>

        {/* Location & Salary & URL */}
        <div className="space-y-2 text-xs">
          {application.location && (
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{application.location}</span>
            </div>
          )}
          {application.salary && (
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <DollarSign className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{application.salary}</span>
            </div>
          )}
          {application.jobUrl && (
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              <a
                href={application.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline truncate"
              >
                {application.jobUrl}
              </a>
            </div>
          )}
        </div>

        {/* Personal Notes */}
        {application.notes && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <FileText className="w-3.5 h-3.5" /> Personal Notes & Details
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {application.notes}
            </p>
          </div>
        )}

        {/* Interview Schedule & Rounds section */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                Interview Rounds ({application.interviews?.length || 0})
              </h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddInterview(application)}
              icon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Round
            </Button>
          </div>

          {(!application.interviews || application.interviews.length === 0) ? (
            <div className="py-6 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              No interview rounds scheduled yet. Click &quot;Add Round&quot; to log HR, User, or Technical interviews.
            </div>
          ) : (
            <div className="space-y-2.5">
              {application.interviews.map((intv, idx) => (
                <div
                  key={intv.id}
                  className={`p-3.5 rounded-xl border transition-colors ${
                    intv.completed
                      ? "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-500"
                      : "bg-purple-50/50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <button
                        onClick={() => toggleInterviewComplete(intv)}
                        title={intv.completed ? "Mark incomplete" : "Mark completed"}
                        className="mt-0.5 text-slate-400 hover:text-emerald-500 transition-colors"
                      >
                        {intv.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-semibold text-xs ${
                              intv.completed
                                ? "line-through text-slate-400"
                                : "text-slate-900 dark:text-slate-100"
                            }`}
                          >
                            Round {idx + 1}: {intv.stage}
                          </span>
                          {intv.completed && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-medium">
                              Completed
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap items-center gap-2">
                          <span>{formatDate(intv.date)}</span>
                          {intv.time && <span>• {intv.time} WIB</span>}
                          {intv.interviewer && <span>• Interviewer: {intv.interviewer}</span>}
                        </div>
                        {intv.meetingLink && (
                          <a
                            href={intv.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-purple-600 dark:text-purple-400 hover:underline mt-1"
                          >
                            <Video className="w-3 h-3" /> Meeting Link
                          </a>
                        )}
                        {intv.notes && (
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 italic">
                            &quot;{intv.notes}&quot;
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => deleteInterview(application.id, intv.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove interview round"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (confirm(`Delete application for ${application.company}?`)) {
                deleteApplication(application.id);
                onClose();
              }
            }}
            icon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Delete
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onEdit(application);
              }}
              icon={<Pencil className="w-3.5 h-3.5" />}
            >
              Edit Application
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

