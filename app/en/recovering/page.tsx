import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import { JsonLd } from "@/app/components/JsonLd";
import KeyTakeaways from "@/app/components/KeyTakeaways";
import EmergencyBox from "@/app/components/EmergencyBox";
import Tag from "@/app/components/ui/Tag";
import Button from "@/app/components/ui/Button";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import { articleSchema, breadcrumbSchema, faqSchema, getSiteBase } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Recovering after coercive control — post-exit guide",
  description:
    "Living the after: 4 recovery phases following coercive control (exit, first months, first year, long term). Therapeutic, legal and social references for survivors and their relatives.",
  alternates: {
    canonical: "/en/recovering",
    languages: {
      "fr-FR": "/se-reconstruire",
      en: "/en/recovering",
      "x-default": "/se-reconstruire",
    },
  },
  openGraph: {
    type: "article",
    url: "/en/recovering",
    title: "Recovering after coercive control",
    description:
      "4 phases of post-coercion recovery: immediate exit, first months, first year, long term. Therapeutic and social references.",
  },
};

const PHASES = [
  {
    id: "phase-1-immediate-exit",
    n: 1,
    title: "Immediate exit — the first 72 hours",
    duration: "0–3 days",
    body: [
      "The first hours after an exit are fragile: adrenaline, sense of unreality, sometimes relief quickly followed by anxiety. This is the safety phase, not the phase of major decisions.",
      "Concrete priorities: a safe place to sleep (trusted contacts outside the group, emergency housing if no alternative), block insistent group contacts (phone, social media), inform one or two key persons, eat and sleep.",
    ],
    actions: [
      "Find a place to sleep beyond the group's reach.",
      "Mute notifications, keep one channel open with your safe contacts.",
      "Make no legal or financial decisions in the first 72 hours.",
    ],
  },
  {
    id: "phase-2-first-months",
    n: 2,
    title: "First months — stabilising",
    duration: "1–6 months",
    body: [
      "This is the most psychologically demanding phase: adrenaline drop, rising guilt, post-cult syndrome settling in (anxiety, sleep disorders, flashbacks, identity emptiness). Many survivors go through a doubt phase here (“was I right to leave?”). It is normal — coercion has wired a deep attachment.",
      "Priority action: find a therapist trained in coercive dynamics. A generalist therapy may miss the specifics. UNADFI, CCMM and some CMP (psychiatric outpatient clinics) refer specifically. In parallel: administrative steps (housing, social benefits if needed, health insurance, mutuelle), recovery of identity papers if held.",
    ],
    actions: [
      "Contact UNADFI or CCMM for a referral to a specialised therapist.",
      "Regularise housing, social rights, identity papers.",
      "Document facts (amounts, letters, witnesses) — memory is still fresh.",
    ],
  },
  {
    id: "phase-3-first-year",
    n: 3,
    title: "First year — recomposing",
    duration: "6–18 months",
    body: [
      "The acute crisis turns into deep work. Therapy becomes the pivot: gradual deconditioning of group automatisms, rebuilding of critical thinking, grieving the lost community. This is also the period when the legal dimension may engage if relevant facts justify it (abuse of weakness, fraud, illegal practice of medicine).",
      "Social life: accept that many “outside” relationships have evolved during the coercion. Rebuilding a circle outside the group takes time. Peer groups (former members of the same group or close groups, met through associations) are precious to avoid feeling alone.",
    ],
    actions: [
      "Regular therapy follow-up (ideally weekly during the first year).",
      "Assess legal action if relevant (lawyer, France Victimes, legal aid).",
      "Identify 2–3 social spaces outside the group (sport, association, training, work).",
    ],
  },
  {
    id: "phase-4-long-term",
    n: 4,
    title: "Long term — integrating",
    duration: "1+ year",
    body: [
      "Beyond the first year, recovery stabilises but never “finishes”. The coercion experience remains part of the person's history — it can even become precious knowledge, transmitted or used professionally (testimony, support, research). Emotional relapses exist, especially around anniversary dates or in situations that recall the group.",
      "Recurring question: family still in the group. Many survivors live a prolonged grief over a parent, partner or children still under coercion. The strategy that works best: don't cut from your side, leave a minimal channel open, accept that the rhythm is theirs. Specialised therapy helps carry this grief without falling into guilt.",
    ],
    actions: [
      "Space out therapy sessions according to autonomy regained — don't quit abruptly.",
      "Maintain a minimal channel with family still in the group (birthdays, life events).",
      "Consider supporting other survivors only when ready (rarely before 2 years).",
    ],
  },
] as const;

