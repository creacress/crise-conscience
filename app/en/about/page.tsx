import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbSchema, faqSchema, organizationSchema, getSiteBase } from "@/lib/schema";
import Tag from "@/app/components/ui/Tag";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import Button from "@/app/components/ui/Button";

export const metadata: Metadata = {
  title: "About — Crise Conscience",
  description:
    "Crise Conscience is a French nonprofit (UNADFI partner) covering coercive control, cult dynamics and recovery. AI-assisted drafting with human review (70/30).",
  alternates: {
    canonical: "/en/about",
    languages: { "fr-FR": "/a-propos", en: "/en/about", "x-default": "/a-propos" },
  },
};

const FAQ = [
  {
    question: "Are you against religion?",
    answer:
      "No. We do not target any belief or religion. We analyse coercive behaviour, ostracism and their psychological, social and legal consequences. The French legal framework — that we follow — qualifies behaviour and harm, never thought.",
  },
  {
    question: "What is the link between Crise Conscience and UNADFI?",
    answer:
      "We are a partner of UNADFI (Union Nationale des Associations de Défense des Familles et de l'Individu victimes de sectes), the leading French federation of associations supporting victims of coercive groups. This partnership gives us a vetted ethical, legal and methodological framework.",
  },
  {
    question: "Who writes the content?",
    answer:
      "Long analyses are drafted with AI assistance (~70 % of the initial draft), then read, fact-checked and enriched by our human editorial team (~30 %). We claim it openly: transparency on method is a coherence requirement for an association that talks about influence and coercion.",
  },
  {
    question: "Is this an emergency service?",
    answer:
      "No. In case of immediate danger, in France: 15 (medical), 17 (police), 18 (firefighters), 112 (EU emergencies), 119 (children at risk), 3114 (suicide prevention), 3919 (violence against women).",
  },
] as const;

const VALUES = [
  { title: "Independence", desc: "Independent of any religious, political or ideological organisation." },
  { title: "Rigor", desc: "Verifiable sources, academic work, critical methodology. We distinguish fact, opinion and hypothesis." },
  { title: "Humanism", desc: "Dignity, freedom of conscience, individual autonomy. We respect persons even when we disagree with behaviour." },
  { title: "Pedagogy", desc: "Make complex topics legible — that is the condition for prevention to be useful, not reserved to insiders." },
  { title: "Transparency", desc: "Editorial method openly stated (AI-assisted + human review), sources cited, limits acknowledged." },
];

export default function EnAboutPage() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/en/about`;

  return (
    <>
      <JsonLd data={organizationSchema(siteBase)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteBase}/en` },
          { name: "About", url: pageUrl },
        ])}
      />
      <JsonLd
        data={faqSchema(FAQ.map((f) => ({ question: f.question, answer: f.answer })))}
      />

      <Container>
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/en" },
              { label: "About" },
            ]}
          />

          <header className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="accent" size="sm">French nonprofit · law of 1901</Tag>
              <Tag tone="info" size="sm">UNADFI partner</Tag>
            </div>
            <h1 className="mt-5 font-display text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] md:text-4xl">
              About Crise Conscience
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              Independent French association, partner of{" "}
              <a className="text-[var(--color-accent)] hover:underline" href="https://www.unadfi.org/" target="_blank" rel="noreferrer">
                UNADFI
              </a>
              . Our mission: provide tools to understand, inform about and prevent coercive control
              and cult dynamics — focused on <strong className="text-[var(--color-text)]">behaviour and harm</strong>,
              never beliefs.
            </p>
          </header>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl">
              Our mission
            </h2>
            <div className="mt-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 leading-7 text-[var(--color-text-muted)]">
              <p>
                Promote critical thinking and rational analysis when facing closed belief systems.
                Study mechanisms of psychological conditioning, social control and ideological
                manipulation, so they become recognisable.
              </p>
              <p className="mt-4">
                We address the general public, concerned individuals and their families, as well
                as researchers, professionals (psychology, law, education, healthcare),
                journalists and institutions.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl">
              Our values
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5"
                >
                  <strong className="font-display text-base text-[var(--color-text)]">{v.title}</strong>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl">
              Editorial method (70 / 30)
            </h2>
            <div className="mt-4 rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30 bg-gradient-to-b from-[var(--color-accent-soft)] to-transparent p-6 leading-7 text-[var(--color-text)]">
              <p>
                Long content (analyses, dossiers, articles) is produced under a{" "}
                <strong>~70 % AI / ~30 % human</strong> protocol:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-7 text-[var(--color-text-muted)]">
                <li>
                  <strong className="text-[var(--color-text)]">Draft</strong> written with AI
                  assistance, from a validated editorial brief and pre-defined sources.
                </li>
                <li>
                  <strong className="text-[var(--color-text)]">Human review</strong> systematic:
                  fact-checking, nuance, tone validation, legal context (MIVILUDES, French law),
                  removal of ambiguous wording.
                </li>
                <li>
                  <strong className="text-[var(--color-text)]">Explicit mention</strong> in legal
                  notice and site-wide footer.
                </li>
              </ul>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
                Why? Because transparency on one&apos;s own methods is a prerequisite for an
                association that speaks about influence and coercion. We consider it incoherent
                to be opaque about how our own content is produced.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl">
              FAQ
            </h2>
            <div className="mt-4 space-y-3">
              {FAQ.map((q) => (
                <details
                  key={q.question}
                  className="group rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5 open:bg-[var(--color-surface-2)]/70"
                >
                  <summary className="cursor-pointer list-none text-base font-semibold text-[var(--color-text)] marker:hidden">
                    <span className="mr-2 inline-block text-[var(--color-accent)] transition-transform duration-[var(--motion-fast)] group-open:rotate-90">
                      ›
                    </span>
                    {q.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{q.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30 bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-surface-1)]/50 to-transparent p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[var(--color-text)]">
                    Question, testimony or partnership?
                  </h2>
                  <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
                    Anonymous contact possible.
                  </p>
                </div>
                <Button href="/en/contact" variant="primary" size="md">
                  Contact us
                </Button>
              </div>
            </div>
          </section>

          <footer className="border-t border-[var(--color-border)] pt-6 text-xs leading-6 text-[var(--color-text-subtle)]">
            <p>
              Want to read in French?{" "}
              <Link className="text-[var(--color-accent)] hover:underline" href="/a-propos">
                Lire la version française
              </Link>
              .
            </p>
          </footer>
        </div>
      </Container>
    </>
  );
}
