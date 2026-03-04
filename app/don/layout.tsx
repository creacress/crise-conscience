import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soutenir Crise Conscience — Faire un don",
  description:
    "Soutenez l'association Crise Conscience par un don sécurisé via Stripe. Financez des analyses indépendantes, des ressources vérifiées et la prévention des dérives sectaires.",
  alternates: { canonical: "/don" },
  openGraph: {
    type: "website",
    url: "/don",
    title: "Faire un don à Crise Conscience",
    description:
      "Don sécurisé via Stripe pour soutenir la prévention des dérives sectaires : analyses, ressources, veille automatisée.",
  },
};

export default function DonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
