"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Star,
  ArrowRight,
  ClipboardList,
  Briefcase,
  Gift,
  XCircle,
  Settings,
  GripVertical,
  Plus,
  MapPin,
  Calendar,
  ExternalLink,
  Clock,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import { useApplications } from "@/lib/application-context";
import { JobApplication, ApplicationStatus } from "@/types/application";
import { formatDate, formatRelativeDays } from "@/lib/utils";

interface ColumnDef {
  status: ApplicationStatus;
  title: string;
  icon: React.ReactNode;
  headerBg: string;
  headerText: string;
  isLightHeader?: boolean;
}

const COLUMNS: ColumnDef[] = [
  {
    status: "Wishlist",
    title: "WISHLIST",
    icon: <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />,
    headerBg: "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800",
    headerText: "text-emerald-800 dark:text-emerald-300",
    isLightHeader: true,
  },
  {
    status: "Applied",
    title: "APPLIED",
    icon: <ArrowRight className="w-3.5 h-3.5" />,
    headerBg: "bg-purple-600 text-white shadow-xs",
    headerText: "text-white",
  },
  {
    status: "Assessment",
    title: "ASSESSMENT",
    icon: <ClipboardList className="w-3.5 h-3.5" />,
    headerBg: "bg-amber-500 text-white shadow-xs",
    headerText: "text-white",
  },
  {
    status: "Interview",
    title: "INTERVIEWING",
    icon: <Briefcase className="w-3.5 h-3.5" />,
    headerBg: "bg-blue-600 text-white shadow-xs",
    headerText: "text-white",
  },
  {
    status: "Offer",
    title: "OFFER",
    icon: <Gift className="w-3.5 h-3.5" />,
    headerBg: "bg-teal-600 text-white shadow-xs",
    headerText: "text-white",
  },
  {
    status: "Rejected",
    title: "REJECTED",
    icon: <XCircle className="w-3.5 h-3.5" />,
    headerBg: "bg-rose-500 text-white shadow-xs",
    headerText: "text-white",
  },
];

