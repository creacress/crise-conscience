import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/app/components/JsonLd";
import {
  faqSchema,
  breadcrumbSchema,
  organizationSchema,
  getSiteBase,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Crise Conscience est une association loi 1901, partenaire de l’UNADFI, dédiée à la prévention des dérives sectaires : analyse critique, ressources fiables et accompagnement.",
  alternates: { canonical: "/a-propos" },
};

const FAQ = [
  {
    question: "Crise Conscience est-elle contre les religions ?",
    answer:
      "Non. L’association ne combat aucune croyance ni aucune religion. Elle analyse exclusivement les comportements d’emprise, l’ostracisme et leurs conséquences psychologiques, sociales et juridiques. La distinction est claire en droit français : ce sont les faits et les dommages qui sont qualifiés, jamais la pensée.",
  },
  {
    question: "Quel est le lien entre Crise Conscience et l’UNADFI ?",
    answer:
      "Crise Conscience est partenaire de l’UNADFI (Union Nationale des Associations de Défense des Familles et de l’Individu victimes de sectes). Cette filiation garantit un cadre éthique, juridique et méthodologique éprouvé.",
  },
  {
    question: "Qui rédige les contenus du site ?",
    answer:
      "Nos analyses longues sont rédigées avec assistance d’outils d’intelligence artificielle (environ 70 % du brouillon initial), puis relues, vérifiées et enrichies par la rédaction humaine (environ 30 %). Cette double passe assure la qualité, la véracité des sources et la nuance.",
  },
  {
    question: "Comment savoir si un proche est sous emprise ?",
    answer:
      "Aucun signe isolé ne suffit. C’est l’accumulation et la cohérence dans la durée de plusieurs signaux — isolement, contrôle de l’information, culpabilisation, dépendance affective ou financière, exigences croissantes, rupture sociale — qui doivent alerter. Notre dossier ‘Signes d’emprise’ détaille 17 critères inspirés des repères MIVILUDES.",
  },
  {
    question: "Puis-je vous écrire de manière anonyme ?",
    answer:
      "Oui. Le formulaire de contact accepte les envois anonymes : laissez les champs nom et email vides. Aucun témoignage n’est diffusé sans accord écrit explicite.",
  },
  {
    question: "Est-ce un service d’urgence ?",
    answer:
      "Non. En cas de danger immédiat, contactez les services d’urgence : 15 (SAMU), 17 (Police), 18 (Pompiers), 112 (urgences européennes), 119 (enfance en danger), 3919 (violences faites aux femmes).",
  },
] as const;

const VALEURS = [
  {
    title: "Indépendance",
    desc: "Crise Conscience est indépendante de toute organisation religieuse, politique ou idéologique.",
  },
  {
    title: "Rigueur",
    desc: "Sources vérifiables, travaux académiques, méthodologie critique. On distingue toujours fait, opinion et hypothèse.",
  },
  {
    title: "Humanisme",
    desc: "Dignité, liberté de conscience, autonomie. On parle des personnes avec respect, même quand on désaccorde des comportements.",
  },
  {
    title: "Pédagogie",
    desc: "Rendre lisibles des sujets complexes : c’est la condition pour que la prévention soit utile, pas réservée aux initiés.",
  },
  {
    title: "Transparence",
    desc: "Méthode éditoriale assumée (assistance IA + relecture humaine), sources citées, limites reconnues.",
  },
];

const AXES = [
  {
    title: "Analyse critique",
    desc: "Études d’articles, doctrines, discours institutionnels et stratégies de communication.",
  },
  {
    title: "Prévention",
    desc: "Sensibilisation aux dérives sectaires et aux mécanismes d’emprise psychologique.",
  },
  {
    title: "Information",
    desc: "Mise à disposition de ressources, articles, analyses et sources vérifiées.",
  },
  {
    title: "Accompagnement intellectuel",
    desc: "Aide à la compréhension pour les personnes en questionnement ou en reconstruction.",
  },
];

