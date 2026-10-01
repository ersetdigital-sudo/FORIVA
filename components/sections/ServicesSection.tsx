"use client";

import { useMemo, useState } from "react";

import { SERVICE_ICONS, SERVICE_ICONS_OUTLINE } from "@/components/icons/ServiceIcons";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Reveal } from "@/components/motion/Reveal";
import { useCheckout } from "@/context/CheckoutContext";
import { useStore } from "@/context/StoreContext";

const SEARCH_PLACEHOLDER = "Cari layanan… cth: PLN, BPJS, paket data";

export function ServicesSection() {
  const { open } = useCheckout();
  // Daftar layanan berasal dari tabel products Supabase (nama, urutan, status).
  const { serviceCards } = useStore();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return serviceCards;
    return serviceCards.filter((service) =>
      `${service.name} ${service.description} ${service.id}`
        .toLowerCase()
        .includes(q),
    );
  }, [query, serviceCards]);

  return (
    <section
      className="py-20 md:py-28 max-w-6xl mx-auto px-4 sm:px-6"
      id="layanan"
    >
      {/* Hero: gradient panel + pencarian layanan (adaptasi wireframe PPOB Bills) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-navy via-navy to-cobalt-dark px-5 py-7 sm:px-8 sm:py-9">
          <div
            aria-hidden="true"
            className="absolute -right-12 -top-16 w-56 h-56 rounded-full bg-lime/10 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -left-16 -bottom-24 w-64 h-64 rounded-full bg-cobalt/30 blur-2xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="lg:max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-lime mb-2.5">
                <span className="w-2 h-2 rounded-full bg-lime" /> Kategori
                Pilihan
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
                Pilih tagihan yang mau diberesin sekarang.
              </h2>
              <p className="text-white/70 font-normal text-xs sm:text-sm mt-2.5 leading-relaxed">
                Akses instan tanpa login. Ketik nama layanan, atau klik kartu di
                bawah untuk membuka panel transaksi langsung.
              </p>
            </div>

            <div className="w-full lg:w-80 shrink-0">
              <label htmlFor="service-search" className="sr-only">
                Cari layanan
              </label>
              <div className="relative">
                <MaterialIcon
                  name="search"
                  ariaHidden
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/40 text-[18px] pointer-events-none"
                />
                <input
                  id="service-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={SEARCH_PLACEHOLDER}
                  autoComplete="off"
                  className="w-full bg-white border border-white/20 rounded-xl pl-10 pr-4 py-3 text-sm font-medium text-navy placeholder:text-navy/40 focus:outline-none focus:border-lime transition-colors"
                />
              </div>
              <p
                aria-live="polite"
                className="mt-2 text-[11px] font-semibold text-white/60"
              >
                {query.trim()
                  ? `${results.length} layanan cocok`
                  : `${serviceCards.length} layanan tersedia`}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-6 sm:mt-8">
          {results.map((service, index) => {
            const Icon =
              service.id === "pln"
                ? SERVICE_ICONS.pln
                : SERVICE_ICONS_OUTLINE[service.id];

            return (
              <Reveal key={service.id} delay={(index % 4) * 0.05}>
                <button
                  type="button"
                  onClick={() => open(service.id)}
                  className={`w-full h-full text-left group cursor-pointer bg-white border border-navy/10 ${service.hoverBorder} rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-elevated flex flex-col justify-between min-h-[190px] sm:min-h-[220px] relative overflow-hidden`}
                >
                  <div
                    className={`absolute -right-6 -bottom-6 w-24 h-24 ${service.circle} rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-500`}
                  />
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${service.iconBox} flex items-center justify-center transition-all shadow-sm`}
                    >
                      <Icon
                        className={
                          service.id === "pln"
                            ? "w-5 h-5 sm:w-6 sm:h-6 fill-current"
                            : "w-5 h-5 sm:w-6 sm:h-6 stroke-current"
                        }
                      />
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full ${service.badge.className}`}
                    >
                      {service.badge.text}
                    </span>
                  </div>
                  <div className="mt-4 sm:mt-5">
                    <h3 className="font-heading font-bold text-base sm:text-lg text-navy group-hover:text-cobalt transition-colors leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-navy-muted text-[11px] sm:text-xs mt-1 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div
                    className={`mt-3 sm:mt-4 pt-3 border-t border-navy/10 flex items-center justify-between text-[11px] sm:text-xs font-semibold ${
                      service.footer.tone === "cobalt"
                        ? "text-cobalt"
                        : "text-navy"
                    }`}
                  >
                    <span className={service.footer.left.className}>
                      {service.footer.left.text}
                    </span>
                    <span
                      className={
                        service.footer.tone === "cobalt"
                          ? "flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold"
                          : "flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold text-cobalt"
                      }
                    >
                      {service.footer.right}
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl border border-dashed border-navy/20 bg-white px-6 py-12 text-center">
          <MaterialIcon
            name="search_off"
            className="text-[28px] text-navy/40"
          />
          <p className="font-heading font-bold text-base sm:text-lg text-navy mt-3">
            Layanan nggak ketemu
          </p>
          <p className="text-navy-muted text-xs sm:text-sm mt-1">
            Coba kata kunci lain, misalnya “token”, “kuota”, atau “air”.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-5 font-heading font-semibold text-xs sm:text-sm bg-navy hover:bg-cobalt text-white px-5 py-3 rounded-xl transition-colors cursor-pointer"
          >
            Tampilkan semua layanan
          </button>
        </div>
      )}
    </section>
  );
}
