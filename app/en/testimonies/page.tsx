import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import { JsonLd } from "@/app/components/JsonLd";
import EmergencyBox from "@/app/components/EmergencyBox";
import Tag from "@/app/components/ui/Tag";
import Button from "@/app/components/ui/Button";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import { breadcrumbSchema, getSiteBase, organizationRef } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Testimonies — Exiting coercive control",
  description:
    "Anonymised testimonies from people who left a coercive group. Exit and recovery accounts. Opt-in only, you stay in control.",
  alternates: {
    canonical: "/en/testimonies",
    languages: {
      "fr-FR": "/temoignages",
      en: "/en/testimonies",
      "x-default": "/temoignages",
    },
  },
};

const TESTIMONIES: never[] = [];

const TYPICAL_PATTERNS = [
  {
    title: "The doubt sparked by a relative",
    desc: "“My sister waited 3 years without ever lecturing me. One day I called her, just to talk. That's what triggered everything.”",
    insight: "Preserved bond is the first exit door. Not confrontation.",
  },
  {
    title: "The healthcare break that changes everything",
    desc: "“We were asked to refuse a treatment. When my child fell ill, I understood I could no longer follow.”",
    insight: "Children or health often trigger the first acknowledged dissonance.",
  },
  {
    title: "The financial gap",
    desc: "“I counted what I had paid in 5 years. I cried. It was my inheritance.”",
    insight: "Documenting amounts is often the first concrete step out.",
  },
  {
    title: "Post-exit ostracism",
    desc: "“The day I left, no one spoke to me anymore. As if I had never existed.”",
    insight: "Ostracism is almost systematic. It's the initial cost of exit, not a failure.",
  },
] as const;

export default function EnTestimoniesPage() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/en/testimonies`;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: "Testimonies — Exiting coercive control",
    description:
      "Anonymised testimonies from people who left a coercive group. Opt-in only, anonymity guaranteed.",
    url: pageUrl,
    inLanguage: "en",
    isPartOf: { "@id": `${siteBase}/#website` },
    publisher: organizationRef(siteBase),
    hasPart: TESTIMONIES,
  };

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: `${siteBase}/en` },
    { name: "Recovering", url: `${siteBase}/en/recovering` },
    { name: "Testimonies", url: pageUrl },
  ]);

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <Container>
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/en" },
              { label: "Recovering", href: "/en/recovering" },
              { label: "Testimonies" },
            ]}
          />

          <header className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="info" size="sm">Collection</Tag>
              <Tag tone="calm" size="sm">100% anonymous · explicit opt-in</Tag>
            </div>
            <h1 className="mt-5 font-display text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] md:text-4xl lg:text-5xl">
              Testimonies —{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
                exiting coercive control
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              Accounts from people who left a coercive group. <strong className="text-[var(--color-text)]">Total
              anonymity</strong> (initial, age range, duration — never names of groups or
              identifying details), <strong className="text-[var(--color-text)]">explicit written
              consent</strong>, possibility to withdraw at any time.
            </p>
          </header>

          <section
            aria-labelledby="charter-title"
            className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8"
          >
            <h2
              id="charter-title"
              className="font-display text-xl font-semibold text-[var(--color-text)]"
            >
              Our publication charter
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-text-muted)]">
              <li className="flex items-start gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>
                  <strong className="text-[var(--color-text)]">Strict anonymity.</strong> Pseudonym
                  or initial only. No proper names, no identifiable places, no specific group
                  names.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>
                  <strong className="text-[var(--color-text)]">Explicit written consent.</strong>{" "}
                  You validate the final text before publication, you set what is public and
                  what isn't.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>
                  <strong className="text-[var(--color-text)]">Right of withdrawal.</strong> You
                  can request withdrawal at any time, without justification. Immediate action.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>
                  <strong className="text-[var(--color-text)]">No defamation.</strong> We speak
                  of <em>mechanisms</em> and <em>personal experience</em>, never nominative
                  qualifications of persons or organisations.
                </span>
              </li>
            </ul>
          </section>

          {TESTIMONIES.length === 0 ? (
            <section className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
              <Tag tone="neutral" size="sm">Collection in progress</Tag>
              <h2 className="mt-3 font-display text-xl font-semibold text-[var(--color-text)] sm:text-2xl">
                The first testimonies will arrive soon
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                The collection is starting. Meanwhile, here are some recurring exit patterns
                documented by specialised associations (UNADFI, CCMM) — to show what makes a
                useful account for others.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {TYPICAL_PATTERNS.map((p) => (
                  <article
                    key={p.title}
                    className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-5"
                  >
                    <h3 className="font-display text-base font-semibold text-[var(--color-text)]">
                      {p.title}
                    </h3>
                    <blockquote className="mt-3 border-l-2 border-[var(--color-accent)]/40 pl-3 text-sm italic leading-6 text-[var(--color-text-muted)]">
                      {p.desc}
                    </blockquote>
                    <p className="mt-3 text-xs leading-5 text-[var(--color-text-subtle)]">
                      <strong className="text-[var(--color-accent)]">Insight:</strong> {p.insight}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section
            id="contribute"
            className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30 bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-surface-1)]/50 to-transparent p-6 sm:p-8 scroll-mt-24"
          >
            <Tag tone="accent" size="sm">Contribute</Tag>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)]">
              Share your story, anonymously
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-text-muted)]">
              Your experience can help others recognise their situation, or take the first step.{" "}
              <strong className="text-[var(--color-text)]">You stay in control of the
              text:</strong> we draft an anonymised version from your input, you validate before
              publication, you can withdraw at any time.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">Step 1</div>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  You write freely, no format constraint. 200 or 2,000 words, you decide.
                </p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">Step 2</div>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  Editorial team anonymises (initials, years, general context) and sends back for
                  validation.
                </p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">Step 3</div>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  You give (or refuse) written consent. Publication only with explicit
                  validation.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/en/contact" variant="primary" size="md">
                Write to the editorial team
              </Button>
              <Button href="/en/recovering" variant="secondary" size="md">
                Read the post-exit guide
              </Button>
            </div>
          </section>

          <aside
            role="note"
            aria-label="Caution"
            className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5 text-sm leading-6 text-[var(--color-text-muted)]"
          >
            <strong className="text-[var(--color-text)]">A note of caution.</strong> Reading
            testimonies can revive difficult emotions, especially if you are yourself in an exit
            or recovery phase. If reading becomes too heavy, close the tab and call a therapist,
            UNADFI or 3114 (suicide prevention, free, 24/7, France).
          </aside>

          <div className="mt-6">
            <EmergencyBox variant="full" />
          </div>

          <footer className="mt-10 border-t border-[var(--color-border)] pt-6 text-xs leading-6 text-[var(--color-text-subtle)]">
            <p>
              Collection edited by Crise Conscience. Anonymised testimonies with explicit
              written consent. Introductory exit patterns documented by UNADFI and CCMM. Last
              update: May 1, 2026.
            </p>
            <div className="mt-3">
              <Link href="/en/recovering" className="text-[var(--color-accent)] hover:underline">
                ← Read the “Recovering after coercive control” guide
              </Link>
            </div>
          </footer>
        </div>
      </Container>
    </>
  );
}
