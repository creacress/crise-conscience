import type { Metadata } from "next";
import Link from "next/link";
import KeyTakeaways from "@/app/components/KeyTakeaways";
import EmergencyBox from "@/app/components/EmergencyBox";
import { JsonLd } from "@/app/components/JsonLd";
import { articleSchema, breadcrumbSchema, getSiteBase } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Recognize coercive control — 17 warning signs and criteria",
  description:
    "Concrete cues to identify coercive control: MIVILUDES criteria, mechanisms of coercion, warning signs and steps to act. Educational reformulation, sourced.",
  alternates: {
    canonical: "/en/recognize-coercive-control",
    languages: {
      "fr-FR": "/blog/signaux-emprise",
      en: "/en/recognize-coercive-control",
      "x-default": "/blog/signaux-emprise",
    },
  },
  openGraph: {
    title: "Recognize coercive control — 17 warning signs",
    description: "Criteria, warning signs and how to act, inspired by MIVILUDES public framework.",
    type: "article",
    url: "/en/recognize-coercive-control",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recognize coercive control — 17 signs",
    description: "MIVILUDES-based criteria, coercion process, action advice.",
  },
};

const OFFICIAL_URL =
  "https://www.miviludes.interieur.gouv.fr/comprendre-prevenir-et-lutter/comment-identifier-derive-sectaire";

const criteria = [
  {
    title: "Mental destabilisation / subjection",
    desc: "Loss of critical thinking, psychological or physical dependence, decisions imposed (acts or abstentions) to the person's detriment.",
  },
  {
    title: "Rupture with the entourage",
    desc: "Distance from relatives (family, friends), artificially maintained tensions, gradual isolation.",
  },
  {
    title: "Radical behaviour change",
    desc: "New “on demand” personality, stereotyped language, overturned priorities, abandonment of activities or studies.",
  },
  {
    title: "Disparagement of the outside world",
    desc: "“Us versus them” discourse, suspicion of media, rupture of access to information, rejection of institutions.",
  },
  {
    title: "Demanding living conditions",
    desc: "Reduced sleep, exhausting pace, repeated retreats/seminars, control of time and contacts.",
  },
  {
    title: "Deceptive recruitment",
    desc: "Miracle promises (well-being, healing, success), foot-in-the-door technique, concealment of objectives.",
  },
  {
    title: "Indoctrination of children",
    desc: "Control of education, schooling rupture, anxiety-inducing discourse, identity assignment.",
  },
  {
    title: "Authoritarian and opaque group",
    desc: "Compartmentalised organisation, internal rules, charismatic leader / “exclusive” referent practitioner, opacity.",
  },
  {
    title: "Difficulty leaving the group",
    desc: "Guilt, threats, ostracism, social pressure, fear of losing relationships.",
  },
  {
    title: "Harm to persons",
    desc: "Violence, abuse, deprivations, attacks on physical/psychic integrity, offences and crimes.",
  },
  {
    title: "Public order disturbance / institutional contestation",
    desc: "Antisocial discourse, systematic opposition, attempts at influence or destabilisation.",
  },
  {
    title: "Frequent legal disputes",
    desc: "History of cases, procedures, convictions, multiple disputes around the group or leader.",
  },
  {
    title: "Exorbitant financial demands",
    desc: "Donations, chained paid trainings, opaque “contributions”, debt, opaque financial management.",
  },
  {
    title: "Infiltration of public authorities",
    desc: "Entry strategies: influence, networks, attempts at institutional legitimisation.",
  },
  {
    title: "Doubtful and exclusive care offering",
    desc: "Healing promises, rejection of conventional medicine, risky prescriptions or practices.",
  },
  {
    title: "Worrying eating habits",
    desc: "Imposed diets, extreme restrictions, forced fasting, eating rules as control tool.",
  },
  {
    title: "Harm to republican principles",
    desc: "Discriminatory discourse, separatism, denial of fundamental rights, deviances against the law.",
  },
] as const;

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1 text-xs text-[var(--color-text-muted)]">
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title, desc }: { kicker?: string; title: string; desc?: string }) {
  return (
    <div className="mb-5">
      {kicker ? <p className="text-xs tracking-widest text-[var(--color-text-subtle)]">{kicker}</p> : null}
      <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[var(--color-text)]">{title}</h2>
      {desc ? <p className="mt-2 text-[var(--color-text-muted)]">{desc}</p> : null}
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-[var(--color-text)]">{title}</h3>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{desc}</p>
    </div>
  );
}

