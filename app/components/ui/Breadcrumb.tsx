import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

export default function Breadcrumb({
  items,
  className = "",
}: {
  items: Crumb[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Fil d'Ariane" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--color-text-subtle)]">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="rounded-md px-1 transition-colors duration-[var(--motion-fast)] hover:text-[var(--color-text)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "px-1 text-[var(--color-text-muted)]" : "px-1"}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 text-[var(--color-text-subtle)]/60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
