"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Shield, Sparkles, AlertCircle, ArrowRight, Loader2 } from "lucide-react";

function LoginForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const errorParam = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // Redirect to home if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("google", { callbackUrl });
    } catch (err) {
      console.error("Sign in error:", err);
      setIsLoading(false);
    }
  };

  // Human-friendly error messages in Indonesian
  const getErrorMessage = (error: string | null) => {
    if (!error) return null;
    switch (error) {
      case "OAuthSignin":
      case "OAuthCallback":
        return "Gagal menghubungkan dengan Google. Pastikan izin akses telah diberikan dan koneksi internet stabil.";
      case "OAuthCreateAccount":
        return "Gagal membuat akun dengan Google. Silakan coba lagi.";
      case "EmailCreateAccount":
        return "Gagal mendaftarkan email akun.";
      case "Callback":
        return "Proses callback autentikasi dibatalkan atau gagal.";
      case "OAuthAccountNotLinked":
        return "Email ini sudah terhubung dengan akun lain. Gunakan metode login asli.";
      case "AccessDenied":
        return "Akses ditolak. Anda membatalkan proses login Google.";
      case "Configuration":
        return "Konfigurasi server Google OAuth belum lengkap (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET di file .env).";
      case "SessionRequired":
        return "Sesi Anda telah berakhir. Silakan login kembali untuk melanjutkan.";
      default:
        return "Terjadi kesalahan saat autentikasi. Silakan coba lagi.";
    }
  };

  const errorMessage = getErrorMessage(errorParam);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          <p className="text-sm font-medium text-slate-500">Memuat sesi Offerly...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 bg-dots flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo and Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4 transition-transform hover:scale-105">
            <Image
              src="/Offerly.png"
              alt="Offerly Logo"
              width={80}
              height={80}
              priority
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome to Offerly
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Smart personal job application tracker & career pipeline
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 p-6 sm:p-8">
          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 flex items-start gap-3 text-red-700 dark:text-red-300">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <span className="font-semibold block mb-0.5">Autentikasi Gagal</span>
                {errorMessage}
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Masuk ke Akun Anda
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Gunakan akun Google Anda untuk mengakses data lamaran kerja pribadi yang terisolasi secara aman.
              </p>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              type="button"
              className="w-full relative flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-100 font-semibold text-sm shadow-sm hover:shadow transition-all duration-200 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
              ) : (
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>{isLoading ? "Menghubungkan ke Google..." : "Lanjutkan dengan Google"}</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors ml-auto" />
            </button>

            {/* Feature Highlights */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <Shield className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span>Data terenkripsi dan terisolasi privat per akun pengguna</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Kanban drag-and-drop, filter cerdas & manajemen interview</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Sinkronisasi import & export template Excel menggunakan ExcelJS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-500">
          Offerly &copy; {new Date().getFullYear()} &bull; Personal Career Pipeline Tracker
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
