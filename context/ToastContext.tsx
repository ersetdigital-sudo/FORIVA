"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { copyText } from "@/hooks/useScrollLock";

export type ToastTone = "success" | "error";

interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (message: string, tone?: ToastTone) => void;
  copy: (text: string, message: string) => Promise<void>;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const showToast = useCallback((message: string, tone: ToastTone = "success") => {
    idRef.current += 1;
    const id = idRef.current;
    setToasts((current) => [...current, { id, message, tone }]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 2400);
  }, []);

  const copy = useCallback(
    async (text: string, message: string) => {
      const ok = await copyText(text);
      showToast(ok ? message : "Gagal menyalin, coba salin manual ya.");
    },
    [showToast],
  );

  const value = useMemo(
    () => ({ toasts, showToast, copy }),
    [toasts, showToast, copy],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast harus dipakai di dalam ToastProvider");
  return context;
}
