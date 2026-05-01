import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import { JsonLd } from "@/app/components/JsonLd";
import Tag from "@/app/components/ui/Tag";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import EmergencyBox from "@/app/components/EmergencyBox";
import { breadcrumbSchema, getSiteBase } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Glossary of coercive control terms — clear, sourced definitions",
  description:
    "Key terms on coercive control: coercion, subjection, ostracism, BITE model, convergence of indicators, mental manipulation, deconversion. Sources: MIVILUDES, French Penal Code, academic research.",
  alternates: {
    canonical: "/en/glossary",
    languages: { "fr-FR": "/glossaire", en: "/en/glossary", "x-default": "/glossaire" },
  },
};

type Term = {
  slug: string;
  term: string;
  short: string;
  long: string;
  source?: { label: string; href: string };
  related?: string[];
};

const TERMS: Term[] = [
  {
    slug: "abuse-of-weakness",
    term: "Abuse of weakness",
    short:
      "French criminal offence sanctioning the exploitation of a person in a state of psychological or physical subjection to lead them to a seriously harmful act.",
    long:
      "Article 223-15-2 of the French Penal Code. Reinforced by the About-Picard law of 2001, specifically targeting cult-related abuses: it sanctions the fraudulent exploitation of a person's state of psychological or physical subjection. Penalties up to 3 years imprisonment and €375,000 fine, increased when committed by an organised group.",
    source: {
      label: "Légifrance — Penal Code article 223-15-2",
      href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037289588/",
    },
    related: ["coercive-control", "subjection"],
  },
  {
    slug: "bite-model",
    term: "BITE model",
    short:
      "Framework for analysing mental coercion developed by Steven Hassan, structured along four axes: Behavior, Information, Thoughts, Emotion.",
    long:
      "Framework proposed by Steven Hassan in Combating Cult Mind Control (1988). The BITE model inventories control techniques exerted by a group or individual on followers across four dimensions: Behaviour control (schedule, finances, habits), Information control (filtering, dissimulation, discrediting outside sources), Thought control (internal language, suspension of critical thinking, totalising doctrine), Emotion control (guilt, fear, ostracism). Used in post-coercion therapy.",
    related: ["coercive-control", "mental-manipulation", "ostracism"],
  },
  {
    slug: "deconversion",
    term: "Deconversion",
    short:
      "Process by which a person gradually leaves a closed belief system or coercive group and rebuilds their identity.",
    long:
      "Deconversion is neither a single event nor a one-off decision. It is a multi-phase process: doubt, cognitive dissociation, gradual withdrawal, effective exit, reconstruction. The exit phase is often harder than entry — it involves grieving the community, fearing ostracism, and rebuilding a frame of reference.",
    related: ["ostracism", "recovering", "subjection"],
  },
  {
    slug: "coercive-control",
    term: "Coercive control / sectarian deviance (dérive sectaire)",
    short:
      "In French law, harm to persons or social cohesion resulting from the use of pressures or techniques aimed at placing a person in a state of subjection.",
    long:
      "Operational definition from MIVILUDES: “action aimed at exploiting a person's vulnerability or manipulating them without their knowledge, through a situation of psychological coercive control”. French law targets behaviour and harm — never individual beliefs. It is the convergence of indicators (multiplicity and duration of signals) that qualifies coercion, not an isolated sign.",
    source: {
      label: "MIVILUDES — Identifying sectarian deviance",
      href: "https://www.miviludes.interieur.gouv.fr/comprendre-prevenir-et-lutter/comment-identifier-derive-sectaire",
    },
    related: ["coercion", "convergence-of-indicators", "miviludes"],
  },
  {
    slug: "coercion",
    term: "Coercion (emprise)",
    short:
      "Progressive psychological domination of a person or group over an individual, reducing their free will and locking them into dependence.",
    long:
      "Coercion is never immediate — it progresses by stages: initial seduction and validation, emotional dependence and indoctrination, isolation and control. It exploits legitimate needs (meaning, belonging, recognition) and turns them against the person. It is recognised by the convergence of indicators, not a single sign. Exiting coercion is a long process.",
    source: {
      label: "MIVILUDES — Identification criteria",
      href: "https://www.miviludes.interieur.gouv.fr/comprendre-prevenir-et-lutter/comment-identifier-derive-sectaire",
    },
    related: ["subjection", "mental-manipulation", "bite-model"],
  },
  {
    slug: "convergence-of-indicators",
    term: "Convergence of indicators (faisceau d'indices)",
    short:
      "Analytical method qualifying a sectarian deviance by the convergence and duration of multiple signals, not by an isolated criterion.",
    long:
      "Central principle of MIVILUDES's approach. No single signal is enough to characterise sectarian deviance — it is the coherent accumulation, over time, of multiple observable signals (isolation, financial control, healthcare rupture, child indoctrination, etc.) that tips a situation. This method protects against hasty qualifications and enables documented analysis.",
    related: ["coercive-control", "miviludes", "coercion"],
  },
  {
    slug: "guru",
    term: "Guru / leader",
    short:
      "Charismatic figure exercising total and exclusive authority over a group, presented as the bearer of a unique truth or power.",
    long:
      "The guru's authority comes from a founding narrative (revelation, spiritual election, hidden knowledge) that cannot be discussed. They concentrate decisions, control internal information, and typically organise guilt or fear around questioning their word. This figure is a MIVILUDES warning sign (“authoritarian and opaque group”).",
    related: ["closed-group", "mental-manipulation"],
  },
  {
    slug: "closed-group",
    term: "Closed / opaque group",
    short:
      "Group whose internal rules, doctrine or operations are deliberately hidden from outside members or new entrants.",
    long:
      "Opacity is a MIVILUDES warning sign. It can take several forms: doctrines revealed in stages, tacit rules, undocumented hierarchy, opaque financial management. It serves two simultaneous purposes: locking in progressive engagement (“you can't know before you're inside”) and preventing external criticism.",
    related: ["guru", "miviludes", "deceptive-recruitment"],
  },
  {
    slug: "mental-manipulation",
    term: "Mental manipulation",
    short:
      "Set of techniques aimed at influencing a person's decisions, beliefs and behaviour by reducing their critical thinking.",
    long:
      "Covers techniques documented in social psychology: foot-in-the-door, sustained cognitive dissonance, informational isolation, emotional load, internal language. Different from ordinary influence by its systematic nature, its intent to reduce a person's autonomy, and its duration of exposure. The corresponding French legal term is “fraudulent abuse of the state of subjection”.",
    related: ["bite-model", "coercion", "abuse-of-weakness"],
  },
  {
    slug: "miviludes",
    term: "MIVILUDES",
    short:
      "Interministerial Mission for Vigilance and Combat against Sectarian Deviance (France), attached to the Ministry of the Interior.",
    long:
      "Created in 2002, MIVILUDES observes sectarian deviances, advises public authorities, receives reports and publishes educational references. It does not fight religions: its scope is strictly that of observable behaviours and harm. Its secretariat receives reports from individuals (anonymity possible).",
    source: {
      label: "Official MIVILUDES website",
      href: "https://www.miviludes.interieur.gouv.fr/",
    },
    related: ["coercive-control", "convergence-of-indicators", "reporting"],
  },
  {
    slug: "ostracism",
    term: "Ostracism",
    short:
      "Organised exclusion of a person by their group of belonging, used as a pressure or punishment tool.",
    long:
      "Ostracism takes very concrete forms: rupture of all bonds (family, friends, partner) with anyone leaving the group, professional blacklisting in some circles, collective silence. It is one of the main brakes on exiting coercion, because the leaving person simultaneously loses their community, their reference points, and sometimes their material framework.",
    related: ["subjection", "deconversion", "closed-group"],
  },
  {
    slug: "deceptive-recruitment",
    term: "Deceptive recruitment",
    short:
      "Technique of concealing the true objectives or nature of a group during first contact to facilitate engagement.",
    long:
      "Typical form: wellness workshops or neutral-themed conferences acting as entry points to a belief system or structured movement. Miracle promises (healing, success, balance), foot-in-the-door techniques, group's true identity revealed late — all MIVILUDES warning signs.",
    related: ["miviludes", "closed-group", "mental-manipulation"],
  },
  {
    slug: "recovering",
    term: "Post-coercion recovery",
    short:
      "Therapeutic and social process to regain autonomy, reference points and bonds after exiting a coercive group.",
    long:
      "Recovery covers several planes simultaneously: psychological (traumas, post-cult syndrome, meaning reconstruction), social (new relationships, sometimes rupture with family still in the group), material (housing, work, finances), legal (recovery of funds, criminal complaint if offences). Follow-up by a therapist trained in coercive dynamics is recommended.",
    related: ["deconversion", "ostracism"],
  },
  {
    slug: "reporting",
    term: "Reporting",
    short:
      "Process by which an individual or professional sends to MIVILUDES, the police or social services facts evocative of sectarian deviance.",
    long:
      "Reporting is neither a criminal complaint nor a final act. It feeds public watch and can, by convergence with other reports, trigger an investigation. It is confidential. MIVILUDES, 119 (children at risk), the public prosecutor or the gendarmerie can be recipients depending on the nature of the facts.",
    source: {
      label: "MIVILUDES — Report a sectarian deviance",
      href: "https://www.miviludes.interieur.gouv.fr/",
    },
    related: ["miviludes", "abuse-of-weakness"],
  },
  {
    slug: "exit",
    term: "Spiritual exit (group departure)",
    short:
      "Stage of physically and symbolically leaving a coercive group, with or without public rupture.",
    long:
      "Distinct from deconversion (the full process), the exit is the event (or sequence of events) when a person stops practices, cuts organisational ties, or self-excludes. It can be discreet (“silent exit”) or marked (public statement, complaint). Successful exit almost always requires a safety net prepared upstream.",
    related: ["deconversion", "ostracism", "recovering"],
  },
  {
    slug: "subjection",
    term: "Psychological subjection",
    short:
      "Characterised state of a person under coercion whose free will is altered, legally recognised in French law.",
    long:
      "The “state of psychological or physical subjection” is a constitutive element of the offence of fraudulent abuse of weakness (French Penal Code article 223-15-2). It is medically and legally characterised by deep alteration of judgement, emotional or cognitive dependence, and reduction of free will. Its characterisation generally requires expert assessment.",
    source: {
      label: "Légifrance — article 223-15-2",
      href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037289588/",
    },
    related: ["coercion", "abuse-of-weakness"],
  },
  {
    slug: "post-cult-syndrome",
    term: "Post-cult syndrome",
    short:
      "Set of psychological symptoms observed in people who have left a coercive group (anxiety, dissociative disorders, loss of reference points).",
    long:
      "Described notably by Margaret Singer (Cults in our midst, 1995) and discussed in social psychiatry. Common symptoms: flashbacks, diffuse anxiety, sleep disorders, identity emptiness, decision-making difficulties, fear of public sphere. Support by a therapist trained in these mechanisms significantly improves recovery trajectory.",
    related: ["deconversion", "recovering"],
  },
];

