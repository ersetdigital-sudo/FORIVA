import type { SVGProps } from "react";

type IconProps = { className?: string } & SVGProps<SVGSVGElement>;

/** Pulsa — handset */
export function PhoneIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" strokeWidth={2} viewBox="0 0 24 24" {...rest}>
      <rect width={14} height={20} x={5} y={2} rx={2} ry={2} />
      <line x1={12} x2={12.01} y1={18} y2={18} strokeLinecap="round" strokeWidth={2.5} />
    </svg>
  );
}

/** PLN — lightning bolt (solid) */
export function BoltFilledIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...rest}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

/** PLN — lightning bolt (outline) */
export function BoltOutlineIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" strokeWidth={2} viewBox="0 0 24 24" {...rest}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

/** Paket data — globe */
export function GlobeIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" strokeWidth={2} viewBox="0 0 24 24" {...rest}>
      <circle cx={12} cy={12} r={10} />
      <line x1={2} x2={22} y1={12} y2={12} />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

/** PDAM — water droplet */
export function DropletIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" strokeWidth={2} viewBox="0 0 24 24" {...rest}>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

/** BPJS — health shield */
export function HealthShieldIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" strokeWidth={2} viewBox="0 0 24 24" {...rest}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1={12} x2={12} y1={8} y2={14} />
      <line x1={9} x2={15} y1={11} y2={11} />
    </svg>
  );
}

/** Internet & WiFi rumah */
export function WifiIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" strokeWidth={2} viewBox="0 0 24 24" {...rest}>
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1={12} x2={12.01} y1={20} y2={20} strokeLinecap="round" strokeWidth={2.5} />
    </svg>
  );
}

/** E-money — card */
export function CardIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" strokeWidth={2} viewBox="0 0 24 24" {...rest}>
      <rect width={20} height={16} x={2} y={4} rx={2} />
      <line x1={2} x2={22} y1={10} y2={10} />
    </svg>
  );
}

/** Multifinance — document / contract */
export function DocumentIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" strokeWidth={2} viewBox="0 0 24 24" {...rest}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1={16} x2={8} y1={13} y2={13} />
      <line x1={16} x2={8} y1={17} y2={17} />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export const SERVICE_ICONS = {
  pulsa: PhoneIcon,
  pln: BoltFilledIcon,
  data: GlobeIcon,
  pdam: DropletIcon,
  bpjs: HealthShieldIcon,
  internet: WifiIcon,
  emoney: CardIcon,
  cicilan: DocumentIcon,
} as const;

export const SERVICE_ICONS_OUTLINE = {
  pulsa: PhoneIcon,
  pln: BoltOutlineIcon,
  data: GlobeIcon,
  pdam: DropletIcon,
  bpjs: HealthShieldIcon,
  internet: WifiIcon,
  emoney: CardIcon,
  cicilan: DocumentIcon,
} as const;
