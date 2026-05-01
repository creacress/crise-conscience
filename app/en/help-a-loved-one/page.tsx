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
  title: "Help a loved one under coercive control — practical guide",
  description:
    "What to do if a loved one is in a coercive group? 5 concrete steps (keep contact, document facts, identify risks, seek specialised advice, prepare the exit) inspired by MIVILUDES and UNADFI.",
  alternates: {
    canonical: "/en/help-a-loved-one",
    languages: {
      "fr-FR": "/aider-un-proche",
      en: "/en/help-a-loved-one",
      "x-default": "/aider-un-proche",
    },
  },
  openGraph: {
    type: "article",
    url: "/en/help-a-loved-one",
    title: "Help a loved one under coercive control — practical guide",
    description:
      "5 steps to support a loved one: keep contact, document, alert, seek advice, prepare the exit.",
  },
};

const STEPS = [
  {
    id: "step-1-keep-contact",
    n: 1,
    title: "Keep contact — without confrontation, without humiliation",
    body: [
      "The first instinct — direct confrontation (“you're in a cult”) — is almost always counterproductive. Coercion strengthens the moment a person feels judged or attacked. The group then exploits it: “see, we told you, they don't understand you”.",
      "Instead: maintain regular, neutral, unconditional contact. A short message, a quick call, presence at key moments (birthdays, holidays, family emergencies). You signal that the door remains open.",
    ],
    avoid: "Don't issue ultimatums, don't cut contact, don't mock the belief.",
  },
  {
    id: "step-2-document-facts",
    n: 2,
    title: "Document facts, not opinions",
    body: [
      "Write down, in chronological order, anything observable: behaviour changes, ruptures with family, amounts paid (donations, trainings, retreats), enforced presence durations, group messages, food or healthcare restrictions, schooling changes for children.",
      "This documentation serves several purposes: getting yourself out of emotional fog, helping the professionals you'll contact (psychologist, lawyer, support association), and supporting a possible report to MIVILUDES or authorities.",
    ],
    avoid: "Avoid value judgements. Keep what you saw, read, heard — with dates.",
  },
  {
    id: "step-3-identify-risks",
    n: 3,
    title: "Identify immediate risks",
    body: [
      "Some situations require fast action: children at risk (school dropout, refused care), violence or abuse, severe psychological state, ongoing financial predation, immediate danger to the person.",
      "If any of these signals are present, the priority changes: stop debating, alert. Useful numbers (France): 119 (children at risk), 17 (police), 15 (medical), 3919 (violence against women), 3114 (suicide prevention).",
    ],
    avoid: "Never underestimate an urgent signal out of fear of “overreacting”.",
  },
  {
    id: "step-4-seek-advice",
    n: 4,
    title: "Seek advice from specialised structures",
    body: [
      "You are not alone — and you should not be. Associations specialised in supporting victims of coercive control know the mechanisms, the groups, the legal levers.",
      "Three reliable doors: UNADFI (listening and support network, free, regional presence), CCMM (Centre against mental manipulation), MIVILUDES (interministerial mission, reports and advice). France Victimes covers the legal dimension.",
    ],
    avoid: "Avoid public forums and Facebook groups: unverified information, risk of counter-coercion.",
  },
  {
    id: "step-5-prepare-the-exit",
    n: 5,
    title: "Prepare the exit without rushing it",
    body: [
      "A successful exit is prepared. The person under coercion needs a safety net: transitional housing, short-term financial support, qualified psychological follow-up (ideally a therapist trained in coercive dynamics), gradual rebuilding of social ties, management of guilt and fear of ostracism.",
      "The exit phase is often harder than the entry: fear of breaking, grief over the community, identity anxiety. Hold steady, don't replay the confrontation, be present over time.",
    ],
    avoid: "Don't impose a calendar. The exit has its own pace.",
  },
] as const;

