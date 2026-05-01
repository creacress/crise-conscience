import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/app/components/Container";
import { JsonLd } from "@/app/components/JsonLd";
import { organizationSchema, websiteSchema, getSiteBase } from "@/lib/schema";
import Button from "@/app/components/ui/Button";
import Tag from "@/app/components/ui/Tag";

export const metadata: Metadata = {
  title: "Crise Conscience — Coercive control & cult dynamics (English)",
  description:
    "French nonprofit (UNADFI partner) covering coercive control, cult dynamics, and recovery. BITE-model self-check, sourced glossary, FAQ. AI-assisted drafting, human-reviewed.",
  alternates: {
    canonical: "/en",
    languages: { "fr-FR": "/", en: "/en", "x-default": "/" },
  },
};

const HUBS = [
  {
    title: "Understand the mechanisms",
    desc: "Coercive influence, manipulation, ostracism — without jargon.",
    href: "/en/recognize-coercive-control",
    icon: "brain",
    tone: "accent" as const,
  },
  {
    title: "Recognize the signs",
    desc: "17 criteria adapted from the French MIVILUDES framework.",
    href: "/en/recognize-coercive-control",
    icon: "alert",
    tone: "info" as const,
  },
  {
    title: "Help a loved one",
    desc: "What to say, what to do, who to call. No frontal confrontation.",
    href: "/en/help-a-loved-one",
    icon: "users",
    tone: "calm" as const,
  },
  {
    title: "Recovering",
    desc: "Post-exit guide in 4 phases: immediate safety to long term.",
    href: "/en/recovering",
    icon: "compass",
    tone: "accent" as const,
  },
  {
    title: "Coercion self-check",
    desc: "16 BITE-based questions. Anonymous, 5 min, runs in your browser.",
    href: "/en/coercion-test",
    icon: "sparkle",
    tone: "info" as const,
  },
  {
    title: "Support the association",
    desc: "One-time or monthly donation, secure Stripe checkout.",
    href: "/en/donate",
    icon: "heart",
    tone: "accent" as const,
  },
];

const REPERES = [
  { label: "UNADFI partner", icon: "shield" },
  { label: "Sourced content", icon: "check" },
  { label: "Anonymous contact possible", icon: "lock" },
];

const MISSION = [
  { title: "Understand", desc: "Explain coercive mechanisms and warning signs without stigma." },
  { title: "Equip", desc: "Centralize trustworthy resources: guides, institutions, associations." },
  { title: "Orient", desc: "Help find the right contact: psychologist, lawyer, association." },
  { title: "Prevent", desc: "Foster critical thinking and step-back, in plain language." },
];

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const props = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
  switch (name) {
    case "brain":
      return (
        <svg {...props}>
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04Z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.04Z" />
        </svg>
      );
    case "alert":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "compass":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...props}>
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2" />
        </svg>
      );
    case "heart":
      return (
        <svg {...props}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case "lock":
      return (
        <svg {...props}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...props}>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      );
    default:
      return null;
  }
}

