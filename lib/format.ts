export function formatRupiah(value: number): string {
  if (typeof value !== "number" || Number.isNaN(value)) return "Rp0";
  return `Rp${value.toLocaleString("id-ID")}`;
}

export function formatCountdown(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function onlyDigits(value: string): string {
  return value.replace(/[^0-9]/g, "");
}
