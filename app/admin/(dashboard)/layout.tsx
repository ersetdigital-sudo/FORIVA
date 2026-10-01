/**
 * Layout halaman dashboard admin (semua halaman kecuali /admin/login).
 * Menjaga akses: user yang belum login diarahkan ke halaman login.
 */
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return <AdminShell email={user.email ?? "admin"}>{children}</AdminShell>;
}
