import type { MetadataRoute } from "next";

// Sitemap Next.js (App Router) — multi-locale FR + EN
// - inclut routes statiques (FR canonique + EN)
// - inclut routes dynamiques /articles/[slug] (filtrées sur status=published)
// - chaque entrée FR avec une traduction EN expose `alternates.languages`
//   pour aider Google à comprendre le mapping (hreflang dans le sitemap).
//
// Note : on omet volontairement changeFrequency et priority — Google les ignore.

export const revalidate = 3600;

type LocalePair = {
  fr: string;
  en?: string; // si défini, la page existe en EN
};

const LOCALIZED: LocalePair[] = [
  { fr: "/", en: "/en" },
  { fr: "/a-propos", en: "/en/about" },
  { fr: "/faq", en: "/en/faq" },
  { fr: "/contact", en: "/en/contact" },
  { fr: "/don", en: "/en/donate" },
  { fr: "/blog/signaux-emprise", en: "/en/recognize-coercive-control" },
  { fr: "/aider-un-proche", en: "/en/help-a-loved-one" },
  { fr: "/test-emprise", en: "/en/coercion-test" },
  { fr: "/glossaire", en: "/en/glossary" },
  { fr: "/se-reconstruire", en: "/en/recovering" },
  { fr: "/temoignages", en: "/en/testimonies" },
  { fr: "/ressources", en: "/en/resources" },
  { fr: "/inscription", en: "/en/subscribe" },
  { fr: "/desinscription", en: "/en/unsubscribe" },
  { fr: "/mentions-legales", en: "/en/legal" },
  { fr: "/confidentialite", en: "/en/privacy" },
  { fr: "/cookies", en: "/en/cookies" },
  // Pas (encore) traduits : /articles, /blog, /abonnes
  { fr: "/articles" },
  { fr: "/blog" },
  { fr: "/abonnes" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.criseconscience.org").replace(/\/$/, "");
  const editorialLastMod = new Date("2026-05-01");

  function entry(path: string, alt?: string): MetadataRoute.Sitemap[number] {
    const url = `${base}${path === "/" ? "" : path}`;
    if (!alt) {
      return { url, lastModified: editorialLastMod };
    }
    return {
      url,
      lastModified: editorialLastMod,
      alternates: {
        languages: {
          "fr-FR": `${base}${path === "/" ? "" : path}`,
          en: `${base}${alt}`,
        },
      },
    };
  }

  const localizedSitemap: MetadataRoute.Sitemap = LOCALIZED.flatMap((p) => {
    if (p.en) {
      return [entry(p.fr, p.en), entry(p.en, p.fr)];
    }
    return [entry(p.fr)];
  });

  // Articles dynamiques depuis la DB (Prisma). FR uniquement pour l'instant.
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const { prisma } = await import("@/lib/prisma");
    const { ArticleStatus } = await import("@/app/generated/prisma");

    const rows = await prisma.article.findMany({
      where: { status: ArticleStatus.published },
      select: { slug: true, updatedAt: true, createdAt: true, publishedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    articleRoutes = rows
      .filter((a) => Boolean(a.slug))
      .map((a) => ({
        url: `${base}/articles/${encodeURIComponent(a.slug)}`,
        lastModified: new Date(a.updatedAt ?? a.publishedAt ?? a.createdAt ?? Date.now()),
      }));
  } catch {
    // noop (build/prod safe : si Prisma indisponible, on n'expose pas de route 404)
  }

  return [...localizedSitemap, ...articleRoutes];
}
