"use client";

import React from "react";
import {
  Search,
  SlidersHorizontal,
  LayoutList,
  Kanban,
  RotateCcw,
  Plus,
} from "lucide-react";
import { useApplications } from "@/lib/application-context";
import { Button } from "@/components/ui/Button";
import { ApplicationStatus, ViewMode } from "@/types/application";

const STATUS_OPTIONS: { label: string; value: string }[] = [
  { label: "All Statuses", value: "all" },
  { label: "Wishlist", value: "Wishlist" },
  { label: "Applied", value: "Applied" },
  { label: "Assessment", value: "Assessment" },
  { label: "Interview", value: "Interview" },
  { label: "Offer", value: "Offer" },
  { label: "Rejected", value: "Rejected" },
  { label: "Withdrawn", value: "Withdrawn" },
];

const JOB_TYPE_OPTIONS = ["all", "Fulltime", "MT", "Intern", "Contract", "Freelance"];

export const ApplicationFilterBar: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    jobTypeFilter,
    setJobTypeFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    setIsCreateModalOpen,
    resetToInitialData,
    filteredApplications,
    applications,
  } = useApplications();

  return (
    <div className="space-y-3.5">
      {/* Top Search & Actions row */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company, role, location, or notes..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-2xs transition-colors"
          />
        </div>

        {/* View toggle & Action buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {/* View mode toggle */}
          <div className="inline-flex items-center p-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/80 shrink-0">
            <button
              onClick={() => setViewMode("table")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "table"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
              title="Table view"
            >
              <LayoutList className="w-3.5 h-3.5" /> Table
            </button>
            <button
              onClick={() => setViewMode("pipeline")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "pipeline"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
              title="Pipeline Kanban view"
            >
              <Kanban className="w-3.5 h-3.5" /> Pipeline
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={resetToInitialData}
            title="Reset data back to template samples"
            className="text-slate-600 dark:text-slate-300 shrink-0"
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
            className="shrink-0"
          >
            New Application
          </Button>
        </div>
      </div>

      {/* Filter tags & Sorting controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100 dark:border-slate-800/60 text-xs">
        {/* Status filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {STATUS_OPTIONS.map((opt) => {
            const isActive = statusFilter === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value)}
                className={`px-3 py-1 rounded-full font-medium transition-colors shrink-0 ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-indigo-600 dark:text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Secondary filters & Sort dropdown */}
        <div className="flex items-center gap-3">
          {/* Job Type filter */}
          <select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-medium focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Types</option>
            {JOB_TYPE_OPTIONS.filter((t) => t !== "all").map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-medium focus:ring-1 focus:ring-indigo-500"
          >
            <option value="appliedDate_desc">Newest Applied</option>
            <option value="appliedDate_asc">Oldest Applied</option>
            <option value="company">Company (A-Z)</option>
            <option value="status">Status</option>
            <option value="followUp">Follow-up Due</option>
          </select>

          <span className="text-slate-400 font-medium">
            Showing {filteredApplications.length} of {applications.length}
          </span>
        </div>
      </div>
    </div>
  );
};

