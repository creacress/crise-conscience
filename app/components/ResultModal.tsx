"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * ResultModal — modale d'apaisement après un quiz d'auto-évaluation.
 *
 * Apparaît automatiquement quand `open` passe à true (après submit).
 * Ton bienveillant adapté au niveau de severity, CTA principal vers le
 * formulaire de contact, mention discrète des urgences en pied (jamais
 * un mur de numéros). L'utilisateur peut fermer (Escape, clic backdrop,
 * bouton « Voir le détail ») pour revenir au résultat détaillé.
 */

export type ResultSeverity = "vigilance" | "info" | "alert";
export type ResultLocale = "fr" | "en";

type Copy = {
  eyebrow: string;
  title: string;
  body: string;
  reassurance: string;
  ctaPrimary: string;
  ctaSecondary: string;
  emergencyHint: string;
  close: string;
};

const COPY: Record<ResultLocale, Record<ResultSeverity, Copy>> = {
  fr: {
    vigilance: {
      eyebrow: "Vous avez fait le test",
      title: "Vous semblez en lien avec votre liberté",
      body:
        "Les signaux que vous avez identifiés restent peu nombreux. C'est plutôt rassurant — gardez votre regard critique, et n'hésitez pas à en reparler à des proches de confiance.",
      reassurance:
        "Vous n'êtes pas seul·e à vouloir comprendre. Si quelque chose vous travaille encore, on peut en parler.",
      ctaPrimary: "Échanger avec nous",
      ctaSecondary: "Voir le détail du test",
      emergencyHint:
        "Si vous ressentez une détresse forte : 3114 (24/7, gratuit) ou 112.",
      close: "Fermer",
    },
    info: {
      eyebrow: "Vous avez fait le test",
      title: "Vous n'êtes pas seul·e",
      body:
        "Plusieurs signaux convergent — ce n'est pas un diagnostic, c'est une invitation à prendre du recul. Beaucoup de personnes vivent cette zone grise. Vous pouvez en parler, à votre rythme.",
      reassurance:
        "Notre équipe lit chaque message, même anonyme. Aucun engagement, aucune pression. Juste un espace pour poser des mots sur ce que vous traversez.",
      ctaPrimary: "Nous écrire (anonymat possible)",
      ctaSecondary: "Voir le détail du test",
      emergencyHint:
        "Si la détresse est forte : 3114 (prévention suicide, 24/7) ou 112.",
      close: "Fermer",
    },
    alert: {
      eyebrow: "Vous avez fait le test",
      title: "Prenez le temps de souffler",
      body:
        "Le faisceau de signaux est important. Cela ne veut pas dire que tout est perdu — beaucoup de personnes sortent, à leur rythme, avec un accompagnement adapté.",
      reassurance:
        "Vous n'avez pas à porter ça seul·e. Notre équipe peut vous orienter vers une association spécialisée (UNADFI, CCMM) qui sait écouter, sans jugement, sans précipitation.",
      ctaPrimary: "Demander à être contacté·e",
      ctaSecondary: "Voir le détail du test",
      emergencyHint:
        "En détresse immédiate : 3114 (prévention suicide, gratuit, 24/7) ou 112.",
      close: "Fermer",
    },
  },
  en: {
    vigilance: {
      eyebrow: "You've completed the test",
      title: "You seem grounded in your own freedom",
      body:
        "The signals you identified are few. That's reassuring — keep your critical thinking, and feel free to talk it over with trusted people around you.",
      reassurance:
        "You're not alone in trying to understand. If something is still bothering you, we can talk.",
      ctaPrimary: "Reach out to us",
      ctaSecondary: "See the detailed result",
      emergencyHint:
        "If you feel strong distress (in France): 3114 (24/7, free) or 112.",
      close: "Close",
    },
    info: {
      eyebrow: "You've completed the test",
      title: "You're not alone",
      body:
        "Several signals converge — this is not a diagnosis, it's an invitation to step back. Many people live in this grey zone. You can talk about it, at your own pace.",
      reassurance:
        "Our team reads every message, even anonymous ones. No commitment, no pressure. Just a space to put words on what you're going through.",
      ctaPrimary: "Write to us (anonymity possible)",
      ctaSecondary: "See the detailed result",
      emergencyHint:
        "If distress is strong (in France): 3114 (suicide prevention, 24/7) or 112.",
      close: "Close",
    },
    alert: {
      eyebrow: "You've completed the test",
      title: "Take a moment to breathe",
      body:
        "The pattern of signals is significant. That doesn't mean all is lost — many people exit, at their own pace, with the right support.",
      reassurance:
        "You don't have to carry this alone. Our team can refer you to a specialised association (UNADFI, CCMM) that listens without judgment, without rushing.",
      ctaPrimary: "Request to be contacted",
      ctaSecondary: "See the detailed result",
      emergencyHint:
        "In immediate distress (in France): 3114 (suicide prevention, free, 24/7) or 112.",
      close: "Close",
    },
  },
};