const FAQ = [
  {
    question: "How long does it take for a loved one to leave coercive control?",
    answer:
      "There is no single answer. Some exits take months, others several years. What matters is not speed but the strength of the safety net: preserved contact, professional support, social rebuilding. A rushed exit without a net often leads to a return.",
  },
  {
    question: "Should I report to MIVILUDES as soon as I have a doubt?",
    answer:
      "Yes, without hesitation. Reporting is neither a denunciation nor a final act. It feeds public watch, may trigger an investigation if reports converge, and gives you orientation. It is confidential.",
  },
  {
    question: "My loved one refuses to talk. What do I do?",
    answer:
      "Don't force it. Maintain a minimal communication channel (short SMS, birthday messages, attendance at family events). Document in parallel, contact an association. When the window opens (a doubt, a group crisis, a life event), your preserved bond will be the first exit door.",
  },
  {
    question: "My loved one accuses me of being manipulated by the family or the media. How to react?",
    answer:
      "Classic pattern: the group flips the accusation to isolate. Don't counter-argue frontally. Reformulate: “I'm not asking you to believe me, just to keep the bond”. Avoid debates on doctrine — they reinforce coercion.",
  },
  {
    question: "Can I have a loved one committed to extract them from the group?",
    answer:
      "No. Involuntary commitment is regulated by French law (psychiatric danger, medically necessary care). It is a medical procedure, not a tool for extracting someone from a group. In doubt about psychiatric state: call 15 (medical emergencies) or a psychiatrist.",
  },
  {
    question: "How to fund a lawyer or therapist to support the exit?",
    answer:
      "Legal aid if income is below threshold, free consultations at CMP (psychiatric outpatient clinics), victim support associations (France Victimes — free), UNADFI's clinics. CCMM also keeps lists of therapists trained in deprogramming.",
  },
] as const;

const SOURCES = [
  {
    title: "MIVILUDES — Understand, prevent and fight against coercive control",
    href: "https://www.miviludes.interieur.gouv.fr/",
    publisher: "Interministerial mission (French Ministry of Interior)",
  },
  {
    title: "UNADFI — Help and support for victims",
    href: "https://www.unadfi.org/",
    publisher: "UNADFI",
  },
  {
    title: "CCMM — Centre against mental manipulation",
    href: "https://www.ccmm.asso.fr/",
    publisher: "CCMM",
  },
  {
    title: "France Victimes — Victim support",
    href: "https://www.france-victimes.fr/",
    publisher: "France Victimes Federation",
  },
] as const;

