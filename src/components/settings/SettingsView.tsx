"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  Settings,
  Target,
  FileSpreadsheet,
  Download,
  Upload,
  RotateCcw,
  Trash2,
  CheckCircle2,
  Save,
  ShieldCheck,
  LogOut,
  User,
  Database,
} from "lucide-react";
import { useApplications } from "@/lib/application-context";
import { Button } from "@/components/ui/Button";

export const SettingsView: React.FC = () => {
  const { data: session } = useSession();
  const {
    workspaceTitle,
    setWorkspaceTitle,
    dailyGoal,
    setDailyGoal,
    applications,
    resetToInitialData,
    clearAllApplications,
    importApplications,
    setIsExportModalOpen,
  } = useApplications();

  const [titleInput, setTitleInput] = useState(workspaceTitle);
  const [goalCurrent, setGoalCurrent] = useState(dailyGoal.current);
  const [goalTarget, setGoalTarget] = useState(dailyGoal.target);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  useEffect(() => {
    setTitleInput(workspaceTitle);
  }, [workspaceTitle]);

  useEffect(() => {
    setGoalCurrent(dailyGoal.current);
    setGoalTarget(dailyGoal.target);
  }, [dailyGoal]);

  const handleSaveWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    setWorkspaceTitle(titleInput);
    setDailyGoal({ current: Number(goalCurrent) || 0, target: Number(goalTarget) || 20 });
    setSavedNotice("Preferensi workspace berhasil disimpan dan disinkronkan ke database!");
    setTimeout(() => setSavedNotice(null), 2500);
  };

  const handleBackupExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(applications, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `offerly_backup_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleBackupImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          importApplications(parsed, "replace");
          alert(`Berhasil mengimpor ${parsed.length} lamaran pekerjaan!`);
        }
      } catch {
        alert("File cadangan JSON tidak valid.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-600" />
          Settings & Account
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Kelola profil autentikasi Google, target lamaran harian, dan pencadangan data Anda.
        </p>
      </div>

      {savedNotice && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* User Account Card */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-2xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-600" />
          <span>Google Authentication & Data Privacy</span>
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center gap-3.5">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border border-purple-200 object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-sm">
                <User className="w-6 h-6" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100 flex flex-wrap items-center gap-2">
                <span className="truncate">{session?.user?.name || "Offerly User"}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 shrink-0">
                  Google Verified
                </span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                {session?.user?.email || "Signed in with Google"}
              </div>
              <div className="text-[11px] text-purple-600 dark:text-purple-400 mt-1 flex items-center gap-1 font-medium">
                <Database className="w-3 h-3 shrink-0" />
                <span className="truncate">Data tersimpan privat & terisolasi di database server</span>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
            icon={<LogOut className="w-3.5 h-3.5 text-red-500" />}
          >
            Keluar / Logout
          </Button>
        </div>
      </div>

      {/* Workspace settings form */}
      <form
        onSubmit={handleSaveWorkspace}
        className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-2xs space-y-4"
      >
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-600" />
          <span>General Workspace Preferences</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1 sm:col-span-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Workspace Title
            </label>
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Daily Goal (Current)
            </label>
            <input
              type="number"
              min="0"
              value={goalCurrent}
              onChange={(e) => setGoalCurrent(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Daily Target
            </label>
            <input
              type="number"
              min="1"
              value={goalTarget}
              onChange={(e) => setGoalTarget(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button type="submit" variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
            Simpan Perubahan
          </Button>
        </div>
      </form>

      {/* Backup and Data Management */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-2xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-purple-600" />
          <span>Cadangan & Ekspor Data ExcelJS</span>
        </h3>
        <p className="text-xs text-slate-500">
          Data lamaran Anda terisolasi secara privat. Anda dapat mengekspor atau mencadangkan data ke format Excel (.xlsx) atau JSON kapan saja.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackupExportJSON}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export Cadangan JSON
          </Button>

          <label className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors shadow-2xs cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Restore Cadangan JSON</span>
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleBackupImportJSON}
            />
          </label>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExportModalOpen(true)}
            icon={<FileSpreadsheet className="w-3.5 h-3.5 text-purple-600" />}
          >
            Ekspor ke Excel (.xlsx)
          </Button>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              if (confirm("Reset data lamaran kembali ke contoh data awal?")) {
                await resetToInitialData();
                setSavedNotice("Data lamaran berhasil direset kembali ke contoh template awal!");
                setTimeout(() => setSavedNotice(null), 2500);
              }
            }}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset ke Contoh Template Data
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={async () => {
              if (
                confirm(
                  "Apakah Anda yakin ingin menghapus semua data lamaran Anda? Seluruh data di database SQLite dan memori browser akan dibersihkan secara permanen."
                )
              ) {
                await clearAllApplications();
                setSavedNotice("Seluruh data lamaran berhasil dihapus permanen dari database!");
                setTimeout(() => setSavedNotice(null), 2500);
              }
            }}
            icon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Hapus Semua Data
          </Button>
        </div>
      </div>
    </div>
  );
};
