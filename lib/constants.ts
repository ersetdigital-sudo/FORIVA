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

/** Bikin link wa.me dari nomor apa pun (nomor dinamis dari tabel settings). */
export const whatsappLinkTo = (number: string, message: string) =>
  `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

/** Ubah "6281234567890" jadi "+62 812-3456-7890" untuk ditampilkan. */
export const formatWaDisplay = (number: string) => {
  const digits = number.replace(/\D/g, "");
  const local = digits.startsWith("62") ? digits.slice(2) : digits;
  if (local.length < 9) return `+${digits}`;
  return `+62 ${local.slice(0, 3)}-${local.slice(3, 7)}-${local.slice(7)}`;
};

export const whatsappLink = (message: string) =>
  whatsappLinkTo(WHATSAPP_NUMBER, message);

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
