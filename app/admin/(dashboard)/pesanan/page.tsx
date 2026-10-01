/**
 * Halaman Kelola Pesanan.
 * Pencarian & filter dijalankan di sisi server lewat query string, sehingga
 * tautan filter bisa dibagikan dan tombol back browser tetap bekerja.
 */
import type { Metadata } from "next";
import { OrderManager } from "@/components/admin/OrderManager";
import { PageHeader } from "@/components/admin/ui";
import { createClient } from "@/lib/supabase/server";
import type { StoreTransaction, TransactionStatus } from "@/types/store";

export const metadata: Metadata = { title: "Kelola Pesanan" };

const STATUS_LIST: TransactionStatus[] = ["pending", "process", "success", "failed"];
const ROW_LIMIT = 500;

const isStatus = (value: string | undefined): value is TransactionStatus =>
  value !== undefined && (STATUS_LIST as string[]).includes(value);

/** Bersihkan kata kunci dari karakter yang mengganggu sintaks filter PostgREST. */
const sanitize = (value: string) => value.replace(/[%,()*\\]/g, "").trim();

export default async function PesananPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status, q } = await searchParams;
  const activeStatus: TransactionStatus | "all" = isStatus(status) ? status : "all";
  const query = sanitize(q ?? "");

  const supabase = await createClient();
  let request = supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(ROW_LIMIT);

  if (query) {
    request = request.or(
      `invoice.ilike.%${query}%,produk.ilike.%${query}%,nomor_tujuan.ilike.%${query}%`,
    );
  }

  const { data } = await request;
  const matched = (data ?? []) as StoreTransaction[];

  // Jumlah per status dihitung dari hasil pencarian yang sama supaya angkanya
  // konsisten dengan apa yang sedang dilihat admin.
  const counts: Record<TransactionStatus | "all", number> = {
    all: matched.length,
    pending: 0,
    process: 0,
    success: 0,
    failed: 0,
  };
  for (const order of matched) counts[order.status] += 1;

  const orders =
    activeStatus === "all"
      ? matched
      : matched.filter((order) => order.status === activeStatus);

  return (
    <>
      <PageHeader
        title="Kelola Pesanan"
        description="Cari pesanan, ubah statusnya setelah pembayaran terverifikasi, atau hapus data yang salah input."
      />
      <OrderManager
        orders={orders}
        counts={counts}
        activeStatus={activeStatus}
        query={query}
        truncated={matched.length >= ROW_LIMIT}
      />
    </>
  );
}
