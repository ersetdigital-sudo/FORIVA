import { Reveal } from "@/components/motion/Reveal";
import { HOW_IT_WORKS } from "@/data/content";

export function HowItWorks() {
  return (
    <section
      className="py-20 md:py-24 bg-white border-y border-navy/10"
      id="cara-bayar"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy/70 mb-3">
            <span className="w-2 h-2 rounded-full bg-lime" />
            Tanpa Akun, Tanpa Ribet
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy">
            Tiga detik urusan tagihan kelar.
          </h2>
          <p className="text-navy-muted font-normal text-sm sm:text-base mt-2">
            Nggak perlu download aplikasi baru, nggak ada password yang harus
            diingat.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08}>
              <div className="h-full p-8 rounded-3xl bg-offwhite border border-navy/10 flex flex-col justify-between relative overflow-hidden">
                <div
                  className={`font-heading font-bold text-7xl ${step.numberClass} leading-none select-none mb-6`}
                >
                  {step.number}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-navy-muted text-sm leading-relaxed font-normal">
                    {step.body}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cobalt">
                  <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
                  {step.footnote}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
