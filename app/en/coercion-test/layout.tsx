import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbSchema, getSiteBase, organizationRef } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Coercion self-check — free, anonymous BITE-based tool",
  description:
    "Educational self-assessment of coercive control signals (Steven Hassan's BITE model). 16 questions, anonymous, 5 minutes. Not a medical diagnosis.",
  alternates: {
    canonical: "/en/coercion-test",
    languages: {
      "fr-FR": "/test-emprise",
      en: "/en/coercion-test",
      "x-default": "/test-emprise",
    },
  },
};

export default function CoercionTestLayout({ children }: { children: ReactNode }) {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/en/coercion-test`;

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${pageUrl}#app`,
    name: "Coercion self-check — educational tool",
    description:
      "Educational self-assessment tool for coercive control signals based on Steven Hassan's BITE model (Behavior, Information, Thoughts, Emotion). 16 questions, free, anonymous.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    inLanguage: "en",
    isAccessibleForFree: true,
    url: pageUrl,
    publisher: organizationRef(siteBase),
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    audience: {
      "@type": "Audience",
      audienceType: "People in questioning, concerned relatives, professionals",
    },
  };

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: `${siteBase}/en` },
    { name: "Take action", url: `${siteBase}/en/help-a-loved-one` },
    { name: "Coercion self-check", url: pageUrl },
  ]);

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
