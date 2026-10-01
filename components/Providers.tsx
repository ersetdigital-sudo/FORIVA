/**
 * Kumpulan provider global.
 *
 * Data situs (settings, katalog produk, tab cepat, kartu layanan) datang dari
 * Server Component lewat prop `store`, jadi tidak ada data produk/settings
 * yang di-hardcode di komponen.
 *
 * Halaman /admin hanya memakai StoreProvider + ToastProvider, tanpa
 * drawer checkout / navigasi mobile milik homepage.
 */
"use client";

import { usePathname } from "next/navigation";
import { CheckoutDrawer } from "@/components/checkout/CheckoutDrawer";
import { MobileNav } from "@/components/layout/MobileNav";
import { CheckTransactionModal } from "@/components/transaction/CheckTransactionModal";
import { Toaster } from "@/components/ui/Toaster";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { MobileNavProvider } from "@/context/MobileNavContext";
import { StoreProvider, type StoreData } from "@/context/StoreContext";
import { ToastProvider } from "@/context/ToastContext";
import { TransactionProvider } from "@/context/TransactionContext";

export function Providers({
  store,
  children,
}: {
  store: StoreData;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminArea = pathname.startsWith("/admin");

  return (
    <StoreProvider value={store}>
      <ToastProvider>
        {isAdminArea ? (
          <>
            {children}
            <Toaster />
          </>
        ) : (
          <CheckoutProvider>
            <TransactionProvider>
              <MobileNavProvider>
                {children}
                <CheckoutDrawer />
                <CheckTransactionModal />
                <MobileNav />
                <Toaster />
              </MobileNavProvider>
            </TransactionProvider>
          </CheckoutProvider>
        )}
      </ToastProvider>
    </StoreProvider>
  );
}
