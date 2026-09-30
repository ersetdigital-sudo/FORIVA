export type CategoryKey =
  | "pulsa"
  | "pln"
  | "data"
  | "pdam"
  | "bpjs"
  | "internet"
  | "emoney"
  | "cicilan";

export interface PpobItem {
  name: string;
  price: number;
  val: string;
  popular?: boolean;
}

export interface PpobCategory {
  title: string;
  label: string;
  placeholder: string;
  helper: string;
  admin: number;
  items: PpobItem[];
}

export type PpobCatalog = Record<CategoryKey, PpobCategory>;

export interface SelectedItem extends PpobItem {
  adminFee: number;
}

export interface EmoneyProvider {
  id: string;
  name: string;
  fullName: string;
  monogram: string;
  badgeBg: string;
  tileBg: string;
  tag: string;
  desc: string;
  placeholder: string;
  admin: number;
  nominals: PpobItem[];
}

export interface OperatorBadge {
  text: string;
  badgeClass: string;
}

export interface QuickTab {
  key: CategoryKey;
  label: string;
  placeholder: string;
  helper: string;
  nominals: PpobItem[];
}

export interface ServiceCard {
  id: CategoryKey;
  name: string;
  description: string;
  badge: { text: string; className: string };
  iconBox: string;
  circle: string;
  hoverBorder: string;
  footer: {
    tone: "cobalt" | "navy";
    left: { text: string; className?: string };
    right: string;
  };
}

export interface FlashDeal {
  id: string;
  badge: { text: string; className: string };
  meta: { text: string; className: string };
  title: string;
  price: number;
  compareAt: number;
  progress: { value: number; barClass: string };
  note: string;
  footerNote: { text: string; className: string };
  cta: { label: string; className: string; arrowClass?: string };
  category: CategoryKey;
}

export interface Testimonial {
  theme: "white" | "lime" | "cobalt";
  quote: string;
  body: string;
  name: string;
  location: string;
  tag: { text: string; className: string };
  starsClass: string;
  bodyClass: string;
  dividerClass: string;
}

export interface FaqPart {
  text: string;
  strong?: boolean;
}

export interface FaqItem {
  question: string;
  answer: FaqPart[];
}

export interface TransactionRecord {
  invoice: string;
  product: string;
  target: string;
  sn: string;
  total: number;
  status: "success" | "process";
  time: string;
}
