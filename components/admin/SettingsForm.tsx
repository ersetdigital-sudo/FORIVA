/**
 * Form pengaturan umum.
 * Bagian gambar QRIS memakai komponen ImageUpload yang mengunggah ke
 * Cloudinary (mode signed) lalu menyimpan URL + public_id ke tabel settings.
 */
"use client";

import { updateSettings } from "@/app/admin/actions";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { Card, Field, inputBase } from "@/components/admin/ui";
import { useAdminAction } from "@/components/admin/useAdminAction";
import { useStore } from "@/context/StoreContext";
import { formatWaDisplay, whatsappLinkTo } from "@/lib/constants";
import type { StoreSettings } from "@/types/store";

export function SettingsForm({ settings }: { settings: StoreSettings }) {
  const { settings: liveSettings } = useStore();
  const form = useAdminAction(updateSettings, "Pengaturan berhasil disimpan.");

  const previewNumber = settings.nomor_wa_cs || liveSettings.nomor_wa_cs;

  return (
    <form action={form.formAction} className="space-y-6">
      <Card
        title="Identitas brand"
        description="Dipakai di homepage, meta SEO, dan pesan WhatsApp otomatis."
      >
        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
          <Field label="Nama brand" htmlFor="nama_brand">
            <input
              id="nama_brand"
              name="nama_brand"
              defaultValue={settings.nama_brand}
              required
              className={inputBase}
            />
          </Field>
          <Field label="Tagline" htmlFor="tagline">
            <input
              id="tagline"
              name="tagline"
              defaultValue={settings.tagline}
              className={inputBase}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field
              label="Deskripsi singkat"
              htmlFor="deskripsi"
              hint="Dipakai sebagai meta description dan teks footer."
            >
              <textarea
                id="deskripsi"
                name="deskripsi"
                defaultValue={settings.deskripsi}
                rows={3}
                className={`${inputBase} resize-y`}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field
              label="URL banner homepage"
              htmlFor="banner_url"
              hint="Gambar utama di hero homepage sekaligus OG/Twitter card. Boleh dikosongkan."
            >
              <input
                id="banner_url"
                name="banner_url"
                defaultValue={settings.banner_url ?? ""}
                className={`${inputBase} font-console-mono text-[12px]`}
              />
            </Field>
          </div>
        </div>
      </Card>

      <Card
        title="Customer service"
        description="Nomor WhatsApp yang dipakai semua tombol bantuan di situs."
      >
        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
          <Field
            label="Nomor WA CS"
            htmlFor="nomor_wa_cs"
            hint="Format internasional tanpa tanda plus, mis. 6281234567890 (9–15 digit)."
          >
            <input
              id="nomor_wa_cs"
              name="nomor_wa_cs"
              defaultValue={settings.nomor_wa_cs}
              inputMode="tel"
              required
              className={`${inputBase} font-console-mono tabular-nums`}
            />
          </Field>

          <div className="rounded-md border border-hairline bg-console p-3.5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
              Pratinjau
            </div>
            <div className="mt-1 font-console-mono text-[13px] text-ink">
              {formatWaDisplay(previewNumber)}
            </div>
            <a
              href={whatsappLinkTo(previewNumber, `Halo Admin ${settings.nama_brand}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-block text-[11px] font-semibold text-accent hover:underline"
            >
              Uji tautan WhatsApp →
            </a>
          </div>
        </div>
      </Card>

      <Card
        title="Pembayaran QRIS"
        description="Cukup unggah gambar QRIS merchant. Gambar lama otomatis dihapus dari Cloudinary saat diganti."
      >
        <div className="p-5">
          <ImageUpload
            urlFieldName="gambar_qris_url"
            publicIdFieldName="gambar_qris_public_id"
            initialUrl={settings.gambar_qris_url}
            initialPublicId={settings.gambar_qris_public_id}
            folder="foriva/qris"
          />
        </div>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton pendingLabel="Menyimpan pengaturan…">
          Simpan semua perubahan
        </SubmitButton>
        {form.error ? (
          <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-[12px] text-rose-700">
            {form.error}
          </p>
        ) : (
          <p className="text-[11px] text-ink-faint">
            Perubahan langsung aktif di homepage setelah disimpan.
          </p>
        )}
      </div>
    </form>
  );
}
