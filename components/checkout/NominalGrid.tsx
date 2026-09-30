"use client";

import { formatRupiah } from "@/lib/format";
import type { PpobItem } from "@/types";

interface NominalGridProps {
  items: PpobItem[];
  adminFee: number;
  selectedVal?: string;
  onSelect: (item: PpobItem, adminFee: number) => void;
}

/**
 * Chip nominal berbasis radio native supaya state terpilih tetap
 * di-handle CSS (.chip-radio:checked + label) seperti desain awal.
 */
export function NominalGrid({
  items,
  adminFee,
  selectedVal,
  onSelect,
}: NominalGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <div key={item.val} className="relative">
          <input
            type="radio"
            name="nominal_choice"
            id={`nom_${item.val}`}
            value={item.val}
            checked={selectedVal === item.val}
            onChange={() => onSelect(item, adminFee)}
            className="chip-radio sr-only"
          />
          <label
            htmlFor={`nom_${item.val}`}
            className="block p-3 sm:p-3.5 bg-white border border-navy/10 rounded-xl cursor-pointer transition-all hover:border-cobalt/50 select-none text-left"
          >
            <span className="chip-title block text-xs font-semibold text-navy truncate">
              {item.name}
            </span>
            <span className="chip-price font-heading font-bold text-sm text-cobalt block mt-1">
              {formatRupiah(item.price)}
            </span>
            {item.popular ? (
              <span className="chip-badge text-[9px] font-semibold bg-lime text-navy px-1.5 py-0.5 rounded mt-1.5 inline-block">
                Best Choice
              </span>
            ) : null}
          </label>
        </div>
      ))}
    </div>
  );
}
