/**
 * Kelola Pesanan.
 *
 * Daftar pesanan dengan pencarian + filter status yang menghitung jumlahnya
 * sendiri, dan panel detail yang terbuka di dalam baris (bukan modal) supaya
 * admin bisa mengubah status atau menghapus tanpa kehilangan konteks daftar.
 */
"use client";

import Link from "next/link";
import { useState } from "react";
import { deleteTransaction, updateTransactionStatus } from "@/app/admin/actions";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { StatusPill } from "@/components/admin/ui";
import { useAdminAction } from "@/components/admin/useAdminAction";
import { formatRupiah } from "@/lib/format";
import {
  TRANSACTION_STATUS_LABEL,
  type StoreTransaction,
  type TransactionStatus,
} from "@/types/store";

const STATUS_ORDER: TransactionStatus[] = ["pending", "process", "success", "failed"];

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

/** Satu baris detail: label kecil + nilai (angka pakai mono agar sejajar). */
function DetailItem({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="font-console-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
        {label}
      </div>
      <div
        className={`mt-1 text-[13px] text-ink ${mono ? "font-console-mono tabular-nums" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}

/** Panel detail pesanan: data lengkap + aksi ubah status + hapus. */
function OrderDetail({ order }: { order: StoreTransaction }) {
  const save = useAdminAction(updateTransactionStatus, "Status pesanan diperbarui.");
  const remove = useAdminAction(deleteTransaction, "Pesanan dihapus.");
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <div className="border-t border-hairline bg-console/70 px-5 py-5">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <DetailItem label="Invoice" value={order.invoice ?? "—"} mono />
        <DetailItem label="Produk" value={order.produk} />
        <DetailItem label="Nomor tujuan" value={order.nomor_tujuan ?? "—"} mono />
        <DetailItem label="Nominal" value={formatRupiah(order.nominal)} mono />
        <DetailItem label="Dibuat" value={formatDateTime(order.created_at)} mono />
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-hairline pt-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="font-console-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
            Ubah status pesanan
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {STATUS_ORDER.map((status) => {
              const isCurrent = status === order.status;
              return (
                <form key={status} action={save.formAction}>
                  <input type="hidden" name="id" value={order.id} />
                  <input type="hidden" name="status" value={status} />
                  <SubmitButton
                    size="sm"
                    variant={isCurrent ? "primary" : "accent-soft"}
                    pendingLabel="Menyimpan…"
                    className={isCurrent ? "pointer-events-none" : ""}
                  >
                    {isCurrent ? (
                      <MaterialIcon name="check" className="text-[14px]" />
                    ) : null}
                    {TRANSACTION_STATUS_LABEL[status]}
                  </SubmitButton>
                </form>
              );
            })}
          </div>
        </div>

        {/* Hapus dua langkah — tanpa dialog bawaan browser */}
        <div className="flex items-center gap-2">
          {isConfirming ? (
            <>
              <span className="text-[12px] text-ink-soft">Hapus pesanan ini?</span>
              <form action={remove.formAction}>
                <input type="hidden" name="id" value={order.id} />
                <SubmitButton
                  size="sm"
                  variant="warm-danger"
                  pendingLabel="Menghapus…"
                >
                  Ya, hapus
                </SubmitButton>
              </form>
              <button
                type="button"
                onClick={() => setIsConfirming(false)}
                className="rounded-md px-2.5 py-1.5 text-[11px] font-semibold text-ink-soft transition-colors hover:text-ink cursor-pointer"
              >
                Batal
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsConfirming(true)}
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-semibold text-ink-soft transition-colors hover:text-warm-danger cursor-pointer"
            >
              <MaterialIcon name="delete" className="text-[14px]" />
              Hapus pesanan
            </button>
          )}
        </div>
      </div>

      {save.error ? (
        <p className="mt-4 rounded-md border border-[#EBD3CF] bg-[#FBF1EF] px-3 py-2 text-[12px] text-warm-danger">
          {save.error}
        </p>
      ) : null}
      {remove.error ? (
        <p className="mt-4 rounded-md border border-[#EBD3CF] bg-[#FBF1EF] px-3 py-2 text-[12px] text-warm-danger">
          {remove.error}
        </p>
      ) : null}
    </div>
  );
}

export function OrderManager({
  orders,
  counts,
  activeStatus,
  query,
  truncated,
}: {
  orders: StoreTransaction[];
  counts: Record<TransactionStatus | "all", number>;
  activeStatus: TransactionStatus | "all";
  query: string;
  truncated: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const filters: (TransactionStatus | "all")[] = ["all", ...STATUS_ORDER];

  return (
    <div className="space-y-4">
      {/* Pencarian + filter status (jumlahnya ikut, jadi bukan hiasan) */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <form
          method="get"
          action="/admin/pesanan"
          className="flex w-full max-w-sm items-center gap-2"
        >
          {activeStatus !== "all" ? (
            <input type="hidden" name="status" value={activeStatus} />
          ) : null}
          <div className="relative flex-1">
            <MaterialIcon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-ink-faint"
            />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Cari invoice, produk, atau nomor tujuan"
              aria-label="Cari pesanan"
              className="h-10 w-full rounded-md border border-hairline bg-panel pl-10 pr-3 text-[13px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          </div>
          <button
            type="submit"
            className="h-10 rounded-md border border-hairline bg-panel px-3.5 text-[12px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent cursor-pointer"
          >
            Cari
          </button>
          {query ? (
            <Link
              href={
                activeStatus === "all"
                  ? "/admin/pesanan"
                  : `/admin/pesanan?status=${activeStatus}`
              }
              className="text-[12px] font-semibold text-ink-soft transition-colors hover:text-ink"
            >
              Reset
            </Link>
          ) : null}
        </form>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = filter === activeStatus;
            const href =
              filter === "all"
                ? query
                  ? `/admin/pesanan?q=${encodeURIComponent(query)}`
                  : "/admin/pesanan"
                : `/admin/pesanan?status=${filter}${query ? `&q=${encodeURIComponent(query)}` : ""}`;

            return (
              <Link
                key={filter}
                href={href}
                className={
                  isActive
                    ? "inline-flex items-center gap-2 rounded-md border border-accent/30 bg-accent-soft px-3 py-2 text-[12px] font-semibold text-accent"
                    : "inline-flex items-center gap-2 rounded-md border border-hairline bg-panel px-3 py-2 text-[12px] font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent"
                }
              >
                {filter === "all" ? "Semua" : TRANSACTION_STATUS_LABEL[filter]}
                <span className="font-console-mono tabular-nums">
                  {counts[filter]}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <section className="overflow-hidden rounded-lg border border-hairline bg-panel shadow-console-ring">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <span className="grid h-11 w-11 place-items-center rounded-lg border border-hairline bg-console">
              <MaterialIcon name="receipt_long" className="text-[20px] text-ink-faint" />
            </span>
            <p className="mt-3 text-[13px] font-semibold text-ink">
              {query ? "Tidak ada pesanan yang cocok" : "Belum ada pesanan"}
            </p>
            <p className="mt-1 max-w-sm text-[12px] text-ink-soft">
              {query
                ? `Tidak ada invoice, produk, atau nomor tujuan yang memuat "${query}".`
                : "Pesanan dari guest checkout akan muncul di sini otomatis."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="bg-bone/60">
                  {["Invoice", "Produk", "Nomor tujuan", "Nominal", "Status", "Waktu", ""].map(
                    (head, index) => (
                      <th
                        key={head || `col-${index}`}
                        className={`px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-soft ${
                          index === 6 ? "text-right" : ""
                        }`}
                      >
                        {head}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const isOpen = openId === order.id;
                  return (
                    <FragmentRow
                      key={order.id}
                      order={order}
                      isOpen={isOpen}
                      onToggle={() => setOpenId(isOpen ? null : order.id)}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="font-console-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
        {orders.length} pesanan ditampilkan
        {truncated ? " · 500 pesanan terbaru" : ""}
      </p>
    </div>
  );
}

function FragmentRow({
  order,
  isOpen,
  onToggle,
}: {
  order: StoreTransaction;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <tr className="border-t border-hairline align-middle">
        <td className="px-4 py-3 font-console-mono text-[12px] text-ink">
          {order.invoice ?? "—"}
        </td>
        <td className="px-4 py-3 text-[13px] text-ink">{order.produk}</td>
        <td className="px-4 py-3 font-console-mono text-[12px] text-ink-soft">
          {order.nomor_tujuan ?? "—"}
        </td>
        <td className="px-4 py-3 font-console-mono text-[12px] tabular-nums text-ink">
          {formatRupiah(order.nominal)}
        </td>
        <td className="px-4 py-3">
          <StatusPill status={order.status} />
        </td>
        <td className="px-4 py-3 font-console-mono text-[11px] text-ink-soft">
          {formatDateTime(order.created_at)}
        </td>
        <td className="px-4 py-3 text-right">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            className={
              isOpen
                ? "inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent-soft px-2.5 py-1.5 text-[11px] font-semibold text-accent cursor-pointer"
                : "inline-flex items-center gap-1.5 rounded-md border border-hairline bg-panel px-2.5 py-1.5 text-[11px] font-semibold text-ink-soft transition-colors hover:border-accent hover:text-accent cursor-pointer"
            }
          >
            {isOpen ? "Tutup" : "Kelola"}
            <MaterialIcon
              name={isOpen ? "expand_less" : "expand_more"}
              className="text-[14px]"
            />
          </button>
        </td>
      </tr>
      {isOpen ? (
        <tr>
          <td colSpan={7} className="p-0">
            <OrderDetail order={order} />
          </td>
        </tr>
      ) : null}
    </>
  );
}
