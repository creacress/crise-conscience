import type { MetadataRoute } from "next";

// robots.txt (App Router)
// - Autorise le crawl standard
// - Gestion bots IA (OpenAI) :
//   - OAI-SearchBot (search/citations) : ALLOW
//   - GPTBot (training) : DISALLOW (par défaut)

export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.criseconscience.org").replace(/\/$/, "");

  return {
    rules: [
      { userAgent: "*", allow: "/" },

      // OpenAI
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "GPTBot", disallow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
