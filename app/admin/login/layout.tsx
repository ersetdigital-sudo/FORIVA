/**
 * Layout khusus halaman login admin.
 *
 * Memuat huruf yang dipakai dunia visual "Linen Meridian": Fraunces untuk
 * headline editorial, Inter untuk teks UI, dan JetBrains Mono (diwarisi dari
 * layout admin) untuk nilai yang harus sejajar.
 */
import { Fraunces, Inter } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${fraunces.variable} ${inter.variable} login-world font-linen-body min-h-screen bg-linen text-ink-warm`}
    >
      {children}
    </div>
  );
}
