import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { ApplicationProvider } from "@/lib/application-context";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Offerly | Job Application Tracker",
  description:
    "Offerly helps you manage job applications, track recruitment progress, schedule interview rounds, and organize job search data with seamless Excel template import and export.",
  keywords: [
    "Offerly",
    "job tracker",
    "recruitment tracker",
    "job application",
    "exceljs",
    "interview tracker",
    "career dashboard",
  ],
  icons: {
    icon: "/Offerly.png",
    shortcut: "/Offerly.png",
    apple: "/Offerly.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col font-sans antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <AuthProvider>
          <ApplicationProvider>
            {children}
          </ApplicationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

