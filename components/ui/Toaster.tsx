"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useToast } from "@/context/ToastContext";

export function Toaster() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[60] flex flex-col items-center gap-2 px-4 md:bottom-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="animate-fadeIn flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 font-heading text-xs font-semibold text-white shadow-soft-drawer"
        >
          <MaterialIcon name="check_circle" className="text-[16px] text-lime" />
          {toast.message}
        </div>
      ))}
    </div>
  );
}
