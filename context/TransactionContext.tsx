"use client";

import { createContext, useContext } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import type { TransactionsApi } from "@/hooks/useTransactions";

const TransactionContext = createContext<TransactionsApi | null>(null);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const api = useTransactions();
  return (
    <TransactionContext.Provider value={api}>{children}</TransactionContext.Provider>
  );
}

export function useTransactionsContext() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionsContext harus dipakai di dalam TransactionProvider",
    );
  }
  return context;
}
