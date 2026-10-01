/** Halaman utama dashboard: ringkasan katalog & transaksi terbaru. */
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  Card,
  EmptyState,
  PageHeader,
  StatCard,
  StatusPill,
} from "@/components/admin/ui";
import { formatRupiah } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import type { StoreTransaction, TransactionStatus } from "@/types/store";

const STATUS_ORDER: TransactionStatus[] = ["pending", "process", "success", "failed"];

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [productsRes, itemsRes, txRes] = await Promise.all([
    supabase.from("products").select("id,status_aktif,urutan_tampil"),
    supabase.from("product_items").select("id,status_available"),
    supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200),
  ]);

  const products = productsRes.data ?? [];
  const items = itemsRes.data ?? [];
  const transactions = (txRes.data ?? []) as StoreTransaction[];

  const activeProducts = products.filter((p) => p.status_aktif).length;
  const availableItems = items.filter((i) => i.status_available).length;
  const successValue = transactions
    .filter((t) => t.status === "success")
    .reduce((total, t) => total + t.nominal, 0);

  const countByStatus = STATUS_ORDER.map((status) => ({
    status,
    count: transactions.filter((t) => t.status === status).length,
  }));

  return (
    <>
      <PageHeader
        title="Ringkasan"
        description="Semua angka di bawah dibaca langsung dari Supabase. Perubahan di menu Produk & Pengaturan langsung tampil di homepage."
        action={
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-md border border-hairline bg-panel px-3.5 py-2 text-[12px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Buka homepage
            <MaterialIcon name="open_in_new" className="text-[15px]" />
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Kategori aktif"
          value={`${activeProducts}/${products.length}`}
          hint="Tampil di homepage"
          icon="category"
        />
        <StatCard
          label="Nominal tersedia"
          value={String(availableItems)}
          hint={`dari ${items.length} nominal`}
          icon="sell"
        />
        <StatCard
          label="Pesanan tercatat"
          value={String(transactions.length)}
          hint="200 pesanan terakhir"
          icon="receipt_long"
        />
        <StatCard
          label="Nilai pesanan sukses"
          value={formatRupiah(successValue)}
          hint="Akumulasi status berhasil"
          icon="payments"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card
          title="Pesanan terbaru"
          description="5 pesanan terakhir yang masuk"
          className="lg:col-span-2"
          action={
            <Link
              href="/admin/pesanan"
              className="text-[12px] font-semibold text-accent hover:underline"
            >
              Kelola semua
            </Link>
          }
        >
          {transactions.length === 0 ? (
            <EmptyState
              title="Belum ada pesanan"
              description="Pesanan dari guest checkout akan otomatis tercatat di sini."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-bone/60">
                    {["Invoice", "Produk", "Nominal", "Status", "Waktu"].map((head) => (
                      <th
                        key={head}
                        className="px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-soft"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 5).map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-t border-hairline align-middle"
                    >
                      <td className="px-5 py-3 font-console-mono text-[12px] text-ink">
                        {transaction.invoice ?? "—"}
                      </td>
                      <td className="px-5 py-3 text-[13px] text-ink">
                        {transaction.produk}
                      </td>
                      <td className="px-5 py-3 font-console-mono text-[12px] tabular-nums text-ink">
                        {formatRupiah(transaction.nominal)}
                      </td>
                      <td className="px-5 py-3">
                        <StatusPill status={transaction.status} />
                      </td>
                      <td className="px-5 py-3 text-[12px] text-ink-soft">
                        {formatDateTime(transaction.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card title="Status pesanan" description="Rekap 200 pesanan terakhir">
          <ul className="divide-y divide-hairline">
            {countByStatus.map((row) => (
              <li
                key={row.status}
                className="flex items-center justify-between px-5 py-3.5"
              >
                <StatusPill status={row.status} />
                <span className="font-console-mono text-[15px] font-semibold tabular-nums text-ink">
                  {row.count}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-hairline px-5 py-4">
            <Link
              href="/admin/produk"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              <MaterialIcon name="inventory_2" className="text-[16px]" />
              Kelola Produk &amp; Nominal
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
}
