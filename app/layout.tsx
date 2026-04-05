import "./globals.css";
import HamburgerNav from "@/app/components/hamburger";
import SiteFooter from "@/app/components/SiteFooter";

import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";

export const viewport: Viewport = {
  themeColor: "#0b1220",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.criseconscience.org"),
  title: {
    default: "Crise Conscience — Prévention des dérives sectaires, analyses et ressources",
    template: "%s | Crise Conscience",
  },
  description:
    "Association française indépendante dédiée à la prévention des dérives sectaires. Analyses critiques, ressources vérifiées, signaux d'emprise, accompagnement et esprit critique. Référence sur les mécanismes d'emprise et la manipulation.",
  keywords: [
    "dérives sectaires",
    "emprise psychologique",
    "manipulation mentale",
    "prévention sectaire",
    "secte",
    "MIVILUDES",
    "esprit critique",
    "signaux d'emprise",
    "contrôle mental",
    "aide victimes sectes",
    "association anti-secte",
    "sortir d'une secte",
    "reconnaître une secte",
    "mécanismes d'emprise",
    "isolement sectaire",
    "manipulation idéologique",
    "analyse critique",
    "ressources dérives sectaires",
    "témoignages sectes",
    "Crise Conscience",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Crise Conscience",
    title: "Crise Conscience — Prévention des dérives sectaires",
    description:
      "Association française indépendante : analyses critiques, ressources vérifiées, signaux d'emprise et accompagnement face aux dérives sectaires.",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crise Conscience — Prévention des dérives sectaires",
    description:
      "Analyses critiques, ressources vérifiées et accompagnement face aux dérives sectaires. Association indépendante.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "association",
  other: {
    "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="dns-prefetch" href="https://cms-imgp.jw-cdn.org" />
        <link rel="preconnect" href="https://cms-imgp.jw-cdn.org" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-[#0b1220] text-white antialiased" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        {/* glow background */}
        <div className="pointer-events-none fixed inset-0 opacity-40 blur-3xl">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/30" />
          <div className="absolute top-40 right-10 h-72 w-72 rounded-full bg-orange-500/25" />
        </div>

        <style>{`
          /* Page transitions (App Router) */
          @keyframes cc-page-enter {
            from { opacity: 0; transform: translateY(10px); filter: blur(4px); }
            to   { opacity: 1; transform: translateY(0);  filter: blur(0); }
          }

          /* The layout persists between navigations, so animate the page root element (children) */
          .cc-page-slot > * {
            animation: cc-page-enter 360ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
          }

          @media (prefers-reduced-motion: reduce) {
            .cc-page-slot > * { animation: none !important; }
          }
        `}</style>

        <div className="relative">
          <div className="mx-auto w-full max-w-6xl px-4">
            <HamburgerNav />
          </div>
          <main className="pt-10">
            <div className="cc-page-slot">{children}</div>
          </main>
          <SiteFooter />
          <Analytics />
        </div>
      </body>
    </html>
  );
}