import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbSchema, faqSchema, getSiteBase } from "@/lib/schema";
import Tag from "@/app/components/ui/Tag";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import EmergencyBox from "@/app/components/EmergencyBox";

export const metadata: Metadata = {
  title: "FAQ — Coercive control, cult dynamics & recovery",
  description:
    "Frequently asked questions about coercive control: recognise, act, exit, recover, signal. Sourced answers (MIVILUDES, UNADFI, French Penal Code).",
  alternates: {
    canonical: "/en/faq",
    languages: { "fr-FR": "/faq", en: "/en/faq", "x-default": "/faq" },
  },
};

const SECTIONS = [
  {
    id: "recognize",
    title: "Recognize",
    intent: "Spot the signs, understand mechanisms, lift the doubt.",
    items: [
      {
        question: "What is a sectarian deviance / coercive control?",
        answer:
          "It refers to the use of pressure or techniques aimed at placing a person in a state of psychological or physical subjection, reducing their free will. French law (MIVILUDES) targets observable behaviour and harm — never beliefs. A single signal is not enough: convergence and duration of multiple signals qualify a coercive dynamic.",
      },
      {
        question: "What are the main warning signs of coercive control?",
        answer:
          "Five converging signals should alert: progressive isolation (rupture with family/friends), information control (outside sources discredited), guilt and ostracism, growing financial demands, radical change in behaviour and language. MIVILUDES publishes a 17-criteria grid that inspires our complete dossier.",
      },
      {
        question: "Is an online test reliable to confirm coercion?",
        answer:
          "No online test makes a diagnosis. Our educational tool (BITE-based) helps structure reflection but does not replace a trained professional's opinion. A high score is a reason to consult, not a certainty.",
      },
    ],
  },
  {
    id: "act",
    title: "Take action",
    intent: "What to say, what to do, who to contact without forcing rupture.",
    items: [
      {
        question: "How to talk to a loved one without alienating them?",
        answer:
          "Avoid frontal confrontation (\"you are in a cult\"), which systematically reinforces coercion. Privilege regular and neutral contact (short messages, attendance at family events), open questions on facts, and patience. Goal: keep the door open.",
      },
      {
        question: "How to report coercive control to MIVILUDES?",
        answer:
          "Reporting is done via the online form on miviludes.interieur.gouv.fr. It is confidential, not a criminal complaint nor a final act. Multiple converging reports can trigger an investigation. For an at-risk minor: 119. For criminal facts: 17 or directly the public prosecutor.",
      },
      {
        question: "Should I cut ties if the person refuses to leave?",
        answer:
          "No. Cutting ties replays the group's logic (ostracism) and closes the last exit door. Maintain a minimal channel without giving in to the group's demands (do not finance, do not validate doctrine). Demanding but it preserves the possibility of a future exit.",
      },
    ],
  },
  {
    id: "exit",
    title: "Exit",
    intent: "Prepare an exit without rushing, with a safety net.",
    items: [
      {
        question: "How is an exit from a coercive group prepared?",
        answer:
          "A successful exit needs a safety net: transitional housing, short-term financial support, psychological follow-up with a therapist trained in coercion, gradual rebuilding of social fabric, anticipation of group ostracism. Rushing often leads to return. Count several weeks to several months of preparation.",
      },
      {
        question: "How long does it take to exit coercion?",
        answer:
          "There is no standard duration. Some exits take a few months, others several years. What matters is not speed but the solidity of the safety net (psychological, social, material). Rushed exits without support significantly increase return risk or shift to another coercive group.",
      },
      {
        question: "Can I have a loved one committed to leave a cult?",
        answer:
          "No. Involuntary commitment is regulated by French law and reserved for specific psychiatric situations (imminent peril, care without informed consent). It is a medical and procedural decision, not a tool to extract someone from a group. In doubt about psychiatric state: 15 (medical emergencies) or a psychiatrist.",
      },
    ],
  },
  {
    id: "recover",
    title: "Recover",
    intent: "After exit: mental health, social, material, legal.",
    items: [
      {
        question: "Do I need a specialised therapist for post-coercion recovery?",
        answer:
          "Strongly recommended. Coercive mechanisms leave traces (post-cult syndrome, anxiety, dissociative disorders, residual conditioning) that generalist psychologists may miss. UNADFI and CCMM keep referral lists.",
      },
      {
        question: "How long does recovery take?",
        answer:
          "It is a long process (1 to 5 years for major phases, sometimes longer for identity dimension). Not linear — phases of doubt or longing for the group are normal. What matters is maintaining regular follow-up the first 12-18 months.",
      },
      {
        question: "My family is still in the group — how to manage?",
        answer:
          "One of the most painful situations post-exit. The group may impose strict ostracism (total rupture). Strategy: do not cut from your side, leave a minimal channel open (birthdays, life events), accept that the rhythm is theirs. Specialised therapy helps carry the grief.",
      },
    ],
  },
  {
    id: "association",
    title: "The association",
    intent: "Editorial method, partnerships, financial support.",
    items: [
      {
        question: "Who writes Crise Conscience content?",
        answer:
          "Long analyses are drafted with AI assistance (~70 % of the initial draft), then read, fact-checked and enriched by our human editorial team (~30 %). We claim it openly: transparency on method is a coherence requirement for an association that talks about influence and coercion.",
      },
      {
        question: "Can I write to you anonymously?",
        answer:
          "Yes. The contact form accepts anonymous submissions (name and email fields optional). No testimony is published without explicit written consent. Data is never sold or shared with commercial third parties.",
      },
      {
        question: "Is my donation tax-deductible?",
        answer:
          "Tax deductibility (66 % of the donation for individuals, in the limit of 20 % of taxable income — French Tax Code article 200) requires the association to be recognised as a public-interest body. Crise Conscience's fiscal status is currently being processed. We will inform donors via email as soon as recognition is effective.",
      },
    ],
  },
];

