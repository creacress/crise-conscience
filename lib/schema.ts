/**
 * Helpers JSON-LD (schema.org) centralisés.
 * Toutes les pages doivent passer par ces builders pour rester cohérentes
 * (Organization unique, logo, sameAs, parentOrganization UNADFI, etc.).
 */

const FALLBACK_BASE = "https://www.criseconscience.org";

export function getSiteBase(): string {
  const env = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  return (env || FALLBACK_BASE).replace(/\/$/, "");
}

export function organizationSchema(siteBase = getSiteBase()) {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${siteBase}/#organization`,
    name: "Crise Conscience",
    alternateName: "Association Crise Conscience",
    url: siteBase,
    logo: {
      "@type": "ImageObject",
      url: `${siteBase}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    image: `${siteBase}/opengraph-image`,
    description:
      "Association loi 1901, partenaire de l'UNADFI. Informer, prévenir et aider face aux dérives sectaires : analyses, ressources, accompagnement.",
    inLanguage: "fr-FR",
    foundingLocation: { "@type": "Country", name: "France" },
    knowsAbout: [
      "dérives sectaires",
      "emprise psychologique",
      "manipulation mentale",
      "ostracisme",
      "prévention",
      "esprit critique",
      "MIVILUDES",
    ],
    parentOrganization: {
      "@type": "NGO",
      name: "UNADFI",
      url: "https://www.unadfi.org/",
    },
    sameAs: [
      "https://www.unadfi.org/",
      "https://linkedin.com/in/association-crise-conscience-58a5173a8",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "general",
        email: "contact@criseconscience.org",
        availableLanguage: ["fr"],
        url: `${siteBase}/contact`,
      },
    ],
  };
}

export function websiteSchema(siteBase = getSiteBase()) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteBase}/#website`,
    name: "Crise Conscience",
    url: siteBase,
    inLanguage: "fr-FR",
    description:
      "Informer, prévenir et aider face aux dérives sectaires : analyses, ressources fiables, contact.",
    publisher: { "@id": `${siteBase}/#organization` },
  };
}

/**
 * Référence légère vers l'Organization (à utiliser dans publisher / author si pertinent).
 */
export function organizationRef(siteBase = getSiteBase()) {
  return {
    "@type": "NGO",
    "@id": `${siteBase}/#organization`,
    name: "Crise Conscience",
    url: siteBase,
    logo: {
      "@type": "ImageObject",
      url: `${siteBase}/opengraph-image`,
    },
  };
}

type ArticleSchemaInput = {
  siteBase?: string;
  pageUrl: string;
  title: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
};

export function articleSchema({
  siteBase = getSiteBase(),
  pageUrl,
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName = "Rédaction Crise Conscience",
}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description || undefined,
    image: image ? [image] : undefined,
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
    inLanguage: "fr-FR",
    mainEntityOfPage: pageUrl,
    author: {
      "@type": "Organization",
      name: authorName,
      url: siteBase,
    },
    publisher: organizationRef(siteBase),
    isPartOf: { "@id": `${siteBase}/#website` },
    isAccessibleForFree: true,
  };
}

type FaqItem = { question: string; answer: string };

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
