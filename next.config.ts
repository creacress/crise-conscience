import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Si tu utilises <Image> avec des images externes, ajoute les domaines ici.
  // (Laisse vide si tu n’en as pas besoin, ou complète au fur et à mesure.)
  images: {
    remotePatterns: [
      // Plus aucun hotlink externe par défaut.
      // Ajoute d'autres domaines au besoin (ex : CDN partenaire institutionnel).
    ],
  },

  // V2-03 : redirect 301 pour la faute de frappe historique.
  async redirects() {
    return [
      {
        source: "/blog/signeaux-emprise",
        destination: "/blog/signaux-emprise",
        permanent: true,
      },
    ];
  },

  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        // Réduit les APIs navigateur non nécessaires
        value:
          "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), interest-cohort=()",
      },
      // HSTS (appliqué si HTTPS) — ok sur Vercel
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
    ];

    return [
      // Global
      {
        source: "/:path*",
        headers: securityHeaders,
      },

      // Cache agressif pour fichiers SEO "stables"
      {
        source: "/sitemap.xml",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, s-maxage=86400" }],
      },
      {
        source: "/robots.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, s-maxage=86400" }],
      },
      {
        source: "/llms.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, s-maxage=86400" }],
      },
      {
        source: "/llms-full.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, s-maxage=86400" }],
      },
      {
        source: "/llms-en.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=86400" },
          { key: "Content-Language", value: "en" },
        ],
      },
      {
        source: "/llms-full-en.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=86400" },
          { key: "Content-Language", value: "en" },
        ],
      },
    ];
  },
};

export default nextConfig;
