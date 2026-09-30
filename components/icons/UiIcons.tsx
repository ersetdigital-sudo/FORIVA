import type { SVGProps } from "react";

type IconProps = { className?: string } & SVGProps<SVGSVGElement>;

export function SearchIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" strokeWidth={2} viewBox="0 0 24 24" {...rest}>
      <circle cx={11} cy={11} r={8} />
      <line x1={21} x2={16.65} y1={21} y2={16.65} />
    </svg>
  );
}

export function CheckCircleIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" strokeWidth={2} viewBox="0 0 24 24" {...rest}>
      <circle cx={12} cy={12} r={10} />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ArrowRightIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" {...rest}>
      <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
    </svg>
  );
}

export function ArrowRightLongIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" strokeWidth={2.5} viewBox="0 0 24 24" {...rest}>
      <line x1={5} x2={19} y1={12} y2={12} />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function ChevronBackIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...rest}>
      <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
    </svg>
  );
}

export function EditIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" strokeWidth={2} viewBox="0 0 24 24" {...rest}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

export function CopyIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...rest}>
      <path
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function ShieldCheckIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" {...rest}>
      <path
        clipRule="evenodd"
        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function ClockIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...rest}>
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  );
}

export function TimerExpiredIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" strokeWidth={2} viewBox="0 0 24 24" {...rest}>
      <circle cx={12} cy={12} r={10} />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function CheckIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" {...rest}>
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
    </svg>
  );
}

export function AlertCircleIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...rest}>
      <path
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export function StarIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...rest}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

export function WhatsAppIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...rest}>
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.297.144.35.491 1.2.534 1.288.043.088.072.19.014.305-.058.115-.087.187-.173.289l-.26.305c-.087.086-.18.18-.077.355.101.174.453.747.971 1.209.668.595 1.232.78 1.405.867.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.044.073.044.42-.1.825z" />
    </svg>
  );
}

export function MenuIcon({ className, ...rest }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" {...rest}>
      <line x1={4} x2={20} y1={6} y2={6} />
      <line x1={4} x2={20} y1={12} y2={12} />
      <line x1={4} x2={20} y1={18} y2={18} />
    </svg>
  );
}
