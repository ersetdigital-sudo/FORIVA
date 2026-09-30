import Image from "next/image";

import { QuickTransaction } from "@/components/sections/QuickTransaction";
import { BANNER_IMAGE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="pt-6 pb-12 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-navy/10 shadow-soft-elevated bg-navy">
        <Image
          src={BANNER_IMAGE}
          alt="Promo Foriva"
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
