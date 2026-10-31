"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppTopBar } from "@/components/layout/AppTopBar";
import { KanbanToolbar } from "@/components/kanban/KanbanToolbar";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { ApplicationTable } from "@/components/applications/ApplicationTable";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { StatisticsView } from "@/components/dashboard/StatisticsView";
import { InterviewListView } from "@/components/interviews/InterviewListView";
import { ExcelSyncView } from "@/components/excel/ExcelSyncView";
import { SettingsView } from "@/components/settings/SettingsView";
import { ApplicationFormModal } from "@/components/applications/ApplicationFormModal";
import { ApplicationDetailModal } from "@/components/applications/ApplicationDetailModal";
import { InterviewManagerModal } from "@/components/interviews/InterviewManagerModal";
import { ExcelImportModal } from "@/components/excel/ExcelImportModal";
import { ExcelExportModal } from "@/components/excel/ExcelExportModal";
import { useApplications } from "@/lib/application-context";
import { JobApplication } from "@/types/application";
import { X } from "lucide-react";

export default function HomePage() {
  const {
    activeTab,
    setActiveTab,
    viewMode,
    sidebarCollapsed,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isImportModalOpen,
    setIsImportModalOpen,
    isExportModalOpen,
    setIsExportModalOpen,
    selectedApplication,
    setSelectedApplication,
  } = useApplications();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [interviewTargetApp, setInterviewTargetApp] = useState<JobApplication | null>(null);

  const handleEditApplication = (app: JobApplication) => {
    setEditingApplication(app);
    setIsCreateModalOpen(true);
  };

  const handleScheduleInterview = (app?: JobApplication) => {
    setInterviewTargetApp(app || null);
    setIsInterviewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden md:block">
        <AppSidebar />
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-72 bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <AppSidebar fixed={false} />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "md:pl-16" : "md:pl-60"
        }`}
      >
        <AppTopBar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 flex flex-col min-w-0">
          {activeTab === "board" && (
            <div className="flex-1 flex flex-col min-w-0">
              <KanbanToolbar />
              {viewMode === "pipeline" ? (
                <KanbanBoard />
              ) : (
                <div className="p-4 sm:p-6 max-w-7xl w-full mx-auto">
                  <ApplicationTable
                    onEdit={handleEditApplication}
                    onScheduleInterview={handleScheduleInterview}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === "dashboard" && (
            <div className="p-4 sm:p-6 max-w-7xl w-full mx-auto">
              <DashboardOverview />
            </div>
          )}

          {activeTab === "statistics" && <StatisticsView />}

          {activeTab === "interviews" && (
            <div className="p-4 sm:p-6 max-w-7xl w-full mx-auto">
              <InterviewListView onScheduleInterview={handleScheduleInterview} />
            </div>
          )}

          {activeTab === "excel" && (
            <div className="p-4 sm:p-6 max-w-7xl w-full mx-auto">
              <ExcelSyncView />
            </div>
          )}

          {activeTab === "settings" && <SettingsView />}
        </main>
      </div>

      {/* Modals */}
      <ApplicationFormModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingApplication(null);
        }}
        applicationToEdit={editingApplication}
      />

      <ApplicationDetailModal
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
        onEdit={handleEditApplication}
        onAddInterview={(app) => handleScheduleInterview(app)}
      />

      <InterviewManagerModal
        isOpen={isInterviewModalOpen}
        onClose={() => {
          setIsInterviewModalOpen(false);
          setInterviewTargetApp(null);
        }}
        application={interviewTargetApp}
      />

      <ExcelImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      <ExcelExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