const ICONS: Record<ResultSeverity, string> = {
  vigilance: "leaf",
  info: "heart",
  alert: "shield",
};

function Icon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const props = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
  switch (name) {
    case "leaf":
      return (
        <svg {...props}>
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.8 2c1 5 .5 10.8-3.4 14.7A7.49 7.49 0 0 1 11 20z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      );
    case "heart":
      return (
        <svg {...props}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ResultModal({
  open,
  onClose,
  severity,
  locale,
  contactHref,
}: {
  open: boolean;
  onClose: () => void;
  severity: ResultSeverity;
  locale: ResultLocale;
  contactHref: string;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const t = COPY[locale][severity];

  // Focus trap léger + Escape pour fermer.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const accentByTone: Record<ResultSeverity, string> = {
    vigilance: "from-emerald-400/20",
    info: "from-sky-400/25",
    alert: "from-[var(--color-accent-soft)]",
  };

  const iconBg: Record<ResultSeverity, string> = {
    vigilance: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
    info: "border-sky-400/40 bg-sky-400/10 text-sky-300",
    alert: "border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] text-[var(--color-accent)]",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="result-modal-title"
      aria-describedby="result-modal-desc"
      className="fixed inset-0 z-[70] flex items-end justify-center px-4 pb-4 sm:items-center sm:px-6 sm:pb-6"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={t.close}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Card */}
      <div
        ref={dialogRef}
        className={`relative w-full max-w-lg overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-strong)] bg-[var(--color-surface-1)] shadow-[var(--shadow-md)]`}
      >
        {/* Glow décoratif */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-b ${accentByTone[severity]} to-transparent blur-3xl`}
        />

        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] border ${iconBg[severity]}`}
            >
              <Icon name={ICONS[severity]} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
                {t.eyebrow}
              </div>
              <h2
                id="result-modal-title"
                className="mt-1 font-display text-2xl font-semibold leading-tight text-[var(--color-text)]"
              >
                {t.title}
              </h2>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-muted)] transition-colors duration-[var(--motion-fast)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <p
            id="result-modal-desc"
            className="mt-5 text-base leading-7 text-[var(--color-text-muted)]"
          >
            {t.body}
          </p>

          {/* Reassurance — fond doux, ton chaleureux */}
          <div className="mt-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-2)]/60 p-4">
            <div className="flex items-start gap-3">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <p className="text-sm leading-6 text-[var(--color-text-muted)]">
                {t.reassurance}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={contactHref}
              onClick={onClose}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-accent)] px-5 text-sm font-semibold text-black transition-colors duration-[var(--motion-fast)] hover:bg-[var(--color-accent-hover)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              {t.ctaPrimary}
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
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-2)] px-5 text-sm font-semibold text-[var(--color-text-muted)] transition-colors duration-[var(--motion-fast)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              {t.ctaSecondary}
            </button>
          </div>

          {/* Mention urgences — discrète, en bas, jamais en avant */}
          <p className="mt-5 border-t border-[var(--color-border)] pt-4 text-center text-xs leading-5 text-[var(--color-text-subtle)]">
            {t.emergencyHint}
          </p>
        </div>
      </div>
    </div>
  );
}
