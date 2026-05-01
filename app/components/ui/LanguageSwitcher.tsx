"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { alternatePath, detectLocale } from "@/lib/i18n";

/**
 * LanguageSwitcher — bouton FR ↔ EN.
 * Cliquer pose un cookie NEXT_LOCALE=fr|en pour 1 an, puis navigue vers
 * la version équivalente de la page courante (mapping LOCALE_PATH_MAP).
 */
export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const pathname = usePathname() ?? "/";
  const current = detectLocale(pathname);
  const next = current === "fr" ? "en" : "fr";
  const target = alternatePath(pathname, next);
  const label = next === "en" ? "English" : "Français";
  const ariaLabel =
    next === "en" ? "Switch to English" : "Passer en français";

  // Hydration-safe : l'icône change selon la locale courante.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function setLocaleCookie() {
    if (typeof document === "undefined") return;
    const oneYear = 60 * 60 * 24 * 365;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${oneYear}; samesite=lax`;
  }

  return (
    <Link
      href={target}
      onClick={setLocaleCookie}
      hrefLang={next}
      lang={next}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={[
        "inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-border)]",
        "bg-[var(--color-surface-2)] px-3 py-2 text-xs font-semibold uppercase tracking-wider",
        "text-[var(--color-text-muted)] transition-colors duration-[var(--motion-fast)]",
        "hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
        "cursor-pointer",
        className,
      ].join(" ")}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span>{mounted ? label : next === "en" ? "EN" : "FR"}</span>
    </Link>
  );
}
