import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import { JsonLd } from "@/app/components/JsonLd";
import EmergencyBox from "@/app/components/EmergencyBox";
import Tag from "@/app/components/ui/Tag";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import { breadcrumbSchema, getSiteBase } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Resources — Coercive control, prevention and support",
  description:
    "Useful resources on coercive control: guides, reports, support services, and tools to develop critical thinking. Sources MIVILUDES, UNADFI, CCMM, France Victimes.",
  alternates: {
    canonical: "/en/resources",
    languages: {
      "fr-FR": "/ressources",
      en: "/en/resources",
      "x-default": "/ressources",
    },
  },
};

type Resource = {
  title: string;
  description: string;
  href: string;
  badge?: string;
};

const QUICK: Resource[] = [
  {
    title: "Understand coercive control",
    description: "Definitions, warning signs, mechanisms of coercion and reading cues.",
    href: "/en/recognize-coercive-control",
    badge: "Reading",
  },
  {
    title: "Report a situation",
    description: "Orientations and useful contacts for structured, documented action.",
    href: "/en/contact",
    badge: "Action",
  },
  {
    title: "Library",
    description: "A curated selection of reports, guides, articles and educational material.",
    href: "#library",
    badge: "Docs",
  },
];

const CATEGORIES: {
  id: string;
  title: string;
  subtitle: string;
  items: Resource[];
}[] = [
  {
    id: "institutional",
    title: "Institutional resources",
    subtitle:
      "Public frameworks, references and services (France / Europe). Consult first for formal procedures.",
    items: [
      {
        title: "MIVILUDES — Information & references",
        description:
          "Interministerial mission: understanding, prevention, support, and annual reports.",
        href: "https://www.miviludes.interieur.gouv.fr/",
        badge: "Official",
      },
      {
        title: "Service-public.fr — Procedures & rights (FR)",
        description: "Practical resources: procedures, complaints, support associations, orientation.",
        href: "https://www.service-public.fr/",
        badge: "Official",
      },
      {
        title: "Council of Europe — Rights and freedoms",
        description: "General framework of fundamental rights and freedom of conscience.",
        href: "https://www.coe.int/",
        badge: "Europe",
      },
    ],
  },
  {
    id: "support",
    title: "Help & support",
    subtitle:
      "Associations, listening services and orientation. Depending on your situation, prefer adapted legal/psy support.",
    items: [
      {
        title: "UNADFI",
        description:
          "French network of associations supporting victims of coercive control: listening, orientation, support.",
        href: "https://www.unadfi.org/",
        badge: "Association",
      },
      {
        title: "CCMM",
        description: "Centre against mental manipulation: prevention, information, support.",
        href: "https://www.ccmm.asso.fr/",
        badge: "Association",
      },
      {
        title: "France Victimes",
        description:
          "Victim support: access to law, support, orientation toward local structures.",
        href: "https://www.france-victimes.fr/",
        badge: "Support",
      },
    ],
  },
  {
    id: "reading",
    title: "Guides & reading",
    subtitle:
      "Educational tools: critical thinking, rhetoric, manipulation, cognitive biases.",
    items: [
      {
        title: "Critical thinking: basics and methods",
        description:
          "A selection of content to structure an approach: sources, evidence, arguments, biases.",
        href: "/en/glossary",
        badge: "Method",
      },
      {
        title: "Crise Conscience analyses",
        description:
          "Our long-form articles: coercion mechanisms, doctrines, discourses, institutional strategies.",
        href: "/en",
        badge: "Crise Conscience",
      },
    ],
  },
  {
    id: "pro",
    title: "For professionals",
    subtitle:
      "For psychologists, lawyers, teachers, journalists: reference points, vigilance, documentation.",
    items: [
      {
        title: "Quick analysis kit",
        description:
          "Reading grid: warning signs, coercion, isolation, control, dependence, rupture.",
        href: "#kit",
        badge: "Toolkit",
      },
      {
        title: "Press / partnership contact",
        description: "Interview request, intervention, collaboration, review or referral.",
        href: "/en/contact",
        badge: "Contact",
      },
    ],
  },
];

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-text-muted)]">
      {children}
    </span>
  );
}

function Card({ item }: { item: Resource }) {
  const isExternal = /^https?:\/\//.test(item.href);
  return (
    <a
      href={item.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group block rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5 transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]/80"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-text)]">
          {item.title}
        </h3>
        {item.badge ? <Badge>{item.badge}</Badge> : null}
      </div>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{item.description}</p>
      <div className="mt-4 flex items-center gap-2 text-xs text-[var(--color-accent)]">
        <span className="opacity-80 group-hover:opacity-100">Open</span>
        <span className="opacity-60">→</span>
      </div>
    </a>
  );
}

export default function EnResourcesPage() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/en/resources`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteBase}/en` },
          { name: "Resources", url: pageUrl },
        ])}
      />

      <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-16">
        <Breadcrumb
          className="mb-6"
          items={[
            { label: "Home", href: "/en" },
            { label: "Resources" },
          ]}
        />

        <header className="mb-12 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-gradient-to-b from-[var(--color-surface-2)] to-[var(--color-surface-1)] p-8 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <Tag tone="info" size="sm">Document base</Tag>
            <Tag tone="neutral" size="sm">References</Tag>
            <Tag tone="calm" size="sm">Support & orientation</Tag>
          </div>

          <h1 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight text-[var(--color-text)] md:text-5xl">
            Resources
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-7 text-[var(--color-text-muted)]">
            A selection of useful resources to understand coercive control, spot mechanisms, and
            find support services. We prioritise verifiable sources and recognised bodies.
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {QUICK.map((q) => (
              <a
                key={q.title}
                href={q.href}
                className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5 transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]/80"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-[var(--color-text)]">{q.title}</h3>
                  {q.badge ? <Badge>{q.badge}</Badge> : null}
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{q.description}</p>
              </a>
            ))}
          </div>
        </header>

        <section className="grid gap-6" id="library">
          {CATEGORIES.map((c) => (
            <section
              key={c.id}
              id={c.id}
              className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 md:p-8"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                    {c.title}
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--color-text-muted)]">{c.subtitle}</p>
                </div>
                <a href="#top" className="text-xs text-[var(--color-text-subtle)] transition hover:text-[var(--color-text-muted)]">
                  Back to top
                </a>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {c.items.map((item) => (
                  <Card key={item.title} item={item} />
                ))}
              </div>
            </section>
          ))}

          <section
            id="kit"
            className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-gradient-to-b from-[var(--color-accent-soft)] to-[var(--color-surface-1)]/40 p-6 md:p-8"
          >
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-text)]">
              Quick analysis kit
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-text-muted)]">
              A simple reading grid to spot signs of coercion: isolation, guilt, information
              control, pressure to conform, social rupture, fear, dependence. (Full PDF version
              coming soon.)
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Isolation", "Control", "Guilt", "Fear", "Dependence", "Rupture"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1 text-xs text-[var(--color-text-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          <EmergencyBox variant="full" />

          <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-[var(--color-text)]">Important</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
              This page offers general orientation and resources. It does not replace legal or
              medical advice. In case of immediate danger, contact emergency services using the
              numbers above.
            </p>
            <div className="mt-5">
              <Link
                href="/en/contact"
                className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-text)] px-4 py-2.5 text-sm font-medium text-black transition hover:opacity-90"
              >
                Contact us
              </Link>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
