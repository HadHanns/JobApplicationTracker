"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApplications } from "@/lib/application-context";

export default function ApplicationsRedirectPage() {
  const router = useRouter();
  const { setActiveTab } = useApplications();

  useEffect(() => {
    setActiveTab("board");
    router.replace("/");
  }, [router, setActiveTab]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="text-xs text-slate-400">Loading board...</div>
    </div>
  );
}
