"use client";

import React, { useState } from "react";
import {
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Upload,
  TableProperties,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useApplications } from "@/lib/application-context";
import {
  exportToCleanWorkbook,
  triggerDownload,
} from "@/lib/excel/export-template";

interface ExcelExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExcelExportModal: React.FC<ExcelExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { applications } = useApplications();
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setError(null);
      setSuccess(false);

      const timestamp = new Date().toISOString().slice(0, 10);
      const cleanWorkbook = await exportToCleanWorkbook(applications);
      triggerDownload(cleanWorkbook, `Job_Applications_${timestamp}.xlsx`);

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 1400);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to generate Excel workbook.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Applications to Excel (.xlsx)"
      description="Download all your application pipeline records into a clean standalone Excel spreadsheet."
      maxWidth="md"
    >
      <div className="space-y-4 pt-1">
        {error && (
          <div className="p-3 text-xs rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3 text-xs rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>Workbook exported and download initiated!</span>
          </div>
        )}

        {/* Clean Standalone Spreadsheet info card */}
        <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-800/60 bg-purple-50/40 dark:bg-purple-950/20 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 shrink-0">
              <TableProperties className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                  Clean Standalone Spreadsheet (.xlsx)
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-bold uppercase">
                  Default Format
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A fresh, modern table containing all application fields, salary, location, job type, referral source, timeline, follow-up dates, notes, and recruitment status.
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex items-center justify-between">
          <span>Total records to export:</span>
          <strong className="text-slate-800 dark:text-slate-200 font-semibold">
            {applications.length} records
          </strong>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleExport}
            disabled={isExporting}
            icon={<Upload className="w-3.5 h-3.5" />}
          >
            {isExporting ? "Generating .xlsx..." : "Download Excel (.xlsx)"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
