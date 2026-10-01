/**
 * Layout dasar area /admin.
 * Memuat font khusus dashboard dan menetapkan kanvas "Alabaster Grid Console".
 */
import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Dashboard Admin",
    template: "%s | Dashboard Admin Foriva",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${interTight.variable} ${jetbrainsMono.variable} font-console min-h-screen bg-console text-ink`}
    >
      {children}
    </div>
  );
}
