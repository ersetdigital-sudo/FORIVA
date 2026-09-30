"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useCheckout } from "@/context/CheckoutContext";
import { EMONEY_PROVIDER_KEYS, EMONEY_PROVIDERS } from "@/data/emoney";
import { PPOB_PRODUCTS } from "@/data/ppob";
import { NominalGrid } from "./NominalGrid";

export function CheckoutStep1() {
  const {
    category,
    provider,
    selectedItem,
    target,
    operatorBadge,
    validationError,
    canProceed,
    targetLabel,
    targetPlaceholder,
    targetHelper,
    isProviderSelecting,
    subtotalLabel,
    selectItem,
    selectProvider,
    clearProvider,
    setTarget,
    proceedToReview,
  } = useCheckout();

  const catalog = PPOB_PRODUCTS[category];
  const items = provider ? provider.nominals : catalog.items;
  const adminFee = provider ? provider.admin : catalog.admin;

  if (isProviderSelecting) {
    return (
      <div className="drawer-content px-4 sm:px-6 pt-5 pb-6 overflow-y-auto flex-1 space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cobalt/10 text-cobalt text-[10px] font-bold uppercase tracking-wider mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cobalt" /> Dompet Digital
          </div>
          <h4 className="font-heading font-bold text-lg text-navy">
            Pilih Dompet Digital
          </h4>
          <p className="text-xs text-navy-muted mt-0.5">
            Pilih akun dompet digital yang ingin kamu top up langsung:
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1 select-none">
          {EMONEY_PROVIDER_KEYS.map((key) => {
            const item = EMONEY_PROVIDERS[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => selectProvider(key)}
                className={`p-4 rounded-2xl bg-white border border-navy/10 text-left transition-all hover:-translate-y-0.5 hover:shadow-soft-card group ${item.tileBg} flex flex-col justify-between min-h-[125px] relative overflow-hidden cursor-pointer`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${item.badgeBg} flex items-center justify-center font-heading font-black text-sm shadow-sm transition-transform group-hover:scale-105`}
                  >
                    {item.monogram}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-offwhite text-navy/70 border border-navy/10">
                    {item.tag}
                  </span>
                </div>
                <div>
                  <span className="font-heading font-bold text-sm sm:text-base text-navy block leading-snug group-hover:text-cobalt transition-colors">
                    {item.name}
                  </span>
                  <p className="text-[11px] text-navy-muted leading-tight mt-0.5 line-clamp-1">
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-3.5 bg-offwhite border border-navy/10 rounded-2xl flex items-center gap-3 text-xs text-navy-muted">
          <MaterialIcon name="verified_user" className="text-cobalt text-[18px]" />
          <span>
            Top up instan langsung masuk ke saldo akun tanpa potongan tak
            terduga.
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="drawer-content px-4 sm:px-6 pt-5 pb-6 overflow-y-auto flex-1 space-y-5">
        {provider ? (
          <div className="p-3.5 bg-white border border-navy/10 rounded-2xl flex items-center justify-between shadow-sm transition-all">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl ${provider.badgeBg} flex items-center justify-center font-heading font-black text-sm shadow-sm shrink-0`}
              >
                {provider.monogram}
              </div>
              <div>
                <span className="text-[10px] text-navy-muted uppercase font-bold tracking-wider block leading-none">
                  Dompet Terpilih
                </span>
                <span className="font-heading font-bold text-base text-navy mt-0.5 block leading-tight">
                  {provider.name}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={clearProvider}
              className="text-xs font-heading font-semibold text-cobalt hover:bg-cobalt hover:text-white px-3 py-1.5 rounded-xl border border-cobalt/30 transition-all shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <MaterialIcon name="swap_horiz" className="text-[14px]" /> Ganti
            </button>
          </div>
        ) : null}

        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="target-input"
              className="block font-heading font-bold text-sm text-navy"
            >
              {targetLabel}
            </label>
            <span className="text-[11px] text-navy/50 font-medium shrink-0">
              Wajib diisi
            </span>
          </div>
          <div className="relative">
            <input
              id="target-input"
              type="tel"
              value={target}
              onChange={(event) => setTarget(event.target.value)}
              placeholder={targetPlaceholder}
              className="w-full bg-white border border-navy/10 rounded-xl px-4 py-3.5 font-mono text-base font-semibold text-navy placeholder:text-navy/35 focus:outline-none focus:border-cobalt transition-colors"
            />
            {operatorBadge ? (
              <div className={operatorBadge.badgeClass}>{operatorBadge.text}</div>
            ) : null}
          </div>
          <p className="text-xs text-navy-muted mt-2 font-normal">
            {targetHelper}
          </p>
          {validationError ? (
            <p className="text-xs text-red-500 mt-1.5 font-medium flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <span>{validationError}</span>
            </p>
          ) : null}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <label className="font-heading font-bold text-sm text-navy">
                Pilih Nominal
              </label>
              <p className="text-[11px] text-navy-muted">
                Klik salah satu nominal di bawah
              </p>
            </div>
            <span className="hidden sm:block text-xs text-navy-muted font-medium text-right">
              Semua harga netto
            </span>
          </div>
          <NominalGrid
            items={items}
            adminFee={adminFee}
            selectedVal={selectedItem?.val}
            onSelect={selectItem}
          />
        </div>
      </div>

      <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-navy/10 bg-white shrink-0 shadow-[0_-8px_20px_rgba(11,19,48,0.04)]">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="text-navy-muted font-medium">Total Sementara:</span>
          <span className="font-heading font-bold text-lg text-cobalt">
            {subtotalLabel}
          </span>
        </div>
        <button
          type="button"
          disabled={!canProceed}
          onClick={proceedToReview}
          className={
            canProceed
              ? "w-full bg-cobalt hover:bg-cobalt-hover text-white cursor-pointer font-heading font-semibold text-base py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-md shadow-cobalt/20"
              : "w-full bg-navy/20 text-navy/40 cursor-not-allowed font-heading font-semibold text-base py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
          }
        >
          <span>Lanjut ke Cek Pesanan</span>
          <svg
            className="w-4 h-4"
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
