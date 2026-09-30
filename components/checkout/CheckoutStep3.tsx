"use client";

import Image from "next/image";
import { ClockIcon, CopyIcon, TimerExpiredIcon } from "@/components/icons/UiIcons";
import { useCheckout } from "@/context/CheckoutContext";
import { useToast } from "@/context/ToastContext";
import { formatCountdown, formatRupiah } from "@/lib/format";
import { QRIS_IMAGE, QRIS_NMID } from "@/lib/constants";

export function CheckoutStep3() {
  const { invoice, totals, secondsLeft, isExpired, confirmPayment, restart } =
    useCheckout();
  const { copy } = useToast();

  const totalLabel = formatRupiah(totals?.total ?? 0);

  return (
    <>
      <div className="drawer-content px-4 sm:px-6 pt-5 pb-6 overflow-y-auto flex-1 space-y-6 text-center">
        {!isExpired ? (
          <div className="space-y-5">
            <div>
              <h4 className="font-heading font-bold text-xl text-navy">
                Scan untuk Membayar
              </h4>
              <p className="text-xs text-navy-muted mt-1">
                Dapat di-scan dengan semua aplikasi m-Banking &amp; e-Wallet
              </p>
            </div>

            <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <ClockIcon className="w-3.5 h-3.5 animate-pulse" />
              <span>Batas waktu pembayaran:</span>
              <span className="font-mono font-bold text-sm">
                {formatCountdown(secondsLeft)}
              </span>
            </div>

            <div className="bg-white border border-navy/10 rounded-2xl p-5 max-w-[240px] mx-auto shadow-sm">
              <Image
                src={QRIS_IMAGE}
                alt="Kode QRIS Pembayaran Foriva"
                width={512}
                height={279}
                className="w-full h-auto rounded-lg block mx-auto"
              />
              <div className="mt-2 text-[10px] font-semibold text-navy/50 tracking-wider uppercase">
                NMID: {QRIS_NMID}
              </div>
            </div>

            <div className="bg-white border border-navy/10 rounded-2xl p-4 space-y-2">
              <div>
                <span className="text-[11px] text-navy-muted uppercase tracking-wider font-semibold block">
                  Total Nominal Transfer
                </span>
                <span className="font-heading font-bold text-3xl text-cobalt tracking-tight block mt-0.5">
                  {totalLabel}
                </span>
                <span className="text-[10px] text-navy/60 block mt-0.5">
                  Transfer sesuai nominal pas hingga digit terakhir
                </span>
              </div>
              <div className="pt-2 border-t border-navy/10 flex items-center justify-between text-xs font-mono">
                <span className="text-navy-muted">
                  Invoice:{" "}
                  <strong className="text-navy font-bold">{invoice}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => copy(invoice, "Nomor invoice berhasil disalin!")}
                  className="text-cobalt hover:underline font-heading font-semibold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <span>Salin</span>
                  <CopyIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="bg-offwhite border border-navy/10 rounded-2xl p-4 text-left">
              <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-navy mb-2.5">
                Cara Cepat Bayar:
              </h5>
              <ol className="space-y-2 text-xs text-navy-muted font-normal list-decimal list-inside">
                <li>
                  Buka aplikasi m-Banking atau e-Wallet (BCA, Mandiri, BRI,
                  GoPay, OVO, ShopeePay, DANA, dll).
                </li>
                <li>
                  Scan QRIS di atas (atau unggah screenshot QR jika menggunakan 1
                  HP).
                </li>
                <li>
                  Pastikan nominal transfer sesuai persis lalu selesaikan
                  pembayaran.
                </li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-8">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center text-3xl font-bold">
              <TimerExpiredIcon className="w-8 h-8 text-rose-600 stroke-current" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-2xl text-navy">
                Waktu Pembayaran Habis
              </h4>
              <p className="text-xs text-navy-muted max-w-xs mx-auto mt-1 leading-relaxed">
                Sesi pembayaran QRIS selama 15 menit telah kadaluwarsa. Silakan
                buat pesanan baru untuk mendapatkan kode QR terbaru.
              </p>
            </div>
            <button
              type="button"
              onClick={restart}
              className="bg-cobalt hover:bg-cobalt-hover text-white font-heading font-semibold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer"
            >
              Buat Pesanan Baru
            </button>
          </div>
        )}
      </div>

      {!isExpired ? (
        <div className="p-5 border-t border-navy/10 bg-white shrink-0 shadow-[0_-8px_20px_rgba(11,19,48,0.04)]">
          <button
            type="button"
            onClick={confirmPayment}
            className="w-full bg-cobalt hover:bg-cobalt-hover text-white font-heading font-semibold text-base py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Saya Sudah Bayar</span>
            <svg
              className="w-5 h-5 text-lime"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
              />
            </svg>
          </button>
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={restart}
              className="text-xs text-navy/50 hover:text-rose-600 transition-colors cursor-pointer"
            >
              Batalkan pesanan
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
