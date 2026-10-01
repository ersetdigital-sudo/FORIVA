/**
 * Hook pembantu untuk form admin yang memanggil server action.
 *
 * Menggabungkan useActionState + toast notifikasi, sehingga setiap kali admin
 * menyimpan perubahan akan muncul notifikasi sukses/gagal secara otomatis.
 */
"use client";

import { useActionState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import type { ActionResult } from "@/app/admin/actions";

export function useAdminAction(
  action: (formData: FormData) => Promise<ActionResult>,
  successMessage: string,
) {
  const { showToast } = useToast();

  const [state, formAction, pending] = useActionState(
    async (_previous: ActionResult | null, formData: FormData) => action(formData),
    null,
  );

  useEffect(() => {
    if (!state) return;
    if (state.ok) showToast(successMessage);
    else showToast(state.message, "error");
  }, [state, showToast, successMessage]);

  return {
    formAction,
    pending,
    error: state && !state.ok ? state.message : null,
  };
}
