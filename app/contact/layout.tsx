import type { Metadata } from "next";
import { Breadcrumb } from "@/app/components/Breadcrumb";
import { JsonLd } from "@/app/components/JsonLd";

const siteBase = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.criseconscience.org").replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Contact — Crise Conscience | Questions, témoignages, signalements",
  description:
    "Contactez l'association Crise Conscience : questions sur les dérives sectaires, témoignages, signalements, demandes de partenariat. Réponse sous 48-72h, anonymat possible.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contacter Crise Conscience — Questions et signalements",
    description:
      "Formulaire de contact : questions, témoignages, signalements de dérives sectaires, partenariats. Anonymat possible, réponse sous 48-72h.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contacter Crise Conscience",
    description: "Formulaire de contact : questions, témoignages, signalements de dérives sectaires.",
    url: `${siteBase}/contact`,
    mainEntity: {
      "@type": "NGO",
      "@id": `${siteBase}/#organization`,
      name: "Crise Conscience",
    },
  };

  return (
    <>
      <JsonLd data={contactJsonLd} />
      <div className="mx-auto w-full max-w-5xl px-4 pt-16">
        <Breadcrumb items={[{ label: "Contact", href: "/contact" }]} />
      </div>
      {children}
    </>
  );
}
