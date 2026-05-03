"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import LanguageSwitcher from "@/app/components/ui/LanguageSwitcher";
import { detectLocale, t, type Locale } from "@/lib/i18n";

type NavGroup = {
  label: string;
  description: string;
  items: { href: string; label: string; desc: string }[];
};

function buildNavGroups(locale: Locale): NavGroup[] {
  const isEn = locale === "en";
  const understandItems: NavGroup["items"] = [
    {
      href: isEn ? "/en/recognize-coercive-control" : "/blog/signaux-emprise",
      label: t(locale, "page.signals"),
      desc: t(locale, "page.signals_desc"),
    },
    {
      href: isEn ? "/en/glossary" : "/glossaire",
      label: t(locale, "page.glossary"),
      desc: t(locale, "page.glossary_desc"),
    },
    {
      href: isEn ? "/en/faq" : "/faq",
      label: t(locale, "page.faq"),
      desc: t(locale, "page.faq_desc"),
    },
  ];

  // L'item Articles est ajouté UNIQUEMENT en FR (pas de version EN traduite,
  // donc on évite de créer un lien qui amène hors du parcours EN).
  if (!isEn) {
    understandItems.push({
      href: "/articles",
      label: t(locale, "page.articles"),
      desc: t(locale, "page.articles_desc"),
    });
  }

  return [
    {
      label: t(locale, "nav.understand"),
      description: t(locale, "nav.understand_desc"),
      items: understandItems,
    },
    {
      label: t(locale, "nav.act"),
      description: t(locale, "nav.act_desc"),
      items: [
        {
          href: isEn ? "/en/help-a-loved-one" : "/aider-un-proche",
          label: t(locale, "page.help_loved_one"),
          desc: t(locale, "page.help_loved_one_desc"),
        },
        {
          href: isEn ? "/en/coercion-test" : "/test-emprise",
          label: t(locale, "page.test"),
          desc: t(locale, "page.test_desc"),
        },
        {
          href: isEn ? "/en/recovering" : "/se-reconstruire",
          label: t(locale, "page.recovering"),
          desc: t(locale, "page.recovering_desc"),
        },
        {
          href: isEn ? "/en/resources" : "/ressources",
          label: t(locale, "page.resources"),
          desc: t(locale, "page.resources_desc"),
        },
      ],
    },
    {
      label: t(locale, "nav.support"),
      description: t(locale, "nav.support_desc"),
      items: [
        {
          href: isEn ? "/en/testimonies" : "/temoignages",
          label: t(locale, "page.testimonies"),
          desc: t(locale, "page.testimonies_desc"),
        },
        {
          href: isEn ? "/en/subscribe" : "/inscription",
          label: t(locale, "page.subscribe"),
          desc: t(locale, "page.subscribe_desc"),
        },
        {
          href: isEn ? "/en/donate" : "/don",
          label: t(locale, "page.donate"),
          desc: t(locale, "page.donate_desc"),
        },
        {
          href: isEn ? "/en/about" : "/a-propos",
          label: t(locale, "page.about"),
          desc: t(locale, "page.about_desc"),
        },
      ],
    },
  ];
}

