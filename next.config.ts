import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Si tu utilises <Image> avec des images externes, ajoute les domaines ici.
  // (Laisse vide si tu n’en as pas besoin, ou complète au fur et à mesure.)
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms-imgp.jw-cdn.org",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "**.jw-cdn.org",
      },
    ],
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

      // Cache agressif pour fichiers SEO “stables”
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
      // Manifest and static assets
      {
        source: "/manifest.json",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, s-maxage=86400" }],
      },
    ];
  },
};

export default nextConfig;
