"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { MenuIcon, SearchIcon } from "@/components/icons/UiIcons";
import { useCheckout } from "@/context/CheckoutContext";
import { useMobileNavContext } from "@/context/MobileNavContext";
import { useTransactionsContext } from "@/context/TransactionContext";
import { DESKTOP_NAV } from "@/data/navigation";

export function SiteHeader() {
  const { open } = useCheckout();
  const { open: openTransactions } = useTransactionsContext();
  const { open: openMenu } = useMobileNavContext();

  return (
    <header className="sticky top-0 z-40 bg-offwhite/90 backdrop-blur-md border-b border-navy/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-3 shrink-0">
          <a className="flex items-center gap-2.5 group" href="#">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-cobalt text-lime font-heading font-bold text-lg sm:text-xl flex items-center justify-center rounded-xl transition-transform group-hover:scale-105 shadow-sm">
              F
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl sm:text-2xl tracking-tight text-navy leading-none">
                FORIVA
              </span>
            </div>
          </a>
        </div>

        <div className="hidden md:flex flex-1 max-w-lg relative">
          <MaterialIcon
            name="search"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/40 text-[18px]"
          />
          <input
            id="site-search"
            name="q"
            type="text"
            defaultValue=""
            onKeyDown={(event) => {
              if (event.key === "Enter") open("pulsa");
            }}
            placeholder="Cari produk tagihan, token PLN, paket data..."
            className="w-full bg-white border border-navy/10 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-navy placeholder:text-navy/40 focus:outline-none focus:border-cobalt transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <nav className="hidden lg:flex items-center gap-6 font-semibold text-xs text-navy/80">
            {DESKTOP_NAV.map((item) => (
              <a
                key={item.href}
                className="hover:text-cobalt transition-colors flex items-center gap-1"
                href={item.href}
              >
                {item.icon ? (
                  <MaterialIcon name={item.icon} className={item.iconClass} />
                ) : null}
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={openTransactions}
              className="btn-cek-transaksi hover:text-cobalt transition-colors font-semibold text-xs text-navy/80 cursor-pointer"
            >
              Cek Transaksi
            </button>
          </nav>

          <button
            type="button"
            onClick={() => open("pulsa")}
            className="md:hidden w-9 h-9 rounded-xl bg-white border border-navy/10 flex items-center justify-center text-navy shadow-sm relative cursor-pointer"
            aria-label="Pencarian Cepat"
          >
            <SearchIcon className="w-[18px] h-[18px] stroke-current" />
          </button>
          <button
            type="button"
            onClick={openTransactions}
            className="btn-cek-transaksi md:hidden w-9 h-9 rounded-xl bg-white border border-navy/10 flex items-center justify-center text-navy shadow-sm relative cursor-pointer"
            aria-label="Cek Transaksi"
            title="Cek Transaksi"
          >
            <MaterialIcon name="receipt_long" className="text-[18px]" />
          </button>
          <button
            type="button"
            id="btn-mobile-menu"
            onClick={openMenu}
            className="md:hidden w-9 h-9 rounded-xl bg-white border border-navy/10 flex items-center justify-center text-navy shadow-sm relative hover:bg-offwhite active:scale-95 transition-all cursor-pointer"
            aria-label="Menu Navigasi Mobile"
          >
            <MenuIcon className="w-5 h-5 text-navy" />
          </button>
        </div>
      </div>
    </header>
  );
}
