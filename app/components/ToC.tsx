"use client";

import { useEffect, useState } from "react";

type Item = { level: 2 | 3; id: string; text: string };

export default function ToC({
  items,
  className = "",
  title = "Sommaire",
}: {
  items: Item[];
  className?: string;
  title?: string;
}) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined" || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // Choisir l'élément le plus haut visible
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label={title}
      className={[
        "rounded-[var(--radius-xl)] border border-[var(--color-border)]",
        "bg-[var(--color-surface-1)]/60 backdrop-blur-sm p-5",
        className,
      ].join(" ")}
    >
      <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
        {title}
      </div>
      <ol className="space-y-1.5 text-sm">
        {items.slice(0, 18).map((it) => {
          const isActive = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={isActive ? "location" : undefined}
                className={[
                  "block rounded-[var(--radius-sm)] px-2 py-1 leading-snug",
                  "transition-colors duration-[var(--motion-fast)]",
                  it.level === 3 ? "ml-3 text-[var(--color-text-subtle)]" : "text-[var(--color-text-muted)]",
                  isActive
                    ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                    : "hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]",
                ].join(" ")}
              >
                {it.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
