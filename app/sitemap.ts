

import type { MetadataRoute } from "next";

// Sitemap Next.js (App Router)
// - Inclut toutes les routes statiques avec priorités SEO optimisées
// - Inclut les routes dynamiques /articles/[id]
// - Fréquences adaptées au rythme de publication

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.criseconscience.org").replace(/\/$/, "");

  // Routes statiques avec priorités SEO optimisées
  const staticPages: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1.0, changeFrequency: "daily" },
    { path: "/articles", priority: 0.9, changeFrequency: "daily" },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/ressources", priority: 0.8, changeFrequency: "weekly" },
    { path: "/a-propos", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/inscription", priority: 0.6, changeFrequency: "monthly" },
    { path: "/don", priority: 0.6, changeFrequency: "monthly" },
    { path: "/blog/signeaux-emprise", priority: 0.85, changeFrequency: "monthly" },
  ];

  // Articles dynamiques depuis la DB (Prisma)
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const { prisma } = await import("@/lib/prisma");
    const rows = await prisma.article.findMany({
      select: { id: true, updatedAt: true, createdAt: true },
      orderBy: { updatedAt: "desc" },
    });

    articleRoutes = rows.map((a: any) => ({
      url: `${base}/articles/${encodeURIComponent(String(a.id))}`,
      lastModified: new Date(a.updatedAt ?? a.createdAt ?? Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // noop (build/prod safe)
  }

  const now = new Date();

  const staticSitemap: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${base}${p.path === "/" ? "" : p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  return [...staticSitemap, ...articleRoutes];
}
