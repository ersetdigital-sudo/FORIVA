/**
 * StoreProvider — menyalurkan data dinamis dari Supabase (settings, katalog
 * produk, tab cepat, kartu layanan) ke seluruh Client Component di homepage.
 *
 * Datanya di-fetch sekali di Server Component (app/layout.tsx & app/page.tsx)
 * lalu diturunkan lewat context, jadi tidak ada hardcode di komponen.
 */
"use client";

import { createContext, useContext } from "react";
import type { QuickTab } from "@/data/quickTabs";
import { formatWaDisplay, whatsappLinkTo } from "@/lib/constants";
import type { PpobCatalog, ServiceCard } from "@/types";
import type { StoreSettings } from "@/types/store";

interface StoreValue {
  settings: StoreSettings;
  catalog: PpobCatalog;
  quickTabs: QuickTab[];
  serviceCards: ServiceCard[];
  /** Link CS WhatsApp sesuai nomor di tabel settings. */
  waCsLink: string;
  /** Link bantuan lacak transaksi. */
  waTrackLink: string;
  /** Nomor CS siap tampil, mis. "+62 812-3456-7890". */
  waDisplay: string;
}

const StoreContext = createContext<StoreValue | null>(null);

/** Data mentah yang dikirim dari Server Component ke StoreProvider. */
export type StoreData = Omit<StoreValue, "waCsLink" | "waTrackLink" | "waDisplay">;

export function StoreProvider({
  value,
  children,
}: {
  value: StoreData;
  children: React.ReactNode;
}) {
  const { settings } = value;

  const store: StoreValue = {
    ...value,
    waCsLink: whatsappLinkTo(
      settings.nomor_wa_cs,
      `Halo Admin ${settings.nama_brand}, saya butuh bantuan transaksi`,
    ),
    waTrackLink: whatsappLinkTo(
      settings.nomor_wa_cs,
      `Halo Admin ${settings.nama_brand}, mau bantuan lacak transaksi`,
    ),
    waDisplay: formatWaDisplay(settings.nomor_wa_cs),
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore harus dipakai di dalam StoreProvider");
  }
  return context;
}
