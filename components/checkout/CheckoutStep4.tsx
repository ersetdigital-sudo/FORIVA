"use client";

import { CopyIcon } from "@/components/icons/UiIcons";
import { useCheckout } from "@/context/CheckoutContext";
import { useToast } from "@/context/ToastContext";
import { useTransactionsContext } from "@/context/TransactionContext";
import { formatRupiah } from "@/lib/format";

export function CheckoutStep4() {
  const {
    category,
    invoice,
    productName,
    target,
    serialNumber,
    plnToken,
    totals,
    paymentStage,
    restart,
    close,
  } = useCheckout();
  const { copy } = useToast();
  const { open: openTransactions } = useTransactionsContext();

  const totalLabel = formatRupiah(totals?.total ?? 0);
  const isSuccess = paymentStage === "success";

  const copyReceipt = () => {
    const receipt = [
      "Bukti Pembayaran Foriva",
      `Invoice: ${invoice}`,
      `Produk: ${productName}`,
      `Tujuan: ${target.trim() || "-"}`,
      `SN: ${serialNumber}`,
      `Total: ${totalLabel}`,
      "Status: LUNAS",
    ].join("\n");

    copy(receipt, "Bukti transaksi lengkap disalin!");
  };

  return (
    <>
      <div className="drawer-content px-4 sm:px-6 pt-5 pb-6 overflow-y-auto flex-1 space-y-6">
        {!isSuccess ? (
          <div className="text-center py-10 space-y-4">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 rounded-full border-4 border-navy/10 border-t-cobalt animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center font-heading font-bold text-cobalt text-xs">
                QRIS
              </div>
            </div>
            <div>
              <h4 className="font-heading font-bold text-xl text-navy">
                Menunggu Konfirmasi Bank
              </h4>
              <p className="text-xs text-navy-muted max-w-xs mx-auto mt-1 leading-relaxed">
                Memeriksa mutasi pembayaran QRIS... Biasanya kurang dari 1 menit.
                Mohon jangan tutup halaman ini.
              </p>
            </div>
            <div className="inline-block bg-lime/40 text-navy font-mono text-[11px] font-semibold px-3 py-1 rounded-full animate-pulse">
              Sinkronisasi Gateway...
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white font-bold flex items-center justify-center text-3xl mx-auto shadow-md mb-3">
                ✓
              </div>
              <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                PEMBAYARAN DITERIMA
              </span>
              <h4 className="font-heading font-bold text-2xl text-navy mt-2">
                Transaksi Berhasil!
              </h4>
              <p className="text-xs text-navy-muted mt-0.5">
                Tagihan telah diproses lunas ke server pusat provider.
              </p>
            </div>

            {category === "pln" && plnToken ? (
              <div className="bg-lime p-4 rounded-2xl border border-navy/15 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy/70 block">
                  KODE STROOM / TOKEN PLN RESMI:
                </span>
                <div className="font-mono font-bold text-lg sm:text-xl text-navy tracking-wider my-1.5 select-all">
                  {plnToken}
                </div>
                <button
                  type="button"
                  onClick={() => copy(plnToken, "Kode Token PLN disalin!")}
                  className="mt-1 bg-navy text-lime hover:bg-navy-muted text-xs font-heading font-semibold px-4 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Salin Token PLN</span>
                  <CopyIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : null}

            <div className="bg-white border border-navy/10 rounded-2xl p-5 space-y-3 font-mono text-xs">
              <div className="flex justify-between pb-2 border-b border-navy/10">
                <span className="text-navy-muted">Nomor Invoice</span>
                <span className="font-bold text-navy">{invoice}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-navy/10">
                <span className="text-navy-muted">Produk Layanan</span>
                <span className="font-bold text-navy text-right">
                  {productName}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-navy/10">
                <span className="text-navy-muted">Nomor Tujuan</span>
                <span className="font-bold text-navy">{target.trim() || "-"}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-navy/10">
                <span className="text-navy-muted">Nomor Serial (SN)</span>
                <span className="font-bold text-cobalt select-all">
                  {serialNumber}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <span className="text-navy font-sans font-bold">Total Lunas</span>
                <span className="font-heading font-bold text-base text-emerald-600 font-sans">
                  {totalLabel}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={copyReceipt}
              className="w-full py-3 bg-offwhite hover:bg-navy/5 text-navy border border-navy/10 rounded-xl font-heading font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <CopyIcon className="w-4 h-4 text-cobalt" />
              <span>Salin Bukti Transaksi Lengkap</span>
            </button>
          </div>
        )}
      </div>

      {isSuccess ? (
        <div className="p-5 border-t border-navy/10 bg-white shrink-0 shadow-[0_-8px_20px_rgba(11,19,48,0.04)]">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={restart}
              className="w-full bg-cobalt hover:bg-cobalt-hover text-white font-heading font-semibold text-sm py-3.5 rounded-xl transition-all text-center cursor-pointer"
            >
              Transaksi Lagi
            </button>
            <button
              type="button"
              onClick={() => {
                close();
                openTransactions();
              }}
              className="w-full bg-offwhite hover:bg-navy/10 text-navy border border-navy/10 font-heading font-semibold text-sm py-3.5 rounded-xl transition-all text-center flex items-center justify-center cursor-pointer"
            >
              Cek Status Transaksi
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
