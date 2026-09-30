export const SITE_NAME = "Foriva";
export const SITE_TAGLINE = "Tagihan beres, hidup lanjut.";
export const SITE_DESCRIPTION =
  "Foriva adalah marketplace PPOB direct tanpa akun. Beli pulsa, token PLN, paket data, dan bayar tagihan PDAM, BPJS, internet, cicilan, serta top up e-money lewat QRIS 24 jam.";

/**
 * TODO(manual): ganti ke domain produksi (atau set env NEXT_PUBLIC_SITE_URL)
 * supaya sitemap.xml / canonical / OG url menunjuk ke URL yang benar.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://foriva.id";

export const WHATSAPP_NUMBER = "6281234567890";
export const WHATSAPP_DISPLAY = "+62 812-3456-7890";

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WA_CS_LINK = whatsappLink(
  "Halo Admin Foriva, saya butuh bantuan transaksi",
);
export const WA_TRACK_LINK = whatsappLink(
  "Halo Admin Foriva, mau bantuan lacak transaksi",
);

/** TODO(manual): ganti dengan QRIS dinamis milik merchant. */
export const QRIS_IMAGE = "/images/qris.png";
/** TODO(manual): ganti dengan NMID merchant QRIS. */
export const QRIS_NMID = "ID1020039201928";

export const BANNER_IMAGE =
  "https://res.cloudinary.com/omsjoxy8/image/upload/v1790753125/ChatGPT_Image_30_Sep_2026_14.24.34.png";
