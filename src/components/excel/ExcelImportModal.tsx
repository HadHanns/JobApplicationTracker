"use client";

import React, { useState, useRef } from "react";
import {
  FileSpreadsheet,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  Database,
  Sparkles,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Input";
import { useApplications } from "@/lib/application-context";
import { parseExcelTemplate } from "@/lib/excel/import-template";
import { ExcelImportResult, ColumnMappingConfig } from "@/types/application";
import { Badge } from "@/components/ui/Badge";

interface ExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExcelImportModal: React.FC<ExcelImportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { importApplications, setActiveTemplateBuffer } = useApplications();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [importResult, setImportResult] = useState<ExcelImportResult | null>(null);
  const [selectedSheet, setSelectedSheet] = useState<string>("");
  const [importMode, setImportMode] = useState<"append" | "replace">("append");
  const [mappingOverrides, setMappingOverrides] = useState<Partial<ColumnMappingConfig>>({});

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".xlsx")) {
      setError("Please select a valid .xlsx Excel workbook file.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setFileName(file.name);
      const buffer = await file.arrayBuffer();
      setFileBuffer(buffer);
      setActiveTemplateBuffer(buffer);

      const parsed = await parseExcelTemplate(buffer);
      setImportResult(parsed);
      setSelectedSheet(parsed.selectedSheet);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to parse Excel workbook.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadBundledTemplate = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setFileName("Job Tracker Template.xlsx");
      const res = await fetch("/templates/Job Tracker Template.xlsx");
      if (!res.ok) {
        throw new Error("Could not find bundled template file.");
      }
      const buffer = await res.arrayBuffer();
      setFileBuffer(buffer);
      setActiveTemplateBuffer(buffer);

      const parsed = await parseExcelTemplate(buffer, "Tracker");
      setImportResult(parsed);
      setSelectedSheet(parsed.selectedSheet);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to load bundled template.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSheetChange = async (newSheet: string) => {
    if (!fileBuffer) return;
    try {
      setIsLoading(true);
      setSelectedSheet(newSheet);
      const parsed = await parseExcelTemplate(fileBuffer, newSheet, mappingOverrides);
      setImportResult(parsed);
    } catch (err: any) {
      setError(err?.message || "Failed to read worksheet.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyMappingChange = async (key: keyof ColumnMappingConfig, colLetter: string) => {
    if (!fileBuffer) return;
    const updated = { ...mappingOverrides, [key]: colLetter };
    setMappingOverrides(updated);
    try {
      setIsLoading(true);
      const parsed = await parseExcelTemplate(fileBuffer, selectedSheet, updated);
      setImportResult(parsed);
    } catch (err: any) {
      setError(err?.message || "Mapping update error.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmImport = () => {
    if (!importResult || importResult.applications.length === 0) {
      setError("No valid applications to import.");
      return;
    }
    importApplications(importResult.applications, importMode);
    onClose();
  };

  const resetState = () => {
    setFileBuffer(null);
    setFileName("");
    setImportResult(null);
    setError(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetState();
        onClose();
      }}
      title="Import Applications from Excel (.xlsx)"
      description="Upload an existing job tracker spreadsheet or load the default template with automatic column mapping."
      maxWidth="2xl"
    >
      <div className="space-y-5 pt-1">
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}

        {!importResult ? (
          <div className="space-y-4">
            {/* Upload Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-slate-50/60 dark:bg-slate-800/30 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                Click to choose .xlsx file, or drag & drop here
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Supports Excel workbooks with columns for Company, Role, Status, Date, and Notes.
              </p>
            </div>

            {/* Quick Bundled Template Loader */}
            <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-600 text-white shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                    Use Bundled Job Tracker Template
                  </h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Pre-loaded multi-sheet template with sample applications and summary metrics.
                  </p>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={handleLoadBundledTemplate}
                disabled={isLoading}
              >
                {isLoading ? "Reading..." : "Load Template"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* File info & sheet selector */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate max-w-xs">
                    {fileName}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Found {importResult.validCount} valid application records
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Worksheet:</span>
                <select
                  value={selectedSheet}
                  onChange={(e) => handleSheetChange(e.target.value)}
                  className="px-2.5 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
                >
                  {importResult.sheetNames.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Column Mapping Review */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Spreadsheet Column Mapping</span>
                <span className="text-[11px] text-slate-400 font-normal">
                  Auto-detected from sheet headers
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Company</span>
                  <select
                    value={importResult.detectedMapping.companyCol || ""}
                    onChange={(e) => handleApplyMappingChange("companyCol", e.target.value)}
                    className="w-full text-xs p-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    {importResult.headers.map((h) => (
                      <option key={h.col} value={h.col}>
                        Col {h.col}: {h.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Position / Role</span>
                  <select
                    value={importResult.detectedMapping.positionCol || ""}
                    onChange={(e) => handleApplyMappingChange("positionCol", e.target.value)}
                    className="w-full text-xs p-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    {importResult.headers.map((h) => (
                      <option key={h.col} value={h.col}>
                        Col {h.col}: {h.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Status / Stage</span>
                  <select
                    value={importResult.detectedMapping.statusCol || ""}
                    onChange={(e) => handleApplyMappingChange("statusCol", e.target.value)}
                    className="w-full text-xs p-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    {importResult.headers.map((h) => (
                      <option key={h.col} value={h.col}>
                        Col {h.col}: {h.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Date</span>
                  <select
                    value={importResult.detectedMapping.dateCol || ""}
                    onChange={(e) => handleApplyMappingChange("dateCol", e.target.value)}
                    className="w-full text-xs p-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    {importResult.headers.map((h) => (
                      <option key={h.col} value={h.col}>
                        Col {h.col}: {h.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Preview of Parsed Rows */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Preview of Applications ({importResult.applications.length} items):
              </span>
              <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {importResult.applications.slice(0, 8).map((app, i) => (
                  <div key={i} className="p-2.5 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {app.company}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 ml-2">
                        {app.position}
                      </span>
                    </div>
                    <Badge variant="status" status={app.status} size="sm">
                      {app.detailedProgress || app.status}
                    </Badge>
                  </div>
                ))}
                {importResult.applications.length > 8 && (
                  <div className="p-2 text-center text-slate-400 text-[11px] bg-slate-50/50 dark:bg-slate-850">
                    + {importResult.applications.length - 8} more applications
                  </div>
                )}
              </div>
            </div>

            {/* Mode selection: Append vs Replace */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Import Destination Mode:
              </span>
              <div className="flex items-center gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="importMode"
                    value="append"
                    checked={importMode === "append"}
                    onChange={() => setImportMode("append")}
                    className="text-indigo-600"
                  />
                  <span>Append & merge (keep existing applications)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="importMode"
                    value="replace"
                    checked={importMode === "replace"}
                    onChange={() => setImportMode("replace")}
                    className="text-indigo-600"
                  />
                  <span>Replace all current records</span>
                </label>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button variant="ghost" size="sm" onClick={resetState}>
                Upload Another File
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleConfirmImport}>
                  Confirm & Import ({importResult.validCount})
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