function Logo() {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)]">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 text-[var(--color-accent)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    </span>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 transition-transform duration-[var(--motion-fast)] ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function HamburgerNav() {
  const pathname = usePathname();
  const locale = useMemo<Locale>(() => detectLocale(pathname ?? "/"), [pathname]);
  const navGroups = useMemo(() => buildNavGroups(locale), [locale]);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const homeHref = locale === "en" ? "/en" : "/";
  const contactHref = locale === "en" ? "/en/contact" : "/contact";

  // Fermer en navigation
  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [pathname]);

  // Fermer méga-menu en cliquant dehors
  useEffect(() => {
    if (!openGroup) return;
    const onDocClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenGroup(null);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openGroup]);

  // Bloquer le scroll du body quand le drawer mobile est ouvert
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="w-full" ref={navRef}>
      <div className="flex items-center justify-between rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/85 px-4 py-3 backdrop-blur-md">
        {/* Brand */}
        <Link href={homeHref} className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] rounded-md">
          <Logo />
          <span className="leading-tight">
            <span className="block font-display text-sm font-semibold text-[var(--color-text)]">
              Crise Conscience
            </span>
            <span className="block text-xs text-[var(--color-text-subtle)]">
              {t(locale, "brand.tagline")}
            </span>
          </span>
        </Link>

        {/* Desktop nav (méga-menu) */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navGroups.map((g, idx) => {
            const isOpen = openGroup === g.label;
            const isActive = g.items.some((it) => pathname?.startsWith(it.href));
            const isLast = idx === navGroups.length - 1;
            return (
              <div key={g.label} className="relative">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => setOpenGroup(isOpen ? null : g.label)}
                  className={`inline-flex items-center gap-1.5 rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors duration-[var(--motion-fast)] ${
                    isActive || isOpen
                      ? "bg-[var(--color-surface-2)] text-[var(--color-text)]"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]"
                  } cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]`}
                >
                  {g.label}
                  <ChevronIcon open={isOpen} />
                </button>

                {isOpen ? (
                  <div
                    role="menu"
                    className={`absolute top-full z-50 mt-2 w-80 rounded-[var(--radius-xl)] border border-[var(--color-border-strong)] bg-[var(--color-surface-2)] p-3 shadow-[var(--shadow-md)] supports-[backdrop-filter]:bg-[var(--color-surface-2)]/95 supports-[backdrop-filter]:backdrop-blur-md ${
                      isLast ? "right-0" : "left-0"
                    }`}
                  >
                    <div className="px-2 pb-3 text-xs text-[var(--color-text-subtle)]">
                      {g.description}
                    </div>
                    <ul className="space-y-1">
                      {g.items.map((it) => {
                        const isCurrent = pathname === it.href;
                        return (
                          <li key={it.href}>
                            <Link
                              href={it.href}
                              role="menuitem"
                              aria-current={isCurrent ? "page" : undefined}
                              className={`block rounded-[var(--radius-md)] px-3 py-2.5 transition-colors duration-[var(--motion-fast)] ${
                                isCurrent
                                  ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-1)] hover:text-[var(--color-text)]"
                              } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]`}
                            >
                              <div className="text-sm font-semibold">{it.label}</div>
                              <div className="mt-0.5 text-xs text-[var(--color-text-subtle)]">
                                {it.desc}
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
              </div>
            );
          })}

          <LanguageSwitcher className="ml-2" />

          <Link
            href={contactHref}
            className="ml-2 inline-flex h-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)] px-4 text-sm font-semibold text-black transition-colors duration-[var(--motion-fast)] hover:bg-[var(--color-accent-hover)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            {t(locale, "nav.contact_us")}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? t(locale, "nav.menu_close") : t(locale, "nav.menu_open")}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-muted)] transition-colors duration-[var(--motion-fast)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <>
          <button
            type="button"
            aria-label={t(locale, "nav.menu_close")}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
          <nav
            id="mobile-nav"
            aria-label={t(locale, "nav.menu_open")}
            className="fixed right-0 top-0 z-50 h-dvh w-[88vw] max-w-sm overflow-y-auto border-l border-[var(--color-border-strong)] bg-[var(--color-surface-1)] px-5 py-6 lg:hidden"
          >
            <div className="mb-5 flex items-center justify-between">
              <Link href={homeHref} className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] rounded-md">
                <Logo />
                <span className="font-display text-sm font-semibold text-[var(--color-text)]">
                  Crise Conscience
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label={t(locale, "nav.menu_close")}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            <Link
              href={homeHref}
              className="mb-3 block rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3 text-sm font-medium text-[var(--color-text-muted)] transition-colors duration-[var(--motion-fast)] hover:text-[var(--color-text)]"
            >
              {t(locale, "nav.home")}
            </Link>

            <div className="space-y-5">
              {navGroups.map((g) => (
                <div key={g.label}>
                  <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
                    {g.label}
                  </div>
                  <ul className="space-y-1.5">
                    {g.items.map((it) => {
                      const isCurrent = pathname === it.href;
                      return (
                        <li key={it.href}>
                          <Link
                            href={it.href}
                            aria-current={isCurrent ? "page" : undefined}
                            className={`block rounded-[var(--radius-md)] border px-4 py-3 transition-colors duration-[var(--motion-fast)] ${
                              isCurrent
                                ? "border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                                : "border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                            }`}
                          >
                            <div className="text-sm font-semibold">{it.label}</div>
                            <div className="mt-0.5 text-xs text-[var(--color-text-subtle)]">{it.desc}</div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <Link
              href={contactHref}
              className="mt-6 inline-flex w-full items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)] px-4 py-3 text-sm font-semibold text-black hover:bg-[var(--color-accent-hover)]"
            >
              {t(locale, "nav.contact_us")}
            </Link>

            <div className="mt-6 rounded-[var(--radius-md)] border border-[var(--color-alert-border)] bg-[var(--color-alert-bg)] px-4 py-3 text-xs leading-6 text-[var(--color-text-muted)]">
              {t(locale, "nav.urgency")}
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}

export type { NavGroup };