type Resource = {
  title: string;
  desc: string;
  href: string;
  external?: boolean;
};

const RESOURCES: ReadonlyArray<Resource> = [
  {
    title: "UNADFI — Victim support",
    desc: "Associative network for listening, specialised therapist referrals, legal support.",
    href: "https://www.unadfi.org/",
    external: true,
  },
  {
    title: "CCMM — Centre against mental manipulation",
    desc: "Information, support, lists of therapists trained in deprogramming.",
    href: "https://www.ccmm.asso.fr/",
    external: true,
  },
  {
    title: "France Victimes",
    desc: "Victim support: access to law, psychological support, procedural help.",
    href: "https://www.france-victimes.fr/",
    external: true,
  },
  {
    title: "MIVILUDES — Reporting",
    desc: "Interministerial mission. Confidential report, advice.",
    href: "https://www.miviludes.interieur.gouv.fr/",
    external: true,
  },
  {
    title: "Crise Conscience glossary",
    desc: "Key terms: post-cult syndrome, deconversion, ostracism, BITE model.",
    href: "/en/glossary",
  },
  {
    title: "BITE self-check",
    desc: "Educational 16-question tool, anonymous, 5 minutes.",
    href: "/en/coercion-test",
  },
];

const FAQ = [
  {
    question: "How long does recovery take after coercion?",
    answer:
      "1 to 5 years for major phases, sometimes longer for deep identity dimension. Not linear — phases of doubt or longing for the group are normal. What matters is maintaining regular follow-up the first 12–18 months.",
  },
  {
    question: "Do I really need a specialised therapist?",
    answer:
      "Strongly recommended. Coercive mechanisms leave traces (post-cult syndrome, anxiety, dissociative disorders, residual conditioning) that generalist psychologists may miss. UNADFI and CCMM keep referral lists.",
  },
  {
    question: "Will I see my family still in the group again?",
    answer:
      "Depends on the group and your family. Some impose strict ostracism (total rupture), others tolerate minimal contact. Strategy: don't cut from your side, leave a channel open (birthday SMS, life events). The rhythm is theirs.",
  },
  {
    question: "Can I sue a coercive group?",
    answer:
      "Yes, on precise criminal qualifications (abuse of weakness, fraud, illegal practice of medicine, sexual assault, etc.). Conditions: material proof, expert assessment of subjection. A lawyer or France Victimes will guide you. Criminal prescription runs from the last act or cessation of subjection.",
  },
  {
    question: "I don't dare seek help. How do I take the first step?",
    answer:
      "Write to an association without giving your name (UNADFI, CCMM). Introduce yourself as “a person reflecting” rather than “a victim” — many do, it's habitual and discreet. The first exchange commits to nothing and gives orientation.",
  },
  {
    question: "Is there a risk of falling back into another coercive group?",
    answer:
      "Yes — survivors are more vulnerable to re-recruitment during the recovery phase (emotional emptiness, search for reference points). That's why we insist on therapeutic follow-up and rebuilding a social circle outside the group. Heightened vigilance 2–3 years after exit.",
  },
] as const;

