import type { MetadataRoute } from "next";

// robots.txt (App Router)
//
// Stratégie :
// - Crawl public autorisé partout sauf /api/* et /generated/* (interne).
// - Bots de recherche IA et citations (OAI-SearchBot, ChatGPT-User, PerplexityBot,
//   ClaudeBot, Google-Extended, Applebot-Extended) : ALLOW. C'est la condition
//   pour que nos pages soient citées dans les réponses des assistants.
// - Bots de training (GPTBot, CCBot, etc.) : DISALLOW par défaut. Choix éditorial.
//   Si vous voulez ouvrir le training, basculez les `disallow` en `allow`.

export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.criseconscience.org").replace(/\/$/, "");

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/generated/"] },

      // --- Bots IA — Recherche / citations (ALLOW : on veut être cité) ---
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },

      // --- Bots IA — Entraînement de modèles (DISALLOW par défaut) ---
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },

      // --- Bots de moteurs de recherche classiques (ALLOW) ---
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "Qwantify", allow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