export default function EnFAQPage() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/en/faq`;

  const allFaq = SECTIONS.flatMap((s) => s.items);

  return (
    <>
      <JsonLd data={faqSchema(allFaq.map((q) => ({ question: q.question, answer: q.answer })))} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteBase}/en` },
          { name: "FAQ", url: pageUrl },
        ])}
      />

      <Container>
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/en" },
              { label: "FAQ" },
            ]}
          />

          <header className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="info" size="sm">FAQ</Tag>
              <Tag tone="neutral" size="sm">{allFaq.length} questions · sourced</Tag>
            </div>
            <h1 className="mt-5 font-display text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] md:text-4xl lg:text-5xl">
              All your questions on{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
                coercive control
              </span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              Five sections by intent: <strong className="text-[var(--color-text)]">recognize</strong>,{" "}
              <strong className="text-[var(--color-text)]">take action</strong>,{" "}
              <strong className="text-[var(--color-text)]">exit</strong>,{" "}
              <strong className="text-[var(--color-text)]">recover</strong>, and the{" "}
              <strong className="text-[var(--color-text)]">association</strong>.
            </p>
          </header>

          <div className="space-y-12">
            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <Tag tone="info" size="sm">{section.title}</Tag>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{section.intent}</p>

                <div className="mt-5 space-y-3">
                  {section.items.map((q, i) => (
                    <details
                      key={i}
                      className="group rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5 open:bg-[var(--color-surface-2)]/70"
                    >
                      <summary className="flex cursor-pointer items-start gap-3 text-base font-semibold text-[var(--color-text)] marker:hidden">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-transform duration-[var(--motion-fast)] group-open:rotate-90"
                        >
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </span>
                        <span className="flex-1">{q.question}</span>
                      </summary>
                      <p className="mt-3 pl-9 text-base leading-7 text-[var(--color-text-muted)]">
                        {q.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12">
            <EmergencyBox variant="banner" />
          </div>

          <footer className="mt-10 border-t border-[var(--color-border)] pt-6 text-xs leading-6 text-[var(--color-text-subtle)]">
            <p>
              Want the full FAQ in French?{" "}
              <Link className="text-[var(--color-accent)] hover:underline" href="/faq">
                Lire la FAQ complète en français
              </Link>
              .
            </p>
          </footer>
        </div>
      </Container>
    </>
  );
}
