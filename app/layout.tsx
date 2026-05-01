import "./globals.css";
import HamburgerNav from "@/app/components/hamburger";
import SiteFooter from "@/app/components/SiteFooter";
import SkipLink from "@/app/components/ui/SkipLink";

import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

// next/font : auto-host des polices, élimine le fetch externe et la duplication
// stylesheet/preload, et corrige le double chargement signalé par l'audit perf.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
});

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
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen antialiased">
        <SkipLink />

        {/* Décor : 2 halos discrets, désactivés sur prefers-reduced-motion via globals.css */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-50 blur-3xl">
          <div className="absolute -top-32 left-10 h-72 w-72 rounded-full bg-[var(--color-info)]/20" />
          <div className="absolute top-40 right-10 h-72 w-72 rounded-full bg-[var(--color-accent)]/15" />
        </div>

        <style>{`
          @keyframes cc-page-enter {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .cc-page-slot > * {
            animation: cc-page-enter var(--motion-slow, 360ms) var(--motion-ease-soft, cubic-bezier(0.22, 1, 0.36, 1)) both;
          }
        `}</style>

        <div className="relative">
          {/* Header sticky : z-50 pour passer au-dessus du hero / cards */}
          <div className="sticky top-0 z-50 mx-auto w-full max-w-6xl px-4 pt-3">
            <HamburgerNav />
          </div>
          <main id="main" className="pt-6">
            <div className="cc-page-slot">{children}</div>
          </main>
          <SiteFooter />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
