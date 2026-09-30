import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FaqSection } from "@/components/sections/FaqSection";
import { FlashDeals } from "@/components/sections/FlashDeals";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <h1 className="sr-only">
          Foriva — Marketplace PPOB tanpa akun: pulsa, token PLN, paket data,
          dan bayar semua tagihan lewat QRIS 24 jam.
        </h1>
        <HeroSection />
        <FlashDeals />
        <ServicesSection />
        <HowItWorks />
        <Testimonials />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
