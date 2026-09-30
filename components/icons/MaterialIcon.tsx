type MaterialIconProps = {
  /** Ligature name, e.g. "search", "receipt_long" */
  name: string;
  className?: string;
  ariaHidden?: boolean;
};

export function MaterialIcon({
  name,
  className,
  ariaHidden = true,
}: MaterialIconProps) {
  return (
    <span
      aria-hidden={ariaHidden}
      className={className ? `material-symbols-outlined ${className}` : "material-symbols-outlined"}
    >
      {name}
    </span>
  );
}
