/**
 * Server Actions dashboard admin.
 *
 * Semua aksi wajib login (sesi Supabase). Penulisan data dilakukan lewat
 * client server yang memakai cookie sesi admin, sehingga Row Level Security
 * di database tetap berlaku. Setelah menulis, cache situs di-revalidate
 * supaya perubahan langsung tampil di homepage tanpa deploy ulang.
 */
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { TransactionStatus } from "@/types/store";

export type ActionResult = { ok: boolean; message: string };

const ok = (message = "Perubahan tersimpan."): ActionResult => ({ ok: true, message });
const fail = (message: string): ActionResult => ({ ok: false, message });

const VALID_STATUS: TransactionStatus[] = ["pending", "process", "success", "failed"];

/** Ambil client Supabase yang sudah terautentikasi sebagai admin. */
async function getAdminClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? supabase : null;
}

/** Segarkan semua halaman supaya data baru langsung terlihat di homepage. */
function refreshSite() {
  revalidatePath("/", "layout");
}

const text = (formData: FormData, key: string, fallback = "") =>
  String(formData.get(key) ?? fallback).trim();

const bool = (formData: FormData, key: string) => formData.get(key) !== null;

/** Validasi angka bulat tidak negatif. */
function toInt(value: string, label: string): number | { error: string } {
  const digits = value.replace(/[^\d]/g, "");
  if (digits === "") return { error: `${label} wajib berupa angka.` };
  return Number(digits);
}

/** Bikin kode unik untuk nominal baru (dipakai sebagai key di homepage). */
function makeKode(namaItem: string) {
  const base = namaItem
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 20);
  return `${base || "item"}-${Math.random().toString(36).slice(2, 6)}`;
}

// ============================================================
// Pengaturan umum
// ============================================================
/**
 * Update pengaturan secara PARSIAL: hanya field yang benar-benar ada di form
 * yang ditulis. Jadi kalau sebuah input dihapus dari tampilan, nilainya di
 * database tetap aman dan tidak ikut terhapus.
 */
export async function updateSettings(formData: FormData): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return fail("Sesi berakhir. Silakan login ulang.");

  const payload: Record<string, string | number | null> = { id: 1 };

  if (formData.has("nama_brand")) {
    const namaBrand = text(formData, "nama_brand");
    if (!namaBrand) return fail("Nama brand tidak boleh kosong.");
    payload.nama_brand = namaBrand;
  }

  if (formData.has("nomor_wa_cs")) {
    const nomorWa = text(formData, "nomor_wa_cs").replace(/\D/g, "");
    if (nomorWa.length < 9 || nomorWa.length > 15) {
      return fail("Nomor WA CS harus berupa 9–15 digit angka.");
    }
    payload.nomor_wa_cs = nomorWa;
  }

  for (const key of ["tagline", "deskripsi", "qris_nmid", "banner_url"]) {
    if (formData.has(key)) payload[key] = text(formData, key);
  }

  // URL & public_id gambar QRIS selalu dikirim berpasangan oleh ImageUpload.
  if (formData.has("gambar_qris_url")) {
    payload.gambar_qris_url = text(formData, "gambar_qris_url") || null;
    payload.gambar_qris_public_id =
      text(formData, "gambar_qris_public_id") || null;
  }

  const { error } = await supabase
    .from("settings")
    .upsert(payload, { onConflict: "id" });

  if (error) return fail(error.message);
  refreshSite();
  return ok("Pengaturan berhasil disimpan.");
}

