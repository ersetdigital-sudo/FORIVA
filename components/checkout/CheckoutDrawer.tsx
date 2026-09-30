"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronBackIcon } from "@/components/icons/UiIcons";
import { SERVICE_ICONS, SERVICE_ICONS_OUTLINE } from "@/components/icons/ServiceIcons";
import { useCheckout } from "@/context/CheckoutContext";
import { useScrollLock } from "@/hooks/useScrollLock";
import { CheckoutStep1 } from "./CheckoutStep1";
import { CheckoutStep2 } from "./CheckoutStep2";
import { CheckoutStep3 } from "./CheckoutStep3";
import { CheckoutStep4 } from "./CheckoutStep4";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export function CheckoutDrawer() {
  const {
    isOpen,
    category,
    step,
    stepTitle,
    stepBadge,
    showBackButton,
    close,
    handleBack,
  } = useCheckout();
  const isDesktop = useIsDesktop();

  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  const CategoryIcon =
    category === "pln" ? SERVICE_ICONS.pln : SERVICE_ICONS_OUTLINE[category];

  const motionState = isDesktop
    ? { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } }
    : { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            key="checkout-backdrop"
            className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          />
          <motion.aside
            key="checkout-panel"
            role="dialog"
            aria-modal="true"
            aria-label={stepTitle}
            className="fixed z-50 bg-offwhite bottom-0 left-0 right-0 max-h-[92vh] rounded-t-3xl md:bottom-0 md:top-0 md:left-auto md:right-0 md:w-[500px] md:max-h-full md:rounded-t-none md:rounded-l-3xl flex flex-col shadow-soft-drawer pb-4 md:pb-0"
            initial={motionState.initial}
            animate={motionState.animate}
            exit={motionState.exit}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="md:hidden w-12 h-1 bg-navy/20 rounded-full mx-auto my-3 shrink-0" />

            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-navy/10 flex items-center justify-between gap-2.5 bg-white shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                {showBackButton ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    title="Kembali ke langkah sebelumnya"
                    className="w-9 h-9 rounded-xl bg-offwhite hover:bg-navy/10 text-navy flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                  >
                    <ChevronBackIcon className="w-4 h-4" />
                  </button>
                ) : null}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-lime flex items-center justify-center shrink-0">
                  <CategoryIcon
                    className={
                      category === "pln"
                        ? "w-5 h-5 text-navy fill-current"
                        : "w-5 h-5 text-navy stroke-current"
                    }
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-cobalt tracking-wider block leading-tight truncate">
                    {stepBadge}
                  </span>
                  <h3 className="font-heading font-bold text-[15px] sm:text-xl text-navy leading-snug mt-0.5 break-words">
                    {stepTitle}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                title="Tutup checkout"
                className="w-9 h-9 rounded-xl bg-offwhite hover:bg-navy hover:text-white flex items-center justify-center text-base transition-colors shrink-0 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {step === 1 ? <CheckoutStep1 /> : null}
            {step === 2 ? <CheckoutStep2 /> : null}
            {step === 3 ? <CheckoutStep3 /> : null}
            {step === 4 ? <CheckoutStep4 /> : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
