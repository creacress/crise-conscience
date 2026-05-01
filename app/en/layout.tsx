import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

// /en/* layout — applique lang="en" via metadata + override de l'attribut HTML
// (Next 16 ne propose pas encore d'override propre, on l'écrit côté client via
// un effet léger ou simplement on s'appuie sur les metadata + balises hreflang).

export const viewport: Viewport = {
  themeColor: "#0b1220",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.criseconscience.org"),
  title: {
    default: "Crise Conscience — Coercive control & cult dynamics, sourced analysis",
    template: "%s | Crise Conscience",
  },
  description:
    "French association partnered with UNADFI. Inform, prevent and support victims of coercive religious or ideological control. Sourced analysis, vetted resources, BITE-based self-check.",
  alternates: {
    canonical: "/en",
    languages: {
      "fr-FR": "/",
      "en": "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: "/en",
    siteName: "Crise Conscience",
    title: "Crise Conscience — Coercive control prevention",
    description:
      "French association (UNADFI partner). Educational resources, BITE-model self-check, glossary, FAQ. AI-assisted drafting, human-reviewed.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crise Conscience — Coercive control prevention",
    description:
      "Sourced analysis on cultic mechanisms & coercive control. AI-assisted, human-reviewed.",
  },
  robots: { index: true, follow: true },
};

export default function EnLayout({ children }: { children: ReactNode }) {
  return (
    <div lang="en" data-locale="en">
      {children}
    </div>
  );
}
