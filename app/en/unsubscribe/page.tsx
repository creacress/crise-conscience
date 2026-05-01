import type { Metadata } from "next";
import Container from "@/app/components/Container";
import { UnsubscribeCard } from "@/app/components/UnsubscribeCard";
import Breadcrumb from "@/app/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Newsletter unsubscribe",
  description:
    "Unsubscribe from the Crise Conscience newsletter. One-click, no guilt-tripping.",
  alternates: {
    canonical: "/en/unsubscribe",
    languages: {
      "fr-FR": "/desinscription",
      en: "/en/unsubscribe",
      "x-default": "/desinscription",
    },
  },
  robots: { index: false, follow: true },
};

export default function EnUnsubscribePage() {
  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-200px,rgba(255,255,255,0.10),transparent_60%)]" />

      <Container className="relative py-12">
        <Breadcrumb
          className="mb-6"
          items={[
            { label: "Home", href: "/en" },
            { label: "Unsubscribe" },
          ]}
        />

        <div className="max-w-2xl">
          <div className="text-sm text-[var(--color-text-subtle)]">Newsletter</div>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-[var(--color-text)] md:text-5xl">
            Unsubscribe
          </h1>
          <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed">
            You can unsubscribe in one click. No drama, no guilt-tripping.
          </p>

          <div className="mt-8">
            <UnsubscribeCard />
          </div>
        </div>
      </Container>
    </main>
  );
}
