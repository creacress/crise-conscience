import type { MetadataRoute } from "next";

// Sitemap Next.js (App Router)
// - inclut routes statiques
// - inclut routes dynamiques /articles/[slug] (filtrées sur status=published)
// - base URL via NEXT_PUBLIC_SITE_URL (fallback prod)
//
// Note : on omet volontairement changeFrequency et priority — Google les ignore
// depuis ~2017 et les autres moteurs s'appuient surtout sur lastModified.

// Revalidation horaire pour refléter les nouveaux articles sans rebuild complet.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.criseconscience.org").replace(/\/$/, "");

  // Pages stables (faible churn) — date manuelle, à incrémenter en cas de refonte importante.
  const stableLastMod = new Date("2026-05-01");

  // Pages éditoriales (mises à jour de temps en temps).
  const editorialLastMod = new Date("2026-05-01");

  const staticRoutes: { path: string; lastModified: Date }[] = [
    { path: "/", lastModified: editorialLastMod },
    { path: "/articles", lastModified: editorialLastMod },
    { path: "/blog", lastModified: editorialLastMod },
    { path: "/ressources", lastModified: editorialLastMod },
    { path: "/a-propos", lastModified: stableLastMod },
    { path: "/contact", lastModified: stableLastMod },
    { path: "/inscription", lastModified: stableLastMod },
    { path: "/desinscription", lastModified: stableLastMod },
    { path: "/abonnes", lastModified: stableLastMod },
    { path: "/don", lastModified: stableLastMod },
  ];

  const legalRoutes: { path: string; lastModified: Date }[] = [
    { path: "/mentions-legales", lastModified: stableLastMod },
    { path: "/confidentialite", lastModified: stableLastMod },
    { path: "/cookies", lastModified: stableLastMod },
  ];

  // Pages éditoriales statiques sous /blog/*
  const staticBlogRoutes: { path: string; lastModified: Date }[] = [
    { path: "/blog/signaux-emprise", lastModified: editorialLastMod },
  ];

  // Articles dynamiques depuis la DB (Prisma). En cas d'erreur, on retombe sur statique.
  // CORRECTIF V2-01 : on émet le SLUG (la route /articles/[id] résout par slug),
  // et on filtre sur les articles "published" pour éviter d'exposer des brouillons.
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

  const staticSitemap: MetadataRoute.Sitemap = [...staticRoutes, ...staticBlogRoutes].map((r) => ({
    url: `${base}${r.path === "/" ? "" : r.path}`,
    lastModified: r.lastModified,
  }));

  const legalSitemap: MetadataRoute.Sitemap = legalRoutes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: r.lastModified,
  }));

  return [...staticSitemap, ...legalSitemap, ...articleRoutes];
}