// ============================================================
// Kategori produk
// ============================================================
export async function saveProduct(formData: FormData): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return fail("Sesi berakhir. Silakan login ulang.");

  const id = text(formData, "id");
  if (!id) return fail("Kategori tidak dikenali.");

  const namaKategori = text(formData, "nama_kategori");
  if (!namaKategori) return fail("Nama kategori tidak boleh kosong.");

  const biayaAdmin = toInt(text(formData, "biaya_admin", "0"), "Biaya admin");
  if (typeof biayaAdmin !== "number") return fail(biayaAdmin.error);

  const urutan = toInt(text(formData, "urutan_tampil", "0"), "Urutan tampil");
  if (typeof urutan !== "number") return fail(urutan.error);

  const urutanCepat = toInt(text(formData, "urutan_cepat", "0"), "Urutan cepat");
  if (typeof urutanCepat !== "number") return fail(urutanCepat.error);

  const { error } = await supabase
    .from("products")
    .update({
      nama_kategori: namaKategori,
      judul: text(formData, "judul"),
      icon: text(formData, "icon", "category") || "category",
      label: text(formData, "label"),
      placeholder: text(formData, "placeholder"),
      helper: text(formData, "helper"),
      biaya_admin: biayaAdmin,
      urutan_tampil: urutan,
      urutan_cepat: urutanCepat,
      status_aktif: bool(formData, "status_aktif"),
      tampil_cepat: bool(formData, "tampil_cepat"),
    })
    .eq("id", id);

  if (error) return fail(error.message);
  refreshSite();
  return ok(`Kategori "${namaKategori}" tersimpan.`);
}

/** Simpan urutan kategori hasil tombol naik/turun di dashboard. */
export async function saveProductOrder(
  updates: { id: string; urutan_tampil: number }[],
): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return fail("Sesi berakhir. Silakan login ulang.");

  for (const update of updates) {
    const { error } = await supabase
      .from("products")
      .update({ urutan_tampil: update.urutan_tampil })
      .eq("id", update.id);
    if (error) return fail(error.message);
  }

  refreshSite();
  return ok("Urutan kategori diperbarui.");
}

// ============================================================
// Nominal (product_items)
// ============================================================
export async function saveItem(formData: FormData): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return fail("Sesi berakhir. Silakan login ulang.");

  const productId = text(formData, "product_id");
  if (!productId) return fail("Kategori tidak dikenali.");

  const namaItem = text(formData, "nama_item");
  if (!namaItem) return fail("Nama nominal tidak boleh kosong.");

  const harga = toInt(text(formData, "harga"), "Harga");
  if (typeof harga !== "number") return fail(harga.error);
  if (harga <= 0) return fail("Harga harus lebih besar dari 0.");

  const urutan = toInt(text(formData, "urutan_tampil", "0"), "Urutan tampil");
  if (typeof urutan !== "number") return fail(urutan.error);

  const id = text(formData, "id");

  const payload = {
    product_id: productId,
    nama_item: namaItem,
    harga,
    kode: text(formData, "kode") || makeKode(namaItem),
    populer: bool(formData, "populer"),
    tampil_cepat: bool(formData, "tampil_cepat"),
    status_available: bool(formData, "status_available"),
    urutan_tampil: urutan,
  };

  const { error } = id
    ? await supabase.from("product_items").update(payload).eq("id", id)
    : await supabase.from("product_items").insert(payload);

  if (error) return fail(error.message);
  refreshSite();
  return ok(id ? "Nominal diperbarui." : "Nominal baru ditambahkan.");
}

export async function deleteItem(formData: FormData): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return fail("Sesi berakhir. Silakan login ulang.");

  const id = text(formData, "id");
  if (!id) return fail("Nominal tidak dikenali.");

  const { error } = await supabase.from("product_items").delete().eq("id", id);
  if (error) return fail(error.message);

  refreshSite();
  return ok("Nominal dihapus.");
}

// ============================================================
// Transaksi
// ============================================================
export async function updateTransactionStatus(
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return fail("Sesi berakhir. Silakan login ulang.");

  const id = text(formData, "id");
  const status = text(formData, "status") as TransactionStatus;

  if (!id) return fail("Transaksi tidak dikenali.");
  if (!VALID_STATUS.includes(status)) return fail("Status tidak valid.");

  const { error } = await supabase
    .from("transactions")
    .update({ status })
    .eq("id", id);

  if (error) return fail(error.message);
  refreshSite();
  return ok("Status transaksi diperbarui.");
}

export async function deleteTransaction(formData: FormData): Promise<ActionResult> {
  const supabase = await getAdminClient();
  if (!supabase) return fail("Sesi berakhir. Silakan login ulang.");

  const id = text(formData, "id");
  if (!id) return fail("Transaksi tidak dikenali.");

  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) return fail(error.message);

  refreshSite();
  return ok("Transaksi dihapus.");
}
