/** Halaman login admin (Supabase Auth — email + password). */
import type { Metadata } from "next";
import { LoginScreen } from "@/components/admin/LoginScreen";
import { getSettings } from "@/lib/store";

export const metadata: Metadata = { title: "Login Admin" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  // Nama brand & tagline dibaca dari tabel settings Supabase.
  const [{ next }, settings] = await Promise.all([searchParams, getSettings()]);
  const nextPath = next && next.startsWith("/admin") ? next : "/admin";

  return <LoginScreen settings={settings} nextPath={nextPath} />;
}
