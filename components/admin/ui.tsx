/**
 * Komponen presentasional bersama untuk dashboard admin.
 * Gaya mengikuti "Alabaster Grid Console": hairline, flat, satu aksen teal.
 */
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { TRANSACTION_STATUS_LABEL, type TransactionStatus } from "@/types/store";

/** Style dasar input/select/textarea agar seragam di semua form. */
export const inputBase =
  "w-full rounded-md border border-hairline bg-panel px-3 py-2.5 text-[13px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent focus:ring-2 focus:ring-accent/15";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-ink-soft">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function Card({
  title,
  description,
  action,
  children,
  className = "",
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-hairline bg-panel shadow-console-ring ${className}`}
    >
      {title ? (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-5 py-4">
          <div>
            <h2 className="text-[14px] font-semibold tracking-tight text-ink">
              {title}
            </h2>
            {description ? (
              <p className="mt-0.5 text-[12px] text-ink-soft">{description}</p>
            ) : null}
          </div>
          {action}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: string;
}) {
  return (
    <div className="rounded-lg border border-hairline bg-panel p-4 shadow-console-ring">
      <div className="flex items-start justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          {label}
        </span>
        <MaterialIcon name={icon} className="text-[18px] text-accent" />
      </div>
      <div className="mt-3 font-console-mono text-2xl font-semibold tracking-tight text-ink tabular-nums">
        {value}
      </div>
      {hint ? <p className="mt-1 text-[11px] text-ink-soft">{hint}</p> : null}
    </div>
  );
}

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block" htmlFor={htmlFor}>
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="mt-1.5 block text-[11px] leading-relaxed text-ink-faint">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

const STATUS_STYLE: Record<TransactionStatus, string> = {
  pending: "border-signal/25 bg-signal/10 text-signal",
  process: "border-accent/25 bg-accent-soft text-accent",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  failed: "border-rose-200 bg-rose-50 text-rose-700",
};

export function StatusPill({ status }: { status: TransactionStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS_STYLE[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {TRANSACTION_STATUS_LABEL[status]}
    </span>
  );
}

export function EmptyState({
  icon = "inbox",
  title,
  description,
}: {
  icon?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-lg border border-hairline bg-console">
        <MaterialIcon name={icon} className="text-[20px] text-ink-faint" />
      </span>
      <p className="mt-3 text-[13px] font-semibold text-ink">{title}</p>
      {description ? (
        <p className="mt-1 max-w-sm text-[12px] text-ink-soft">{description}</p>
      ) : null}
    </div>
  );
}
