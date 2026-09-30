export const HOW_IT_WORKS = [
  {
    number: "01",
    numberClass: "text-navy/15",
    title: "Ketik Nomor Tujuan",
    body: "Nomor HP kamu, ID pelanggan PLN, atau nomor meter air. Khusus nomor HP, operator bakal terdeteksi sendiri.",
    footnote: "Auto-detect telkomsel/indosat/dll",
  },
  {
    number: "02",
    numberClass: "text-cobalt/20",
    title: "Pilih Nominal Pas",
    body: "Tinggal klik kotak nominal yang kamu butuhkan. Total biaya, diskon, dan biaya admin tampil transparan di layar.",
    footnote: "Tanpa biaya tersembunyi",
  },
  {
    number: "03",
    numberClass: "text-lime",
    title: "Scan QRIS & Selesai",
    body: "Arahkan kamera e-wallet atau mobile banking apa saja ke kode QR. Begitu transfer sukses, tagihan langsung berstatus lunas.",
    footnote: "Struk SN langsung muncul",
  },
];

export const TESTIMONIALS = [
  {
    theme: "white" as const,
    quote:
      "“Jam 11 malam token abis bunyi nyaring, 3 menit udah nyala lagi.”",
    body: "Udah males keluar nyari minimarket yang buka. Buka Foriva di HP, scan QRIS pake Livin, kode 20 digit langsung kebaca jelas di layar.",
    name: "Dimas Prakoso",
    location: "Kosan Tebet, Jakarta",
    tag: { text: "PLN 50rb", className: "bg-offwhite border border-navy/10 text-navy/80" },
    starsClass: "text-cobalt",
    bodyClass: "text-navy-muted font-normal",
    dividerClass: "border-navy/10",
  },
  {
    theme: "lime" as const,
    quote:
      "“Pas mau boarding kuota roaming tipis. Isi paket data langsung nyambung.”",
    body: "Trik paling mantap di web ini: ga usah register verifikasi email OTP segala rupa. Beneran langsung sat set.",
    name: "Rani Andriani",
    location: "Freelancer, Bandung",
    tag: { text: "Telkomsel Data", className: "bg-navy text-lime font-bold" },
    starsClass: "text-navy",
    bodyClass: "text-navy/80 font-medium",
    dividerClass: "border-navy/15",
  },
  {
    theme: "cobalt" as const,
    quote:
      "“Lupa hari terakhir cicilan motor. Daripada kena denda 50rb, beres di sini.”",
    body: "Tinggal masukin nomor kontrak FIF, nama debitur langsung nongol pas, bayar pake ShopeePay kelar tanpa antre loket.",
    name: "Bambang S.",
    location: "Wirausaha, Surabaya",
    tag: { text: "FIF Angsuran", className: "bg-lime text-navy font-bold" },
    starsClass: "text-lime",
    bodyClass: "text-white/80 font-normal",
    dividerClass: "border-white/15",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Apakah saya perlu daftar akun atau login dulu?",
    answer: [
      { text: "Tidak perlu sama sekali. Foriva menganut prinsip " },
      { text: "100% guest checkout", strong: true },
      {
        text: ". Kamu cukup masukkan nomor yang mau diisi, bayar via QRIS, dan transaksi langsung kami proses ke sistem agregator.",
      },
    ],
  },
  {
    question: "Berapa lama proses pengisian pulsa / token listrik?",
    answer: [
      {
        text: "Rata-rata 5 sampai 30 detik setelah QRIS sukses terpotong dari e-wallet atau mobile banking kamu. Kode token PLN langsung tercetak di layar konfirmasi dan bisa dicopy dengan 1 klik.",
      },
    ],
  },
  {
    question: "Gimana kalau saya salah isi nomor HP atau nomor meter?",
    answer: [
      {
        text: "Jika nomor yang dimasukkan tidak terdaftar / invalid di provider, transaksi otomatis gagal dan dana akan kami refund via bantuan customer service. Namun jika nomor tersebut valid dan milik orang lain, transaksi yang sudah terkirim tidak dapat ditarik kembali. Mohon cek ulang di ringkasan sebelum scan.",
      },
    ],
  },
  {
    question: "Apakah QRIS bisa discan dari semua aplikasi bank?",
    answer: [
      {
        text: "Ya, standar QRIS nasional berlaku untuk BCA Mobile, BRImo, Livin Mandiri, BNI Mobile, Seabank, Jago, BCA Syariah, serta e-wallet seperti GoPay, OVO, DANA, ShopeePay, dan AstraPay.",
      },
    ],
  },
  {
    question: "Kalau ada kendala transaksi, hubungi ke mana?",
    answer: [
      {
        text: "Tim CS Foriva standby via WhatsApp resmi di jam operasional 07.00 - 23.30 WIB setiap hari. Tombol chat WhatsApp tersedia di bagian footer halaman ini.",
      },
    ],
  },
];
