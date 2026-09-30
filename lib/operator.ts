import { onlyDigits } from "@/lib/format";
import type { CategoryKey, OperatorBadge } from "@/types";

const BADGE_BASE =
  "absolute right-3 top-1/2 -translate-y-1/2 font-heading font-bold text-xs px-2.5 py-1 rounded-lg";

const PREFIXES: { prefixes: string[]; label: string; color: string }[] = [
  {
    prefixes: ["0811", "0812", "0813", "0821", "0822", "0852", "0853"],
    label: "TELKOMSEL",
    color: "bg-red-600 text-white",
  },
  {
    prefixes: ["0814", "0815", "0816", "0855", "0856", "0857", "0858"],
    label: "INDOSAT",
    color: "bg-yellow-400 text-navy",
  },
  {
    prefixes: ["0817", "0818", "0819", "0859", "0877", "0878"],
    label: "XL AXIATA",
    color: "bg-cobalt text-lime",
  },
  {
    prefixes: ["0895", "0896", "0897", "0898", "0899"],
    label: "TRI (3)",
    color: "bg-purple-700 text-white",
  },
  {
    prefixes: ["0881", "0882", "0883", "0887"],
    label: "SMARTFREN",
    color: "bg-pink-600 text-white",
  },
];

/**
 * Deteksi operator dari prefix nomor HP. Hanya berlaku untuk kategori
 * seluler (pulsa / data / e-money); kategori lain mengembalikan label
 * konteks tanpa badge.
 */
export function detectOperator(
  value: string,
  category: CategoryKey,
): { text: string; badge: OperatorBadge | null } {
  const clean = onlyDigits(value);

  if (category === "pulsa" || category === "data" || category === "emoney") {
    const match = PREFIXES.find((group) =>
      group.prefixes.some((prefix) => clean.startsWith(prefix)),
    );

    if (!match) return { text: "", badge: null };

    return {
      text: match.label,
      badge: { text: match.label, badgeClass: `${BADGE_BASE} ${match.color}` },
    };
  }

  if (category === "pln") {
    return { text: "PLN PRABAYAR / PASCABAYAR", badge: null };
  }

  return { text: "", badge: null };
}
