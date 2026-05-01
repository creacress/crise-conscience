import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "info" | "calm" | "alert";
type Size = "sm" | "md";

const toneClasses: Record<Tone, string> = {
  neutral:
    "border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-muted)]",
  accent:
    "border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] text-[var(--color-accent)]",
  info:
    "border-sky-400/40 bg-sky-400/10 text-sky-300",
  calm:
    "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  alert:
    "border-[var(--color-alert-border)] bg-[var(--color-alert-bg)] text-[var(--color-alert)]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-6 px-2 text-[11px]",
  md: "h-7 px-3 text-xs",
};

export default function Tag({
  tone = "neutral",
  size = "md",
  icon,
  children,
  className = "",
}: {
  tone?: Tone;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border",
        "font-medium tracking-[-0.005em] whitespace-nowrap",
        toneClasses[tone],
        sizeClasses[size],
        className,
      ].join(" ")}
    >
      {icon ? <span aria-hidden="true" className="flex">{icon}</span> : null}
      {children}
    </span>
  );
}
