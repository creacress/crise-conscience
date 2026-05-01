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
};

/**
 * Bloc « À retenir » + « Sources » à placer en fin d'article.
 * Optimisé pour la citation par les assistants IA et pour les AI Overviews :
 * - Liste sémantique (<ul>) avec items courts et autonomes.
 * - Sources clairement attribuables (publisher + URL).
 */
export default function KeyTakeaways({
  takeaways,
  sources = [],
  title = "À retenir",
  sourcesTitle = "Sources",
}: Props) {
  return (
    <aside
      aria-label={title}
      className="mt-12 grid gap-4 lg:grid-cols-[1.4fr_1fr]"
    >
      <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-b from-orange-500/[0.10] to-white/[0.02] p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-200/90">
          <span aria-hidden>★</span> {title}
        </div>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-white/85">
          {takeaways.map((t, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden className="mt-1 text-orange-300">
                →
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {sources.length > 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-white/55">
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
                    className="text-orange-300 hover:underline"
                  >
                    {s.title}
                    {isExternal ? " ↗" : null}
                  </a>
                  {s.publisher ? (
                    <span className="ml-2 text-xs text-white/55">— {s.publisher}</span>
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
