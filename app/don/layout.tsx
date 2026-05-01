import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/app/components/JsonLd";
import {
  breadcrumbSchema,
  getSiteBase,
  organizationRef,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Soutenir Crise Conscience — Faire un don",
  description:
    "Soutenez l'association Crise Conscience par un don sécurisé via Stripe. Financez des analyses indépendantes, des ressources vérifiées et la prévention des dérives sectaires.",
  alternates: {
    canonical: "/don",
    languages: { "fr-FR": "/don", en: "/en/donate", "x-default": "/don" },
  },
  openGraph: {
    type: "website",
    url: "/don",
    title: "Faire un don à Crise Conscience",
    description:
      "Don sécurisé via Stripe pour soutenir la prévention des dérives sectaires : analyses, ressources, veille automatisée.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faire un don à Crise Conscience",
    description:
      "Soutenez l'analyse indépendante des dérives sectaires et la diffusion de ressources fiables.",
  },
};

export default function DonLayout({ children }: { children: ReactNode }) {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/don`;

  // V2-04 : DonateAction + WebPage schema (manquant en prod)
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Soutenir Crise Conscience — Faire un don",
    description:
      "Don sécurisé pour soutenir une association loi 1901 dédiée à la prévention des dérives sectaires.",
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${siteBase}/#website` },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    primaryImageOfPage: { "@type": "ImageObject", url: `${siteBase}/opengraph-image` },
    potentialAction: {
      "@type": "DonateAction",
      name: "Faire un don à Crise Conscience",
      description:
        "Soutenez l'analyse indépendante, la veille et les ressources de prévention des dérives sectaires.",
      target: {
        "@type": "EntryPoint",
        urlTemplate: pageUrl,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      recipient: organizationRef(siteBase),
    },
  };

  const breadcrumbJsonLd = {
    ...breadcrumbSchema([
      { name: "Accueil", url: `${siteBase}/` },
      { name: "Faire un don", url: pageUrl },
    ]),
    "@id": `${pageUrl}#breadcrumb`,
  };

  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
