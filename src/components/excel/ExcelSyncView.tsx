"use client";

import React from "react";
import {
  FileSpreadsheet,
  Download,
  Upload,
  CheckCircle2,
  Table,
  Layers,
  ArrowRight,
  Sparkles,
  FileCheck,
} from "lucide-react";
import { useApplications } from "@/lib/application-context";
import { Button } from "@/components/ui/Button";

export const ExcelSyncView: React.FC = () => {
  const {
    applications,
    setIsImportModalOpen,
    setIsExportModalOpen,
    activeTemplateBuffer,
  } = useApplications();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border border-emerald-900/40 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wide border border-emerald-500/30">
          <FileSpreadsheet className="w-3.5 h-3.5" /> Powered by ExcelJS
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Excel Integration & Template Synchronization
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Read workbook data, inspect worksheet structures, map custom columns to application fields, and export your application pipeline while preserving template formatting and summary worksheets.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            onClick={() => setIsImportModalOpen(true)}
            icon={<Download className="w-4 h-4" />}
          >
            Import Excel Spreadsheet
          </Button>
          <Button
            variant="outline"
            className="bg-slate-800/80 border-slate-700 text-white hover:bg-slate-700 hover:text-white"
            onClick={() => setIsExportModalOpen(true)}
            icon={<Upload className="w-4 h-4" />}
          >
            Export to Excel (.xlsx)
          </Button>
        </div>
      </div>

      {/* Grid of Worksheets & Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Template Structure */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-semibold text-base text-slate-900 dark:text-slate-100">
              Worksheet Structure Supported
            </h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            The application natively syncs with multi-sheet workbooks such as <code>Job Tracker Template.xlsx</code>:
          </p>

          <div className="space-y-2.5 pt-1 text-xs">
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-start gap-3">
              <Table className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Tracker Sheet
                </span>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Stores main recruitment rows: No, Company, Program, Type, Referral, Date, Progress stage, and Reason.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-start gap-3">
              <Table className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Weekly Summary & Dashboard
                </span>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Weekly apply counts, daily filters, and recruitment status aggregates.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-start gap-3">
              <Table className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Monthly Summary & On-Process Tracker
                </span>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Tracks longest recruitment cycle days, majority referral sources, and monthly progress trends.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow & Column Mapping */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <FileCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-semibold text-base text-slate-900 dark:text-slate-100">
              Smart Column Auto-Detection
            </h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            When you upload any spreadsheet, the engine automatically matches headers:
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
              <span className="font-medium text-slate-700 dark:text-slate-300">Company / Employer</span>
              <span className="text-slate-400">Maps to <code>company</code></span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
              <span className="font-medium text-slate-700 dark:text-slate-300">Program / Job Title</span>
              <span className="text-slate-400">Maps to <code>position</code></span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
              <span className="font-medium text-slate-700 dark:text-slate-300">Date / Tanggal</span>
              <span className="text-slate-400">Parsed to ISO date</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
              <span className="font-medium text-slate-700 dark:text-slate-300">Progress / Status</span>
              <span className="text-slate-400">Maps to 7 pipeline stages</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
              <span className="font-medium text-slate-700 dark:text-slate-300">Reason / Notes</span>
              <span className="text-slate-400">Maps to <code>notes</code></span>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-500">
            {activeTemplateBuffer ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Base template is loaded and ready for export
              </span>
            ) : (
              <span className="text-slate-400">No template loaded yet.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

