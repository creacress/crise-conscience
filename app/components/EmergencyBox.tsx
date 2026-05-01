/**
 * EmergencyBox — composant YMYL critique.
 * Liste les numéros d'urgence français accessibles au clavier (tel: links).
 * Contraste AAA, icône + label (jamais couleur seule), responsive.
 *
 * Variantes :
 * - "full" (défaut) : encart complet pour pied de page sensible
 * - "compact" : 1 ligne, pour fin d'article
 * - "banner" : pleine largeur, sticky possible
 */

type Variant = "full" | "compact" | "banner";

const NUMBERS = [
  { num: "15", label: "SAMU", desc: "Urgence médicale" },
  { num: "17", label: "Police / Gendarmerie", desc: "Danger immédiat" },
  { num: "18", label: "Pompiers", desc: "Secours, incendie" },
  { num: "112", label: "Urgences européennes", desc: "Tous secours UE" },
  { num: "3114", label: "Prévention suicide", desc: "Numéro national, 24/7, gratuit" },
  { num: "119", label: "Enfance en danger", desc: "Mineur en risque" },
  { num: "3919", label: "Violences faites aux femmes", desc: "Écoute, anonyme" },
] as const;

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function AlertIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    </svg>
  );
}

export default function EmergencyBox({
  variant = "full",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  if (variant === "compact") {
    return (
      <aside
        role="note"
        aria-label="Numéros d'urgence"
        className={[
          "flex items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--color-alert-border)]",
          "bg-[var(--color-alert-bg)] px-4 py-3 text-sm leading-6",
          className,
        ].join(" ")}
      >
        <AlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-alert)]" />
        <div className="text-[var(--color-text-muted)]">
          <strong className="text-[var(--color-text)]">Urgence ?</strong> Ce site n&apos;est pas un
          service d&apos;urgence. Composez le{" "}
          <a className="font-semibold text-[var(--color-alert)] underline underline-offset-2" href="tel:112">
            112
          </a>{" "}
          (urgences),{" "}
          <a className="font-semibold text-[var(--color-alert)] underline underline-offset-2" href="tel:3114">
            3114
          </a>{" "}
          (prévention suicide) ou{" "}
          <a className="font-semibold text-[var(--color-alert)] underline underline-offset-2" href="tel:119">
            119
          </a>{" "}
          (enfance en danger).
        </div>
      </aside>
    );
  }

  if (variant === "banner") {
    return (
      <aside
        role="note"
        aria-label="Numéros d'urgence"
        className={[
          "flex flex-col items-start gap-3 rounded-[var(--radius-xl)] border border-[var(--color-alert-border)]",
          "bg-[var(--color-alert-bg)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
          className,
        ].join(" ")}
      >
        <div className="flex items-start gap-3">
          <AlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-alert)]" />
          <div className="text-sm leading-6 text-[var(--color-text-muted)]">
            <strong className="text-[var(--color-text)]">Vous êtes en danger ?</strong> Appelez les
            services d&apos;urgence — réponse immédiate.
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="tel:112"
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-alert-border)] bg-[var(--color-alert)]/15 px-3 py-1.5 text-sm font-semibold text-[var(--color-alert)] transition-colors duration-[var(--motion-fast)] hover:bg-[var(--color-alert)]/25"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            112
          </a>
          <a
            href="tel:3114"
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-alert-border)] bg-[var(--color-alert)]/15 px-3 py-1.5 text-sm font-semibold text-[var(--color-alert)] transition-colors duration-[var(--motion-fast)] hover:bg-[var(--color-alert)]/25"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            3114
          </a>
        </div>
      </aside>
    );
  }

  return (
    <aside
      role="note"
      aria-labelledby="emergency-title"
      className={[
        "rounded-[var(--radius-xl)] border border-[var(--color-alert-border)]",
        "bg-gradient-to-b from-[var(--color-alert-bg)] to-transparent",
        "p-5 sm:p-6",
        className,
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <AlertIcon className="mt-0.5 h-6 w-6 shrink-0 text-[var(--color-alert)]" />
        <div className="min-w-0 flex-1">
          <h3 id="emergency-title" className="text-base font-semibold text-[var(--color-text)]">
            Urgences — n&apos;hésitez pas, c&apos;est gratuit et confidentiel
          </h3>
          <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
            Ce site n&apos;est pas un service d&apos;urgence. Si vous ou un proche êtes en danger
            immédiat, contactez directement les services compétents.
          </p>

          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {NUMBERS.map((n) => (
              <li key={n.num}>
                <a
                  href={`tel:${n.num}`}
                  className="group flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-1)] px-3 py-2 transition-[background-color,border-color] duration-[var(--motion-fast)] hover:border-[var(--color-alert-border)] hover:bg-[var(--color-alert-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-alert)]"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-alert-border)] bg-[var(--color-alert-bg)] text-[var(--color-alert)]"
                  >
                    <PhoneIcon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-base font-bold text-[var(--color-text)]">
                      {n.num}
                    </span>
                    <span className="block text-xs leading-tight text-[var(--color-text-muted)]">
                      {n.label}
                    </span>
                  </span>
                  <span className="text-xs text-[var(--color-text-subtle)] hidden md:block">
                    {n.desc}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
