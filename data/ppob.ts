import type { PpobCatalog } from "@/types";

export const PPOB_PRODUCTS: PpobCatalog = {
  pulsa: {
    title: "Isi Pulsa Reguler",
    label: "Nomor Handphone",
    placeholder: "081234567890",
    helper:
      "Ketik nomor HP aktif. Operator Telkomsel, Indosat, XL, Tri, Smartfren terdeteksi otomatis.",
    admin: 1000,
    items: [
      { name: "Pulsa 5.000", price: 5900, val: "5k" },
      { name: "Pulsa 10.000", price: 10850, val: "10k" },
      { name: "Pulsa 20.000", price: 20600, val: "20k" },
      { name: "Pulsa 25.000", price: 25400, val: "25k" },
      { name: "Pulsa 50.000", price: 50250, val: "50k", popular: true },
      { name: "Pulsa 100.000", price: 99800, val: "100k" },
    ],
  },
  pln: {
    title: "PLN Token & Pascabayar",
    label: "ID Pelanggan / No. Meter",
    placeholder: "14238910291",
    helper: "Masukkan 11-12 digit nomor meteran atau ID pelanggan PLN.",
    admin: 1000,
    items: [
      { name: "Token 20.000", price: 20500, val: "pln20" },
      { name: "Token 50.000", price: 50500, val: "pln50", popular: true },
      { name: "Token 100.000", price: 100500, val: "pln100" },
      { name: "Token 200.000", price: 200500, val: "pln200" },
      { name: "Token 500.000", price: 500500, val: "pln500" },
      { name: "Tagihan Pasca", price: 185000, val: "plnpasca" },
    ],
  },
  data: {
    title: "Paket Data Internet",
    label: "Nomor Handphone",
    placeholder: "085712345678",
    helper:
      "Pastikan kartu SIM dalam masa aktif sebelum membeli paket kuota.",
    admin: 1000,
    items: [
      { name: "Flash 3GB 30 Hari", price: 22000, val: "d3" },
      { name: "Combo 10GB 30 Hari", price: 45000, val: "d10", popular: true },
      { name: "Unlimited 25GB", price: 78000, val: "d25" },
      { name: "Harian 2GB / 3 Hari", price: 11000, val: "d2h" },
      { name: "Super Deal 50GB", price: 125000, val: "d50" },
      { name: "Kupon Booster 5GB", price: 18500, val: "dbooster" },
    ],
  },
  pdam: {
    title: "Tagihan Air PDAM",
    label: "Nomor Sambungan / Pelanggan",
    placeholder: "109281920",
    helper:
      "Masukkan nomor pelanggan yang tertera pada faktur PDAM rumah Anda.",
    admin: 1500,
    items: [
      { name: "PDAM DKI Jakarta (PAM Jaya)", price: 74200, val: "pdam1" },
      { name: "PDAM Tirtawening Bandung", price: 62500, val: "pdam2" },
      { name: "PDAM Surya Sembada Sby", price: 88000, val: "pdam3", popular: true },
      { name: "PDAM Tirta Raharja Kab. Bdg", price: 54000, val: "pdam4" },
      { name: "PDAM Kota Semarang", price: 69500, val: "pdam5" },
      { name: "Wilayah Lainnya (Cek Otomatis)", price: 95000, val: "pdam6" },
    ],
  },
  bpjs: {
    title: "BPJS Kesehatan",
    label: "Nomor Virtual Account / Peserta",
    placeholder: "8888801234567890",
    helper: "Format VA BPJS: 88888 + 11 digit nomor kartu BPJS Anda.",
    admin: 1500,
    items: [
      { name: "Iuran Kelas 3 (1 Orang)", price: 35000, val: "bpjs3" },
      { name: "Iuran Kelas 2 (1 Orang)", price: 100000, val: "bpjs2" },
      { name: "Iuran Kelas 1 (1 Orang)", price: 150000, val: "bpjs1", popular: true },
      { name: "Iuran Kelas 3 (Keluarga 3 Org)", price: 105000, val: "bpjs3k" },
      { name: "Iuran Kelas 2 (Keluarga 2 Org)", price: 200000, val: "bpjs2k" },
      { name: "Cek Tunggakan Khusus", price: 175000, val: "bpjsmanual" },
    ],
  },
  internet: {
    title: "Tagihan WiFi & Internet Rumah",
    label: "Nomor Pelanggan Internet",
    placeholder: "1229381920",
    helper:
      "Mendukung IndiHome, Biznet, First Media, MyRepublic, Oxygen, CBN.",
    admin: 2000,
    items: [
      { name: "IndiHome 30 Mbps", price: 310000, val: "indi30", popular: true },
      { name: "IndiHome 50 Mbps", price: 425000, val: "indi50" },
      { name: "Biznet Home 1C", price: 375000, val: "biz1c" },
      { name: "First Media Combo", price: 385000, val: "first" },
      { name: "MyRepublic Nova", price: 330000, val: "myrep" },
      { name: "Oxygen Home Stream", price: 299000, val: "oxygen" },
    ],
  },
  emoney: {
    title: "Top Up Uang Elektronik",
    label: "Nomor Akun / Handphone Terdaftar",
    placeholder: "081298765432",
    helper: "Pastikan nomor akun GoPay, OVO, DANA, ShopeePay sudah benar.",
    admin: 1000,
    items: [
      { name: "GoPay 20.000", price: 21000, val: "gopay20" },
      { name: "GoPay 50.000", price: 51000, val: "gopay50", popular: true },
      { name: "DANA 50.000", price: 50800, val: "dana50" },
      { name: "DANA 100.000", price: 100800, val: "dana100" },
      { name: "ShopeePay 50.000", price: 51200, val: "spay50" },
      { name: "OVO 50.000", price: 51500, val: "ovo50" },
    ],
  },
  cicilan: {
    title: "Multifinance & Cicilan",
    label: "Nomor Kontrak / Perjanjian",
    placeholder: "202391029102",
    helper:
      "Masukkan nomor kontrak leasing kendaraan atau cicilan barang.",
    admin: 2500,
    items: [
      { name: "FIF Group (Motor Honda)", price: 450000, val: "fif1" },
      { name: "BAF (Yamaha Motor)", price: 520000, val: "baf" },
      { name: "Adira Finance", price: 680000, val: "adira", popular: true },
      { name: "WOM Finance", price: 430000, val: "wom" },
      { name: "OTO Kredit Motor", price: 510000, val: "oto" },
      { name: "Mega Auto Finance (MAF)", price: 490000, val: "maf" },
    ],
  },
};

export const CATEGORY_KEYS = Object.keys(PPOB_PRODUCTS) as (keyof typeof PPOB_PRODUCTS)[];
