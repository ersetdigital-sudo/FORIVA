"use client";

import { SearchIcon, ShieldCheckIcon } from "@/components/icons/UiIcons";
import { EditIcon } from "@/components/icons/UiIcons";
import { useCheckout } from "@/context/CheckoutContext";
import { formatRupiah } from "@/lib/format";

export function CheckoutStep2() {
  const {
    invoice,
    target,
    targetLabel,
    contextLabel,
    productName,
    totals,
    goToStep,
  } = useCheckout();

  return (
    <>
      <div className="drawer-content px-4 sm:px-6 pt-5 pb-6 overflow-y-auto flex-1 space-y-6">
        <div className="bg-lime/30 border border-lime text-navy p-3.5 rounded-2xl flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
            <SearchIcon className="w-4 h-4 text-navy" />
          </div>
          <p className="text-xs leading-relaxed font-medium">
            Mohon periksa kembali nomor tujuan sebelum melanjutkan ke pembayaran
            QRIS.
          </p>
        </div>

        <div className="bg-white border border-navy/10 rounded-2xl p-4 sm:p-6 space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-navy/10">
            <div>
              <span className="text-[10px] font-bold text-cobalt uppercase tracking-wider block">
                ID Pesanan Tamu
              </span>
              <span className="font-mono font-bold text-sm text-navy">
                {invoice}
              </span>
            </div>
            <span className="text-[11px] font-semibold bg-navy/5 text-navy px-2.5 py-1 rounded-full">
              Checkout Instan
            </span>
          </div>

          <div className="bg-offwhite border border-navy/10 p-4 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[11px] text-navy-muted block font-medium">
                {targetLabel}
              </span>
              <span className="font-mono font-bold text-xl sm:text-2xl text-navy tracking-wide">
                {target.trim() || "-"}
              </span>
              <span className="text-[11px] font-bold text-cobalt block mt-0.5">
                {contextLabel}
              </span>
            </div>
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="text-xs font-heading font-semibold text-cobalt hover:underline px-3 py-1.5 rounded-lg bg-white border border-navy/10 hover:border-cobalt transition-colors shrink-0 cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <span>Ubah</span>
                <EditIcon className="w-3.5 h-3.5 stroke-current" />
              </span>
            </button>
          </div>

          <div className="space-y-2.5 text-xs pt-1">
            <div className="flex justify-between text-navy-muted">
              <span>Produk Layanan</span>
              <span className="font-semibold text-navy text-right">
                {productName}
              </span>
            </div>
            <div className="flex justify-between text-navy-muted">
              <span>Harga Produk</span>
              <span className="font-semibold text-navy">
                {formatRupiah(totals?.price ?? 0)}
              </span>
            </div>
            <div className="flex justify-between text-navy-muted">
              <span>Biaya Admin</span>
              <span className="font-semibold text-cobalt">
                {formatRupiah(totals?.admin ?? 0)}
              </span>
            </div>
            <div className="pt-3 border-t border-navy/10 flex justify-between items-baseline">
              <span className="font-heading font-bold text-sm text-navy">
                Total Pembayaran
              </span>
              <span className="font-heading font-bold text-2xl text-cobalt">
                {formatRupiah(totals?.total ?? 0)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-navy/60 px-1">
          <ShieldCheckIcon className="w-4 h-4 text-cobalt shrink-0" />
          <span>Garansi saldo kembali jika transaksi gagal sistem.</span>
        </div>
      </div>

      <div className="p-5 border-t border-navy/10 bg-white shrink-0 shadow-[0_-8px_20px_rgba(11,19,48,0.04)]">
        <button
          type="button"
          onClick={() => goToStep(3)}
          className="w-full bg-cobalt hover:bg-cobalt-hover text-white font-heading font-semibold text-base py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
        >
          <span>Bayar dengan QRIS</span>
          <svg
            className="w-4 h-4 text-lime"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M14 5l7 7m0 0l-7 7m7-7H3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
            />
          </svg>
        </button>
      </div>
    </>
  );
}
