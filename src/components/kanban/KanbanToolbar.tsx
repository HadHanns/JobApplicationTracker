"use client";

import React from "react";
import {
  Search,
  LayoutGrid,
  List,
  Plus,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { useApplications } from "@/lib/application-context";

export const KanbanToolbar: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    setIsCreateModalOpen,
  } = useApplications();

  return (
    <div className="px-4 sm:px-6 py-3 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      {/* Search Input (Exact match to reference) */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search company, tag, position, etc..."
          className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 shadow-2xs transition-colors"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-2.5 overflow-x-auto pb-0.5 sm:pb-0">
        {/* Sort dropdown */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 shrink-0">
          <span className="hidden md:inline font-medium text-slate-400">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium cursor-pointer shadow-2xs focus:outline-hidden focus:border-purple-500"
          >
            <option value="jobCreation">Job Creation</option>
            <option value="appliedDate_asc">Oldest First</option>
            <option value="company">Company (A-Z)</option>
            <option value="status">Status</option>
            <option value="followUp">Follow-up Due</option>
          </select>
        </div>

        {/* View Switcher Icons: [|||] vs [:=] */}
        <div className="flex items-center p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800 shrink-0">
          <button
            onClick={() => setViewMode("pipeline")}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === "pipeline"
                ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-2xs"
                : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
            title="Kanban Board view"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === "table"
                ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-2xs"
                : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
            title="Table List view"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Add column button */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors shadow-2xs shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-slate-400" />
          <span>Add column</span>
        </button>
      </div>
    </div>
  );
};