export default function EnHelpALovedOnePage() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/en/help-a-loved-one`;

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Help a loved one under coercive control",
    description:
      "Practical 5-step guide to support someone caught in coercive control, without frontal confrontation and with a solid exit net.",
    inLanguage: "en",
    totalTime: "P30D",
    supply: [],
    tool: [
      { "@type": "HowToTool", name: "A notebook to document facts" },
      { "@type": "HowToTool", name: "Emergency numbers (15, 17, 18, 112, 119, 3114, 3919)" },
    ],
    step: STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body.join(" "),
      url: `${pageUrl}#${s.id}`,
    })),
    image: [`${siteBase}/opengraph-image`],
  };

  const articleJsonLd = articleSchema({
    siteBase,
    pageUrl,
    title: "Help a loved one under coercive control — practical 5-step guide",
    description:
      "What to do if a loved one is under coercive control? Practical guide inspired by MIVILUDES and UNADFI: keep contact, document facts, identify risks, seek advice, prepare the exit.",
    image: `${siteBase}/opengraph-image`,
    datePublished: "2026-05-01",
    dateModified: "2026-05-01",
    authorName: "Crise Conscience editorial team (AI-assisted, human-reviewed)",
  });

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: `${siteBase}/en` },
    { name: "Take action", url: `${siteBase}/en/help-a-loved-one` },
    { name: "Help a loved one", url: pageUrl },
  ]);

  const faqJsonLd = faqSchema(FAQ.map((q) => ({ question: q.question, answer: q.answer })));

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <Container>
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/en" },
              { label: "Help a loved one" },
            ]}
          />

          <header className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="accent" size="sm">Practical guide</Tag>
              <Tag tone="info" size="sm">Audience: concerned relative</Tag>
              <span className="text-xs text-[var(--color-text-subtle)]">
                ≈ 8 min read · Updated May 1, 2026
              </span>
            </div>

            <h1 className="mt-5 font-display text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] md:text-4xl lg:text-5xl">
              What to do if a loved one is under{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
                coercive control
              </span>
              ?
            </h1>

            <p className="mt-5 text-pretty text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              5 concrete steps, in order. Inspired by the public framework of the
              <strong className="text-[var(--color-text)]"> French MIVILUDES</strong> and the
              support practice of the <strong className="text-[var(--color-text)]">UNADFI</strong>.
              Goal: keep the bond, document facts, prepare a solid exit.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="#step-1-keep-contact" variant="primary" size="md">
                Read the 5 steps
              </Button>
              <Button href="#faq" variant="secondary" size="md">
                See the FAQ
              </Button>
            </div>
          </header>

          <EmergencyBox variant="banner" className="mb-10" />

          <ol className="space-y-10">
            {STEPS.map((s) => (
              <li key={s.id} id={s.id} className="scroll-mt-24">
                <article className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] font-display text-xl font-semibold text-[var(--color-accent)]"
                    >
                      {s.n}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-display text-xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-2xl">
                        {s.title}
                      </h2>
                      {s.body.map((p, i) => (
                        <p
                          key={i}
                          className="mt-3 text-base leading-7 text-[var(--color-text-muted)]"
                        >
                          {p}
                        </p>
                      ))}

                      <div className="mt-5 flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-alert-border)] bg-[var(--color-alert-bg)] px-4 py-3 text-sm leading-6">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-alert)]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                        </svg>
                        <div className="text-[var(--color-text-muted)]">
                          <strong className="text-[var(--color-text)]">Avoid:</strong> {s.avoid}
                        </div>
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
                <strong>Bond first</strong>, debate later — never an ultimatum, never frontal
                confrontation.
              </>,
              <>
                <strong>Document everything:</strong> facts, dates, amounts, messages. Emotional
                fog is coercion's ally.
              </>,
              <>
                <strong>Measure risks:</strong> children, healthcare, violence, finances. Some
                signals require immediate alert (15 / 17 / 119 / 3114).
              </>,
              <>
                <strong>Don't stay alone.</strong> Three reliable doors: UNADFI, CCMM, MIVILUDES.
                France Victimes for the legal dimension.
              </>,
              <>
                <strong>Prepare the exit:</strong> housing, finances, trained therapist, social
                rebuilding. The exit phase is harder than the entry.
              </>,
            ]}
            sources={SOURCES.map((s) => ({ ...s }))}
          />

          <section id="faq" className="mt-12 scroll-mt-24">
            <div className="mb-6">
              <Tag tone="info" size="sm">FAQ</Tag>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl">
                Frequently asked questions
              </h2>
            </div>
            <div className="space-y-3">
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
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                    {q.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30 bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-surface-1)]/50 to-transparent p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[var(--color-text)]">
                    Want to talk?
                  </h2>
                  <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
                    The contact form accepts <strong>anonymous</strong> submissions. We read
                    everything, reply within 48–72&nbsp;h.
                  </p>
                </div>
                <Button href="/en/contact" variant="primary" size="md">
                  Contact us
                </Button>
              </div>
            </div>
          </section>

          <div className="mt-10">
            <EmergencyBox variant="full" />
          </div>

          <footer className="mt-10 border-t border-[var(--color-border)] pt-6 text-xs leading-6 text-[var(--color-text-subtle)]">
            <p>
              Educational reformulation based on public references. AI-assisted drafting,
              human-reviewed by Crise Conscience editorial team. For an individual case, contact
              specialised associations listed above.
            </p>
            <div className="mt-3">
              <Link
                href="/en/recognize-coercive-control"
                className="text-[var(--color-accent)] hover:underline"
              >
                ← Read also: 17 signs of coercive control (MIVILUDES)
              </Link>
            </div>
          </footer>
        </div>
      </Container>
    </>
  );
}