export default function EnRecoveringPage() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/en/recovering`;

  const articleJsonLd = articleSchema({
    siteBase,
    pageUrl,
    title: "Recovering after coercive control — post-exit guide",
    description:
      "4-phase guide for post-coercion recovery: immediate exit, first months, first year, long term. For survivors and their relatives.",
    image: `${siteBase}/opengraph-image`,
    datePublished: "2026-05-01",
    dateModified: "2026-05-01",
    authorName: "Crise Conscience editorial team (AI-assisted, human-reviewed)",
  });

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: `${siteBase}/en` },
    { name: "Take action", url: `${siteBase}/en/help-a-loved-one` },
    { name: "Recovering", url: pageUrl },
  ]);

  const faqJsonLd = faqSchema(FAQ.map((q) => ({ question: q.question, answer: q.answer })));

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <Container>
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/en" },
              { label: "Take action", href: "/en/help-a-loved-one" },
              { label: "Recovering" },
            ]}
          />

          <header className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="calm" size="sm">Post-exit guide</Tag>
              <Tag tone="info" size="sm">Audience: survivors</Tag>
              <span className="text-xs text-[var(--color-text-subtle)]">
                ≈ 12 min read · Updated May 1, 2026
              </span>
            </div>

            <h1 className="mt-5 font-display text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] md:text-4xl lg:text-5xl">
              Recovering after{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
                coercive control
              </span>
            </h1>

            <p className="mt-5 text-pretty text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              Four phases in order, over 1 to 5 years on average. Rarely linear — doubt,
              emotional relapses, grief. What matters is not speed — it&apos;s the strength of
              the supports (therapeutic, social, legal).
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="#phase-1-immediate-exit" variant="primary" size="md">
                Read the 4 phases
              </Button>
              <Button href="#resources" variant="secondary" size="md">
                See resources
              </Button>
            </div>
          </header>

          <EmergencyBox variant="banner" className="mb-10" />

          <ol className="space-y-10">
            {PHASES.map((p) => (
              <li key={p.id} id={p.id} className="scroll-mt-24">
                <article className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] font-display text-xl font-semibold text-[var(--color-accent)]"
                    >
                      {p.n}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h2 className="font-display text-xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-2xl">
                          {p.title}
                        </h2>
                        <Tag tone="neutral" size="sm">{p.duration}</Tag>
                      </div>

                      {p.body.map((paragraph, i) => (
                        <p key={i} className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">
                          {paragraph}
                        </p>
                      ))}

                      <div className="mt-5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-4">
                        <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                          Concrete actions
                        </div>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--color-text-muted)]">
                          {p.actions.map((a, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>

          <KeyTakeaways
            id="key-takeaways"
            title="Key takeaways"
            sourcesTitle="Sources"
            takeaways={[
              <>
                <strong>First 72 hours:</strong> safety only, no major decisions.
              </>,
              <>
                The <strong>first 6 months</strong> are the hardest psychologically — find a
                specialised therapist as soon as possible.
              </>,
              <>
                <strong>Post-cult syndrome</strong> (anxiety, identity emptiness, flashbacks) is
                a normal reaction, not a personal failure.
              </>,
              <>
                <strong>Anticipate ostracism</strong> from the group and grief over relatives
                still inside. Therapy + peer groups help carry these losses.
              </>,
              <>
                <strong>Heightened vigilance 2–3 years</strong> after exit: emotional emptiness
                makes you vulnerable to re-recruitment.
              </>,
            ]}
            sources={[
              { title: "UNADFI — Help and support for victims", href: "https://www.unadfi.org/", publisher: "UNADFI" },
              { title: "CCMM — Centre against mental manipulation", href: "https://www.ccmm.asso.fr/", publisher: "CCMM" },
              { title: "Margaret Singer — Cults in our midst (1995)", href: "https://www.miviludes.interieur.gouv.fr/", publisher: "Academic ref." },
            ]}
          />

          <section id="resources" className="mt-12 scroll-mt-24">
            <Tag tone="info" size="sm">Concrete resources</Tag>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl">
              Where to turn
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-[var(--color-text-muted)]">
              Six reliable doors. Pick the one matching your current need — you can combine.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {RESOURCES.map((r) => {
                const Wrapper = r.external ? "a" : Link;
                const wrapperProps = r.external
                  ? { href: r.href, target: "_blank", rel: "noopener noreferrer" }
                  : { href: r.href };
                return (
                  <Wrapper
                    key={r.title}
                    {...(wrapperProps as { href: string })}
                    className="group block rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5 transition-[border-color,background-color] duration-[var(--motion-fast)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]/80"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-display text-base font-semibold text-[var(--color-text)]">
                        {r.title}
                      </div>
                      {r.external ? (
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-[var(--color-text-subtle)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{r.desc}</p>
                  </Wrapper>
                );
              })}
            </div>
          </section>

          <section id="faq" className="mt-12 scroll-mt-24">
            <Tag tone="info" size="sm">FAQ</Tag>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-3">
              {FAQ.map((q, i) => (
                <details
                  key={i}
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

          <section className="mt-12">
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30 bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-surface-1)]/50 to-transparent p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[var(--color-text)]">
                    Have you experienced an exit?
                  </h2>
                  <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
                    Your testimony can help others. <strong>Anonymous</strong>, opt-in, you stay
                    in control.
                  </p>
                </div>
                <Button href="/en/testimonies" variant="primary" size="md">
                  Read testimonies
                </Button>
              </div>
            </div>
          </section>

          <div className="mt-10">
            <EmergencyBox variant="full" />
          </div>

          <footer className="mt-10 border-t border-[var(--color-border)] pt-6 text-xs leading-6 text-[var(--color-text-subtle)]">
            <p>
              Educational reformulation inspired by work from Steven Hassan, Margaret Singer
              (Cults in our midst, 1995) and clinical experience shared by UNADFI/CCMM.
              AI-assisted drafting, human-reviewed by Crise Conscience editorial team. For an
              individual case, consult a trained therapist.
            </p>
          </footer>
        </div>
      </Container>
    </>
  );
}
