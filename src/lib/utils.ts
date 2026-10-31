import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApplicationStatus, DetailedProgress } from "@/types/application";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString?: string | null): string {
  if (!dateString) return "-";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function formatRelativeDays(dateString?: string): string {
  if (!dateString) return "";
  try {
    const target = new Date(dateString).getTime();
    const today = new Date().setHours(0, 0, 0, 0);
    const diffDays = Math.round((target - today) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays > 1) return `In ${diffDays} days`;
    return `${Math.abs(diffDays)} days ago`;
  } catch {
    return "";
  }
}

export function normalizeStatus(rawStatus?: string): ApplicationStatus {
  if (!rawStatus) return "Applied";
  const lower = rawStatus.toLowerCase().trim();

  if (lower.includes("offer") || lower.includes("offering") || lower.includes("diterima")) {
    return "Offer";
  }
  if (
    lower.includes("reject") ||
    lower.includes("not proceed") ||
    lower.includes("gagal") ||
    lower.includes("ditolak")
  ) {
    return "Rejected";
  }
  if (
    lower.includes("interview") ||
    lower.includes("intv") ||
    lower.includes("presentation") ||
    lower.includes("user") ||
    lower.includes("hr") ||
    lower.includes("wawancara")
  ) {
    return "Interview";
  }
  if (
    lower.includes("assess") ||
    lower.includes("assesment") ||
    lower.includes("assessment") ||
    lower.includes("test") ||
    lower.includes("psikotes")
  ) {
    return "Assessment";
  }
  if (lower.includes("wishlist") || lower.includes("saved") || lower.includes("draft")) {
    return "Wishlist";
  }
  if (lower.includes("withdraw") || lower.includes("batal")) {
    return "Withdrawn";
  }
  return "Applied";
}

export function getStatusColor(status: ApplicationStatus | DetailedProgress): {
  bg: string;
  text: string;
  border: string;
  dot: string;
} {
  const norm = normalizeStatus(status);
  switch (norm) {
    case "Offer":
      return {
        bg: "bg-emerald-50 dark:bg-emerald-950/40",
        text: "text-emerald-700 dark:text-emerald-300",
        border: "border-emerald-200 dark:border-emerald-800",
        dot: "bg-emerald-500",
      };
    case "Interview":
      return {
        bg: "bg-purple-50 dark:bg-purple-950/40",
        text: "text-purple-700 dark:text-purple-300",
        border: "border-purple-200 dark:border-purple-800",
        dot: "bg-purple-500",
      };
    case "Assessment":
      return {
        bg: "bg-amber-50 dark:bg-amber-950/40",
        text: "text-amber-700 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-800",
        dot: "bg-amber-500",
      };
    case "Applied":
      return {
        bg: "bg-blue-50 dark:bg-blue-950/40",
        text: "text-blue-700 dark:text-blue-300",
        border: "border-blue-200 dark:border-blue-800",
        dot: "bg-blue-500",
      };
    case "Wishlist":
      return {
        bg: "bg-slate-100 dark:bg-slate-800",
        text: "text-slate-700 dark:text-slate-300",
        border: "border-slate-200 dark:border-slate-700",
        dot: "bg-slate-400",
      };
    case "Rejected":
      return {
        bg: "bg-rose-50 dark:bg-rose-950/40",
        text: "text-rose-700 dark:text-rose-300",
        border: "border-rose-200 dark:border-rose-800",
        dot: "bg-rose-500",
      };
    case "Withdrawn":
      return {
        bg: "bg-zinc-100 dark:bg-zinc-800",
        text: "text-zinc-600 dark:text-zinc-400",
        border: "border-zinc-200 dark:border-zinc-700",
        dot: "bg-zinc-400",
      };
    default:
      return {
        bg: "bg-slate-50 dark:bg-slate-900",
        text: "text-slate-700 dark:text-slate-300",
        border: "border-slate-200 dark:border-slate-800",
        dot: "bg-slate-400",
      };
  }
}

