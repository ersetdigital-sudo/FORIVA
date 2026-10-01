/**
 * Kerangka dashboard admin: sidebar kiri + area konten kanan.
 * Dipakai oleh seluruh halaman di dalam route group (dashboard).
 */
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "space_dashboard" },
  { href: "/admin/produk", label: "Produk & Nominal", icon: "inventory_2" },
  { href: "/admin/pengaturan", label: "Pengaturan", icon: "tune" },
  { href: "/admin/pesanan", label: "Kelola Pesanan", icon: "receipt_long" },
];

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const activeItem =
    NAV_ITEMS.find((item) => item.href === pathname) ??
    [...NAV_ITEMS].reverse().find((item) => pathname.startsWith(item.href)) ??
    NAV_ITEMS[0];

  /** Logout dari Supabase Auth lalu kembalikan ke halaman login. */
  const handleLogout = async () => {
    setLoggingOut(true);
    await createClient().auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  const sidebar = (
    <div className="flex h-full flex-col bg-rail border-r border-hairline">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-hairline shrink-0">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-sm font-bold text-white">
          F
        </span>
        <div className="leading-none">
          <div className="text-sm font-semibold tracking-tight text-ink">Foriva</div>
          <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-faint">
            Admin Console
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="px-2 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          Menu
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === activeItem.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={
                isActive
                  ? "flex items-center gap-3 rounded-md border border-hairline bg-panel px-3 py-2.5 text-[13px] font-semibold text-accent shadow-console-ring"
                  : "flex items-center gap-3 rounded-md border border-transparent px-3 py-2.5 text-[13px] font-medium text-ink-soft transition-colors hover:bg-panel hover:text-ink"
              }
            >
              <MaterialIcon name={item.icon} className="text-[18px]" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-hairline p-3 space-y-1 shrink-0">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-medium text-ink-soft transition-colors hover:bg-panel hover:text-ink"
        >
          <MaterialIcon name="open_in_new" className="text-[18px]" />
          <span>Lihat situs</span>
        </Link>
        <div className="rounded-md border border-hairline bg-panel px-3 py-2.5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Masuk sebagai
          </div>
          <div className="mt-0.5 truncate font-console-mono text-[11px] text-ink">
            {email}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-md border border-hairline bg-console px-3 py-2 text-[12px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-60 cursor-pointer"
          >
            <MaterialIcon name="logout" className="text-[15px]" />
            {loggingOut ? "Keluar…" : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-61 lg:block">
        {sidebar}
      </aside>

      {/* Sidebar mobile */}
      {menuOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-61 max-w-[80vw]">
            {sidebar}
          </div>
        </div>
      ) : null}

      <div className="lg:pl-61">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-hairline bg-panel/85 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Buka menu"
            className="grid h-9 w-9 place-items-center rounded-md border border-hairline text-ink lg:hidden cursor-pointer"
          >
            <MaterialIcon name="menu" className="text-[20px]" />
          </button>

          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
              Dashboard Admin
            </div>
            <div className="truncate text-[15px] font-semibold tracking-tight text-ink">
              {activeItem.label}
            </div>
          </div>

          <span className="hidden items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Live database
          </span>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
