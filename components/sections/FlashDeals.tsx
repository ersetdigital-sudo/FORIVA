"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useCheckout } from "@/context/CheckoutContext";
import { FLASH_DEALS, PAYMENT_PARTNERS } from "@/data/marketing";
import { formatRupiah } from "@/lib/format";

const INITIAL_COUNTDOWN = { hours: 4, minutes: 28, seconds: 15 };

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function FlashCountdown() {
  const [remaining, setRemaining] = useState(
    INITIAL_COUNTDOWN.hours * 3600 +
      INITIAL_COUNTDOWN.minutes * 60 +
      INITIAL_COUNTDOWN.seconds,
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining((current) => (current <= 1 ? 24 * 3600 : current - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const units = [
    { label: "Jam", value: hours },
    { label: "Menit", value: minutes },
    { label: "Detik", value: seconds },
  ];

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
        Berakhir dalam
      </span>
      <div className="flex flex-wrap items-start gap-1.5">
        {units.map((unit, index) => (
          <Fragment key={unit.label}>
            {index > 0 && (
              <span
                aria-hidden
                className="mt-2 text-lg font-bold leading-none text-white/30"
              >
                :
              </span>
            )}
            <div className="flex flex-col items-center gap-1.5">
              <span className="min-w-[3.25rem] rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-center font-mono text-2xl font-bold leading-none tabular-nums text-lime">
                {pad(unit.value)}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                {unit.label}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export function FlashDeals() {
  const { open } = useCheckout();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  const updateEdges = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setEdges({
      left: el.scrollLeft > 2,
      right: el.scrollLeft < maxScroll - 2,
    });
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollCarousel = (direction: number) => {
    carouselRef.current?.scrollBy({ left: direction * 300, behavior: "smooth" });
  };

  const arrowBase =
    "h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-lime hover:text-navy cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/10 disabled:hover:text-white";

  return (
    <section
      className="relative overflow-hidden bg-navy text-white py-12 sm:py-16 border-b border-white/10"
      id="flash-sale"
    >
      {/* Subtle lime glow — decorative only */}
      <div
        aria-hidden
        className="flash-deal-glow pointer-events-none absolute inset-0"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-8">
          <div className="flex flex-col items-start gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3 py-1 text-[11px] font-black uppercase tracking-wider text-navy">
              <MaterialIcon name="local_fire_department" className="text-[15px]" />
              Flash Deal
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl leading-tight tracking-tight text-white">
              Flash Deal Hari Ini
            </h2>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <FlashCountdown />
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <span className="text-xs text-white/60">Kupon reset tiap hari</span>
              <button
                type="button"
                onClick={() => scrollCarousel(-1)}
                aria-label="Promo sebelumnya"
                disabled={!edges.left}
                className={`hidden md:flex ${arrowBase}`}
              >
                <MaterialIcon name="chevron_left" className="text-[20px]" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel(1)}
                aria-label="Promo selanjutnya"
                disabled={!edges.right}
                className={`hidden md:flex ${arrowBase}`}
              >
                <MaterialIcon name="chevron_right" className="text-[20px]" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={carouselRef}
          role="region"
          aria-label="Daftar flash deal"
          tabIndex={0}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 md:scroll-px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible [-webkit-scrollbar:none] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-lime focus-visible:-outline-offset-2"
        >
          {FLASH_DEALS.map((deal) => (
            <div
              key={deal.id}
              className="flex w-[85%] shrink-0 snap-start flex-col justify-between rounded-2xl border border-navy/10 bg-white p-5 text-navy shadow-soft-elevated transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-elevated sm:w-[55%] md:w-auto md:min-w-0 sm:p-6"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap ${deal.badge.className}`}
                  >
                    {deal.badge.text}
                  </span>
                  <span
                    className={`text-right text-xs font-mono font-bold whitespace-nowrap ${deal.meta.className}`}
                  >
                    {deal.meta.text}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-navy mb-3 break-words">
                  {deal.title}
                </h3>

                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5 mb-3">
                  <span className="font-heading font-black text-3xl leading-none text-cobalt">
                    {formatRupiah(deal.price)}
                  </span>
                  <span className="font-mono text-sm text-navy/40 line-through">
                    {formatRupiah(deal.compareAt)}
                  </span>
                  <span className="bg-rose-50 text-rose-600 text-[11px] font-bold rounded-full px-2 py-0.5">
                    Hemat {formatRupiah(deal.compareAt - deal.price)}
                  </span>
                </div>

                <div className="w-full bg-navy/10 h-2 rounded-full overflow-hidden mb-2.5">
                  <div
                    className={`${deal.progress.barClass} relative h-full overflow-hidden rounded-full`}
                    style={{ width: `${deal.progress.value}%` }}
                  >
                    <span
                      aria-hidden
                      className="deal-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/2"
                    />
                  </div>
                </div>

                <span className="text-[11px] text-navy-muted font-medium">
                  {deal.note}
                </span>
              </div>

              <div className="pt-4 mt-4 border-t border-navy/10 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between">
                <span
                  className={`text-xs font-semibold ${deal.footerNote.className}`}
                >
                  {deal.footerNote.text}
                </span>
                <button
                  type="button"
                  onClick={() => open(deal.category)}
                  className={`font-heading font-semibold text-[13px] min-h-11 w-full md:w-auto justify-center px-5 py-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${deal.cta.className}`}
                >
                  <span>{deal.cta.label}</span>
                  <MaterialIcon
                    name="arrow_forward"
                    className={`text-[16px] ${deal.cta.arrowClass ?? ""}`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="md:hidden mt-3 text-white/50 text-xs">
          Geser untuk lihat promo lainnya →
        </p>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <span className="text-xs font-bold text-white/70 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
            <MaterialIcon name="verified" className="text-[16px] text-lime" />
            Mendukung Pembayaran QRIS Resmi:
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold">
            {PAYMENT_PARTNERS.map((partner) =>
              partner === "QRIS" ? (
                <span
                  key={partner}
                  className="px-2.5 py-1 rounded-lg bg-lime text-navy font-black"
                >
                  {partner}
                </span>
              ) : (
                <span
                  key={partner}
                  className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-white"
                >
                  {partner}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
