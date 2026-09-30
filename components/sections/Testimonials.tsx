import { StarIcon } from "@/components/icons/UiIcons";
import { Reveal } from "@/components/motion/Reveal";
import { TESTIMONIALS } from "@/data/content";

const THEME_CLASSES = {
  white: "bg-white border border-navy/10",
  lime: "bg-lime",
  cobalt: "bg-cobalt text-white",
} as const;

export function Testimonials() {
  return (
    <section
      className="py-16 md:py-20 max-w-6xl mx-auto px-4 sm:px-6"
      id="testimoni"
    >
      <Reveal className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy/70 mb-2">
          <span className="w-2 h-2 rounded-full bg-cobalt" />
          Situasi Nyata
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy">
          Bukan cerita template marketing.
        </h2>
        <p className="text-navy-muted font-normal text-sm sm:text-base mt-2">
          Cerita mereka yang terselamatkan pas kondisi genting.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.08}>
            <div
              className={`h-full p-8 rounded-3xl flex flex-col justify-between ${THEME_CLASSES[item.theme]}`}
            >
              <div>
                <div
                  className={`flex items-center gap-1 mb-4 ${item.starsClass}`}
                >
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <StarIcon
                      key={starIndex}
                      className="w-4 h-4 fill-current"
                    />
                  ))}
                </div>
                <p
                  className={`font-heading font-bold text-lg sm:text-xl leading-snug ${
                    item.theme === "cobalt" ? "text-white" : "text-navy"
                  }`}
                >
                  {item.quote}
                </p>
                <p
                  className={`text-sm mt-3 leading-relaxed ${item.bodyClass}`}
                >
                  {item.body}
                </p>
              </div>
              <div
                className={`mt-8 pt-4 border-t ${item.dividerClass} flex items-center justify-between text-xs`}
              >
                <div>
                  <strong
                    className={`block font-heading font-semibold text-sm ${
                      item.theme === "cobalt" ? "text-white" : "text-navy"
                    }`}
                  >
                    {item.name}
                  </strong>
                  <span
                    className={item.theme === "cobalt" ? "text-white/70" : "text-navy-muted"}
                  >
                    {item.location}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-md font-mono text-[10px] ${item.tag.className}`}
                >
                  {item.tag.text}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
