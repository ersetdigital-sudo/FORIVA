"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { FAQ_ITEMS } from "@/data/content";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="py-16 md:py-20 max-w-4xl mx-auto px-4 sm:px-6" id="faq">
      <Reveal className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy/70 mb-2">
          <span className="w-2 h-2 rounded-full bg-cobalt" />
          FAQ
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy">
          Pertanyaan yang sering ditanyakan.
        </h2>
      </Reveal>

      <div className="divide-y divide-navy/10 border-y border-navy/10">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={item.question} className="py-5">
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full text-left flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-navy group cursor-pointer"
              >
                <span className="group-hover:text-cobalt transition-colors">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all shrink-0 ${
                    isOpen
                      ? "bg-cobalt text-white"
                      : "bg-navy/5 text-navy"
                  }`}
                >
                  {isOpen ? "✕" : "+"}
                </span>
              </button>
              {isOpen ? (
                <div className="animate-fadeIn pt-3 text-sm text-navy-muted leading-relaxed font-normal">
                  {item.answer.map((part, partIndex) =>
                    part.strong ? (
                      <strong key={partIndex} className="text-navy">
                        {part.text}
                      </strong>
                    ) : (
                      <span key={partIndex}>{part.text}</span>
                    ),
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/bantuan"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cobalt hover:gap-3 transition-all"
        >
          Masih ada yang mau ditanyain? Buka Pusat Bantuan →
        </Link>
      </div>
    </section>
  );
}
