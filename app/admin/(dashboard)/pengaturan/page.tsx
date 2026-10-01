/** Halaman pengaturan umum website. */
import type { Metadata } from "next";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { PageHeader } from "@/components/admin/ui";
import { getSettings } from "@/lib/store";

export const metadata: Metadata = { title: "Pengaturan" };

export default async function PengaturanPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        title="Pengaturan"
        description="Identitas brand, nomor WhatsApp CS, dan gambar QRIS. Semua nilai di bawah ini dipakai langsung oleh homepage."
      />
      <SettingsForm settings={settings} />
    </>
  );
}
