"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { detectLocale, type Locale } from "@/lib/i18n";
import { usePathname } from "next/navigation";

/**
 * ConsentBanner — bandeau de consentement RGPD/CNIL pour Google Analytics 4.
 *
 * - Stocke le choix dans le cookie `cc_consent=granted|denied` (1 an).
 * - Si pas de cookie : bandeau affiché, GA reste en `denied` (Consent Mode v2).
 * - Sur "Accepter" : `gtag('consent', 'update', granted)` + cookie granted.
 * - Sur "Refuser" : cookie denied, GA reste cookieless.
 * - Le bandeau peut être rouvert via un bouton « Préférences cookies »
 *   exposé sur les pages /cookies et /en/cookies (voir `openConsentBanner()`).
 */

const COOKIE_NAME = "cc_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 an

type ConsentValue = "granted" | "denied" | null;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
    openConsentBanner?: () => void;
  }
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

function gtagUpdate(granted: boolean) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied", // jamais d'ads cookies
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

const COPY: Record<Locale, {
  message: string;
  details: string;
  accept: string;
  refuse: string;
  more: string;
  prefs: string;
  saved: string;
  changeLink: string;
}> = {
  fr: {
    message:
      "Nous utilisons Google Analytics pour mesurer l'audience du site (statistiques anonymes). Aucune publicité, aucun partage avec des tiers commerciaux.",
    details: "Voir notre politique cookies",
    accept: "Accepter",
    refuse: "Refuser",
    more: "Personnaliser",
    prefs: "Préférences cookies",
    saved: "Préférences enregistrées",
    changeLink: "/cookies",
  },
  en: {
    message:
      "We use Google Analytics to measure site audience (anonymous statistics). No advertising, no sharing with commercial third parties.",
    details: "See our cookie policy",
    accept: "Accept",
    refuse: "Refuse",
    more: "Customize",
    prefs: "Cookie preferences",
    saved: "Preferences saved",
    changeLink: "/en/cookies",
  },
};

export default function ConsentBanner() {
  const pathname = usePathname() ?? "/";
  const locale = detectLocale(pathname);
  const t = COPY[locale];

  const [visible, setVisible] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    const consent = readCookie(COOKIE_NAME) as ConsentValue;
    if (!consent) {
      setVisible(true);
    } else if (consent === "granted") {
      // Re-applique l'état granted à chaque navigation pour les SPA
      gtagUpdate(true);
    }

    // Expose un hook pour ouvrir le bandeau depuis n'importe quelle page.
    if (typeof window !== "undefined") {
      window.openConsentBanner = () => setVisible(true);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.openConsentBanner = undefined;
      }
    };
  }, []);

  function accept() {
    writeCookie(COOKIE_NAME, "granted");
    gtagUpdate(true);
    setVisible(false);
    flash();
  }

  function refuse() {
    writeCookie(COOKIE_NAME, "denied");
    gtagUpdate(false);
    setVisible(false);
    flash();
  }

  function flash() {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2200);
  }

  if (!visible && !savedFlash) return null;

  return (
    <>
      {savedFlash ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] bg-[var(--color-surface-2)]/95 px-4 py-2 text-xs font-medium text-[var(--color-text)] shadow-[var(--shadow-md)] backdrop-blur-md"
        >
          ✓ {t.saved}
        </div>
      ) : null}

      {visible ? (
        <div
          role="dialog"
          aria-labelledby="consent-banner-title"
          aria-describedby="consent-banner-desc"
          className="fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="pointer-events-auto w-full max-w-3xl rounded-[var(--radius-xl)] border border-[var(--color-border-strong)] bg-[var(--color-surface-2)]/95 p-5 shadow-[var(--shadow-md)] backdrop-blur-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div
                  id="consent-banner-title"
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                    <path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17" />
                    <path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  {t.prefs}
                </div>
                <p
                  id="consent-banner-desc"
                  className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]"
                >
                  {t.message}{" "}
                  <Link
                    href={t.changeLink}
                    className="text-[var(--color-accent)] underline-offset-2 hover:underline"
                  >
                    {t.details} ↗
                  </Link>
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={refuse}
                  className="inline-flex h-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-1)] px-4 text-sm font-semibold text-[var(--color-text-muted)] transition-colors duration-[var(--motion-fast)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  {t.refuse}
                </button>
                <button
                  type="button"
                  onClick={accept}
                  className="inline-flex h-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)] px-4 text-sm font-semibold text-black transition-colors duration-[var(--motion-fast)] hover:bg-[var(--color-accent-hover)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  {t.accept}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

/**
 * Bouton réutilisable « Préférences cookies » à placer sur /cookies pour
 * permettre à l'utilisateur de revenir sur son choix à tout moment.
 */
export function ConsentReopenButton({ label }: { label?: string }) {
  function reopen() {
    if (typeof window !== "undefined" && window.openConsentBanner) {
      window.openConsentBanner();
    }
  }
  return (
    <button
      type="button"
      onClick={reopen}
      className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-1)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition-colors duration-[var(--motion-fast)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8.5 8.5v.01M16 12v.01M12 16v.01" />
      </svg>
      {label ?? "Modifier mes préférences cookies"}
    </button>
  );
}