export default function EnHomePage() {
  const siteBase = getSiteBase();

  return (
    <>
      <JsonLd data={organizationSchema(siteBase)} />
      <JsonLd data={websiteSchema(siteBase)} />

      <Container>
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/60 p-8 sm:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-[var(--color-accent)]/15 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[var(--color-info)]/10 blur-3xl" />
          </div>

          <div className="relative">
            <Tag tone="accent" size="md" icon={<Icon name="sparkle" className="h-3 w-3" />}>
              French nonprofit · UNADFI partner
            </Tag>

            <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--color-text)] text-balance sm:text-5xl lg:text-6xl">
                  Inform, prevent and support against{" "}
                  <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
                    coercive control
                  </span>
                  .
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-text-muted)]">
                  Crise Conscience analyses <strong className="text-[var(--color-text)]">behavioural
                  patterns of coercive control</strong> and their psychological consequences —
                  never individual beliefs. Sourced resources, support, anonymous contact possible.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    href="/en/recognize-coercive-control"
                    variant="primary"
                    size="lg"
                    iconRight={<Icon name="arrow" className="h-4 w-4" />}
                  >
                    Recognize the signs
                  </Button>
                  <Button href="/en/help-a-loved-one" variant="secondary" size="lg">
                    Help a loved one
                  </Button>
                </div>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {REPERES.map((r) => (
                    <li
                      key={r.label}
                      className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1.5 text-xs text-[var(--color-text-muted)]"
                    >
                      <span className="text-[var(--color-accent)]">
                        <Icon name={r.icon} className="h-3.5 w-3.5" />
                      </span>
                      {r.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-strong)] bg-[var(--color-surface-2)]/80 p-6 backdrop-blur-sm shadow-[var(--shadow-md)]">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
                    <Icon name="compass" className="h-4 w-4 text-[var(--color-accent)]" />
                    Quick start
                  </div>
                  <h2 className="mt-2 font-display text-xl font-semibold text-[var(--color-text)]">
                    Are you concerned?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    Three immediate, actionable steps in this order.
                  </p>

                  <ol className="mt-5 space-y-3">
                    {[
                      "Speak to a trusted person outside the group.",
                      "Keep evidence: messages, amounts, dates.",
                      "Reach out to a professional or specialised association.",
                    ].map((step, i) => (
                      <li
                        key={step}
                        className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/60 px-4 py-3"
                      >
                        <span
                          aria-hidden="true"
                          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] text-xs font-semibold text-[var(--color-accent)]"
                        >
                          {i + 1}
                        </span>
                        <span className="text-sm leading-6 text-[var(--color-text-muted)]">{step}</span>
                      </li>
                    ))}
                  </ol>

                  <Button href="/en/contact" variant="ghost" size="md" className="mt-5 w-full justify-center border border-[var(--color-border)]">
                    Contact us →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENTO */}
        <section className="mt-14">
          <div className="mb-7">
            <Tag tone="info" size="sm">Pathways</Tag>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text)]">
              Where do you want to start?
            </h2>
            <p className="mt-1 max-w-xl text-sm text-[var(--color-text-muted)]">
              6 thematic entry points depending on what you are looking for.
            </p>
          </div>

          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HUBS.map((h) => (
              <Link
                key={h.title}
                href={h.href}
                className="group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 transition-[border-color,background-color,box-shadow] duration-[var(--motion-fast)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]/80 hover:shadow-[var(--shadow-md)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                <span
                  aria-hidden="true"
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border ${
                    h.tone === "accent"
                      ? "border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                      : h.tone === "info"
                      ? "border-sky-400/40 bg-sky-400/10 text-sky-300"
                      : "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                  }`}
                >
                  <Icon name={h.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-[-0.01em] text-[var(--color-text)]">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{h.desc}</p>
                <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm text-[var(--color-accent)] transition-colors duration-[var(--motion-fast)] group-hover:text-[var(--color-accent-hover)]">
                  Open
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* MISSION */}
        <section className="mt-16">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-8">
            <Tag tone="info" size="sm">Our mission</Tag>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text)]">
              Educational. Empathetic. Factual.
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--color-text-muted)]">
              Four compass points, applied on every page, every article.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {MISSION.map((m) => (
                <div
                  key={m.title}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-5"
                >
                  <div className="font-display text-base font-semibold text-[var(--color-text)]">
                    {m.title}
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-[var(--color-text-muted)]">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About bridge */}
        <section className="mt-16 mb-8">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30 bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-surface-1)]/50 to-transparent p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                  English-speaking visitor?
                </div>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)]">
                  This is a translated subset of our French resources.
                </h2>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Our full library is in French. Switch back any time using the language toggle in the header.
                </p>
              </div>
              <Button
                href="/en/about"
                variant="primary"
                size="lg"
                iconRight={<Icon name="arrow" className="h-4 w-4" />}
              >
                About us
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
