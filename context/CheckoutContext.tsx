"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { EMONEY_PROVIDERS } from "@/data/emoney";
import { useStore } from "@/context/StoreContext";
import { onlyDigits } from "@/lib/format";
import { randomInvoice, randomPlnToken, randomSerialNumber } from "@/lib/generate";
import { detectOperator } from "@/lib/operator";
import type {
  CategoryKey,
  EmoneyProvider,
  OperatorBadge,
  PpobItem,
  SelectedItem,
} from "@/types";

export const QRIS_TIME_LIMIT = 15 * 60;
const CONFIRM_DELAY_MS = 2600;

/** Kategori yang butuh pemilihan dompet digital dulu (layar 1 lalu layar 2). */
const PROVIDER_BASED: CategoryKey = "emoney";

type PaymentStage = "pending" | "success";

interface CheckoutTotals {
  price: number;
  admin: number;
  total: number;
}

interface CheckoutContextValue {
  isOpen: boolean;
  category: CategoryKey;
  step: number;
  selectedItem: SelectedItem | null;
  provider: EmoneyProvider | null;
  invoice: string;
  target: string;
  operatorText: string;
  operatorBadge: OperatorBadge | null;
  paymentStage: PaymentStage;
  serialNumber: string;
  plnToken: string | null;
  secondsLeft: number;
  isExpired: boolean;
  stepTitle: string;
  stepBadge: string;
  showBackButton: boolean;
  isProviderSelecting: boolean;
  totals: CheckoutTotals | null;
  subtotalLabel: string;
  validationError: string | null;
  canProceed: boolean;
  productName: string;
  targetLabel: string;
  targetPlaceholder: string;
  targetHelper: string;
  contextLabel: string;
  open: (category?: CategoryKey) => void;
  close: () => void;
  goToStep: (step: number) => void;
  handleBack: () => void;
  setTarget: (value: string) => void;
  selectItem: (item: PpobItem, adminFee: number) => void;
  selectProvider: (providerId: string) => void;
  clearProvider: () => void;
  proceedToReview: () => void;
  confirmPayment: () => void;
  restart: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<CategoryKey>("pulsa");
  const [step, setStep] = useState(1);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [provider, setProvider] = useState<EmoneyProvider | null>(null);
  const [invoice, setInvoice] = useState("#FOR-9281");
  const [target, setTargetState] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(QRIS_TIME_LIMIT);
  const [paymentStage, setPaymentStage] = useState<PaymentStage>("pending");
  const [serialNumber, setSerialNumber] = useState("");
  const [plnToken, setPlnToken] = useState<string | null>(null);

  const confirmTimer = useRef<number | null>(null);
  // Katalog & biaya admin dibaca dari Supabase (lewat StoreProvider).
  const { catalog: catalogData } = useStore();
  const catalog = catalogData[category];
  const usesProvider = category === PROVIDER_BASED;

  const detected = useMemo(
    () => detectOperator(target, category),
    [target, category],
  );

  const totals = useMemo(() => {
    if (!selectedItem) return null;
    return {
      price: selectedItem.price,
      admin: selectedItem.adminFee,
      total: selectedItem.price + selectedItem.adminFee,
    };
  }, [selectedItem]);

  const subtotalLabel = totals
    ? `Rp${totals.total.toLocaleString("id-ID")}`
    : "Pilih nominal";

  const validationError = useMemo(() => {
    const clean = onlyDigits(target);
    if (clean.length === 0) return null;

    if (usesProvider && provider?.id === "mandiri") {
      return clean.length === 16
        ? null
        : "Nomor Mandiri e-Money harus 16 digit angka.";
    }
    if (clean.length < 10 || clean.length > 13) {
      return "Nomor HP minimal 10 digit, maksimal 13 digit.";
    }
    return null;
  }, [target, usesProvider, provider]);

  const canProceed = validationError === null && selectedItem !== null;
  const isProviderSelecting = usesProvider && provider === null;
  const isExpired = step === 3 && secondsLeft <= 0;

  const clearConfirmTimer = useCallback(() => {
    if (confirmTimer.current) {
      window.clearTimeout(confirmTimer.current);
      confirmTimer.current = null;
    }
  }, []);

  /** Reset seluruh state lalu buka drawer untuk kategori terpilih. */
  const open = useCallback(
    (nextCategory: CategoryKey = "pulsa") => {
      clearConfirmTimer();
      setCategory(nextCategory);
      setSelectedItem(null);
      setProvider(null);
      setTargetState("");
      setInvoice(randomInvoice());
      setPaymentStage("pending");
      setSerialNumber("");
      setPlnToken(null);
      setSecondsLeft(QRIS_TIME_LIMIT);
      setStep(1);
      setIsOpen(true);
    },
    [clearConfirmTimer],
  );

  const close = useCallback(() => {
    clearConfirmTimer();
    setIsOpen(false);
  }, [clearConfirmTimer]);

  const restart = useCallback(() => open(category), [open, category]);

  // Hitung mundur 15 menit di step 3, berhenti saat drawer ditutup / pindah step.
  useEffect(() => {
    if (!isOpen || step !== 3) return;

    const id = window.setInterval(() => {
      setSecondsLeft((current) => (current <= 1 ? 0 : current - 1));
    }, 1000);

    return () => window.clearInterval(id);
  }, [isOpen, step]);