export default function EnRecognizeCoerciveControlPage() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/en/recognize-coercive-control`;

  const articleJsonLd = articleSchema({
    siteBase,
    pageUrl,
    title: "Recognize coercive control — 17 warning signs",
    description:
      "MIVILUDES-based criteria, coercion process (seduction, dependence, isolation) and action advice.",
    image: `${siteBase}/opengraph-image`,
    datePublished: "2026-01-10",
    dateModified: "2026-05-01",
    authorName: "Crise Conscience editorial team (AI-assisted, human-reviewed)",
  });

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: `${siteBase}/en` },
    { name: "Understand", url: `${siteBase}/en/recognize-coercive-control` },
    { name: "Coercive control signs", url: pageUrl },
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero */}
      <header className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-gradient-to-b from-[var(--color-surface-2)] to-[var(--color-surface-1)] p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2">
              <Badge>Prevention</Badge>
              <Badge>Coercion</Badge>
              <Badge>Concrete cues</Badge>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
              Coercive control signs: how to spot a sectarian deviance
            </h1>
            <p className="mt-4 text-[var(--color-text-muted)]">
              Here we summarise and structure public reference points (notably MIVILUDES) to help
              you recognise a <b>convergence of indicators</b>: an isolated sign is not proof,
              but multiple converging signals must alert.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#criteria"
                className="rounded-[var(--radius-md)] bg-[var(--color-text)] px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
              >
                See criteria
              </a>
              <a
                href="#act"
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-1)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-surface-2)]"
              >
                How to act
              </a>
              <a
                href={OFFICIAL_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-1)] px-4 py-2 text-sm font-semibold text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-2)]"
              >
                Official source ↗
              </a>
            </div>
          </div>

          <div className="w-full max-w-sm space-y-4">
            <figure
              aria-hidden="true"
              className="relative h-56 w-full overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-accent-soft)] via-[var(--color-surface-1)] to-sky-500/10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_30%,rgba(251,146,60,0.18),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_75%_70%,rgba(56,189,248,0.14),transparent_60%)]" />
              <svg viewBox="0 0 320 224" className="absolute inset-0 h-full w-full opacity-80" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="cc-pulse-en" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(251,146,60,0.55)" />
                    <stop offset="60%" stopColor="rgba(251,146,60,0.10)" />
                    <stop offset="100%" stopColor="rgba(251,146,60,0)" />
                  </radialGradient>
                </defs>
                {[28, 56, 88, 124].map((r) => (
                  <circle key={r} cx="160" cy="112" r={r} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
                ))}
                <circle cx="160" cy="112" r="12" fill="url(#cc-pulse-en)" />
                <circle cx="160" cy="112" r="4" fill="rgba(251,146,60,0.95)" />
              </svg>
              <figcaption className="absolute inset-x-0 bottom-0 border-t border-[var(--color-border)] bg-black/30 p-3 text-center text-xs text-[var(--color-text-muted)] backdrop-blur-sm">
                Coercion progresses in concentric circles.
              </figcaption>
            </figure>

            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-2)] p-5">
              <p className="text-sm font-semibold text-[var(--color-text)]">Mini-checklist (keep in mind)</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-muted)]">
                <li>• Progressive isolation + rupture with relatives</li>
                <li>• Dependence (emotional, financial, cognitive)</li>
                <li>• Control of time, information, choices</li>
                <li>• Pressure / guilt / threats</li>
                <li>• “Miracle” promises + growing demands</li>
              </ul>
              <p className="mt-4 text-xs text-[var(--color-text-subtle)]">
                Look at the dynamics of control, not the group's label.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Definition */}
      <section className="mt-12">
        <SectionTitle
          kicker="UNDERSTAND"
          title="Definition (in plain language)"
          desc="A sectarian deviance is the use of pressures/techniques to place a person in a state of subjection (psychological or physical), reducing their free will, with detrimental consequences."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <Card
            title="We do not “fight” a belief"
            desc="In France, the approach targets behaviour and harm (attacks on persons, goods, social cohesion), not a religion or opinion."
          />
          <Card
            title="The convergence of indicators"
            desc="A single criterion is generally not enough: it is the accumulation and coherence of signals that reveals a coercive dynamic."
          />
          <Card
            title="Frequent effects"
            desc="Family ruptures, healthcare rupture, financial predation, hampered schooling, weakened citizenship and autonomy."
          />
        </div>
      </section>

      {/* Criteria */}
      <section id="criteria" className="mt-12">
        <SectionTitle
          kicker="SPOT"
          title="Warning criteria (indicative list)"
          desc="These criteria reflect the spirit of MIVILUDES references, reformulated for readability."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {criteria.map((c) => (
            <div
              key={c.title}
              className="group rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5 transition hover:bg-[var(--color-surface-2)]/70"
            >
              <h3 className="text-base font-semibold text-[var(--color-text)]">{c.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5">
          <p className="text-sm text-[var(--color-text-muted)]">
            <b className="text-[var(--color-text)]">Practical tip:</b> note facts, dates,
            messages, amounts, observable changes. Concrete elements help break the fog and ask
            for help.
          </p>
        </div>
      </section>

      {/* Coercion mechanism */}
      <section className="mt-12">
        <SectionTitle
          kicker="MECHANISM"
          title="Coercion: a progressive process"
          desc="Coercion techniques rarely work “in one go”. They progress in stages, which is what makes them hard to spot."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <Card
            title="1) Seduction / validation"
            desc="You are made to feel “special”, understood, chosen. This lowers vigilance and encourages disclosing vulnerabilities."
          />
          <Card
            title="2) Dependence + indoctrination"
            desc="New reference points, new “truths”, imposed routines. The relationship becomes central and costly to question."
          />
          <Card
            title="3) Isolation + control"
            desc="Distance from relatives, control of time, information, choices. Often financial or work demands are added."
          />
        </div>

        <details className="mt-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5">
          <summary className="cursor-pointer text-sm font-semibold text-[var(--color-text)]">
            Why is leaving so hard?
          </summary>
          <div className="mt-3 space-y-2 text-sm text-[var(--color-text-muted)]">
            <p>Because coercion mixes fear, guilt, loss of reference points and sometimes financial dependence.</p>
            <p>
              Leaving may bring solitude, rupture of bonds, group pressure (ostracism), and even
              threats. It is a process that takes time.
            </p>
          </div>
        </details>
      </section>

      {/* Act */}
      <section id="act" className="mt-12">
        <SectionTitle
          kicker="ACT"
          title="What to do if you are concerned (you or a loved one)"
          desc="Goal: safety, facts, support. No frontal duel — coercion thrives on rupture."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6">
            <h3 className="text-base font-semibold text-[var(--color-text)]">Priorities</h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>• Stay in contact (calm, no humiliation).</li>
              <li>• Document facts (dates, pressures, amounts, messages).</li>
              <li>• Identify immediate risks (health, violence, minors, money).</li>
              <li>• Seek help (victim support, professionals, reporting).</li>
            </ul>
          </div>

          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6">
            <h3 className="text-base font-semibold text-[var(--color-text)]">Avoid</h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>• The clash “you're in a cult” (often counterproductive).</li>
              <li>• Ultimatums without a safety net.</li>
              <li>• Endless debates: focus on concrete (control, isolation, money, care).</li>
              <li>• Staying alone — rely on competent structures.</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-gradient-to-b from-[var(--color-surface-2)] to-[var(--color-surface-1)] p-6">
          <h3 className="text-base font-semibold text-[var(--color-text)]">Official resources</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            For full detail, definitions and the original criteria list, consult the MIVILUDES
            page.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={OFFICIAL_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-[var(--radius-md)] bg-[var(--color-text)] px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Open MIVILUDES page ↗
            </a>
            <Link
              href="/en/contact"
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-1)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-surface-2)]"
            >
              Contact us
            </Link>
          </div>

          <p className="mt-4 text-xs text-[var(--color-text-subtle)]">
            In emergency / immediate danger: call appropriate emergency services (in France:
            17/112).
          </p>
        </div>
      </section>

      {/* Key takeaways + Sources */}
      <KeyTakeaways
        title="Key takeaways"
        sourcesTitle="Sources"
        takeaways={[
          <>
            A sectarian deviance targets <strong>behaviour and harm</strong>, never a belief or
            religion as such.
          </>,
          <>
            No isolated sign is enough: it is the <strong>coherent accumulation</strong> of
            signals over time that qualifies a coercive dynamic.
          </>,
          <>
            The typical process advances in stages:{" "}
            <strong>seduction → dependence → isolation</strong>.
          </>,
          <>
            Three action priorities: <strong>keep contact</strong>, <strong>document
            facts</strong>, <strong>seek specialised help</strong> (associations,
            professionals).
          </>,
          <>
            In France, in case of immediate danger: <strong>15 / 17 / 18 / 112</strong>.
          </>,
        ]}
        sources={[
          {
            title: "MIVILUDES — How to identify a sectarian deviance",
            href: OFFICIAL_URL,
            publisher: "Interministerial mission (French Ministry of Interior)",
          },
          {
            title: "UNADFI — Network supporting victims of coercive control",
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
            publisher: "France Victimes",
          },
        ]}
      />

      <div className="mt-10">
        <EmergencyBox variant="full" />
      </div>

      <footer className="mt-12 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-subtle)]">
        <p>
          This page is an educational reformulation based on public references. AI-assisted
          drafting, human-reviewed by Crise Conscience editorial team. For the full official
          version, see the MIVILUDES source above.
        </p>
      </footer>
    </main>
  );
}
