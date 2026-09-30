export interface HelpCategory {
  id: string;
  label: string;
  desc: string;
  icon: string;
  iconClass: string;
}

export interface HelpArticle {
  id: string;
  category: string;
  q: string;
  a: string;
  /** Langkah bernomor (opsional) — tampil sebagai daftar di bawah jawaban. */
  steps?: string[];
  /** Kata kunci tambahan biar search nemu walau istilahnya beda. */
  keywords?: string;
  popular?: boolean;
}

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    id: "mulai",
    label: "Mulai & Pembayaran",
    desc: "Akun, QRIS, dan biaya.",
    icon: "qr_code_scanner",
    iconClass: "text-cobalt",
  },
  {
    id: "status",
    label: "Status Transaksi",
    desc: "Cek, lacak, dan struk.",
    icon: "receipt_long",
    iconClass: "text-navy",
  },
  {
    id: "gagal",
    label: "Gagal & Dana Kembali",
    desc: "Dana nyangkut? Tenang.",
    icon: "assignment_return",
    iconClass: "text-rose-500",
  },
  {
    id: "pln",
    label: "Token & Listrik PLN",
    desc: "Token belum masuk meteran.",
    icon: "bolt",
    iconClass: "text-amber-500",
  },
  {
    id: "isi-ulang",
    label: "Pulsa, Data & E-Money",
    desc: "Isi ulang yang belum nyampe.",
    icon: "phone_iphone",
    iconClass: "text-emerald-600",
  },
  {
    id: "tagihan",
    label: "Tagihan & Cicilan",
    desc: "BPJS, PDAM, internet, cicilan.",
    icon: "home",
    iconClass: "text-violet-600",
  },
];

