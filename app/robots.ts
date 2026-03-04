import type { MetadataRoute } from "next";

// robots.txt (App Router)
// - Autorise le crawl standard + bots IA de recherche (ils citent le site)
// - Bloque les bots d'entraînement IA (scraping sans citation)
// - Référence llms.txt pour les assistants IA

export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.criseconscience.org").replace(/\/$/, "");

  return {
    rules: [
      // Moteurs de recherche classiques
      { userAgent: "*", allow: "/" },

      // === BOTS IA DE RECHERCHE (AUTORISÉS — citations dans les réponses IA) ===
      { userAgent: "OAI-SearchBot", allow: "/" },      // OpenAI ChatGPT Search
      { userAgent: "Google-Extended", allow: "/" },     // Google Gemini / AI Overviews
      { userAgent: "PerplexityBot", allow: "/" },       // Perplexity AI
      { userAgent: "anthropic-ai", allow: "/" },        // Anthropic Claude
      { userAgent: "cohere-ai", allow: "/" },           // Cohere
      { userAgent: "YouBot", allow: "/" },              // You.com
      { userAgent: "meta-externalagent", allow: "/" },  // Meta AI

      // === BOTS D'ENTRAÎNEMENT IA (BLOQUÉS — scraping sans citation) ===
      { userAgent: "GPTBot", disallow: "/" },           // OpenAI training
      { userAgent: "CCBot", disallow: "/" },            // Common Crawl
      { userAgent: "Bytespider", disallow: "/" },       // Bytedance / TikTok
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
