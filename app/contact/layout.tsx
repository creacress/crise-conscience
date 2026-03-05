import type { Metadata } from "next";

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
  return <>{children}</>;
}
