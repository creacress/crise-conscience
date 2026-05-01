import type { ReactNode } from "react";

type Source = {
  title: string;
  href: string;
  publisher?: string;
};

type Props = {
  takeaways: ReactNode[];
  sources?: Source[];
  title?: string;
  sourcesTitle?: string;
  /** id de section pour permalink (ancré). Défaut : "a-retenir". */
  id?: string;
};

function PermalinkIcon() {
  return (
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
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

/**
 * Bloc « À retenir » + « Sources » à placer en fin d'article.
 * Optimisé pour la citation par les assistants IA et pour les AI Overviews :
 * - Liste sémantique (<ul>) avec items courts et autonomes.
 * - Sources clairement attribuables (publisher + URL).
 * - Permalink (#id) pour citer un passage précis.
 */
export default function KeyTakeaways({
  takeaways,
  sources = [],
  title = "À retenir",
  sourcesTitle = "Sources",
  id = "a-retenir",
}: Props) {
  return (
    <aside
      id={id}
      aria-labelledby={`${id}-title`}
      className="mt-12 grid gap-4 lg:grid-cols-[1.4fr_1fr]"
    >
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30 bg-gradient-to-b from-[var(--color-accent-soft)] to-transparent p-6">
        <div className="flex items-center justify-between gap-2">
          <div
            id={`${id}-title`}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path d="M12 2 9.2 8.6 2 9.27l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7 5.46-4.73L14.8 8.6Z" />
            </svg>
            {title}
          </div>
          <a
            href={`#${id}`}
            className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-1 text-[11px] text-[var(--color-text-subtle)] transition-colors duration-[var(--motion-fast)] hover:text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            aria-label="Lien permanent vers cette section"
          >
            <PermalinkIcon />
            <span className="sr-only sm:not-sr-only">Permalink</span>
          </a>
        </div>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-text)]">
          {takeaways.map((t, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden="true" className="mt-1 text-[var(--color-accent)]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {sources.length > 0 ? (
        <div
          id={`${id}-sources`}
          className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6"
        >
          <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
            {sourcesTitle}
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            {sources.map((s) => {
              const isExternal = /^https?:\/\//.test(s.href);
              return (
                <li key={s.href} className="leading-6">
                  <a
                    href={s.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="text-[var(--color-accent)] underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  >
                    {s.title}
                    {isExternal ? (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="ml-1 inline-block h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    ) : null}
                  </a>
                  {s.publisher ? (
                    <span className="ml-2 text-xs text-[var(--color-text-subtle)]">— {s.publisher}</span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
