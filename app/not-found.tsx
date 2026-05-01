import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  description:
    "La page recherchée n'existe pas ou a été déplacée. Retrouvez nos articles, ressources et l'accès au contact.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
      <div className="text-7xl font-semibold tracking-tight text-orange-300/90">404</div>

      <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
        Cette page est introuvable.
      </h1>

      <p className="mt-4 max-w-md text-pretty text-white/70">
        Il se peut que le lien soit obsolète ou que la page ait été déplacée. Voici quelques points
        d&apos;entrée utiles :
      </p>

      <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
        <Link
          href="/"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Accueil
        </Link>
        <Link
          href="/articles"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Articles
        </Link>
        <Link
          href="/contact"
          className="rounded-2xl border border-orange-500/40 bg-orange-500/10 px-4 py-3 text-sm font-semibold text-orange-200 transition hover:bg-orange-500/20"
        >
          Nous contacter
        </Link>
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-xs leading-6 text-white/55">
        <strong className="text-white/80">Urgence ?</strong> Ce site n&apos;est pas un service
        d&apos;urgence. En cas de danger immédiat&nbsp;: 15 / 17 / 18 / 112. Prévention suicide&nbsp;:
        3114.
      </div>
    </main>
  );
}
