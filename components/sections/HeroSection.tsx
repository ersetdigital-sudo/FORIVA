import Image from "next/image";

import { QuickTransaction } from "@/components/sections/QuickTransaction";
import { BANNER_IMAGE } from "@/lib/constants";
import { getSettings } from "@/lib/store";

export async function HeroSection() {
  // Banner diambil dari tabel settings Supabase (fallback ke gambar statis).
  const settings = await getSettings();
  const banner = settings.banner_url || BANNER_IMAGE;

  return (
    <section className="pt-6 pb-12 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-navy/10 shadow-soft-elevated bg-navy">
        <Image
          src={banner}
          alt={`Promo ${settings.nama_brand}`}
          width={1670}
          height={941}
          priority
          sizes="(min-width: 1152px) 1104px, calc(100vw - 32px)"
          className="block w-full h-auto"
        />
      </div>
      <QuickTransaction />
    </section>
  );
}
