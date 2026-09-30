import type { FlashDeal, ServiceCard } from "@/types";

export const SERVICE_CARDS: ServiceCard[] = [
  {
    id: "pulsa",
    name: "Pulsa Reguler",
    description: "Semua operator nasional, masuk instan dalam 10 detik.",
    badge: {
      text: "Mulai 5rb",
      className: "text-emerald-600 bg-emerald-50 border border-emerald-200",
    },
    iconBox:
      "bg-cobalt/10 text-cobalt group-hover:bg-cobalt group-hover:text-white",
    circle: "bg-cobalt/5",
    hoverBorder: "hover:border-cobalt",
    footer: {
      tone: "cobalt",
      left: { text: "Rp5.900", className: "font-mono font-bold" },
      right: "Isi Cepat →",
    },
  },
  {
    id: "pln",
    name: "PLN Token & Pasca",
    description: "Token prabayar & tagihan bulanan bebas cutoff tengah malam.",
    badge: { text: "24 Jam", className: "text-navy bg-lime/40" },
    iconBox: "bg-lime text-navy",
    circle: "bg-lime/15",
    hoverBorder: "hover:border-lime/80",
    footer: {
      tone: "navy",
      left: { text: "Admin Rp1.000", className: "text-navy-muted" },
      right: "Beli Token →",
    },
  },
  {
    id: "data",
    name: "Paket Data",
    description: "Kuota harian, mingguan, bulanan 50GB semua operator.",
    badge: {
      text: "Hemat 50%",
      className: "text-rose-600 bg-rose-50 border border-rose-200",
    },
    iconBox:
      "bg-cobalt/10 text-cobalt group-hover:bg-cobalt group-hover:text-white",
    circle: "bg-cobalt/5",
    hoverBorder: "hover:border-cobalt",
    footer: {
      tone: "cobalt",
      left: { text: "Banyak Promo", className: "text-navy-muted" },
      right: "Pilih Paket →",
    },
  },
  {
    id: "pdam",
    name: "Tagihan PDAM",
    description: "Cek dan bayar air minum PAM seluruh kab/kota instan.",
    badge: { text: "120+ Kota", className: "text-navy/70 bg-navy/5" },
    iconBox: "bg-offwhite text-navy group-hover:bg-cobalt group-hover:text-white",
    circle: "bg-cobalt/5",
    hoverBorder: "hover:border-cobalt",
    footer: {
      tone: "cobalt",
      left: { text: "Cek Meteran", className: "text-navy-muted" },
      right: "Bayar Air →",
    },
  },
  {
    id: "bpjs",
    name: "BPJS Kesehatan",
    description: "Iuran keluarga/perorangan tetap aktif sebelum jatuh tempo.",
    badge: {
      text: "Resmi BPJS",
      className: "text-emerald-600 bg-emerald-50 border border-emerald-200",
    },
    iconBox: "bg-lime/30 text-navy group-hover:bg-lime",
    circle: "bg-lime/15",
    hoverBorder: "hover:border-lime/80",
    footer: {
      tone: "navy",
      left: { text: "Auto Cek Iuran", className: "text-navy-muted" },
      right: "Bayar →",
    },
  },
  {
    id: "internet",
    name: "Internet & WiFi",
    description: "IndiHome, Biznet, MyRepublic, First Media verifikasi kilat.",
    badge: { text: "Bebas Denda", className: "text-cobalt bg-cobalt/10" },
    iconBox:
      "bg-cobalt/10 text-cobalt group-hover:bg-cobalt group-hover:text-white",
    circle: "bg-cobalt/5",
    hoverBorder: "hover:border-cobalt",
    footer: {
      tone: "cobalt",
      left: { text: "Cek Tagihan", className: "text-navy-muted" },
      right: "Bayar WiFi →",
    },
  },
  {
    id: "emoney",
    name: "E-Money & Dompet",
    description: "Top up GoPay, DANA, OVO, ShopeePay tanpa biaya tak terduga.",
    badge: {
      text: "Serba Ada",
      className: "text-emerald-600 bg-emerald-50 border border-emerald-200",
    },
    iconBox: "bg-offwhite text-navy group-hover:bg-cobalt group-hover:text-white",
    circle: "bg-cobalt/5",
    hoverBorder: "hover:border-cobalt",
    footer: {
      tone: "cobalt",
      left: { text: "Nominal Bebas", className: "text-navy-muted" },
      right: "Top Up →",
    },
  },
  {
    id: "cicilan",
    name: "Multifinance",
    description: "FIF, Adira, BAF, OTO, WOM angsuran kendaraan aman tercatat.",
    badge: { text: "Struk Resmi", className: "text-navy/70 bg-navy/5" },
    iconBox: "bg-lime/30 text-navy group-hover:bg-lime",
    circle: "bg-lime/15",
    hoverBorder: "hover:border-lime/80",
    footer: {
      tone: "navy",
      left: { text: "Cek Nomor Kontrak", className: "text-navy-muted" },
      right: "Bayar Cicilan →",
    },
  },
];

export const FLASH_DEALS: FlashDeal[] = [
  {
    id: "pulsa-100k",
    badge: { text: "Diskon 6%", className: "bg-rose-500 text-white" },
    meta: { text: "Sisa 12 Slot", className: "text-rose-600" },
    title: "Pulsa Telkomsel 100.000",
    price: 94000,
    compareAt: 100000,
    progress: { value: 88, barClass: "bg-rose-500" },
    note: "Terjual 88% • Kuota terbatas",
    footerNote: { text: "Langsung Masuk", className: "text-emerald-600" },
    cta: {
      label: "Beli Sekarang",
      className: "bg-cobalt hover:bg-cobalt-hover text-white",
      arrowClass: "text-lime",
    },
    category: "pulsa",
  },
  {
    id: "pln-50k",
    badge: {
      text: "Gratis Admin",
      className: "bg-lime text-navy font-heading",
    },
    meta: { text: "24 Jam Nonstop", className: "text-cobalt" },
    title: "Token PLN Listrik 50.000",
    price: 50500,
    compareAt: 53000,
    progress: { value: 94, barClass: "bg-lime" },
    note: "Terjual 94% • SN langsung terbit",
    footerNote: { text: "Kode Stroom Instan", className: "text-navy" },
    cta: {
      label: "Ambil Token",
      className: "bg-navy hover:bg-cobalt text-lime hover:text-white",
      arrowClass: "",
    },
    category: "pln",
  },
  {
    id: "data-10gb",
    badge: { text: "Hemat 30%", className: "bg-rose-500 text-white" },
    meta: { text: "Hot Deal", className: "text-rose-600" },
    title: "Paket Data Combo 10GB 30 Hari",
    price: 45000,
    compareAt: 65000,
    progress: { value: 76, barClass: "bg-cobalt" },
    note: "Terjual 76% • Semua operator",
    footerNote: { text: "Masa Aktif 30 Hari", className: "text-emerald-600" },
    cta: {
      label: "Beli Kuota",
      className: "bg-cobalt hover:bg-cobalt-hover text-white",
      arrowClass: "text-lime",
    },
    category: "data",
  },
];

export const PAYMENT_PARTNERS = [
  "BCA",
  "Mandiri Livin",
  "BRImo",
  "BNI",
  "QRIS",
  "GoPay",
  "OVO",
  "DANA",
  "ShopeePay",
];
