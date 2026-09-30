import type { CategoryKey, PpobItem } from "@/types";

export interface QuickTab {
  key: CategoryKey;
  tabLabel: string;
  label: string;
  placeholder: string;
  nominals: PpobItem[];
  iconFilled?: boolean;
}

export const QUICK_TABS: QuickTab[] = [
  {
    key: "pulsa",
    tabLabel: "Pulsa",
    label: "Nomor Handphone",
    placeholder: "Contoh: 081234567890",
    nominals: [
      { name: "50.000", price: 50250, val: "50k" },
      { name: "100.000", price: 99800, val: "100k" },
      { name: "25.000", price: 25400, val: "25k" },
    ],
  },
  {
    key: "data",
    tabLabel: "Paket Data",
    label: "Nomor Handphone",
    placeholder: "Contoh: 085712345678",
    nominals: [
      { name: "Combo 10GB", price: 45000, val: "d10" },
      { name: "Unlimited 25GB", price: 78000, val: "d25" },
      { name: "Flash 3GB", price: 22000, val: "d3" },
    ],
  },
  {
    key: "pln",
    tabLabel: "Listrik PLN",
    label: "ID Pelanggan / No. Meter PLN",
    placeholder: "Contoh: 14238910291",
    nominals: [
      { name: "Token 50k", price: 50500, val: "pln50" },
      { name: "Token 100k", price: 100500, val: "pln100" },
      { name: "Token 20k", price: 20500, val: "pln20" },
    ],
    iconFilled: true,
  },
  {
    key: "pdam",
    tabLabel: "Air PDAM",
    label: "Nomor Pelanggan PDAM",
    placeholder: "Contoh: 109281920",
    nominals: [
      { name: "DKI Jakarta", price: 74200, val: "pdam1" },
      { name: "Bandung", price: 62500, val: "pdam2" },
      { name: "Surabaya", price: 88000, val: "pdam3" },
    ],
  },
  {
    key: "bpjs",
    tabLabel: "BPJS",
    label: "Nomor Virtual Account BPJS",
    placeholder: "Contoh: 8888801234567890",
    nominals: [
      { name: "Kelas 3", price: 35000, val: "bpjs3" },
      { name: "Kelas 2", price: 100000, val: "bpjs2" },
      { name: "Kelas 1", price: 150000, val: "bpjs1" },
    ],
  },
  {
    key: "emoney",
    tabLabel: "E-Money",
    label: "Nomor Akun / Handphone Terdaftar",
    placeholder: "Contoh: 081298765432",
    nominals: [
      { name: "GoPay 50.000", price: 51000, val: "gopay50" },
      { name: "DANA 50.000", price: 50800, val: "dana50" },
      { name: "ShopeePay 50.000", price: 51200, val: "spay50" },
    ],
  },
];

export const QUICK_ADMIN_FEE = 1000;
