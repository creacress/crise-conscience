import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent-hover)] shadow-[var(--shadow-glow-accent)]",
  secondary:
    "bg-[var(--color-surface-1)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-strong)]",
  ghost:
    "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-1)]",
  danger:
    "bg-[var(--color-alert-strong)] text-white hover:brightness-110",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-semibold tracking-[-0.005em] " +
  "transition-[background-color,border-color,color,box-shadow] duration-[var(--motion-fast)] " +
  "ease-[var(--motion-ease-soft)] cursor-pointer select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] " +
  "disabled:cursor-not-allowed disabled:opacity-50";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 animate-spin"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    loading = false,
    iconLeft,
    iconRight,
    className = "",
    children,
  } = props;

  const cls = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  const inner = (
    <>
      {loading ? <Spinner /> : iconLeft}
      <span>{children}</span>
      {!loading && iconRight}
    </>
  );

  if ("href" in props && props.href) {
    const { href, external, variant: _v, size: _s, loading: _l, iconLeft: _il, iconRight: _ir, className: _c, children: _ch, ...rest } = props;
    void _v; void _s; void _l; void _il; void _ir; void _c; void _ch;

    if (external) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }

  const { variant: _v2, size: _s2, loading: _l2, iconLeft: _il2, iconRight: _ir2, className: _c2, children: _ch2, ...buttonRest } = props as ButtonAsButton;
  void _v2; void _s2; void _il2; void _ir2; void _c2; void _ch2;

  return (
    <button
      className={cls}
      disabled={loading || (buttonRest as ButtonAsButton).disabled}
      aria-busy={loading || undefined}
      {...buttonRest}
    >
      {inner}
    </button>
  );
}
