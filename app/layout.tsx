import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "@/components/Providers";
import { FAQ_ITEMS } from "@/data/content";
import { SITE_URL, formatWaDisplay } from "@/lib/constants";
import { getStoreData } from "@/lib/store";
import "./globals.css";

/**
 * Halaman selalu dirender ulang di server (bukan di-cache statis) supaya
 * perubahan yang disimpan admin di dashboard langsung terlihat di homepage
 * cukup dengan refresh — tanpa perlu deploy ulang.
 */
export const dynamic = "force-dynamic";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-bricolage",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

const materialSymbols = localFont({
  src: "./fonts/material-symbols-outlined.woff2",
  display: "block",
  variable: "--font-material-symbols",
});

/** Metadata diambil dari tabel `settings` Supabase, bukan hardcode. */
export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getStoreData();
  const title = `${settings.nama_brand} — ${settings.tagline}`;
  const banner = settings.banner_url ?? undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${settings.nama_brand}`,
    },
    description: settings.deskripsi,
    applicationName: settings.nama_brand,
    keywords: [
      "PPOB",
      "beli pulsa online",
      "token PLN",
      "bayar tagihan online",
      "QRIS",
      "paket data",
      "top up e-money",
      "BPJS",
      "PDAM",
      "guest checkout",
    ],
    authors: [{ name: `${settings.nama_brand} PPOB Network` }],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: "/",
      siteName: settings.nama_brand,
      title,
      description: settings.deskripsi,
      images: banner ? [{ url: banner, width: 1670, height: 941, alt: `Promo ${settings.nama_brand}` }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: settings.deskripsi,
      images: banner ? [banner] : [],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    category: "finance",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2457FF",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const store = await getStoreData();
  const { settings } = store;
  const waDisplay = formatWaDisplay(settings.nomor_wa_cs);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: settings.nama_brand,
        url: SITE_URL,
        slogan: settings.tagline,
        description: settings.deskripsi,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
        areaServed: { "@type": "Country", name: "Indonesia" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: waDisplay,
          availableLanguage: ["id"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: settings.nama_brand,
        description: settings.deskripsi,
        inLanguage: "id-ID",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer.map((part) => part.text).join(""),
          },
        })),
      },
    ],
  };

  return (
    <html
      lang="id"
      className={`scroll-smooth ${bricolage.variable} ${instrumentSans.variable} ${materialSymbols.variable}`}
    >
      <body className="antialiased min-h-screen selection:bg-lime selection:text-navy">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Providers store={store}>{children}</Providers>
      </body>
    </html>
  );
}
