import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbSchema, getSiteBase, organizationRef } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Test d'emprise — auto-évaluation gratuite et anonyme",
  description:
    "Outil pédagogique d'auto-évaluation des signaux d'emprise (modèle BITE de Steven Hassan). 16 questions, anonyme, 5 minutes. Cet outil n'est pas un diagnostic médical.",
  alternates: { canonical: "/test-emprise" },
  openGraph: {
    type: "website",
    url: "/test-emprise",
    title: "Test d'emprise — outil pédagogique d'auto-évaluation",
    description:
      "16 questions BITE pour repérer les signaux d'emprise. Anonyme, gratuit, en 5 minutes. Pas un diagnostic médical.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Test d'emprise — outil pédagogique",
    description:
      "16 questions inspirées du modèle BITE. Anonyme, 5 min. Pas un diagnostic médical.",
  },
};

export default function TestEmpriseLayout({ children }: { children: ReactNode }) {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/test-emprise`;

  // SoftwareApplication / WebApplication : indique aux moteurs un outil interactif.
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${pageUrl}#app`,
    name: "Test d'emprise — outil pédagogique",
    description:
      "Outil d'auto-évaluation pédagogique des signaux d'emprise basé sur le modèle BITE (Behavior, Information, Thoughts, Emotion) de Steven Hassan. 16 questions, gratuit, anonyme.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
    url: pageUrl,
    publisher: organizationRef(siteBase),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Personnes en questionnement, proches inquiets, professionnels",
    },
  };

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Accueil", url: `${siteBase}/` },
    { name: "Agir", url: `${siteBase}/aider-un-proche` },
    { name: "Test d'emprise", url: pageUrl },
  ]);

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
