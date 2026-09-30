"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/icons/UiIcons";
import { useTransactionsContext } from "@/context/TransactionContext";
import {
  HELP_ARTICLES,
  HELP_CATEGORIES,
  HELP_POPULAR_IDS,
  type HelpArticle,
} from "@/data/help";
import { WA_CS_LINK, WHATSAPP_DISPLAY } from "@/lib/constants";

function AccordionItem({
  article,
  isOpen,
  onToggle,
}: {
  article: HelpArticle;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="py-4 sm:py-5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left flex items-start justify-between gap-4 font-heading font-bold text-base sm:text-lg text-navy group cursor-pointer"
      >
        <span className="group-hover:text-cobalt transition-colors">
          {article.q}
        </span>
        <span
          aria-hidden
          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all shrink-0 mt-0.5 ${
            isOpen ? "bg-cobalt text-white" : "bg-navy/5 text-navy group-hover:bg-cobalt/10"
          }`}
        >
          {isOpen ? "✕" : "+"}
        </span>
      </button>
      {isOpen ? (
        <div className="animate-fadeIn pt-3 text-sm sm:text-[15px] text-navy-muted leading-relaxed font-normal max-w-3xl">
          <p>{article.a}</p>
          {article.steps ? (
            <ol className="mt-3 space-y-2">
              {article.steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function HelpCenter() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const { open: openTransactions } = useTransactionsContext();

  const popularArticles = useMemo(
    () =>
      HELP_POPULAR_IDS.map((id) =>
        HELP_ARTICLES.find((article) => article.id === id),
      ).filter((article): article is HelpArticle => Boolean(article)),
    [],
  );

  const searchResults = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    const words = needle.split(/\s+/);
    const strict: HelpArticle[] = [];
    const loose: HelpArticle[] = [];
    for (const article of HELP_ARTICLES) {
      const haystack = `${article.q} ${article.a} ${article.keywords ?? ""}`.toLowerCase();
      if (words.every((word) => haystack.includes(word))) strict.push(article);
      else if (words.some((word) => word.length > 3 && haystack.includes(word)))
        loose.push(article);
    }
    return strict.length > 0 ? strict : loose;
  }, [query]);

  const grouped = useMemo(
    () =>
      HELP_CATEGORIES.filter((cat) => activeCat === "all" || cat.id === activeCat)
        .map((cat) => ({
          category: cat,
          items: HELP_ARTICLES.filter(
            (article) =>
              article.category === cat.id &&
              (activeCat !== "all" || !HELP_POPULAR_IDS.includes(article.id)),
          ),
        }))
        .filter((group) => group.items.length > 0),
    [activeCat],
  );

  const scrollToAnswers = () => {
    document.getElementById("jawaban")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pickCategory = (id: string) => {
    setActiveCat(id);
    setQuery("");
    setOpenId(null);
    scrollToAnswers();
  };

  const toggle = (id: string) => setOpenId((current) => (current === id ? null : id));

  const isSearching = query.trim().length > 0;

  return (
    <>
      {/* ── Hero + pencarian ─────────────────────────────────────── */}
      <section className="pt-10 sm:pt-14 pb-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy/70 mb-4">
          <span className="w-2 h-2 rounded-full bg-cobalt" />
          Pusat Bantuan Foriva
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-5xl text-navy tracking-tight">
          Ada yang bisa kami bantu?
        </h1>
        <p className="mt-4 text-sm sm:text-base text-navy-muted leading-relaxed max-w-xl mx-auto font-normal">
          Ketik aja masalahnya — mayoritas ketemu jawabannya dalam 10 detik
          pertama. Kalau tetap buntu, CS kami tinggal satu chat.
        </p>

        <div className="relative mt-7">
          <MaterialIcon
            name="search"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 text-[22px] pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpenId(null);
            }}
            placeholder="Contoh: token belum masuk, refund, salah nomor..."
            aria-label="Cari artikel bantuan"
            className="w-full bg-white border border-navy/10 rounded-2xl shadow-soft-card pl-12 pr-12 py-4 sm:py-4.5 text-sm sm:text-base font-medium text-navy placeholder:text-navy/40 focus:outline-none focus:border-cobalt transition-colors"
          />
          {isSearching ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Bersihkan pencarian"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-navy/5 hover:bg-navy/10 flex items-center justify-center text-navy/60 transition-colors cursor-pointer"
            >
              <span className="text-xs font-bold">✕</span>
            </button>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-semibold text-navy/50 uppercase tracking-wider mr-1">
            Populer:
          </span>
          {popularArticles.slice(0, 4).map((article) => (
            <button
              key={article.id}
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCat("all");
                setOpenId(article.id);
                scrollToAnswers();
              }}
              className="text-xs font-semibold text-navy/80 bg-white border border-navy/10 rounded-full px-3.5 py-1.5 hover:border-cobalt hover:text-cobalt transition-all cursor-pointer"
            >
              {article.q.replace(/\?$/, "")}
            </button>
          ))}
        </div>
      </section>

      {/* ── Kategori ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {HELP_CATEGORIES.map((cat, index) => {
            const count = HELP_ARTICLES.filter((a) => a.category === cat.id).length;
            const isActive = activeCat === cat.id && !isSearching;
            return (
              <Reveal key={cat.id} delay={index * 0.05}>
                <button
                  type="button"
                  onClick={() => pickCategory(cat.id)}
                  className={`w-full text-left bg-white rounded-2xl border p-4 sm:p-5 transition-all hover:shadow-soft-card cursor-pointer group ${
                    isActive
                      ? "border-cobalt shadow-soft-card"
                      : "border-navy/10 hover:border-cobalt/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-offwhite flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MaterialIcon name={cat.icon} className={`text-[20px] ${cat.iconClass}`} />
                    </span>
                    <span className="text-[10px] font-bold text-navy/40 bg-offwhite rounded-full px-2 py-1">
                      {count} tanya
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-[15px] text-navy leading-snug">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-navy-muted font-normal mt-1">{cat.desc}</p>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── Daftar jawaban ───────────────────────────────────────── */}
      <section id="jawaban" className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-16 sm:pb-20 scroll-mt-24">
        {isSearching ? (
          <div className="mb-6">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-navy">
              {searchResults.length > 0
                ? `${searchResults.length} jawaban untuk "${query.trim()}"`
                : "Belum ada jawabannya"}
            </h2>
          </div>
        ) : null}

        {isSearching && searchResults.length === 0 ? (
          <div className="bg-white border border-navy/10 rounded-3xl p-8 sm:p-10 text-center">
            <span className="w-14 h-14 rounded-2xl bg-offwhite inline-flex items-center justify-center mb-4">
              <MaterialIcon name="help_outline" className="text-[26px] text-navy/50" />
            </span>
            <h3 className="font-heading font-bold text-lg text-navy">
              Nggak ketemu kata kuncinya
            </h3>
            <p className="text-sm text-navy-muted font-normal mt-2 max-w-md mx-auto leading-relaxed">
              Coba istilah lain, atau langsung tanya aja ke CS — ceritain
              masalahnya, nanti kami bantu sampai beres.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {popularArticles.slice(0, 3).map((article) => (
                <button
                  key={article.id}
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveCat("all");
                    setOpenId(article.id);
                    scrollToAnswers();
                  }}
                  className="text-xs font-semibold text-navy/80 bg-offwhite border border-navy/10 rounded-full px-3.5 py-2 hover:border-cobalt hover:text-cobalt transition-all cursor-pointer"
                >
                  {article.q.replace(/\?$/, "")}
                </button>
              ))}
            </div>
          </div>
        ) : isSearching ? (
          <div className="divide-y divide-navy/10 border-y border-navy/10">
            {searchResults.map((article) => (
              <AccordionItem
                key={article.id}
                article={article}
                isOpen={openId === article.id}
                onToggle={() => toggle(article.id)}
              />
            ))}
          </div>
        ) : (
          <>
            {!isSearching && activeCat === "all" ? (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-1">
                  <MaterialIcon name="local_fire_department" className="text-[16px] text-rose-500" />
                  <h2 className="font-heading font-bold text-lg sm:text-xl text-navy">
                    Paling sering ditanyakan
                  </h2>
                </div>
                <div className="divide-y divide-navy/10 border-y border-navy/10">
                  {popularArticles.map((article) => (
                    <AccordionItem
                      key={article.id}
                      article={article}
                      isOpen={openId === article.id}
                      onToggle={() => toggle(article.id)}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {grouped.map((group) => (
              <div key={group.category.id} className="mb-8">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cobalt" />
                    <h2 className="font-heading font-bold text-lg sm:text-xl text-navy">
                      {group.category.label}
                    </h2>
                  </div>
                  {activeCat !== "all" ? (
                    <button
                      type="button"
                      onClick={() => setActiveCat("all")}
                      className="text-xs font-semibold text-cobalt hover:underline cursor-pointer"
                    >
                      ← Semua topik
                    </button>
                  ) : null}
                </div>
                <div className="divide-y divide-navy/10 border-y border-navy/10">
                  {group.items.map((article) => (
                    <AccordionItem
                      key={article.id}
                      article={article}
                      isOpen={openId === article.id}
                      onToggle={() => toggle(article.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </section>

      {/* ── Kontak CS ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <Reveal>
          <div className="bg-navy rounded-3xl sm:rounded-[32px] p-7 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-cobalt/30 blur-2xl" aria-hidden />
            <div className="relative max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-lime mb-4">
                <span className="w-2 h-2 rounded-full bg-lime" />
                Butuh manusia, bukan artikel?
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-4xl tracking-tight">
                Masih belum ketemu juga?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed font-normal">
                Ceritain aja masalahnya apa — CS kami balas dalam hitungan menit,
                setiap hari jam 07.00–23.30 WIB. Bawa nomor invoice biar
                pencekanannya langsung pas.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={WA_CS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-lime text-navy font-heading font-bold px-6 py-3.5 rounded-xl hover:bg-white transition-all"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Chat CS WhatsApp
                </a>
                <button
                  type="button"
                  onClick={openTransactions}
                  className="inline-flex items-center gap-2 border border-white/25 text-white font-heading font-bold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                >
                  <MaterialIcon name="receipt_long" className="text-[18px]" />
                  Cek Transaksi
                </button>
              </div>
              <p className="mt-5 text-xs text-white/50">
                Nomor resmi: {WHATSAPP_DISPLAY} · Hati-hati pin luar itu palsu.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-navy/60">
          <Link href="/#cara-bayar" className="hover:text-cobalt transition-colors">
            ← Panduan cara bayar
          </Link>
          <Link href="/#layanan" className="hover:text-cobalt transition-colors">
            Lihat semua layanan
          </Link>
          <Link href="/" className="hover:text-cobalt transition-colors">
            Balik ke beranda
          </Link>
        </div>
      </section>
    </>
  );
}
