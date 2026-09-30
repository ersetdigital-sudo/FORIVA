"use client";

import { AnimatePresence, motion } from "motion/react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useCheckout } from "@/context/CheckoutContext";
import { useMobileNavContext } from "@/context/MobileNavContext";
import { useTransactionsContext } from "@/context/TransactionContext";
import { MOBILE_MENU_LINKS } from "@/data/navigation";
import { useScrollLock } from "@/hooks/useScrollLock";
import { WA_CS_LINK } from "@/lib/constants";
import type { CategoryKey } from "@/types";

const QUICK_PILLS: {
  label: string;
  note: string;
  noteClass: string;
  category: CategoryKey;
}[] = [
  { label: "Pulsa", note: "Mulai 5rb", noteClass: "text-emerald-600", category: "pulsa" },
  { label: "Token PLN", note: "24 Jam", noteClass: "text-cobalt", category: "pln" },
  { label: "E-Money", note: "Top Up", noteClass: "text-rose-500", category: "emoney" },
];

export function MobileNav() {
  const { isOpen, open: openMenu, close } = useMobileNavContext();
  const { open: openCheckout } = useCheckout();
  const { open: openTransactions } = useTransactionsContext();

  useScrollLock(isOpen);

  const startCheckout = (category: CategoryKey) => {
    close();
    openCheckout(category);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              key="mobile-nav-backdrop"
              className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={close}
            />
            <motion.aside
              key="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu Navigasi"
              className="fixed top-0 right-0 bottom-0 w-[300px] max-w-[85vw] bg-white z-50 shadow-soft-drawer flex flex-col md:hidden border-l border-navy/10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="p-5 border-b border-navy/10 flex items-center justify-between bg-offwhite shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-cobalt text-lime font-heading font-bold text-base flex items-center justify-center rounded-xl shadow-sm">
                    F
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-lg tracking-tight text-navy leading-none">
                      FORIVA
                    </span>
                    <span className="text-[9px] font-bold tracking-widest text-cobalt uppercase mt-0.5">
                      Menu Cepat
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Tutup Menu"
                  className="w-8 h-8 rounded-lg bg-white border border-navy/10 hover:bg-navy hover:text-white flex items-center justify-center text-sm font-bold text-navy transition-colors shadow-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 border-b border-navy/10 bg-offwhite/50 shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy-muted block mb-2">
                  Transaksi Instan
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {QUICK_PILLS.map((pill) => (
                    <button
                      key={pill.category}
                      type="button"
                      onClick={() => startCheckout(pill.category)}
                      className="p-2 rounded-xl bg-white border border-navy/10 text-center hover:border-cobalt transition-colors shadow-sm cursor-pointer"
                    >
                      <span className="block text-xs font-bold text-navy">
                        {pill.label}
                      </span>
                      <span className={`text-[9px] font-semibold ${pill.noteClass}`}>
                        {pill.note}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                <a
                  href="#"
                  onClick={close}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-offwhite text-navy font-heading font-semibold text-sm transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MaterialIcon name="home" className="text-cobalt text-[20px]" />
                    <span>Beranda</span>
                  </div>
                  <span className="text-xs text-navy/40 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    close();
                    openTransactions();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-offwhite text-navy font-heading font-semibold text-sm transition-colors group text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <MaterialIcon
                      name="receipt_long"
                      className="text-cobalt text-[20px]"
                    />
                    <span>Cek Transaksi</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-mono font-bold">
                    Lacak SN
                  </span>
                </button>

                <a
                  href="#flash-sale"
                  onClick={close}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-offwhite text-navy font-heading font-semibold text-sm transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MaterialIcon
                      name="local_fire_department"
                      className="text-rose-500 text-[20px]"
                    />
                    <span>Promo Spesial</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-bold">
                    Flash Deal
                  </span>
                </a>

                {MOBILE_MENU_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-offwhite text-navy font-heading font-semibold text-sm transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <MaterialIcon
                        name={link.icon}
                        className={`${link.iconClass} text-[20px]`}
                      />
                      <span>{link.label}</span>
                    </div>
                    {link.badge ? (
                      <span className={link.badge.className}>
                        {link.badge.text}
                      </span>
                    ) : (
                      <span className="text-xs text-navy/40 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    )}
                  </a>
                ))}
              </div>

              <div className="p-4 border-t border-navy/10 bg-offwhite shrink-0 space-y-3">
                <a
                  href={WA_CS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-lime text-navy font-heading font-bold text-xs py-3 rounded-xl shadow-sm hover:bg-white transition-all text-center"
                >
                  <MaterialIcon name="chat" className="text-[18px] text-navy" />
                  <span>Bantuan CS WhatsApp (24/7)</span>
                </a>
                <div className="text-center text-[10px] text-navy/50 font-medium">
                  Foriva PPOB Direct • v2.4 • 100% Guest Checkout
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-navy/10 py-1.5 px-3 z-40 md:hidden shadow-[0_-4px_16px_rgba(11,19,48,0.06)]">
        <div className="grid grid-cols-4 items-center justify-around gap-1 text-center select-none">
          <a
            href="#"
            className="flex flex-col items-center justify-center py-1 text-cobalt group active:scale-95 transition-transform"
          >
            <MaterialIcon name="home" className="text-[20px]" />
            <span className="text-[10px] font-heading font-bold leading-tight mt-0.5">
              Beranda
            </span>
          </a>
          <button
            type="button"
            onClick={openTransactions}
            className="flex flex-col items-center justify-center py-1 text-navy/70 hover:text-cobalt group active:scale-95 transition-transform cursor-pointer"
          >
            <MaterialIcon name="receipt_long" className="text-[20px]" />
            <span className="text-[10px] font-heading font-semibold leading-tight mt-0.5">
              Cek Status
            </span>
          </button>
          <a
            href="#flash-sale"
            className="flex flex-col items-center justify-center py-1 text-navy/70 hover:text-rose-600 group active:scale-95 transition-transform"
          >
            <MaterialIcon
              name="local_fire_department"
              className="text-[20px] text-rose-500"
            />
            <span className="text-[10px] font-heading font-semibold leading-tight mt-0.5">
              Promo
            </span>
          </a>
          <button
            type="button"
            onClick={openMenu}
            className="flex flex-col items-center justify-center py-1 text-navy/70 hover:text-cobalt group active:scale-95 transition-transform cursor-pointer"
          >
            <MaterialIcon name="menu" className="text-[20px]" />
            <span className="text-[10px] font-heading font-semibold leading-tight mt-0.5">
              Menu
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