export default function AboutPage() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/a-propos`;

  return (
    <>
      <JsonLd data={organizationSchema(siteBase)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: `${siteBase}/` },
          { name: "À propos", url: pageUrl },
        ])}
      />
      <JsonLd
        data={faqSchema(FAQ.map((f) => ({ question: f.question, answer: f.answer })))}
      />

      <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-16">
        {/* Header */}
        <header className="mb-14 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-8 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]">
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/65">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Association loi 1901
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Partenaire UNADFI
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Sources vérifiées
            </span>
          </div>

          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
            À propos de Crise Conscience
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-7 text-white/80">
            Crise Conscience est une association indépendante, partenaire de l’
            <a
              href="https://www.unadfi.org/"
              target="_blank"
              rel="noreferrer"
              className="text-orange-300 hover:underline"
            >
              UNADFI
            </a>
            . Notre objectif : fournir des outils de compréhension, d’information et de prévention
            face aux <strong className="text-white">dérives sectaires</strong> et aux mécanismes
            d’<strong className="text-white">emprise</strong>.
          </p>
        </header>

        {/* Mission */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">Notre mission</h2>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 leading-7 text-white/80">
            <p>
              Promouvoir l’esprit critique et l’analyse rationnelle face aux systèmes de croyances
              fermés. Étudier les mécanismes de conditionnement psychologique, de contrôle social
              et de manipulation idéologique afin d’aider chacun à mieux les identifier.
            </p>
            <p className="mt-4">
              Nous nous adressons au grand public, aux personnes concernées et à leurs proches,
              ainsi qu’aux chercheurs, professionnels (psy, juristes, enseignants, soignants),
              journalistes et institutions souhaitant mieux comprendre ces phénomènes.
            </p>
          </div>
        </section>

        {/* Axes */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">
            Nos axes de travail
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {AXES.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <strong className="text-white">{a.title}</strong>
                <p className="mt-2 text-sm leading-6 text-white/75">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Valeurs */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">Nos valeurs</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {VALEURS.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/80"
              >
                <strong className="text-white">{v.title}</strong>
                <p className="mt-2 text-sm leading-6 text-white/75">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Méthode éditoriale (transparence IA) */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">
            Notre méthode éditoriale
          </h2>
          <div className="rounded-2xl border border-orange-500/25 bg-gradient-to-b from-orange-500/[0.08] to-white/[0.02] p-6 leading-7 text-white/85">
            <p>
              Nos contenus longs (analyses, dossiers, articles) sont produits selon un protocole
              <strong className="text-white"> 70 % IA / 30 % humain</strong> :
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-7 text-white/75">
              <li>
                <strong className="text-white">Brouillon</strong> rédigé avec assistance d’outils
                d’IA, à partir d’une trame éditoriale validée et de sources prédéfinies.
              </li>
              <li>
                <strong className="text-white">Relecture humaine</strong> systématique : vérification
                factuelle, ajout de nuance, validation du ton, correction du contexte juridique
                (MIVILUDES, droit français), suppression des formules ambiguës.
              </li>
              <li>
                <strong className="text-white">Mention explicite</strong> dans le pied de chaque
                article et dans nos mentions légales.
              </li>
            </ul>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Pourquoi ce choix ? Parce que la transparence sur ses propres méthodes est un
              prérequis pour une association qui parle d’influence et d’emprise. Nous estimons
              qu’il serait incohérent d’être opaque sur la production de nos propres contenus.
            </p>
          </div>
        </section>

        {/* Positionnement */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">
            Notre positionnement
          </h2>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 leading-7 text-white/80">
            <p>
              Crise Conscience ne combat pas les croyances individuelles. Nous analysons les{" "}
              <strong className="text-white">structures, comportements et méthodes</strong> qui
              peuvent porter atteinte à la liberté de pensée et à l’intégrité psychologique.
            </p>
            <p className="mt-4">
              Notre démarche est <strong className="text-white">analytique, documentée et
              respectueuse des personnes</strong>, tout en étant ferme sur les faits et les
              mécanismes observables. Nous parlons des dérives, pas des fidèles.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">
            Questions fréquentes
          </h2>
          <div className="space-y-3">
            {FAQ.map((q) => (
              <details
                key={q.question}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 open:bg-white/[0.05]"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-white marker:hidden">
                  <span className="mr-2 text-orange-300 transition group-open:rotate-90 inline-block">
                    ›
                  </span>
                  {q.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-white/75">{q.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-orange-500/15 via-white/5 to-sky-500/10 p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm text-white/70">Une question, un témoignage, un partenariat ?</div>
              <div className="mt-1 text-xl font-semibold text-white">
                Écrivez-nous — anonymement si vous le souhaitez.
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex justify-center rounded-xl bg-orange-500 px-5 py-3 font-semibold text-black transition hover:brightness-110"
            >
              Aller au contact
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
