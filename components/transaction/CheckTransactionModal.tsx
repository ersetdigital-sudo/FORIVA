"use client";

import { AnimatePresence, motion } from "motion/react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useTransactionsContext } from "@/context/TransactionContext";
import { useToast } from "@/context/ToastContext";
import { useScrollLock } from "@/hooks/useScrollLock";
import { WA_TRACK_LINK } from "@/lib/constants";
import { formatRupiah } from "@/lib/format";
import type { TransactionRecord } from "@/types";

function StatusPill({ status }: { status: TransactionRecord["status"] }) {
  if (status === "success") {
    return (
      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold font-mono flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        BERHASIL
      </span>
    );
  }

  return (
    <span className="px-2.5 py-1 rounded-full bg-lime text-navy border border-navy/10 text-xs font-bold font-mono flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-navy animate-pulse" />
      DIPROSES
    </span>
  );
}

export function CheckTransactionModal() {
  const { isOpen, close, query, setQuery, result, search } =
    useTransactionsContext();
  const { copy } = useToast();

  useScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="tx-backdrop"
          className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[55] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Cek Status Transaksi"
            className="bg-white rounded-3xl shadow-soft-drawer border border-navy/10 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="px-6 py-5 border-b border-navy/10 flex items-center justify-between bg-offwhite">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cobalt/10 text-cobalt flex items-center justify-center shrink-0">
                  <MaterialIcon name="receipt_long" className="text-[20px]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-cobalt uppercase tracking-wider font-mono">
                      Pelacak Pesanan Realtime
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-navy leading-none mt-1">
                    Cek Status Transaksi
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Tutup Modal"
                className="w-9 h-9 rounded-xl bg-white border border-navy/10 hover:bg-navy hover:text-white flex items-center justify-center text-sm font-bold text-navy transition-colors shadow-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6 drawer-content">
              <div className="bg-offwhite border border-navy/10 rounded-2xl p-4 sm:p-5">
                <label
                  htmlFor="tx-search-input"
                  className="block font-heading font-bold text-xs sm:text-sm text-navy mb-2"
                >
                  Nomor Transaksi / ID Pesanan atau Nomor HP
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <MaterialIcon
                      name="search"
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/40 text-[18px]"
                    />
                    <input
                      id="tx-search-input"
                      type="text"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") search();
                      }}
                      placeholder="FRV-89412 atau 081288991234"
                      className="w-full bg-white border border-navy/10 rounded-xl pl-10 pr-4 py-3 font-mono text-xs sm:text-sm font-semibold text-navy placeholder:text-navy/40 focus:outline-none focus:border-cobalt transition-colors"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={search}
                    className="bg-cobalt hover:bg-cobalt-hover text-white font-heading font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
                  >
                    <MaterialIcon
                      name="manage_search"
                      className="text-[16px] text-lime"
                    />
                    <span>Lacak Transaksi</span>
                  </button>
                </div>
                <p className="text-[11px] text-navy-muted mt-2 font-normal flex items-center gap-1">
                  <MaterialIcon name="info" className="text-[14px] text-cobalt" />
                  <span>
                    Masukkan invoice #FRV-... atau nomor HP saat melakukan guest
                    checkout.
                  </span>
                </p>
              </div>

              {result ? (
                <div className="p-5 bg-white border border-navy/10 rounded-2xl shadow-sm space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-navy/10">
                    <div className="flex items-center gap-2">
                      <StatusPill status={result.status} />
                      <span className="font-mono font-bold text-xs text-navy">
                        {result.invoice}
                      </span>
                    </div>
                    <span className="text-[11px] text-navy-muted">
                      {result.time}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-navy-muted block">
                        Produk Layanan
                      </span>
                      <span className="font-bold text-navy">
                        {result.product}
                      </span>
                    </div>
                    <div>
                      <span className="text-navy-muted block">
                        Nomor Tujuan
                      </span>
                      <span className="font-mono font-bold text-navy">
                        {result.target}
                      </span>
                    </div>
                    <div>
                      <span className="text-navy-muted block">
                        Nomor Serial (SN)
                      </span>
                      <span className="font-mono font-bold text-cobalt select-all">
                        {result.sn}
                      </span>
                    </div>
                    <div>
                      <span className="text-navy-muted block">
                        Total Pembayaran
                      </span>
                      <span className="font-heading font-bold text-emerald-600 text-sm">
                        {formatRupiah(result.total)}
                      </span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-navy/10 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <MaterialIcon name="verified" className="text-[16px]" />
                      Transaksi Sukses &amp; Valid
                    </span>
                    <button
                      type="button"
                      onClick={() => copy(result.sn, "Nomor SN Berhasil Disalin!")}
                      className="text-xs font-heading font-semibold text-cobalt hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <MaterialIcon
                        name="content_copy"
                        className="text-[14px]"
                      />
                      Salin SN
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-cobalt/5 border border-cobalt/20 rounded-2xl px-4 py-3.5">
                <MaterialIcon
                  name="support_agent"
                  className="text-cobalt text-[20px] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-navy">
                    Transaksi belum masuk lebih dari 5 menit?
                  </p>
                  <p className="text-[11px] text-navy-muted mt-0.5">
                    Admin siap cek SN dan status agregator.
                  </p>
                </div>
                <a
                  href={WA_TRACK_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-offwhite text-navy font-heading font-bold px-4 py-2 rounded-xl border border-navy/10 flex items-center justify-center gap-1.5 text-xs shrink-0 shadow-sm transition-all"
                >
                  <MaterialIcon
                    name="chat"
                    className="text-[16px] text-emerald-600"
                  />
                  <span>Hubungi WA</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
