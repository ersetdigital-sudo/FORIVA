/** Tombol submit yang otomatis menampilkan status proses dari server action. */
"use client";

import { useFormStatus } from "react-dom";

type Variant = "primary" | "danger" | "accent-soft" | "warm-danger";
type Size = "md" | "sm";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-dark",
  danger:
    "border border-hairline bg-panel text-rose-600 hover:border-rose-200 hover:bg-rose-50",
  "accent-soft":
    "border border-accent/25 bg-panel text-accent hover:border-accent hover:bg-accent-soft",
  "warm-danger":
    "border border-[#EBD3CF] bg-[#FBF1EF] text-warm-danger hover:bg-[#F7E7E4]",
};

const SIZE_CLASS: Record<Size, string> = {
  md: "px-4 py-2.5 text-[13px]",
  sm: "px-2.5 py-1.5 text-[11px]",
};

export function SubmitButton({
  children,
  pendingLabel = "Menyimpan…",
  variant = "primary",
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer ${VARIANT_CLASS[variant]} ${SIZE_CLASS[size]} ${className}`}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
