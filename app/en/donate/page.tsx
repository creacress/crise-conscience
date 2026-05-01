import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import { JsonLd } from "@/app/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  getSiteBase,
  organizationRef,
} from "@/lib/schema";
import Tag from "@/app/components/ui/Tag";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import DonateTunnel from "@/app/components/DonateTunnel";
import EmergencyBox from "@/app/components/EmergencyBox";

export const metadata: Metadata = {
  title: "Donate — Support Crise Conscience",
  description:
    "Support Crise Conscience, a French nonprofit. Secure Stripe donation. Funds editorial independence, vetted resources, BITE self-check and educational outreach.",
  alternates: {
    canonical: "/en/donate",
    languages: { "fr-FR": "/don", en: "/en/donate", "x-default": "/don" },
  },
  openGraph: {
    type: "website",
    url: "/en/donate",
    title: "Donate to Crise Conscience",
    description: "Support sourced analysis on coercive control and cult dynamics.",
  },
};

const FAQ = [
  {
    question: "Is my donation tax-deductible?",
    answer:
      "Tax deductibility (66 % of the donation for individuals, capped at 20 % of taxable income — French Tax Code article 200) requires the association to be recognised as a public-interest body. Our fiscal status is currently being processed. We will inform donors via email as soon as recognition is effective.",
  },
  {
    question: "How do I receive a donation receipt?",
    answer:
      "Stripe automatically sends a payment receipt by email (to the address used for the donation). For an association-issued receipt, write to us via the contact page: we return it within 48 to 72 hours.",
  },
  {
    question: "Can I cancel a monthly donation at any time?",
    answer:
      "Yes, in one click from the Stripe email you receive at the first transaction (subscription management link). You can also write to us — immediate processing, no minimum commitment.",
  },
  {
    question: "How is the money used?",
    answer:
      "Four main lines: hosting and security, content drafting (with human review), public resources (FAQ, glossary, guides), free tools (BITE self-check, anonymous contact). No payment to commercial third parties.",
  },
  {
    question: "Do you accept cheques or wire transfers?",
    answer:
      "Yes. Write to us via the contact page mentioning \"donation by cheque\" or \"donation by wire\": we will send you the postal address or RIB. A donation receipt will be provided regardless.",
  },
] as const;

export default function EnDonatePage() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/en/donate`;

  // WebPage + DonateAction (équivalent EN du layout FR)
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Donate to Crise Conscience",
    description:
      "Secure donation page (Stripe) supporting a French nonprofit dedicated to preventing coercive control and cult dynamics.",
    inLanguage: "en",
    isPartOf: { "@id": `${siteBase}/#website` },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    primaryImageOfPage: { "@type": "ImageObject", url: `${siteBase}/opengraph-image` },
    potentialAction: {
      "@type": "DonateAction",
      name: "Donate to Crise Conscience",
      description: "Support independent analysis on coercive control and cult dynamics.",
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
      { name: "Home", url: `${siteBase}/en` },
      { name: "Donate", url: pageUrl },
    ]),
    "@id": `${pageUrl}#breadcrumb`,
  };

  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd
        data={faqSchema(FAQ.map((f) => ({ question: f.question, answer: f.answer })))}
      />

      <Container>
        <div className="mx-auto max-w-5xl">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/en" },
              { label: "Donate" },
            ]}
          />

          <header className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <Tag tone="accent" size="md">Support the association</Tag>
                <h1 className="mt-4 font-display text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--color-text)] sm:text-4xl lg:text-5xl">
                  Support{" "}
                  <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
                    free and rigorous
                  </span>{" "}
                  information.
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)]">
                  Your donation funds verifiable analysis, automated monitoring and accessible
                  public resources. Independent of any external interest.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Tag tone="calm" size="sm">Secure Stripe checkout</Tag>
                  <Tag tone="info" size="sm">Receipt sent by email</Tag>
                  <Tag tone="neutral" size="sm">1-click cancellation</Tag>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-strong)] bg-[var(--color-surface-2)]/80 p-6 backdrop-blur-sm">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
                    Concretely
                  </div>
                  <ul className="mt-3 space-y-3 text-sm leading-6 text-[var(--color-text-muted)]">
                    <li className="flex items-baseline gap-3">
                      <span className="font-display text-2xl font-semibold text-[var(--color-accent)]">€10</span>
                      <span>1 month of automated monitoring infrastructure.</span>
                    </li>
                    <li className="flex items-baseline gap-3">
                      <span className="font-display text-2xl font-semibold text-[var(--color-accent)]">€25</span>
                      <span>1 sourced long-form article (with human review).</span>
                    </li>
                    <li className="flex items-baseline gap-3">
                      <span className="font-display text-2xl font-semibold text-[var(--color-accent)]">€60</span>
                      <span>1 month of full website operation.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </header>

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
                <Tag tone="info" size="sm">FAQ</Tag>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)]">
                  Frequently asked questions
                </h2>
                <div className="mt-5 space-y-3">
                  {FAQ.map((q, i) => (
                    <details
                      key={i}
                      className="group rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-2)]/40 p-5"
                    >
                      <summary className="cursor-pointer list-none text-base font-semibold text-[var(--color-text)] marker:hidden">
                        <span className="mr-2 inline-block text-[var(--color-accent)] transition-transform duration-[var(--motion-fast)] group-open:rotate-90">
                          ›
                        </span>
                        {q.question}
                      </summary>
                      <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                        {q.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-[6rem]">
                <DonateTunnel />
              </div>
            </aside>
          </div>

          <div className="mt-12">
            <EmergencyBox variant="banner" />
          </div>

          <footer className="mt-10 border-t border-[var(--color-border)] pt-6 text-xs leading-6 text-[var(--color-text-subtle)]">
            <p>
              Want to read in French?{" "}
              <Link className="text-[var(--color-accent)] hover:underline" href="/don">
                Voir la page française
              </Link>
              .
            </p>
          </footer>
        </div>
      </Container>
    </>
  );
}
