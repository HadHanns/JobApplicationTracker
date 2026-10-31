"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  Home,
  Kanban,
  BarChart3,
  Calendar,
  FileSpreadsheet,
  Settings,
  Folder,
  FileText,
  Sparkles,
  ChevronDown,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";
import { useApplications, NavTab } from "@/lib/application-context";

interface AppSidebarProps {
  fixed?: boolean;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ fixed = true }) => {
  const { data: session } = useSession();
  const {
    activeTab,
    setActiveTab,
    theme,
    toggleTheme,
    setTheme,
    sidebarCollapsed,
    setSidebarCollapsed,
    stats,
    setIsExportModalOpen,
  } = useApplications();

  // Force expanded state in mobile mode (when not fixed)
  const isCollapsed = fixed ? sidebarCollapsed : false;

  const [assetsOpen, setAssetsOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const mainNav = [
    { id: "dashboard" as NavTab, label: "Home", icon: Home },
    { id: "board" as NavTab, label: "Board", icon: Kanban, count: stats.total },
    { id: "statistics" as NavTab, label: "Statistics", icon: BarChart3 },
    { id: "excel" as NavTab, label: "Excel Sync", icon: FileSpreadsheet },
    {
      id: "interviews" as NavTab,
      label: "Interviews",
      icon: Calendar,
      count: stats.upcomingInterviewsCount > 0 ? stats.upcomingInterviewsCount : undefined,
    },
    { id: "settings" as NavTab, label: "Settings", icon: Settings },
  ];

  const userName = session?.user?.name || "Offerly User";
  const userEmail = session?.user?.email || "Personal Account";
  const userImage = session?.user?.image;
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <aside
      className={`${
        fixed ? "fixed top-0 left-0 bottom-0 z-40" : "w-full h-full"
      } bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Top Header */}
      <div className="shrink-0">
        {isCollapsed ? (
          <div className="h-16 px-2 flex items-center justify-center border-b border-slate-100 dark:border-slate-800/80">
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="relative p-1.5 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all group flex items-center justify-center cursor-pointer"
              title="Expand sidebar"
            >
              <div className="w-9 h-9 relative">
                <Image
                  src="/Offerly.png"
                  alt="Offerly"
                  width={36}
                  height={36}
                  priority
                  className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <ChevronRight className="w-2.5 h-2.5" />
              </div>
            </button>
          </div>
        ) : (
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 relative shrink-0">
                <Image
                  src="/Offerly.png"
                  alt="Offerly"
                  width={40}
                  height={40}
                  priority
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-slate-50">
                Offerly
              </span>
            </div>

            {fixed && (
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Primary Navigation */}
        <div className={`space-y-1.5 ${isCollapsed ? "p-2" : "p-3"}`}>
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative transition-all duration-150 cursor-pointer ${
                  isCollapsed
                    ? `w-10 h-10 mx-auto flex items-center justify-center rounded-xl ${
                        isActive
                          ? "bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 ring-1 ring-purple-300 dark:ring-purple-800 shadow-xs"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/70"
                      }`
                    : `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive
                          ? "bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 shadow-2xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      }`
                }`}
                title={isCollapsed ? `${item.label}${item.count !== undefined ? ` (${item.count})` : ""}` : undefined}
              >
                <Icon
                  className={`shrink-0 transition-colors ${
                    isCollapsed ? "w-5 h-5" : "w-4.5 h-4.5"
                  } ${
                    isActive
                      ? "text-purple-700 dark:text-purple-300"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                />

                {/* Badge indicator in collapsed mode */}
                {isCollapsed && item.count !== undefined && item.count > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-600 ring-2 ring-white dark:ring-slate-900" />
                )}

                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between text-left">
                    <span>{item.label}</span>
                    {item.count !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Secondary Navigation Section (Expanded only) */}
        {!isCollapsed && (
          <div className="px-3 pt-2 space-y-1 border-t border-slate-100 dark:border-slate-800/60">
            <button
              onClick={() => setAssetsOpen(!assetsOpen)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Folder className="w-3.5 h-3.5 text-slate-400" />
                <span>Assets</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${assetsOpen ? "" : "-rotate-90"}`}
              />
            </button>

            {assetsOpen && (
              <div className="space-y-0.5 pl-2">
                <button
                  onClick={() => setActiveTab("excel")}
                  className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Excel Templates</span>
                </button>
                <div className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-not-allowed select-none opacity-80">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Resumes</span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/50">
                    COMING SOON
                  </span>
                </div>
                <div className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-not-allowed select-none opacity-80">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>AI Cover Letter</span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/50">
                    COMING SOON
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom User & Settings Section */}
      <div className={`border-t border-slate-100 dark:border-slate-800/80 ${isCollapsed ? "p-2 space-y-2.5" : "p-3 space-y-3"}`}>
        {/* User Profile */}
        {!isCollapsed ? (
          <div className="relative">
            <div className="flex items-center justify-between p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center gap-2.5 min-w-0">
                {userImage ? (
                  <Image
                    src={userImage}
                    alt={userName}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover border border-purple-200 shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xs font-bold shrink-0">
                    {initials || <UserIcon className="w-4 h-4" />}
                  </div>
                )}
                <div className="leading-tight min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {userName}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5 text-purple-500 shrink-0" />
                    <span>{userEmail}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Menu Akun"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>

            {/* User Dropdown */}
            {userMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg space-y-1 z-50">
                <button
                  onClick={() => {
                    setActiveTab("settings");
                    setUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Pengaturan Akun</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar / Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {/* User Profile Avatar in Mini Bar */}
            <button
              onClick={() => setActiveTab("settings")}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:ring-2 hover:ring-purple-400 transition-all cursor-pointer overflow-hidden shadow-2xs"
              title={`${userName} (${userEmail}) - Klik untuk Pengaturan`}
            >
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userName}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                  {initials || <UserIcon className="w-4 h-4" />}
                </div>
              )}
            </button>

            {/* Logout Icon Button */}
            <button
              onClick={handleLogout}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
              title="Keluar / Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Theme Toggle Button */}
        {isCollapsed ? (
          <button
            onClick={toggleTheme}
            className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer shadow-2xs"
            title={theme === "dark" ? "Ganti ke Mode Terang (Light Mode)" : "Ganti ke Mode Gelap (Dark Mode)"}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-500 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 text-purple-600 transition-transform hover:-rotate-12" />
            )}
          </button>
        ) : (
          <div className="flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 gap-1">
            <button
              onClick={() => setTheme("light")}
              className={`flex-1 flex items-center justify-center py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                theme === "light"
                  ? "bg-white text-slate-900 shadow-2xs font-semibold"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              title="Light theme"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex-1 flex items-center justify-center py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                theme === "dark"
                  ? "bg-slate-900 text-white shadow-2xs font-semibold"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              title="Dark theme"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Personal Workspace Info Card (Expanded only) */}
        {!isCollapsed && (
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
              <span>Personal Workspace</span>
              <span
                className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                title="Terisolasi & Tersinkronisasi dengan Database"
              />
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
              Data terisolasi aman per akun Google Anda dengan sinkronisasi otomatis.
            </p>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="w-full mt-1 py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-200 shadow-2xs transition-colors flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Backup ke Excel</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
