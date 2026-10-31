import React from "react";
import { cn, getStatusColor } from "@/lib/utils";
import { ApplicationStatus, DetailedProgress } from "@/types/application";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: ApplicationStatus | DetailedProgress;
  variant?: "status" | "neutral" | "brand";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  status,
  variant = "status",
  size = "md",
  className,
  ...props
}) => {
  if (variant === "status" && status) {
    const color = getStatusColor(status);
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors",
          size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
          color.bg,
          color.text,
          color.border,
          className
        )}
        {...props}
      >
        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", color.dot)} />
        {children || status}
      </span>
    );
  }

  if (variant === "brand") {
    return (
      <span
        className={cn(
          "inline-flex items-center font-medium rounded-full border bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
          size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

