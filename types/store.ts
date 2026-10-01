/**
 * Tipe domain untuk data yang disimpan di Supabase.
 * Dipakai bersama oleh halaman publik (homepage) dan dashboard admin.
 */

/** Kategori layanan PPOB — tabel `products`. */
export interface Product {
  id: string;
  slug: string;
  nama_kategori: string;
  judul: string;
  icon: string;
  label: string;
  placeholder: string;
  helper: string;
  biaya_admin: number;
  urutan_tampil: number;
  tampil_cepat: boolean;
  urutan_cepat: number;
  status_aktif: boolean;
  created_at?: string;
  updated_at?: string;
}

/** Nominal/varian per kategori — tabel `product_items`. */
export interface ProductItem {
  id: string;
  product_id: string;
  nama_item: string;
  harga: number;
  kode: string;
  populer: boolean;
  tampil_cepat: boolean;
  status_available: boolean;
  urutan_tampil: number;
  created_at?: string;
  updated_at?: string;
}

/** Produk beserta seluruh nominalnya. */
export interface ProductWithItems extends Product {
  items: ProductItem[];
}

/** Pengaturan global satu baris — tabel `settings`. */
export interface StoreSettings {
  id: number;
  nama_brand: string;
  tagline: string;
  deskripsi: string;
  nomor_wa_cs: string;
  gambar_qris_url: string | null;
  gambar_qris_public_id: string | null;
  qris_nmid: string | null;
  banner_url: string | null;
  updated_at?: string;
}

export type TransactionStatus = "pending" | "process" | "success" | "failed";

/** Riwayat transaksi — tabel `transactions`. */
export interface StoreTransaction {
  id: string;
  invoice: string | null;
  produk: string;
  nominal: number;
  nomor_tujuan: string | null;
  status: TransactionStatus;
  created_at: string;
}

export const TRANSACTION_STATUS_LABEL: Record<TransactionStatus, string> = {
  pending: "Menunggu",
  process: "Diproses",
  success: "Berhasil",
  failed: "Gagal",
};
