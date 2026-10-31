"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  JobApplication,
  ApplicationStatus,
  InterviewSession,
  ViewMode,
} from "@/types/application";
import { INITIAL_APPLICATIONS } from "./initial-data";

const STORAGE_PREFIX = "offerly_data_";
const WORKSPACE_KEY = "offerly_workspace_title";
const THEME_KEY = "offerly_theme";

export type NavTab =
  | "board"
  | "dashboard"
  | "statistics"
  | "interviews"
  | "excel"
  | "settings";

interface ApplicationContextType {
  applications: JobApplication[];
  filteredApplications: JobApplication[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  jobTypeFilter: string;
  setJobTypeFilter: (type: string) => void;
  referralFilter: string;
  setReferralFilter: (source: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  workspaceTitle: string;
  setWorkspaceTitle: (title: string) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  dailyGoal: { current: number; target: number };
  setDailyGoal: (goal: { current: number; target: number }) => void;
  selectedApplication: JobApplication | null;
  setSelectedApplication: (app: JobApplication | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  createModalDefaultStatus: ApplicationStatus;
  setCreateModalDefaultStatus: (status: ApplicationStatus) => void;
  isImportModalOpen: boolean;
  setIsImportModalOpen: (open: boolean) => void;
  isExportModalOpen: boolean;
  setIsExportModalOpen: (open: boolean) => void;
  activeTemplateBuffer: ArrayBuffer | null;
  setActiveTemplateBuffer: (buf: ArrayBuffer | null) => void;
  isLoadingData: boolean;
  addApplication: (app: Omit<JobApplication, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateApplication: (id: string, updates: Partial<JobApplication>) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  moveApplicationStatus: (id: string, newStatus: ApplicationStatus) => Promise<void>;
  addInterview: (appId: string, interview: Omit<InterviewSession, "id">) => Promise<void>;
  updateInterview: (appId: string, interviewId: string, interview: Partial<InterviewSession>) => Promise<void>;
  deleteInterview: (appId: string, interviewId: string) => Promise<void>;
  importApplications: (apps: JobApplication[], mode: "append" | "replace") => Promise<void>;
  resetToInitialData: () => Promise<void>;
  clearAllApplications: () => Promise<void>;
  stats: {
    total: number;
    wishlist: number;
    applied: number;
    assessment: number;
    interview: number;
    offer: number;
    rejected: number;
    withdrawn: number;
    upcomingInterviewsCount: number;
    followUpsPendingCount: number;
  };
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status: authStatus } = useSession();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>("board");
  const [workspaceTitle, setWorkspaceTitleState] = useState("Job Hunt 2026");
  const [theme, setThemeState] = useState<"light" | "dark">("light");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dailyGoal, setDailyGoalState] = useState({ current: 12, target: 24 });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [referralFilter, setReferralFilter] = useState("all");
  const [sortBy, setSortBy] = useState("jobCreation");
  const [viewMode, setViewMode] = useState<ViewMode>("pipeline");

  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalDefaultStatus, setCreateModalDefaultStatus] = useState<ApplicationStatus>("Applied");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [activeTemplateBuffer, setActiveTemplateBuffer] = useState<ArrayBuffer | null>(null);

  // Storage key per user for isolation
  const userStorageKey = session?.user?.id
    ? `${STORAGE_PREFIX}${session.user.id}`
    : `${STORAGE_PREFIX}guest`;
  const initKey = session?.user?.id
    ? `${STORAGE_PREFIX}init_${session.user.id}`
    : `${STORAGE_PREFIX}init_guest`;

  // Fetch data from database when user is authenticated
  const loadUserData = useCallback(async () => {
    if (authStatus !== "authenticated" || !session?.user?.id) return;
    setIsLoadingData(true);
    try {
      // 1. Fetch applications
      const appRes = await fetch("/api/applications");
      if (appRes.ok) {
        const json = (await appRes.json()) as any;
        if (Array.isArray(json.data)) {
          if (json.data.length > 0) {
            setApplications(json.data);
          } else {
            // Database has 0 applications - check if user has been initialized before
            const settingsRes = await fetch("/api/user/settings");
            if (settingsRes.ok) {
              const settingsJson = (await settingsRes.json()) as any;
              const hasInitialized = settingsJson.data?.hasInitialized === true;

              if (hasInitialized) {
                // User has intentionally cleared their pipeline before, keep clean
                setApplications([]);
              } else {
                // Brand new user on very first visit: populate initial sample data
                await fetch("/api/applications/batch", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ applications: INITIAL_APPLICATIONS, mode: "replace" }),
                });
                // Mark user as initialized in database
                await fetch("/api/user/settings", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ hasInitialized: true }),
                });
                setApplications(INITIAL_APPLICATIONS);
              }
            }
          }
        }
      }

      // 2. Fetch user settings
      const settingsRes = await fetch("/api/user/settings");
      if (settingsRes.ok) {
        const settingsJson = (await settingsRes.json()) as any;
        if (settingsJson.data) {
          if (settingsJson.data.workspaceTitle) {
            setWorkspaceTitleState(settingsJson.data.workspaceTitle);
          }
          if (settingsJson.data.dailyGoalTarget) {
            setDailyGoalState({
              current: settingsJson.data.dailyGoalCurrent || 0,
              target: settingsJson.data.dailyGoalTarget,
            });
          }
        }
      }
    } catch (err) {
      console.warn("Error fetching user data from API:", err);
      // Fallback to local cache
      const stored = localStorage.getItem(userStorageKey);
      if (stored) {
        try {
          setApplications(JSON.parse(stored));
        } catch {
          setApplications(INITIAL_APPLICATIONS);
        }
      }
    } finally {
      setIsLoadingData(false);
      setIsHydrated(true);
    }
  }, [authStatus, session?.user?.id, userStorageKey, initKey]);

  // Load on auth state change
  useEffect(() => {
    if (authStatus === "authenticated") {
      loadUserData();
    } else if (authStatus === "unauthenticated") {
      // Load offline cache
      const stored = localStorage.getItem(userStorageKey);
      if (stored) {
        try {
          setApplications(JSON.parse(stored));
        } catch {
          setApplications(INITIAL_APPLICATIONS);
        }
      } else {
        setApplications(INITIAL_APPLICATIONS);
      }
      setIsHydrated(true);
    }
  }, [authStatus, loadUserData, userStorageKey]);

  // Load theme & workspace title from local storage on mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
      if (storedTheme) {
        setThemeState(storedTheme);
        if (storedTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }

      const storedTitle = localStorage.getItem(WORKSPACE_KEY);
      if (storedTitle) setWorkspaceTitleState(storedTitle);
    } catch (e) {
      console.warn("Storage init error", e);
    }
  }, []);

  // Pre-load bundled template into activeTemplateBuffer if available
  useEffect(() => {
    fetch("/templates/Job Tracker Template.xlsx")
      .then((res) => {
        if (res.ok) return res.arrayBuffer();
        return null;
      })
      .then((buffer) => {
        if (buffer) {
          setActiveTemplateBuffer(buffer);
        }
      })
      .catch((err) => {
        console.warn("Bundled template load error:", err);
      });
  }, []);

  // Sync cache with applications state
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(userStorageKey, JSON.stringify(applications));
    } catch (e) {
      console.warn("Storage write error", e);
    }
  }, [applications, isHydrated, userStorageKey]);

  const setWorkspaceTitle = async (title: string) => {
    setWorkspaceTitleState(title);
    try {
      localStorage.setItem(WORKSPACE_KEY, title);
      if (authStatus === "authenticated") {
        await fetch("/api/user/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workspaceTitle: title }),
        });
      }
    } catch (e) {
      console.warn("Failed to persist workspace title:", e);
    }
  };

  const setDailyGoal = async (goal: { current: number; target: number }) => {
    setDailyGoalState(goal);
    try {
      if (authStatus === "authenticated") {
        await fetch("/api/user/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dailyGoalCurrent: goal.current,
            dailyGoalTarget: goal.target,
          }),
        });
      }
    } catch (e) {
      console.warn("Failed to persist daily goal:", e);
    }
  };

  const setTheme = (t: "light" | "dark") => {
    setThemeState(t);
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch (e) {
      console.warn(e);
    }
    if (t === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const addApplication = async (
    data: Omit<JobApplication, "id" | "createdAt" | "updatedAt">
  ) => {
    const tempId = `temp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();
    const newApp: JobApplication = {
      ...data,
      id: tempId,
      createdAt: now,
      updatedAt: now,
    };

    // Optimistic update
    setApplications((prev) => [newApp, ...prev]);

    if (authStatus === "authenticated") {
      try {
        const res = await fetch("/api/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const errorData = (await res.json().catch(() => ({ error: "Unknown error" }))) as { error: string };
          console.error("Failed to create application:", errorData);
          // Revert optimistic update on error
          setApplications((prev) => prev.filter((app) => app.id !== tempId));
          throw new Error(errorData.error || "Failed to save application");
        }
        const json = (await res.json()) as any;
        if (json.data?.id) {
          // Replace tempId with actual DB ID
          setApplications((prev) =>
            prev.map((app) => (app.id === tempId ? json.data : app))
          );
        }
      } catch (err) {
        console.error("Failed to sync new application to server:", err);
        // Revert optimistic update on error
        setApplications((prev) => prev.filter((app) => app.id !== tempId));
        throw err;
      }
    }
  };

  const updateApplication = async (id: string, updates: Partial<JobApplication>) => {
    // Optimistic update
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : app
      )
    );
    if (selectedApplication && selectedApplication.id === id) {
      setSelectedApplication((prev) => (prev ? { ...prev, ...updates } : null));
    }

    if (authStatus === "authenticated") {
      try {
        await fetch(`/api/applications/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
      } catch (err) {
        console.error("Failed to update application on server:", err);
      }
    }
  };

  const moveApplicationStatus = async (id: string, newStatus: ApplicationStatus) => {
    // Optimistic update
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: newStatus,
              detailedProgress: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : app
      )
    );

    if (authStatus === "authenticated") {
      try {
        await fetch(`/api/applications/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: newStatus,
            detailedProgress: newStatus,
          }),
        });
      } catch (err) {
        console.error("Failed to update status on server:", err);
      }
    }
  };

  const deleteApplication = async (id: string) => {
    // Optimistic update
    setApplications((prev) => prev.filter((app) => app.id !== id));
    if (selectedApplication && selectedApplication.id === id) {
      setSelectedApplication(null);
    }

    if (authStatus === "authenticated") {
      try {
        await fetch(`/api/applications/${id}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error("Failed to delete application on server:", err);
      }
    }
  };

  const addInterview = async (
    appId: string,
    interviewData: Omit<InterviewSession, "id">
  ) => {
    const tempIntvId = `temp_${Date.now()}`;
    const newIntv: InterviewSession = {
      ...interviewData,
      id: tempIntvId,
    };

    // Optimistic update
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        const currentInterviews = app.interviews || [];
        return {
          ...app,
          status: "Interview",
          detailedProgress: interviewData.stage || app.detailedProgress || "Interview",
          interviews: [...currentInterviews, newIntv],
          updatedAt: new Date().toISOString(),
        };
      })
    );

    if (authStatus === "authenticated") {
      try {
        const res = await fetch(`/api/applications/${appId}/interviews`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(interviewData),
        });
        if (res.ok) {
          const json = (await res.json()) as any;
          if (json.data?.id) {
            setApplications((prev) =>
              prev.map((app) => {
                if (app.id !== appId) return app;
                return {
                  ...app,
                  interviews: (app.interviews || []).map((i) =>
                    i.id === tempIntvId ? json.data : i
                  ),
                };
              })
            );
          }
        }
      } catch (err) {
        console.error("Failed to save interview on server:", err);
      }
    }
  };

  const updateInterview = async (
    appId: string,
    interviewId: string,
    updates: Partial<InterviewSession>
  ) => {
    // Optimistic update
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        const currentInterviews = app.interviews || [];
        return {
          ...app,
          interviews: currentInterviews.map((intv) =>
            intv.id === interviewId ? { ...intv, ...updates } : intv
          ),
          updatedAt: new Date().toISOString(),
        };
      })
    );

    if (authStatus === "authenticated") {
      try {
        await fetch(`/api/interviews/${interviewId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
      } catch (err) {
        console.error("Failed to update interview on server:", err);
      }
    }
  };

  const deleteInterview = async (appId: string, interviewId: string) => {
    // Optimistic update
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        return {
          ...app,
          interviews: (app.interviews || []).filter((i) => i.id !== interviewId),
          updatedAt: new Date().toISOString(),
        };
      })
    );

    if (authStatus === "authenticated") {
      try {
        await fetch(`/api/interviews/${interviewId}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error("Failed to delete interview on server:", err);
      }
    }
  };

  const importApplications = async (
    newApps: JobApplication[],
    mode: "append" | "replace"
  ) => {
    if (mode === "replace") {
      setApplications(newApps);
    } else {
      setApplications((prev) => {
        const existingKeys = new Set(
          prev.map((a) => `${a.company.toLowerCase()}|${a.position.toLowerCase()}`)
        );
        const filteredNew = newApps.filter(
          (a) => !existingKeys.has(`${a.company.toLowerCase()}|${a.position.toLowerCase()}`)
        );
        return [...prev, ...filteredNew];
      });
    }

    if (authStatus === "authenticated") {
      try {
        const res = await fetch("/api/applications/batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ applications: newApps, mode }),
        });
        if (res.ok) {
          const json = (await res.json()) as any;
          if (Array.isArray(json.data)) {
            setApplications(json.data);
          }
        }
      } catch (err) {
        console.error("Failed to sync imported applications to server:", err);
      }
    }
  };

  const resetToInitialData = async () => {
    setApplications(INITIAL_APPLICATIONS);
    try {
      localStorage.setItem(initKey, "true");
      localStorage.setItem(userStorageKey, JSON.stringify(INITIAL_APPLICATIONS));
      if (authStatus === "authenticated") {
        await fetch("/api/applications/batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ applications: INITIAL_APPLICATIONS, mode: "replace" }),
        });
      }
    } catch (e) {
      console.warn("Storage reset error", e);
    }
  };

  const clearAllApplications = async () => {
    setApplications([]);
    setSelectedApplication(null);
    try {
      localStorage.setItem(initKey, "true");
      localStorage.setItem(userStorageKey, JSON.stringify([]));
      if (authStatus === "authenticated") {
        await fetch("/api/applications", {
          method: "DELETE",
        });
      }
    } catch (e) {
      console.warn("Storage clear error", e);
    }
  };

  // Filter & Search & Sort
  const filteredApplications = applications
    .filter((app) => {
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchesCompany = (app.company || "").toLowerCase().includes(q);
        const matchesPosition = (app.position || "").toLowerCase().includes(q);
        const matchesLocation = (app.location || "").toLowerCase().includes(q);
        const matchesNotes = (app.notes || "").toLowerCase().includes(q);
        if (!matchesCompany && !matchesPosition && !matchesLocation && !matchesNotes) {
          return false;
        }
      }
      if (statusFilter !== "all" && app.status !== statusFilter) {
        return false;
      }
      if (jobTypeFilter !== "all" && app.jobType !== jobTypeFilter) {
        return false;
      }
      if (referralFilter !== "all" && app.referralSource !== referralFilter) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "jobCreation" || sortBy === "appliedDate_desc") {
        return (b.appliedDate || "").localeCompare(a.appliedDate || "");
      }
      if (sortBy === "appliedDate_asc") {
        return (a.appliedDate || "").localeCompare(b.appliedDate || "");
      }
      if (sortBy === "company") {
        return (a.company || "").localeCompare(b.company || "");
      }
      if (sortBy === "status") {
        return (a.status || "").localeCompare(b.status || "");
      }
      if (sortBy === "followUp") {
        return (a.followUpDate || "9999").localeCompare(b.followUpDate || "9999");
      }
      return 0;
    });

  const stats = {
    total: applications.length,
    wishlist: applications.filter((a) => a.status === "Wishlist").length,
    applied: applications.filter((a) => a.status === "Applied").length,
    assessment: applications.filter((a) => a.status === "Assessment").length,
    interview: applications.filter((a) => a.status === "Interview").length,
    offer: applications.filter((a) => a.status === "Offer").length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
    withdrawn: applications.filter((a) => a.status === "Withdrawn").length,
    upcomingInterviewsCount: applications.reduce((acc, app) => {
      const active = (app.interviews || []).filter((i) => !i.completed).length;
      return acc + active;
    }, 0),
    followUpsPendingCount: applications.filter(
      (a) => a.followUpDate && a.status !== "Offer" && a.status !== "Rejected"
    ).length,
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        filteredApplications,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        jobTypeFilter,
        setJobTypeFilter,
        referralFilter,
        setReferralFilter,
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        activeTab,
        setActiveTab,
        workspaceTitle,
        setWorkspaceTitle,
        theme,
        setTheme,
        toggleTheme,
        sidebarCollapsed,
        setSidebarCollapsed,
        dailyGoal,
        setDailyGoal,
        selectedApplication,
        setSelectedApplication,
        isCreateModalOpen,
        setIsCreateModalOpen,
        createModalDefaultStatus,
        setCreateModalDefaultStatus,
        isImportModalOpen,
        setIsImportModalOpen,
        isExportModalOpen,
        setIsExportModalOpen,
        activeTemplateBuffer,
        setActiveTemplateBuffer,
        isLoadingData,
        addApplication,
        updateApplication,
        deleteApplication,
        moveApplicationStatus,
        addInterview,
        updateInterview,
        deleteInterview,
        importApplications,
        resetToInitialData,
        clearAllApplications,
        stats,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useApplications must be used within an ApplicationProvider");
  }
  return context;
}