export const KanbanBoard: React.FC = () => {
  const {
    filteredApplications,
    moveApplicationStatus,
    setSelectedApplication,
    setIsCreateModalOpen,
    setCreateModalDefaultStatus,
    sidebarCollapsed,
    isLoadingData,
  } = useApplications();

  const [draggedAppId, setDraggedAppId] = useState<string | null>(null);
  const [activeDropColumn, setActiveDropColumn] = useState<ApplicationStatus | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll during drag (both directions with sidebar offset)
  useEffect(() => {
    const handleDragOverGlobal = (e: DragEvent) => {
      if (!draggedAppId || !scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollThreshold = 150; // pixels from edge (increased to avoid Mac Mission Control)
      const scrollSpeed = 12; // pixels per interval

      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;

      // Calculate sidebar width based on collapsed state
      const sidebarWidth = sidebarCollapsed ? 64 : 240; // w-16 = 64px, w-60 = 240px
      const safeLeftThreshold = rect.left + sidebarWidth + scrollThreshold;

      // Auto-scroll to the right (when dragging to last columns)
      // Added window.innerWidth check to avoid triggering Mac Mission Control
      const windowRightEdge = window.innerWidth;
      const safeRightThreshold = Math.min(rect.right - scrollThreshold, windowRightEdge - 200);

      if (e.clientX > safeRightThreshold && scrollLeft < scrollWidth - clientWidth) {
        if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = setInterval(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += scrollSpeed;
          }
        }, 16);
      }
      // Auto-scroll to the left (with sidebar offset to avoid navbar)
      else if (e.clientX < safeLeftThreshold && scrollLeft > 0) {
        if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = setInterval(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= scrollSpeed;
          }
        }, 16);
      }
      // Clear interval if not near edges
      else {
        if (scrollIntervalRef.current) {
          clearInterval(scrollIntervalRef.current);
          scrollIntervalRef.current = null;
        }
      }
    };

    const handleDragEndGlobal = () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    };

    if (draggedAppId) {
      document.addEventListener('dragover', handleDragOverGlobal);
      document.addEventListener('dragend', handleDragEndGlobal);
    }

    return () => {
      document.removeEventListener('dragover', handleDragOverGlobal);
      document.removeEventListener('dragend', handleDragEndGlobal);
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [draggedAppId, sidebarCollapsed]);

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
    setDraggedAppId(id);
  };

  const handleDragEnd = () => {
    setDraggedAppId(null);
    setActiveDropColumn(null);
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const handleDragOver = (e: React.DragEvent, status: ApplicationStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (activeDropColumn !== status) {
      setActiveDropColumn(status);
    }
  };

  const handleDragLeave = () => {
    // leave column
  };

  const handleDrop = (e: React.DragEvent, status: ApplicationStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") || draggedAppId;
    if (id) {
      moveApplicationStatus(id, status);
    }
    setDraggedAppId(null);
    setActiveDropColumn(null);
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const handleQuickAdd = (status: ApplicationStatus) => {
    setCreateModalDefaultStatus(status);
    setIsCreateModalOpen(true);
  };

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 w-full bg-dots p-4 sm:p-6 overflow-x-auto min-h-[calc(100vh-120px)]"
    >
      {isLoadingData ? (
        <div className="flex items-center justify-center h-full min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Loading your applications...</p>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-4 sm:gap-5 pb-8 min-w-max">
          {COLUMNS.map((col) => {
            const columnApps = filteredApplications.filter((a) => a.status === col.status);
            const isDropActive = activeDropColumn === col.status;

            return (
              <div
                key={col.status}
                onDragOver={(e) => handleDragOver(e, col.status)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, col.status)}
                className={`w-[290px] sm:w-[320px] shrink-0 flex flex-col max-h-[calc(100vh-140px)] rounded-2xl transition-all duration-200 ${
                  isDropActive
                    ? "ring-2 ring-purple-500/80 bg-purple-50/30 dark:bg-purple-950/20"
                    : ""
                }`}
              >
                {/* Column Header (Exact match to reference image) */}
                <div
                  className={`px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center justify-between shadow-2xs select-none shrink-0 ${col.headerBg} ${col.headerText}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="shrink-0">{col.icon}</span>
                    <span>
                      {col.title} ({columnApps.length} {columnApps.length === 1 ? "JOB" : "JOBS"})
                    </span>
                  </div>

                  <div className="flex items-center gap-1 opacity-80 hover:opacity-100">
                    <button
                      onClick={() => handleQuickAdd(col.status)}
                      className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                      title={`Add job to ${col.title}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                      title="Column options"
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                    <span className="p-0.5 opacity-60 cursor-grab">
                      <GripVertical className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Cards List Area */}
                <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1">
                  {columnApps.length === 0 ? (
                    <div className="py-12 px-4 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-xs text-slate-400 space-y-2">
                      <p>No applications yet</p>
                      <button
                        onClick={() => handleQuickAdd(col.status)}
                        className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                      >
                        + Add a job
                      </button>
                    </div>
                  ) : (
                    columnApps.map((app) => {
                      const isDragging = draggedAppId === app.id;

                      return (
                        <div
                          key={app.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, app.id)}
                          onDragEnd={handleDragEnd}
                          onClick={() => setSelectedApplication(app)}
                          className={`group p-4 rounded-xl border bg-white dark:bg-slate-800/95 transition-all duration-150 cursor-grab active:cursor-grabbing select-none ${
                            isDragging
                              ? "opacity-50 rotate-2 scale-95 shadow-xl border-purple-500"
                              : "border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600"
                          }`}
                        >
                          {/* Company Name */}
                          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide">
                            {app.company}
                          </div>

                          {/* Position Title */}
                          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {app.position}
                          </h4>

                          {/* Location & Date Row */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 dark:text-slate-400 mt-2.5">
                            {app.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                                <span className="truncate max-w-[140px]">{app.location}</span>
                              </div>
                            )}

                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                              <span>{formatDate(app.appliedDate)}</span>
                            </div>
                          </div>

                          {/* Optional Reference Tag Pill (matches 'INTERVIEWER WAS NICE') */}
                          {app.notes && (
                            <div className="mt-2.5">
                              {app.notes.toUpperCase().includes("INTERVIEW") ? (
                                <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                  {app.notes.length > 25 ? app.notes.slice(0, 25) + "..." : app.notes}
                                </span>
                              ) : app.followUpDate ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                  <Clock className="w-2.5 h-2.5" />
                                  {formatRelativeDays(app.followUpDate)}
                                </span>
                              ) : null}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Bottom '+ Add job' button (Exact match to reference image) */}
                <div className="pt-2 shrink-0">
                  <button
                    onClick={() => handleQuickAdd(col.status)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/90 hover:bg-white text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-600 transition-all shadow-2xs flex items-center justify-center gap-1.5 active:scale-[0.99]"
                  >
                    <Plus className="w-3.5 h-3.5 text-slate-400" />
                    <span>Add job</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

