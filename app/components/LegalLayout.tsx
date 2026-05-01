import type { ReactNode } from "react";
import Link from "next/link";

export default function LegalLayout({
  eyebrow,
  title,
  updatedAt,
  children,
}: {
  eyebrow: string;
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-24 pt-16">
      <header className="mb-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-8 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]">
        <div className="text-xs uppercase tracking-widest text-orange-300/90">{eyebrow}</div>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-white/60">Dernière mise à jour : {updatedAt}</p>
      </header>

      <article
        className="prose prose-invert max-w-none
          prose-headings:scroll-mt-28
          prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl prose-h2:font-semibold prose-h2:text-white
          prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-lg prose-h3:font-semibold prose-h3:text-white/95
          prose-p:leading-7 prose-p:text-white/80
          prose-a:text-orange-300 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white
          prose-ul:my-4 prose-li:my-1 prose-li:text-white/80"
      >
        {children}
      </article>

      <div className="mt-12 flex flex-wrap gap-3 text-sm">
        <Link
          href="/mentions-legales"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 hover:bg-white/10 transition"
        >
          Mentions légales
        </Link>
        <Link
          href="/confidentialite"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 hover:bg-white/10 transition"
        >
          Confidentialité
        </Link>
        <Link
          href="/cookies"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 hover:bg-white/10 transition"
        >
          Cookies
        </Link>
        <Link
          href="/contact"
          className="rounded-xl border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-orange-200 hover:bg-orange-500/20 transition"
        >
          Nous contacter →
        </Link>
      </div>
    </main>
  );
}

export function LegalPlaceholder({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-orange-500/15 px-1.5 py-0.5 text-orange-200">
      {children}
    </span>
  );
}
