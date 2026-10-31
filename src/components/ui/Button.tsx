import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "secondary", size = "md", icon, children, disabled, ...props }, ref) => {
    const variants = {
      primary:
        "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm border border-transparent focus-visible:ring-indigo-500",
      secondary:
        "bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 shadow-sm border border-transparent",
      outline:
        "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-xs",
      ghost:
        "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",
      danger:
        "bg-rose-600 hover:bg-rose-700 text-white shadow-sm border border-transparent focus-visible:ring-rose-500",
    };

    const sizes = {
      sm: "h-8 px-2.5 text-xs rounded-md gap-1.5",
      md: "h-10 px-3.5 text-sm rounded-lg gap-2",
      lg: "h-11 px-5 text-base rounded-lg gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors select-none shrink-0 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

