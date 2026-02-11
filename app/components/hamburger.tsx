

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

export type NavLink = { href: string; label: string };

type Props = {
  brand?: {
    title: string;
    subtitle?: string;
    initials?: string;
    href?: string;
  };
  links?: NavLink[];
  cta?: { href: string; label: string };
};

const DEFAULT_LINKS: NavLink[] = [
  { href: "/articles", label: "Articles" },
  { href: "/blog", label: "Blog" },
  { href: "/ressources", label: "Ressources" },
  { href: "/a-propos", label: "À propos" },
];

export default function HamburgerNav({
  brand = {
    title: "Crise Conscience",
    subtitle: "Prévenir • Informer • Aider",
    initials: "CC",
    href: "/",
  },
  links,
  cta = { href: "/contact", label: "Contact" },
}: Props) {
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  const navLinks = useMemo(() => links ?? DEFAULT_LINKS, [links]);

  // Close the drawer automatically after navigation.
  useEffect(() => {
    const el = detailsRef.current;
    if (el?.open) el.open = false;
  }, [pathname]);

  return (
    <header className="w-full">
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        {/* Brand */}
        <Link href={brand.href ?? "/"} className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-orange-300 font-semibold">
            {brand.initials ?? "CC"}
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">{brand.title}</div>
            {brand.subtitle ? (
              <div className="text-xs text-white/55">{brand.subtitle}</div>
            ) : null}
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-2 text-sm text-white/75 hover:text-white hover:bg-white/10 transition"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={cta.href}
            className="ml-2 inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-black hover:brightness-110 transition"
          >
            {cta.label}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <details ref={detailsRef} className="group relative sm:hidden">
          <summary
            aria-label="Ouvrir le menu"
            className="list-none marker:content-none rounded-xl border border-white/10 bg-black/30 p-3 hover:bg-black/40 transition cursor-pointer"
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-4 w-5">
              <span className="absolute left-0 top-0 h-[2px] w-5 rounded-full bg-white/80 transition-transform duration-200 group-open:translate-y-[7px] group-open:rotate-45" />
              <span className="absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-white/70 transition-opacity duration-200 group-open:opacity-0" />
              <span className="absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-white/60 transition-transform duration-200 group-open:-translate-y-[7px] group-open:-rotate-45" />
            </span>
          </summary>

          {/* Backdrop */}
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => {
              if (detailsRef.current) detailsRef.current.open = false;
            }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none transition group-open:opacity-100 group-open:pointer-events-auto"
          />

          {/* Slide-over panel */}
          <div className="fixed right-0 top-0 z-50 h-dvh w-[86vw] max-w-sm translate-x-full border-l border-white/10 bg-[#0B0E14]/95 backdrop-blur-xl transition-transform duration-200 group-open:translate-x-0">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <div className="text-sm font-semibold">Navigation</div>
                <div className="text-xs text-white/55">Accès rapide</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (detailsRef.current) detailsRef.current.open = false;
                }}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10 transition"
              >
                Fermer
              </button>
            </div>

            <nav className="px-5 py-4 space-y-3">
              <Link
                href={brand.href ?? "/"}
                className="group/item flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white/80 hover:bg-white/10 hover:text-white transition"
              >
                <span className="text-sm font-medium">Accueil</span>
                <span className="text-orange-300 transition group-hover/item:translate-x-0.5">→</span>
              </Link>

              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group/item flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white/80 hover:bg-white/10 hover:text-white transition"
                >
                  <span className="text-sm font-medium">{l.label}</span>
                  <span className="text-orange-300 transition group-hover/item:translate-x-0.5">→</span>
                </Link>
              ))}

              <div className="pt-1 grid gap-3">
                <Link
                  href={cta.href}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-4 py-3 font-semibold text-black hover:brightness-110 transition"
                >
                  {cta.label}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-3 font-semibold text-white hover:bg-white/10 transition"
                >
                  Newsletter (inscription)
                </Link>
              </div>

              <div className="mt-2 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-white/60 leading-relaxed">
                Astuce : sur mobile, menu court + clair = meilleure lisibilité.
              </div>
            </nav>

            <div className="absolute inset-x-0 bottom-0 border-t border-white/10 p-4">
              <div className="flex items-center justify-between text-xs text-white/50">
                <span>criseconscience.org</span>
                <span className="text-orange-300">—</span>
              </div>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}