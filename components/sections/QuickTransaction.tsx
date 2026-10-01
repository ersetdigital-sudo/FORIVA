"use client";

import { useMemo, useState } from "react";
import { SERVICE_ICONS_OUTLINE } from "@/components/icons/ServiceIcons";
import { CheckCircleIcon } from "@/components/icons/UiIcons";
import { BoltOutlineIcon } from "@/components/icons/ServiceIcons";
import { useCheckout } from "@/context/CheckoutContext";
import { useStore } from "@/context/StoreContext";
import { formatRupiah } from "@/lib/format";
import { detectOperator } from "@/lib/operator";
import type { QuickTab } from "@/data/quickTabs";
import type { PpobItem } from "@/types";

export function QuickTransaction() {
  const { open, setTarget: setCheckoutTarget } = useCheckout();
  // Tab & nominal cepat dibaca dari Supabase (flag "Cepat" di dashboard admin).
  const { quickTabs, catalog } = useStore();
  const [activeTab, setActiveTab] = useState<QuickTab>(quickTabs[0]);
  const [nominal, setNominal] = useState<PpobItem>(quickTabs[0].nominals[0]);
  const [target, setTarget] = useState("");
  const [operator, setOperator] = useState<string | null>(null);

  const adminFee = catalog[activeTab.key].admin;

  const total = useMemo(
    () => formatRupiah(nominal.price + adminFee),
    [nominal, adminFee],
  );

  const switchTab = (tab: QuickTab) => {
    setActiveTab(tab);
    setNominal(tab.nominals[0]);
    setOperator(null);
  };

  const handleTargetChange = (value: string) => {
    setTarget(value);
    const detected = detectOperator(value, activeTab.key);
    const isCellular =
      activeTab.key === "pulsa" ||
      activeTab.key === "data" ||
      activeTab.key === "emoney";

    if (!isCellular) {
      setOperator(null);
      return;
    }

    setOperator(detected.badge ? detected.badge.text : null);
  };

  const launch = () => {
    open(activeTab.key);
    if (target.trim()) setCheckoutTarget(target.trim());
  };

  return (
    <div className="mt-6 sm:mt-8 bg-white border border-navy/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-soft-elevated relative z-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-5 mb-4 sm:mb-6 border-b border-navy/10 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cobalt/10 text-cobalt flex items-center justify-center shrink-0">
            <BoltOutlineIcon className="w-5 h-5 stroke-current" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-base sm:text-xl text-navy flex items-center gap-2">
              Transaksi Instan PPOB{" "}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE 24 JAM
              </span>
            </h2>
            <p className="text-xs text-navy-muted font-normal mt-0.5 hidden sm:block">
              Beli pulsa, paket data, dan bayar berbagai tagihan langsung tanpa
              registrasi akun.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[10px] sm:text-[11px] font-bold text-navy/70 uppercase tracking-wider bg-offwhite px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-navy/10 flex items-center gap-1.5">
            <CheckCircleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cobalt" />
            100% Guest Checkout
          </span>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-2 p-1 bg-offwhite rounded-xl sm:rounded-2xl mb-5 sm:mb-6 text-xs font-heading font-semibold scroll-smooth">
        {quickTabs.map((tab) => {
          const Icon = SERVICE_ICONS_OUTLINE[tab.key];
          const isActive = tab.key === activeTab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => switchTab(tab)}
              className={
                isActive
                  ? "quick-svc-btn py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-cobalt text-white shadow-sm flex items-center justify-center gap-1.5 shrink-0 transition-all cursor-pointer"
                  : "quick-svc-btn py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg sm:rounded-xl text-navy/70 hover:text-navy hover:bg-white transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              }
            >
              <Icon
                className={
                  tab.iconFilled ? "w-4 h-4 fill-current" : "w-4 h-4 stroke-current"
                }
              />
              <span>{tab.tabLabel}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        <div className="lg:col-span-5 space-y-2">
          <div className="flex items-center justify-between">
            <label
              className="block text-xs font-heading font-bold text-navy"
              htmlFor="quick-input-val"
            >
              {activeTab.label}
            </label>
            <span className="text-[11px] text-navy/50 font-medium">
              Auto-detect operator
            </span>
          </div>
          <div className="relative">
            <input
              id="quick-input-val"
              type="tel"
              value={target}
              onChange={(event) => handleTargetChange(event.target.value)}
              placeholder={activeTab.placeholder}
              className="w-full bg-offwhite border border-navy/10 rounded-xl px-3.5 sm:px-4 py-3 sm:py-3.5 font-mono text-sm sm:text-base font-semibold text-navy placeholder:text-navy/40 focus:outline-none focus:border-cobalt transition-colors"
            />
            {operator ? (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 rounded-md bg-cobalt text-lime font-mono shadow-sm">
                {operator}
              </span>
            ) : null}
          </div>
          <p className="text-[11px] text-navy-muted">
            Cukup masukkan nomor tujuan tanpa login. Riwayat dan struk resmi
            instan.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-bold text-navy">
              Pilihan Nominal Cepat:
            </span>
            <span className="text-[11px] text-navy/50 font-medium">
              Biaya Admin {formatRupiah(adminFee)}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            {activeTab.nominals.map((item) => {
              const isSelected = item.val === nominal.val;
              return (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setNominal(item)}
                  className={
                    isSelected
                      ? "quick-nom-pill p-2.5 sm:p-3 bg-white border border-cobalt rounded-xl text-left transition-colors cursor-pointer shadow-sm"
                      : "quick-nom-pill p-2.5 sm:p-3 bg-offwhite border border-navy/10 rounded-xl text-left hover:border-cobalt transition-colors cursor-pointer"
                  }
                >
                  <span className="block text-[11px] sm:text-xs font-semibold text-navy truncate">
                    {item.name}
                  </span>
                  <span className="block text-xs sm:text-sm font-mono font-bold text-cobalt mt-0.5">
                    {formatRupiah(item.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-navy/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <div>
            <span className="text-[10px] sm:text-[11px] text-navy-muted font-medium block">
              Total Pembayaran (Termasuk Admin)
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-heading font-bold text-xl sm:text-2xl text-cobalt leading-none">
                {total}
              </span>
              <span className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Bebas Admin Luar
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={launch}
            className="w-full sm:w-auto bg-cobalt hover:bg-cobalt-hover active:scale-[0.99] text-white font-heading font-bold text-xs sm:text-sm px-6 sm:px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-cobalt/20 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Beli Sekarang / Bayar Cepat</span>
            <svg
              className="w-4 h-4 text-lime stroke-current"
              fill="none"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <line x1={5} x2={19} y1={12} y2={12} />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
