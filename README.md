<div align="center">

# ⚡ FORIVA

**Tagihan beres, hidup lanjut.**

Platform pembayaran PPOB direct tanpa akun — pulsa, token PLN, paket data,
top up e-money, dan bayar semua tagihan lewat QRIS 24 jam.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-UNLICENSED-red?style=flat-square)](#license)

</div>

---

## ✨ Highlights

| | |
|---|---|
| 🚫 **Tanpa akun** | Guest checkout — bayar cukup dengan invoice & nomor HP |
| 📱 **Mobile-first** | Drawer checkout 4 langkah yang adem di segala layar |
| ⚡ **Motion yang sopan** | Animasi reveal yang hidup, otomatis diam kalau user prefer reduced-motion |
| 🔍 **Cek transaksi real-time** | Lacak status + SN langsung dari modal, tanpa riwayat tersimpan |
| 🎯 **Flash deal & katalog** | 8 kategori produk PPOB dengan promo time-based |
| 📖 **Pusat bantuan modern** | 23 artikel FAQ + pencarian fuzzy, kategori, dan eskalasi CS |
| 🎨 **Design system kustom** | Token `@theme` Tailwind v4 — cobalt, lime, navy, offwhite |
| ♿ **A11y bawaan** | Modal ber-*role dialog*, focus-safe, kontras terjaga |

## 🛠 Tech Stack

```
Framework   Next.js 16 (App Router, Turbopack, RSC)
UI          React 19 + TypeScript 5.9
Styling     Tailwind CSS 4 (CSS-first @theme)
Motion      Motion (framer) — spring & layout animation
State       React Context (checkout, toast, transaksi, mobile nav)
SEO         Metadata API + JSON-LD, sitemap.ts, robots.ts
```

## 📄 Halaman

| Route | Isi |
|-------|-----|
| `/` | Landing lengkap: hero banner, flash deal, katalog layanan, cara bayar, testimoni, FAQ |
| `/bantuan` | Pusat bantuan: search-first, 6 kategori, accordion, band kontak CS |

## 📁 Struktur

```
FORIVA/
├── app/                  # Routes, layout global, fonts, SEO (sitemap/robots)
│   └── bantuan/          # Halaman pusat bantuan
├── components/
│   ├── checkout/         # Drawer checkout 4 langkah + NominalGrid
│   ├── sections/         # Hero, FlashDeals, Services, HowItWorks, FAQ, dst.
│   ├── layout/           # Header, Footer, MobileNav
│   ├── transaction/      # Modal cek status transaksi
│   ├── help/             # Pusat bantuan client component
│   ├── icons/ motion/ ui/# Ikon, Reveal wrapper, Toaster
│   └── Providers.tsx     # Gabungan semua context provider
├── context/              # Checkout, Toast, Transaction, MobileNav
├── hooks/                # useTransactions, useScrollLock, useMobileNav
├── data/                 # Katalog produk, konten, navigasi, artikel bantuan
├── lib/                  # Constants (banner, WA links), format, generate
└── types/                # Tipe bersama (TransactionRecord, dll.)
```

## 🚀 Getting Started

```bash
git clone https://github.com/ersetdigital-sudo/FORIVA.git
cd FORIVA
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve build produksi |

> **Butuh Node.js 20+** karena Next.js 16.

## 📸 Fitur Mendalam

**Checkout tanpa akun** — user pilih produk → nominal → data tujuan → pembayaran QRIS,
selesai dalam 4 langkah dengan progress jelas dan ringkasan akhir berisi SN.

**Cek Status Transaksi** — modal minimalis: input invoice/HP → kartu hasil
(status, SN, total, tombol salin). Tidak ada riwayat yang disimpan — customer
hanya melihat transaksinya sendiri.

**Pusat Bantuan** — pencarian *strict AND* dengan fallback longgar,
populer chips, 6 kategori ber-ikon, akordeon, dan band CS WhatsApp di bawah.

## 🤝 Kontak

- **Repo:** [ersetdigital-sudo/FORIVA](https://github.com/ersetdigital-sudo/FORIVA)
- **CS WhatsApp:** [+62 812-3456-7890](https://wa.me/6281234567890)

---

<div align="center">

Dibangun dengan ❤️ oleh **[ersetdigital-sudo](https://github.com/ersetdigital-sudo)**
· *"Tagihan beres, hidup lanjut."*

</div>
