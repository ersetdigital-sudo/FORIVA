"use client";

import { createContext, useContext } from "react";
import { useMobileNav } from "@/hooks/useMobileNav";
import type { MobileNavApi } from "@/hooks/useMobileNav";

const MobileNavContext = createContext<MobileNavApi | null>(null);

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const api = useMobileNav();
  return (
    <MobileNavContext.Provider value={api}>{children}</MobileNavContext.Provider>
  );
}

export function useMobileNavContext() {
  const context = useContext(MobileNavContext);
  if (!context) {
    throw new Error("useMobileNavContext harus dipakai di dalam MobileNavProvider");
  }
  return context;
}
