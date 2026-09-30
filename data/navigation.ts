export const POPULAR_SERVICES = [
  { label: "Isi Pulsa Reguler", category: "pulsa" as const },
  { label: "Beli Token PLN 24 Jam", category: "pln" as const },
  { label: "Paket Data Hemat", category: "data" as const },
  { label: "Top Up GoPay & DANA", category: "emoney" as const },
  { label: "Bayar Iuran BPJS", category: "bpjs" as const },
];

export const DESKTOP_NAV = [
  {
    label: "Promo",
    href: "#flash-sale",
    icon: "local_fire_department",
    iconClass: "text-[16px] text-rose-500",
  },
  { label: "Cara Bayar", href: "#cara-bayar" },
  { label: "Bantuan", href: "/bantuan" },
];

export const MOBILE_MENU_LINKS = [
  {
    label: "Kategori Layanan",
    href: "#layanan",
    icon: "grid_view",
    iconClass: "text-cobalt",
    badge: { text: "8 Produk", className: "text-[10px] font-mono text-navy/50" },
  },
  {
    label: "Cara Bayar & Panduan",
    href: "#cara-bayar",
    icon: "qr_code_scanner",
    iconClass: "text-cobalt",
  },
  {
    label: "Pusat Bantuan",
    href: "/bantuan",
    icon: "help_outline",
    iconClass: "text-cobalt",
  },
];
