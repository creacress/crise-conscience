import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Article introuvable",
  description:
    "L'article recherché n'existe pas ou n'est plus disponible. Découvrez les autres analyses de Crise Conscience.",
  robots: { index: false, follow: false },
};

export default function ArticleNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
      <div className="text-7xl font-semibold tracking-tight text-orange-300/90">404</div>

      <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
        Article introuvable.
      </h1>

      <p className="mt-4 max-w-md text-pretty text-white/70">
        L&apos;article que vous cherchez n&apos;existe pas, a été retiré ou n&apos;est pas encore
        publié.
      </p>

      <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
        <Link
          href="/articles"
          className="rounded-2xl border border-orange-500/40 bg-orange-500/10 px-4 py-3 text-sm font-semibold text-orange-200 transition hover:bg-orange-500/20"
        >
          ← Tous les articles
        </Link>
        <Link
          href="/blog/signaux-emprise"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Lire les signes d&apos;emprise
        </Link>
      </div>
    </main>
  );
}
