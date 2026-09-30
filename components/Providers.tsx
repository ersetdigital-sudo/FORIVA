"use client";

import { CheckoutDrawer } from "@/components/checkout/CheckoutDrawer";
import { MobileNav } from "@/components/layout/MobileNav";
import { CheckTransactionModal } from "@/components/transaction/CheckTransactionModal";
import { Toaster } from "@/components/ui/Toaster";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { MobileNavProvider } from "@/context/MobileNavContext";
import { ToastProvider } from "@/context/ToastContext";
import { TransactionProvider } from "@/context/TransactionContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
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
    </ToastProvider>
  );
}
