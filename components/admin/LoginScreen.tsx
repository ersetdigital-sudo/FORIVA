/**
 * Layar login admin — dunia visual "Linen Meridian".
 *
 * Komposisi: panel kiri berwarna umber hangat (identitas + isi dashboard yang
 * bisa dikelola), panel kanan kertas linen dengan kartu form. Satu momen
 * animasi saja: rangkaian masuk halaman ini, tidak diulang di tempat lain.
 */
"use client";

import { MotionConfig, motion, type Variants } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { createClient } from "@/lib/supabase/client";
import type { StoreSettings } from "@/types/store";

/** Exponential ease-out — pergerakan melambat cepat, bukan linear. */
const EASE = [0.16, 1, 0.3, 1] as const;

/** Isi dashboard yang benar-benar ada di produk ini, bukan hiasan. */
const CAPABILITIES = [
  { label: "produk & nominal", detail: "Harga, biaya admin, urutan, dan status tiap kategori." },
  { label: "pengaturan & qris", detail: "Identitas brand, nomor CS, dan gambar QRIS merchant." },
  { label: "kelola pesanan", detail: "Status transaksi masuk sampai dinyatakan selesai." },
];

export function LoginScreen({
  settings,
  nextPath,
}: {
  settings: StoreSettings;
  nextPath: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Nilai varian harus identik di server dan client — preferensi
   * reduced-motion ditangani lewat `<MotionConfig reducedMotion="user">`
   * di bawah, bukan dengan bercabang di sini (itu bikin hydration mismatch).
   */
  const rise: Variants = {
    hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
    shown: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.42, ease: EASE },
    },
  };

  const sequence: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error: signInError } = await createClient().auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(
        signInError.message === "Invalid login credentials"
          ? "Email atau password salah. Periksa lagi lalu coba masuk."
          : signInError.message,
      );
      setIsLoading(false);
      return;
    }

    router.replace(nextPath);
    router.refresh();
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <MotionConfig reducedMotion="user">
      {/* ── Panel identitas (umber hangat) ─────────────────────────── */}
      <section className="relative flex flex-col justify-between bg-umber px-6 py-9 sm:px-10 lg:px-14 lg:py-14">
        <motion.div
          variants={sequence}
          initial="hidden"
          animate="shown"
          className="flex flex-col gap-8 lg:gap-10"
        >
          <motion.div variants={rise} className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-[10px] border border-white/12 bg-umber-lifted font-editorial text-[17px] font-semibold text-apricot">
              {settings.nama_brand.charAt(0)}
            </span>
            <span className="leading-none">
              <span className="block text-[15px] font-semibold tracking-tight text-[#F7F2EA]">
                {settings.nama_brand}
              </span>
              <span className="mt-1 block font-console-mono text-[10px] uppercase tracking-[0.18em] text-[#9C9187]">
                admin console
              </span>
            </span>
          </motion.div>

          <div className="max-w-[34rem]">
            <motion.h1
              variants={rise}
              className="font-editorial text-[clamp(1.9rem,2.8vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-[#F7F2EA]"
            >
              Operasional PPOB, dalam satu ruang kendali.
            </motion.h1>
            <motion.p
              variants={rise}
              className="mt-4 max-w-[50ch] text-[15px] leading-[1.6] text-[#C4B9AD]"
            >
              {settings.tagline} Semua perubahan yang kamu simpan di sini
              langsung terbaca oleh halaman publik — tanpa perlu deploy ulang.
            </motion.p>
          </div>

          <motion.ul variants={rise} className="hidden lg:block">
            {CAPABILITIES.map((item) => (
              <li
                key={item.label}
                className="border-t border-white/10 py-3 last:border-b"
              >
                <div className="font-console-mono text-[10px] uppercase tracking-[0.16em] text-[#EDE4DA]">
                  {item.label}
                </div>
                <div className="mt-1 text-[13px] leading-relaxed text-[#A79C90]">
                  {item.detail}
                </div>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          variants={sequence}
          initial="hidden"
          animate="shown"
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-console-mono text-[10px] uppercase tracking-[0.16em] text-[#9C9187]"
        >
          <motion.span variants={rise}>supabase · postgres</motion.span>
          <motion.span variants={rise}>cloudinary · qris</motion.span>
          <motion.span variants={rise}>region ap-northeast-2</motion.span>
        </motion.div>
      </section>

      {/* ── Panel form (kertas linen) ──────────────────────────────── */}
      <section className="flex items-center justify-center bg-linen px-5 py-12 sm:px-8">
        <motion.div
          variants={sequence}
          initial="hidden"
          animate="shown"
          className="w-full max-w-[404px]"
        >
          <motion.div
            variants={rise}
            className="rounded-[16px] border border-linen-line bg-white p-7 sm:p-8"
          >
            <h2 className="font-editorial text-[30px] font-semibold leading-tight tracking-[-0.02em] text-ink-warm">
              Masuk
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-warm-soft">
              Pakai email dan password admin yang terdaftar di Supabase Auth.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-[12.5px] font-semibold text-ink-warm-soft"
                >
                  Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@foriva.id"
                  className="mt-2 h-11 w-full rounded-[4px] border border-linen-line bg-white px-3.5 text-[15px] text-ink-warm outline-none transition-colors duration-200 focus:border-clay focus:ring-2 focus:ring-clay/18"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-[12.5px] font-semibold text-ink-warm-soft"
                >
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    className="h-11 w-full rounded-[4px] border border-linen-line bg-white px-3.5 pr-20 text-[15px] text-ink-warm outline-none transition-colors duration-200 focus:border-clay focus:ring-2 focus:ring-clay/18"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-pressed={showPassword}
                    className="absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-[4px] px-2 py-1 font-console-mono text-[10px] uppercase tracking-[0.12em] text-ink-warm-soft transition-colors hover:text-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/35 cursor-pointer"
                  >
                    <MaterialIcon
                      name={showPassword ? "visibility_off" : "visibility"}
                      className="text-[15px]"
                    />
                    {showPassword ? "tutup" : "lihat"}
                  </button>
                </div>
              </div>

              {error ? (
                <p
                  role="alert"
                  className="flex items-start gap-2 rounded-[6px] border border-[#EBD3CF] bg-[#FBF1EF] px-3 py-2.5 text-[12.5px] leading-relaxed text-warm-danger"
                >
                  <MaterialIcon name="error" className="mt-px text-[16px]" />
                  <span>{error}</span>
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isLoading}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-clay text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-clay-deep active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-55 cursor-pointer"
              >
                {isLoading ? "Memeriksa…" : "Masuk ke dashboard"}
                {isLoading ? null : (
                  <MaterialIcon name="arrow_forward" className="text-[17px]" />
                )}
              </button>
            </form>

            <div className="mt-6 border-t border-linen-line pt-5">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-clay underline-offset-4 transition-colors hover:underline"
              >
                Lihat situs publik
                <MaterialIcon name="open_in_new" className="text-[15px]" />
              </a>
            </div>
          </motion.div>

          <motion.p
            variants={rise}
            className="mt-5 text-center text-[11.5px] leading-relaxed text-ink-warm-soft"
          >
            Halaman ini tidak terindeks mesin pencari.
          </motion.p>
        </motion.div>
      </section>
      </MotionConfig>
    </div>
  );
}