  useEffect(() => clearConfirmTimer, [clearConfirmTimer]);

  const goToStep = useCallback((nextStep: number) => {
    setStep(nextStep);
    if (nextStep === 3) setSecondsLeft(QRIS_TIME_LIMIT);
  }, []);

  const setTarget = useCallback((value: string) => setTargetState(value), []);

  const selectItem = useCallback((item: PpobItem, adminFee: number) => {
    setSelectedItem({ ...item, adminFee });
  }, []);

  const selectProvider = useCallback((providerId: string) => {
    const found = EMONEY_PROVIDERS[providerId];
    if (!found) return;
    setProvider(found);
    setSelectedItem(null);
  }, []);

  const clearProvider = useCallback(() => {
    setProvider(null);
    setSelectedItem(null);
  }, []);

  const proceedToReview = useCallback(() => {
    if (!canProceed) return;
    setStep(2);
  }, [canProceed]);

  const confirmPayment = useCallback(() => {
    clearConfirmTimer();
    setSerialNumber(randomSerialNumber());
    setPlnToken(category === "pln" ? randomPlnToken() : null);
    setPaymentStage("pending");
    setStep(4);

    confirmTimer.current = window.setTimeout(() => {
      setPaymentStage("success");
      confirmTimer.current = null;
    }, CONFIRM_DELAY_MS);
  }, [category, clearConfirmTimer]);

  const handleBack = useCallback(() => {
    if (step === 1) {
      if (usesProvider && provider) clearProvider();
      return;
    }
    goToStep(step - 1);
  }, [step, usesProvider, provider, clearProvider, goToStep]);

  const stepTitle = useMemo(() => {
    if (step === 1) return catalog.title;
    if (step === 2) return "Cek Pesanan";
    if (step === 3) return "Pembayaran QRIS";
    return "Hasil Pembayaran";
  }, [step, catalog.title]);

  const stepBadge = useMemo(() => {
    if (step === 1) return "Langkah 1 dari 3";
    if (step === 2) return "Langkah 2 dari 3";
    if (step === 3) return "Langkah 3 dari 3";
    return "Status Transaksi";
  }, [step]);

  const productName = selectedItem
    ? usesProvider && provider
      ? `Top Up ${selectedItem.name}`
      : selectedItem.name
    : "-";

  const contextLabel =
    usesProvider && provider
      ? provider.fullName
      : detected.text || catalog.title;

  const { targetLabel, targetPlaceholder, targetHelper } = useMemo(() => {
    if (usesProvider && provider) {
      const isCard = provider.id === "mandiri";
      return {
        targetLabel: isCard
          ? "Nomor Kartu Mandiri e-Money (16 Digit)"
          : `Nomor HP Terdaftar di ${provider.name}`,
        targetPlaceholder: isCard
          ? "Contoh: 6032987102910023"
          : `Contoh: ${provider.placeholder}`,
        targetHelper: isCard
          ? "Masukkan 16 digit nomor kartu yang tertera di belakang fisik e-Money."
          : `Pastikan nomor sudah aktif dan terdaftar di akun ${provider.name} tujuan.`,
      };
    }
    return {
      targetLabel: catalog.label,
      targetPlaceholder: `Contoh: ${catalog.placeholder}`,
      targetHelper: catalog.helper,
    };
  }, [usesProvider, provider, catalog]);

  const value = useMemo<CheckoutContextValue>(
    () => ({
      isOpen,
      category,
      step,
      selectedItem,
      provider,
      invoice,
      target,
      operatorText: detected.text,
      operatorBadge: detected.badge,
      paymentStage,
      serialNumber,
      plnToken,
      secondsLeft,
      isExpired,
      stepTitle,
      stepBadge,
      showBackButton:
        step === 2 || step === 3 || (step === 1 && usesProvider && provider !== null),
      isProviderSelecting,
      totals,
      subtotalLabel,
      validationError,
      canProceed,
      productName,
      targetLabel,
      targetPlaceholder,
      targetHelper,
      contextLabel,
      open,
      close,
      goToStep,
      handleBack,
      setTarget,
      selectItem,
      selectProvider,
      clearProvider,
      proceedToReview,
      confirmPayment,
      restart,
    }),
    [
      isOpen,
      category,
      step,
      selectedItem,
      provider,
      invoice,
      target,
      detected.text,
      detected.badge,
      paymentStage,
      serialNumber,
      plnToken,
      secondsLeft,
      isExpired,
      stepTitle,
      stepBadge,
      usesProvider,
      isProviderSelecting,
      totals,
      subtotalLabel,
      validationError,
      canProceed,
      productName,
      targetLabel,
      targetPlaceholder,
      targetHelper,
      contextLabel,
      open,
      close,
      goToStep,
      handleBack,
      setTarget,
      selectItem,
      selectProvider,
      clearProvider,
      proceedToReview,
      confirmPayment,
      restart,
    ],
  );

  return (
    <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout harus dipakai di dalam CheckoutProvider");
  }
  return context;
}
