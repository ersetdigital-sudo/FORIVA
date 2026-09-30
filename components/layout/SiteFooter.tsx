"use client";

import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/UiIcons";
import { useCheckout } from "@/context/CheckoutContext";
import { POPULAR_SERVICES } from "@/data/navigation";
import { WA_CS_LINK, WHATSAPP_DISPLAY } from "@/lib/constants";

export function SiteFooter() {
  const { open } = useCheckout();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cobalt text-white pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-lime text-navy font-heading font-bold text-xl flex items-center justify-center rounded-xl">
                F
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-white">
                FORIVA
              </span>
            </div>
            <p className="text-lime font-heading font-bold text-lg mb-3">
              “Tagihan beres, hidup lanjut.”
            </p>
            <p className="text-white/75 text-sm max-w-sm leading-relaxed font-normal">
              Platform pembayaran PPOB direct tanpa akun. Cepat, transparan, dan
              siap diakses kapan saja dari seluruh penjuru Indonesia.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-lime mb-4">
              Layanan Populer
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80 font-medium">
              {POPULAR_SERVICES.map((service) => (
                <li key={service.label}>
                  <button
                    type="button"
                    className="hover:text-lime transition-colors cursor-pointer"
                    onClick={() => open(service.category)}
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-lime mb-4">
              Bantuan &amp; Customer Service
            </h4>
            <p className="text-sm text-white/75 mb-4 leading-relaxed font-normal">
              Mengalami kendala saat transfer atau butuh bantuan cek SN transaksi?
              Jawaban cepatnya ada di{" "}
              <Link href="/bantuan" className="text-lime font-semibold hover:text-white transition-colors">
                Pusat Bantuan
              </Link>
              , atau hubungi admin kami:
            </p>
            <a
              className="inline-flex items-center gap-2.5 bg-lime text-navy font-heading font-semibold px-5 py-3 rounded-xl hover:bg-white transition-all"
              href={WA_CS_LINK}
              rel="noopener noreferrer"
              target="_blank"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Chat CS WhatsApp (24/7)</span>
            </a>
            <div className="mt-4 text-xs text-white/60">
              Nomor CS: {WHATSAPP_DISPLAY} (Resmi)
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <div>
            © {year} Foriva PPOB Network. Hak Cipta Dilindungi.
          </div>
          <div className="flex gap-6 font-medium">
            <a className="hover:text-lime transition-colors" href="#">
              Syarat &amp; Ketentuan
            </a>
            <a className="hover:text-lime transition-colors" href="#">
              Kebijakan Privasi
            </a>
            <a className="hover:text-lime transition-colors" href="#">
              Status Layanan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