export const HELP_ARTICLES: HelpArticle[] = [
  // ── Mulai & Pembayaran ──────────────────────────────────────────────
  {
    id: "perlu-akun",
    category: "mulai",
    q: "Perlu daftar akun dulu nggak?",
    a: "Nggak perlu sama sekali — justru itu poin Foriva. Kamu tinggal masukkan nomor tujuan, pilih nominal, scan QRIS dari aplikasi bank atau e-wallet mana pun, beres. Nggak ada email, nggak ada OTP, nggak ada langkah verifikasi yang bikin males.",
    keywords: "daftar registrasi akun login guest checkout tanpa akun verifikasi otp",
    popular: true,
  },
  {
    id: "bayar-pakai-apa",
    category: "mulai",
    q: "Bayarnya pakai apa aja?",
    a: "Semua yang punya fitur scan QR bisa. Livin Mandiri, BRImo, BCA Mobile, BNI Mobile, sampai GoPay, OVO, DANA, dan ShopeePay — asal kameranya bisa arah ke QRIS, bisa dipakai bayar di sini.",
    keywords: "qris bayar bank e-wallet gopay ovo dana shopeepay livin brimo bca",
  },
  {
    id: "biaya-admin",
    category: "mulai",
    q: "Ada biaya admin tambahan nggak?",
    a: "Harga yang tampil di layar itu harga final. Nominal belanja, diskon, sampai biaya admin sudah dihitung di ringkasan sebelum kamu bayar — jadi nggak akan ada angka kejutan waktu cek mutasi rekening.",
    keywords: "biaya admin markup mahal harga transparan tambahan",
  },
  {
    id: "aman-tanpa-akun",
    category: "mulai",
    q: "Aman nggak sih transaksi tanpa akun?",
    a: "Aman, karena yang kami proses cuma transaksi yang kamu mulai sendiri lewat QRIS. Foriva tidak menyimpan saldo, tidak menyimpan data kartu, dan tidak minta password bank kamu. Riwayatnya cuma invoice dan nomor struk — buat jaga-jaga kalau perlu dicek lagi.",
    keywords: "aman penipuan fraud data kartu keamanan privasi",
  },

  // ── Status Transaksi ────────────────────────────────────────────────
  {
    id: "cek-transaksi",
    category: "status",
    q: "Gimana cara cek transaksi saya?",
    a: "Klik tombol Cek Transaksi di pojok kanan atas, lalu masukkan nomor invoice (format FRV-xxxxx) yang muncul di layar konfirmasi. Di situ kelihatan statusnya, serial number / struk digitalnya, sampai riwayat transaksi terakhir.",
    keywords: "cek status lacak invoice frv struk sn receipt riwayat",
    popular: true,
  },
  {
    id: "lama-proses",
    category: "status",
    q: "Berapa lama proses transaksinya?",
    a: "Rata-rata 5–30 detik setelah QRIS sukses terpotong. Tagihan pascabayar seperti BPJS, PDAM, atau internet umumnya lunas dalam hitungan menit, paling lama 1×24 jam menunggu sistem penyedia. Kalau lewat itu dan statusnya masih proses, baru deh chat CS.",
    keywords: "lama proses berapa lama cepat pending pendingan instant detik",
    popular: true,
  },
  {
    id: "hilang-struk",
    category: "status",
    q: "Struk digital / SN-nya hilang, bisa dilihat lagi?",
    a: "Bisa. Semua bukti transaksi — SN token, nomor pelanggan, bukti bayar — tersimpan di detail transaksi. Tinggal buka Cek Transaksi pakai nomor invoice-mu. Kalau ternyata tidak bisa diakses, CS bisa kirim ulang asal ada nomor invoice dan waktu transaksinya.",
    keywords: "struk sn serial hilang bukti bayar kirim ulang receipt",
  },
  {
    id: "lama-pending",
    category: "status",
    q: "Transaksi masih Diproses dari tadi, itu wajar?",
    a: "Wajar, selama masih di dalam estimasi. Transaksi yang sedang berjalan tidak bisa dibatalkan — biarkan sampai statusnya final. Kalau sudah melewati batas waktu wajar (biasanya 1×24 jam) dan belum juga berubah, lapor ke CS bawa nomor invoice, nanti kami yang telusuri ke penyedia.",
    keywords: "pending proses lama stuck belum berubah dibatalkan cancel",
  },

  // ── Gagal & Pengembalian Dana ───────────────────────────────────────
  {
    id: "terpotong-belum-lunas",
    category: "gagal",
    q: "Saldo sudah terpotong, tapi tagihan belum lunas. Uang saya ke mana?",
    a: "Tenang, dananya nggak hilang — cuma jalan dulu. Ada dua kemungkinan: transaksi masih antrian di sistem penyedia, atau memang dinyatakan gagal. Kalau gagal, uangnya balik otomatis ke sumber pembayaran yang sama. Simpan invoice-mu, dan kalau mau cepat, chat CS sertakan screenshot bukti potongannya.",
    keywords: "saldo terpotong uang hilang belum lunas bayar gagal dana nyangkut",
    popular: true,
  },
  {
    id: "refund-ke-mana",
    category: "gagal",
    q: "Kalau transaksi gagal, refund-nya masuk ke mana?",
    a: "Balik persis ke sumber asal pembayaranmu — bayar pakai QRIS bank ya banknya, pakai ShopeePay ya ShopeePay-nya. Waktunya beda-beda: e-wallet biasanya instan sampai 1×24 jam, QRIS/transfer bank 1–3 hari kerja. Kami sengaja tidak mengirim ke rekening lain supaya dananya nggak salah sasaran.",
    keywords: "refund uang kembali pengembalian dana cashback balik rekening e-wallet",
    popular: true,
  },
  {
    id: "salah-nomor",
    category: "gagal",
    q: "Salah ketik nomor HP / nomor meter, bisa dibatalkan?",
    a: "Tergantung nomornya. Kalau nomor itu invalid atau nggak terdaftar di provider, transaksi otomatis gagal dan dana balik sendiri. Tapi kalau nomornya valid dan ternyata milik orang lain, sudah terkirim — nggak bisa ditarik lagi. Makanya cek lagi angkanya di ringkasan sebelum scan QR-nya.",
    keywords: "salah nomor meter salah tujuan batalkan cancel salah kirim",
  },
  {
    id: "komplain",
    category: "gagal",
    q: "Mau komplain, siapin apa aja?",
    a: "Cukup tiga hal biar cepat ditangani: nomor invoice (FRV-xxxxx), screenshot bukti pembayaran, dan keterangan singkat masalahnya. Kirim ke CS WhatsApp di jam 07.00–23.30 WIB, biasanya dibalas dalam hitungan menit.",
    keywords: "komplain keluhan lapor cs bantuan whatsapp",
  },

  // ── Token & Listrik PLN ─────────────────────────────────────────────
  {
    id: "token-belum-masuk",
    category: "pln",
    q: "Token PLN sudah dibeli tapi belum masuk meteran, kenapa?",
    a: "Kemungkinan besar tokennya sudah menunggu di meteran — kamu cuma belum sempat memasukkannya. Cek dulu: tekan 54 di meteran untuk memanggil token terakhir (55, 56, 57 untuk yang lebih lama). Kalau angkanya sudah ada di layar, tinggal input ulang. Kalau kosong juga, baru cek nomor meternya.",
    steps: [
      "Tekan 54 di keypad meteran — token terakhir akan muncul.",
      "Kalau belum juga ada, cek 11 digit nomor meter / 12 digit ID pelanggan di struk pembelian.",
      "Nomor cocok tapi tetap kosong? Chat CS bawa invoice.",
    ],
    keywords: "token listrik pln belum masuk meteran prabayar 54 55 56 kode token",
    popular: true,
  },
  {
    id: "meter-gagal",
    category: "pln",
    q: "Meteran menulis GAGAL waktu token dimasukkan, artinya apa?",
    a: "Artinya token ditolak meteran — paling sering salah ketik angka, salah nomor meter saat beli, atau meteran sedang update sistem. Ulangi input perlahan dari digit pertama. Kalau layarnya justru menulis PERIKSA, itu tanda gangguan instalasi rumah: hubungi PLN Mobile atau 123, jangan utak-atik meterannya sendiri.",
    keywords: "gagal periksa meteran prabayar token ditolak error pln mobile 123",
  },
  {
    id: "salah-meter",
    category: "pln",
    q: "Beli token salah nomor meter, bisa diganti nggak?",
    a: "Kalau pembayarannya sudah sukses, token sudah terlanjur terikat ke nomor meter yang tercantum dan tidak bisa dipindahkan. Satu-satunya jalan: nomornya harus tidak valid supaya transaksi gagal dan dana balik. Kalau nomor itu valid, token jatuh ke pemilik nomor tersebut. Sebelum bayar, cocokkan 11 digit nomor meter atau 12 digit ID pelanggan dengan yang di meteran.",
    keywords: "salah nomor meter token pindah salah beli refund pln",
  },
  {
    id: "id-pelanggan",
    category: "pln",
    q: "ID pelanggan PLN itu di mana?",
    a: "Ada di bodi meteran prabayar, 12 digit angka bertuliskan NO. METER / ID PELANGGAN. Bisa juga dilihat di struk token lama atau di aplikasi PLN Mobile. Sementara nomor meterannya 11 digit — dua angka ini yang paling sering tertukar.",
    keywords: "id pelanggan nomor meter 11 digit 12 digit prabayar pln",
  },

  // ── Pulsa, Data & E-Money ──────────────────────────────────────────
  {
    id: "pulsa-belum-masuk",
    category: "isi-ulang",
    q: "Pulsa / paket data belum masuk padahal sudah bayar, gimana?",
    a: "Tunggu sebentar dulu — pengisian elektronik rata-rata masuk dalam hitungan detik sampai 5 menit. Kalau lewat 30 menit, buka Cek Transaksi: statusnya Berarti beres, Diproses berarti tunggu maksimal 1×24 jam, dan Gagal berarti dana balik otomatis. Sekalian cek lagi nomor tujuannya sudah benar apa belum.",
    keywords: "pulsa belum masuk paket data kuota telat tidak masuk topup",
    popular: true,
  },
  {
    id: "emoney-lama",
    category: "isi-ulang",
    q: "Top up e-money paling lama berapa?",
    a: "Umumnya instan, paling lama 1×24 jam. Kalau lewat batas itu statusnya masih berproses juga, chat CS sambil bawa nomor invoice — dana yang ternyata gagal akan kembali ke dompet masing-masing.",
    keywords: "topup emoney gopay ovo dana shopeepay e-money lambat lama",
  },
  {
    id: "operator-salah",
    category: "isi-ulang",
    q: "Nomor saya ke-deteksi operatornya salah, bisa?",
    a: "Operator terdeteksi otomatis dari awalan nomor dan hampir selalu akurat — hasilnya kelihatan jelas di ringkasan sebelum kamu bayar. Kalau ternyata salah kirim ke nomor valid lain, pengisian tetap terkirim dan tidak bisa ditarik. Jadi baca dulu baris operator di ringkasan, baru scan.",
    keywords: "operator salah deteksi telkomsel indosat xl tri axis smartfren",
  },

  // ── Tagihan & Cicilan ──────────────────────────────────────────────
  {
    id: "tagihan-belum-ada",
    category: "tagihan",
    q: "Tagihan BPJS/PDAM/internet saya belum muncul di Foriva, kenapa?",
    a: "Tagihan baru muncul setelah penyedia menerbitkannya — biasanya di tanggal 1 sampai 20 tiap bulan, tergantung penyedia. Kalau sudah lewat masa itu belum muncul juga, coba beberapa saat lagi atau langsung masukkan nomor pelanggan; kalau tetap kosong, CS bantu cek ke sistem penyedia.",
    keywords: "tagihan belum muncul bpjs pdam internet indihome first media belum terbit",
  },
  {
    id: "denda-telat",
    category: "tagihan",
    q: "Kena denda karena telat bayar, bisa dihindari?",
    a: "Dendanya datang dari penyedia (PLN, PDAM, BPJS, multifinance), bukan dari kami. Kabar baiknya, setiap tagihan yang tampil sudah menyertakan tanggal jatuh tempo dan nominal dendanya — jadi kamu masih sempat prioritasin yang paling dekat jatuh temponya sebelum denda nempel.",
    keywords: "denda telat jatuh tempo sanksi keterlambatan bayar",
  },
  {
    id: "cicilan-lunas",
    category: "tagihan",
    q: "Bayar cicilan di sini langsung lunas nggak?",
    a: "Mengikuti sistem multifinance-nya: mayoritas realtime, paling lambat 1×24 jam. Begitu berstatus lunas, SN bukti bayar langsung tampil — simpan itu sebagai bukti ke dealer atau kantor angsurannya.",
    keywords: "cicilan motor mobil fif adira multifinance angsuran lunas",
  },
  {
    id: "jam-layanan",
    category: "tagihan",
    q: "Bisa bayar tagihan kapan aja?",
    a: "Bisa, 24 jam termasuk hari libur — QRIS dan sistem kami jalan terus. Catatan kecil: penyedia kadang maintenance dini hari, jadi transaksinya ikut antri sampai sistem mereka balik. Kalau lebih dari 1×24 jam belum final, CS yang pantau.",
    keywords: "jam layanan 24 jam libur tutup maintenance dini hari kapan bisa",
  },
];

export const HELP_POPULAR_IDS = [
  "perlu-akun",
  "cek-transaksi",
  "lama-proses",
  "terpotong-belum-lunas",
  "refund-ke-mana",
  "token-belum-masuk",
  "pulsa-belum-masuk",
];
