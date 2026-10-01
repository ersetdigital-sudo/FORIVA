/**
 * Data-access layer: semua pembacaan data situs dari Supabase.
 *
 * Semua fungsi di sini dipanggil dari Server Component. Kalau Supabase tidak
 * bisa dihubungi (env belum diisi / jaringan bermasalah), fungsi otomatis
 * fallback ke data statis lama supaya homepage tidak pernah kosong.
 */
import { CATEGORY_KEYS, PPOB_PRODUCTS } from "@/data/ppob";
import { SERVICE_CARDS } from "@/data/marketing";
import { QUICK_TABS, type QuickTab } from "@/data/quickTabs";
import {
  BANNER_IMAGE,
  QRIS_IMAGE,
  QRIS_NMID,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  WHATSAPP_NUMBER,
} from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import type { CategoryKey, PpobCatalog, ServiceCard } from "@/types";
import type { Product, ProductItem, ProductWithItems, StoreSettings } from "@/types/store";

/** Nilai default kalau tabel `settings` belum bisa dibaca. */
export const DEFAULT_SETTINGS: StoreSettings = {
  id: 1,
  nama_brand: SITE_NAME,
  tagline: SITE_TAGLINE,
  deskripsi: SITE_DESCRIPTION,
  nomor_wa_cs: WHATSAPP_NUMBER,
  gambar_qris_url: QRIS_IMAGE,
  gambar_qris_public_id: null,
  qris_nmid: QRIS_NMID,
  banner_url: BANNER_IMAGE,
};

const isCategoryKey = (value: string): value is CategoryKey =>
  (CATEGORY_KEYS as string[]).includes(value);

const byOrder = <T extends { urutan_tampil: number }>(a: T, b: T) =>
  a.urutan_tampil - b.urutan_tampil;

/** Ambil pengaturan global (baris tunggal tabel `settings`). */
export async function getSettings(): Promise<StoreSettings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(data as StoreSettings) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/** Ambil semua kategori beserta nominalnya, urut berdasarkan `urutan_tampil`. */
export async function getProductsWithItems(): Promise<ProductWithItems[]> {
  try {
    const supabase = await createClient();
    const [productsRes, itemsRes] = await Promise.all([
      supabase.from("products").select("*").order("urutan_tampil", { ascending: true }),
      supabase.from("product_items").select("*").order("urutan_tampil", { ascending: true }),
    ]);

    if (productsRes.error || !productsRes.data) return [];
    if (itemsRes.error || !itemsRes.data) return [];

    const items = itemsRes.data as ProductItem[];

    return (productsRes.data as Product[]).map((product) => ({
      ...product,
      items: items.filter((item) => item.product_id === product.id).sort(byOrder),
    }));
  } catch {
    return [];
  }
}

/**
 * Ubah baris database menjadi katalog berbentuk `PpobCatalog` yang dipakai
 * komponen checkout. Kategori yang belum ada di database diisi dari data
 * statis supaya alur checkout tidak pernah rusak.
 */
export function toCatalog(products: ProductWithItems[]): PpobCatalog {
  const catalog = {} as PpobCatalog;

  for (const product of [...products].sort(byOrder)) {
    if (!isCategoryKey(product.slug) || !product.status_aktif) continue;

    catalog[product.slug] = {
      title: product.judul || product.nama_kategori,
      label: product.label,
      placeholder: product.placeholder,
      helper: product.helper,
      admin: product.biaya_admin,
      items: product.items
        .filter((item) => item.status_available)
        .sort(byOrder)
        .map((item) => ({
          name: item.nama_item,
          price: item.harga,
          val: item.kode,
          popular: item.populer,
        })),
    };
  }

  for (const key of CATEGORY_KEYS) {
    if (!catalog[key]) catalog[key] = PPOB_PRODUCTS[key];
  }

  return catalog;
}

/**
 * Tab "Transaksi Instan": kategori dengan `tampil_cepat` dan nominal yang
 * ditandai `tampil_cepat` di dashboard admin.
 */
function buildQuickTabs(products: ProductWithItems[]): QuickTab[] {
  if (products.length === 0) return QUICK_TABS;

  const tabs: QuickTab[] = [...products]
    .filter((product) => product.status_aktif && product.tampil_cepat)
    .sort((a, b) => a.urutan_cepat - b.urutan_cepat)
    .map((product) => ({
      key: product.slug as CategoryKey,
      tabLabel: product.nama_kategori,
      label: product.label,
      placeholder: `Contoh: ${product.placeholder}`,
      iconFilled: product.slug === "pln",
      nominals: product.items
        .filter((item) => item.status_available && item.tampil_cepat)
        .sort(byOrder)
        .map((item) => ({
          name: item.nama_item,
          price: item.harga,
          val: item.kode,
        })),
    }))
    .filter((tab) => isCategoryKey(tab.key) && tab.nominals.length > 0);

  return tabs.length > 0 ? tabs : QUICK_TABS;
}

/**
 * Kartu kategori di section "Layanan". Nama, urutan, dan status aktif berasal
 * dari database; gaya visual tetap memakai peta statis supaya identitas warna
 * tiap kategori konsisten.
 */
function buildServiceCards(products: ProductWithItems[]): ServiceCard[] {
  if (products.length === 0) return SERVICE_CARDS;

  const styleBySlug = new Map(SERVICE_CARDS.map((card) => [card.id, card]));

  const cards = [...products]
    .filter((product) => product.status_aktif && isCategoryKey(product.slug))
    .sort(byOrder)
    .flatMap((product) => {
      const style = styleBySlug.get(product.slug as CategoryKey);
      return style ? [{ ...style, name: product.nama_kategori }] : [];
    });

  return cards.length > 0 ? cards : SERVICE_CARDS;
}

/** Semua data yang dibutuhkan layout & homepage dalam sekali query. */
export async function getStoreData() {
  const [settings, products] = await Promise.all([
    getSettings(),
    getProductsWithItems(),
  ]);

  return {
    settings,
    catalog: toCatalog(products),
    quickTabs: buildQuickTabs(products),
    serviceCards: buildServiceCards(products),
  };
}
