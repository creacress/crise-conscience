

import type { MetadataRoute } from "next";

// Sitemap Next.js (App Router)
// - inclut routes statiques
// - inclut routes dynamiques /articles/[id]
// - base URL via NEXT_PUBLIC_SITE_URL (fallback prod)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.criseconscience.org").replace(/\/$/, "");

  // Routes statiques principales
  const staticRoutes = ["/", "/blog", "/articles", "/ressources", "/a-propos", "/contact"];

  // Routes blog “pages” (ex: /blog/signeaux-emprise)
  // 👉 ajoute ici au fur et à mesure que tu crées des pages statiques dans /app/blog/*
  const staticBlogRoutes = ["/blog/signeaux-emprise"];

  // Articles dynamiques depuis la DB (Prisma). En cas d'erreur, on retombe sur statique.
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const { prisma } = await import("@/lib/prisma");

    // Adapte si tes champs diffèrent (id + updatedAt suffisants)
    const rows = await prisma.article.findMany({
      select: { id: true, updatedAt: true, createdAt: true },
      orderBy: { updatedAt: "desc" },
    });

    articleRoutes = rows.map((a: any) => ({
      url: `${base}/articles/${encodeURIComponent(String(a.id))}`,
      lastModified: new Date(a.updatedAt ?? a.createdAt ?? Date.now()),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch {
    // noop (build/prod safe)
  }

  const now = new Date();

  const staticSitemap: MetadataRoute.Sitemap = [...staticRoutes, ...staticBlogRoutes].map((p) => ({
    url: `${base}${p === "/" ? "" : p}`,
    lastModified: now,
    changeFrequency: p === "/" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : 0.7,
  }));

  return [...staticSitemap, ...articleRoutes];
}