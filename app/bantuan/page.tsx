import type { Metadata } from "next";
import { HelpCenter } from "@/components/help/HelpCenter";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HELP_ARTICLES } from "@/data/help";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pusat Bantuan",
  description:
    "Cara cek transaksi, refund dana gagal, token PLN belum masuk, pulsa telat, dan kendala PPOB lainnya. Jawaban singkat plus CS WhatsApp Foriva 07.00–23.30 WIB.",
  alternates: { canonical: "/bantuan" },
  openGraph: {
    title: `Pusat Bantuan ${SITE_NAME} — Pertanyaan seputar transaksi & pengembalian dana`,
    description:
      "Jawaban cepat untuk kendala transaksi PPOB: status, refund, token PLN, pulsa, tagihan. Plus CS WhatsApp.",
    url: "/bantuan",
    type: "website",
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/bantuan#faq`,
  mainEntity: HELP_ARTICLES.map((article) => ({
    "@type": "Question",
    name: article.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: article.steps ? `${article.a} ${article.steps.join(" ")}` : article.a,
    },
  })),
};

export default function BantuanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <SiteHeader />
      <main>
        <HelpCenter />
      </main>
      <SiteFooter />
    </>
  );
}