const TERMS_SORTED = [...TERMS].sort((a, b) =>
  a.term.localeCompare(b.term, "en", { sensitivity: "base" }),
);
const LETTERS = Array.from(
  new Set(
    TERMS_SORTED.map((t) => t.term.charAt(0).toUpperCase()).filter((c) => /[A-Z]/.test(c)),
  ),
);

export default function EnGlossaryPage() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/en/glossary`;

  const definedTermSetJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${pageUrl}#glossary`,
    name: "Glossary of coercive control terms",
    description:
      "Key terms on coercive control, mechanisms of coercion and the French legal framework, with sourced definitions.",
    inLanguage: "en",
    url: pageUrl,
    hasDefinedTerm: TERMS.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${pageUrl}#${t.slug}`,
      name: t.term,
      termCode: t.slug,
      description: t.short,
      inDefinedTermSet: { "@id": `${pageUrl}#glossary` },
      url: `${pageUrl}#${t.slug}`,
    })),
  };

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: `${siteBase}/en` },
    { name: "Understand", url: `${siteBase}/en/recognize-coercive-control` },
    { name: "Glossary", url: pageUrl },
  ]);

  return (
    <>
      <JsonLd data={definedTermSetJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <Container>
        <div className="mx-auto max-w-4xl">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/en" },
              { label: "Understand", href: "/en/recognize-coercive-control" },
              { label: "Glossary" },
            ]}
          />

          <header className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="info" size="sm">Glossary</Tag>
              <Tag tone="neutral" size="sm">{TERMS.length} terms · sourced</Tag>
            </div>
            <h1 className="mt-5 font-display text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] md:text-4xl lg:text-5xl">
              Glossary of{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
                coercive control
              </span>{" "}
              terms
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              Key terms explained clearly, with their institutional or academic sources. Each
              definition is individually citable (permanent anchors).
            </p>
          </header>

          <nav
            aria-label="Alphabetical index"
            className="sticky top-[5.5rem] z-10 mb-8 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/95 p-3 backdrop-blur-sm"
          >
            <ul className="flex flex-wrap gap-1.5">
              {LETTERS.map((letter) => {
                const firstSlug = TERMS_SORTED.find(
                  (t) => t.term.charAt(0).toUpperCase() === letter,
                )?.slug;
                if (!firstSlug) return null;
                return (
                  <li key={letter}>
                    <a
                      href={`#${firstSlug}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-2)] font-mono text-xs font-bold text-[var(--color-text-muted)] transition-colors duration-[var(--motion-fast)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg)] hover:text-[var(--color-accent)]"
                    >
                      {letter}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ol className="space-y-6">
            {TERMS_SORTED.map((t) => (
              <li
                key={t.slug}
                id={t.slug}
                className="scroll-mt-24 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6"
              >
                <article>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="font-display text-xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-2xl">
                      {t.term}
                    </h2>
                    <a
                      href={`#${t.slug}`}
                      className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-1 text-xs text-[var(--color-text-subtle)] transition-colors duration-[var(--motion-fast)] hover:text-[var(--color-accent)]"
                      aria-label={`Permanent link to ${t.term}`}
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </a>
                  </div>

                  <p className="mt-3 border-l-2 border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)]/40 px-4 py-2 text-base leading-relaxed text-[var(--color-text)]">
                    <strong className="text-[var(--color-accent)]">Definition:</strong> {t.short}
                  </p>

                  <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{t.long}</p>

                  {t.source ? (
                    <div className="mt-4 flex items-start gap-2 text-sm">
                      <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
                        Source
                      </span>
                      <a
                        href={t.source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-accent)] underline-offset-2 hover:underline"
                      >
                        {t.source.label}
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="ml-1 inline-block h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    </div>
                  ) : null}

                  {t.related && t.related.length > 0 ? (
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                      <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
                        See also
                      </span>
                      {t.related.map((rel) => {
                        const relTerm = TERMS.find((tt) => tt.slug === rel);
                        if (!relTerm) return null;
                        return (
                          <a
                            key={rel}
                            href={`#${rel}`}
                            className="inline-flex items-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2.5 py-1 text-xs text-[var(--color-text-muted)] transition-colors duration-[var(--motion-fast)] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
                          >
                            {relTerm.term}
                          </a>
                        );
                      })}
                    </div>
                  ) : null}
                </article>
              </li>
            ))}
          </ol>

          <div className="mt-12 space-y-6">
            <EmergencyBox variant="banner" />

            <div className="rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30 bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-surface-1)]/50 to-transparent p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[var(--color-text)]">
                    A term is missing or a definition needs refinement?
                  </h2>
                  <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
                    The glossary evolves with our watch. Write to us with your feedback.
                  </p>
                </div>
                <Link
                  href="/en/contact"
                  className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-black transition-colors duration-[var(--motion-fast)] hover:bg-[var(--color-accent-hover)]"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>

          <footer className="mt-10 border-t border-[var(--color-border)] pt-6 text-xs leading-6 text-[var(--color-text-subtle)]">
            <p>
              Glossary produced with AI assistance, reviewed by Crise Conscience editorial team.
              Sources: MIVILUDES, French Penal Code (Légifrance), academic work by Steven Hassan,
              Robert Lifton, Margaret Singer. Last update: May 1, 2026.
            </p>
          </footer>
        </div>
      </Container>
    </>
  );
}
