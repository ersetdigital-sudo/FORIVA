"use client";

import { useEffect, useState } from "react";
import { randomSerialNumber } from "@/lib/generate";
import type { TransactionRecord } from "@/types";

export function useTransactions() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<TransactionRecord | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const open = () => setIsOpen(true);

  const close = () => {
    setIsOpen(false);
    setResult(null);
  };

  const search = () => {
    const trimmed = query.trim();
    const invoice = trimmed || `FRV-${Math.floor(10000 + Math.random() * 90000)}`;

    setResult({
      invoice,
      product: "Pulsa Telkomsel 50.000",
      target: invoice.startsWith("08") ? invoice : "081234567890",
      sn: `SN2026${randomSerialNumber().replace("SN", "")}`,
      total: 51250,
      status: "success",
      time: "Baru Saja",
    });
  };

  return {
    isOpen,
    open,
    close,
    query,
    setQuery,
    result,
    search,
  };
}

export type TransactionsApi = ReturnType<typeof useTransactions>;
