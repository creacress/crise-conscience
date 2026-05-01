import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import { JsonLd } from "@/app/components/JsonLd";
import KeyTakeaways from "@/app/components/KeyTakeaways";
import EmergencyBox from "@/app/components/EmergencyBox";
import Tag from "@/app/components/ui/Tag";
import Button from "@/app/components/ui/Button";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  getSiteBase,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Se reconstruire après une emprise sectaire — guide post-sortie",
  description:
    "Vivre l'après : 4 phases de reconstruction après une emprise sectaire (sortie, premiers mois, premier an, long terme). Repères thérapeutiques, juridiques et sociaux pour les sortants et leurs proches.",
  alternates: {
    canonical: "/se-reconstruire",
    languages: { "fr-FR": "/se-reconstruire", en: "/en/recovering", "x-default": "/se-reconstruire" },
  },
  openGraph: {
    type: "article",
    url: "/se-reconstruire",
    title: "Se reconstruire après une emprise sectaire",
    description:
      "4 phases de reconstruction post-emprise : sortie, premiers mois, première année, long terme. Repères thérapeutiques et sociaux.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Se reconstruire après une emprise sectaire",
    description:
      "4 phases : sortie, premiers mois, première année, long terme. Pour les sortants et leurs proches.",
  },
};

const PHASES = [
  {
    id: "phase-1-sortie-immediate",
    n: 1,
    title: "Sortie immédiate — les premières 72 heures",
    duration: "0–3 jours",
    body: [
      "Les premières heures après une sortie sont fragiles : adrénaline, sentiment d'irréalité, parfois soulagement vite suivi d'angoisse. C'est la phase de mise en sécurité, pas celle des grandes décisions.",
      "Priorités concrètes : un lieu de sommeil sûr (proches de confiance hors du groupe, hébergement d'urgence si pas d'alternative), bloquer les contacts insistants du groupe (téléphone, réseaux sociaux), prévenir une ou deux personnes-clé, manger et dormir.",
    ],
    actions: [
      "Trouver un lieu de sommeil hors d'atteinte du groupe.",
      "Couper les notifications, garder un seul canal de contact ouvert pour vos proches sûrs.",
      "Ne prendre aucune décision juridique ou financière dans les 72 premières heures.",
    ],
  },
  {
    id: "phase-2-premiers-mois",
    n: 2,
    title: "Les premiers mois — stabiliser",
    duration: "1–6 mois",
    body: [
      "C'est la phase la plus difficile psychologiquement : descente de l'adrénaline, montée de la culpabilité, syndrome post-cultiste qui s'installe (anxiété, troubles du sommeil, flashbacks, vide identitaire). Beaucoup de sortants connaissent ici une phase de doute (« ai-je eu raison de partir ? »). C'est normal — l'emprise a câblé un attachement profond.",
      "Démarche prioritaire : trouver un·e thérapeute formé·e aux mécanismes d'emprise. Une thérapie « généraliste » peut passer à côté des spécificités. UNADFI, CCMM et certains CMP orientent. En parallèle : démarches administratives (logement, RSA si nécessaire, sécurité sociale, mutuelle), récupération de papiers d'identité si retenus.",
    ],
    actions: [
      "Contacter UNADFI ou CCMM pour orientation thérapeute spécialisé.",
      "Régulariser logement, droits sociaux, papiers.",
      "Documenter les faits (montants, courriers, témoignages) — c'est le moment où la mémoire est encore fraîche.",
    ],
  },
  {
    id: "phase-3-premiere-annee",
    n: 3,
    title: "Première année — recomposer",
    duration: "6–18 mois",
    body: [
      "La crise aiguë se transforme en travail de fond. La thérapie devient le pivot : déconditionnement progressif des automatismes du groupe, reconstruction de la pensée critique, gestion du deuil de la communauté perdue. C'est aussi la période où la dimension juridique peut s'engager si des faits le justifient (abus de faiblesse, escroquerie, exercice illégal de la médecine).",
      "Vie sociale : accepter que beaucoup de relations « du dehors » aient évolué pendant l'emprise. Reconstruire un cercle hors du groupe demande du temps. Les groupes de pairs (anciens du même groupe ou groupes proches, rencontrés via les associations) sont précieux pour ne pas se sentir seul·e.",
    ],
    actions: [
      "Suivi thérapeutique régulier (idéalement hebdomadaire la première année).",
      "Évaluer une action en justice si pertinente (avocat·e, France Victimes, aide juridictionnelle).",
      "Identifier 2–3 espaces sociaux hors du groupe (sport, association, formation, travail).",
    ],
  },
  {
    id: "phase-4-long-terme",
    n: 4,
    title: "Long terme — intégrer",
    duration: "1 an et plus",
    body: [
      "Au-delà de la première année, la reconstruction se stabilise mais ne « finit » jamais complètement. L'expérience d'emprise reste partie intégrante de l'histoire de la personne — elle peut même devenir un savoir précieux, transmis ou utilisé professionnellement (témoignage, accompagnement, recherche). Les rechutes émotionnelles existent, surtout aux dates anniversaires ou face à des situations qui rappellent le groupe.",
      "Question récurrente : la famille restée dans le groupe. Beaucoup de sortants vivent un deuil prolongé d'un parent, d'un·e conjoint·e ou d'enfants encore sous emprise. La stratégie qui fonctionne le mieux : ne pas couper de votre côté, laisser un canal minimal ouvert, et accepter que le rythme leur appartienne. Le suivi psy aide à porter ce deuil sans tomber dans la culpabilité.",
    ],
    actions: [
      "Espacer les séances de thérapie selon l'autonomie retrouvée — sans abandonner brutalement.",
      "Maintenir un canal minimal avec la famille restée dans le groupe (anniversaires, événements de vie).",
      "Envisager un rôle d'accompagnement pour d'autres sortants si vous vous sentez prêt·e (jamais avant 2 ans en moyenne).",
    ],
  },
] as const;

type Ressource = {
  title: string;
  desc: string;
  href: string;
  external?: boolean;
};

const RESSOURCES: ReadonlyArray<Ressource> = [
  {
    title: "UNADFI — Aide aux victimes",
    desc: "Réseau associatif d'écoute, orientation thérapeute spécialisé, accompagnement juridique.",
    href: "https://www.unadfi.org/",
    external: true,
  },
  {
    title: "CCMM — Centre contre les manipulations mentales",
    desc: "Information, accompagnement, listes de thérapeutes formés à la déprogrammation.",
    href: "https://www.ccmm.asso.fr/",
    external: true,
  },
  {
    title: "France Victimes",
    desc: "Aide aux victimes : accès au droit, soutien psychologique, accompagnement procédural.",
    href: "https://www.france-victimes.fr/",
    external: true,
  },
  {
    title: "MIVILUDES — Signalement",
    desc: "Mission interministérielle. Signalement confidentiel, conseils.",
    href: "https://www.miviludes.interieur.gouv.fr/",
    external: true,
  },
  {
    title: "Glossaire Crise Conscience",
    desc: "Termes clés : syndrome post-cultiste, déconversion, ostracisme, BITE model.",
    href: "/glossaire",
  },
  {
    title: "Test d'auto-évaluation BITE",
    desc: "Outil pédagogique 16 questions, anonyme, 5 minutes.",
    href: "/test-emprise",
  },
];

const FAQ = [
  {
    question: "Combien de temps dure la reconstruction après une emprise ?",
    answer:
      "1 à 5 ans pour les phases majeures, parfois plus pour la dimension identitaire profonde. Ce n'est pas linéaire — des phases de doute ou de regret du groupe sont normales. Ce qui compte, c'est de maintenir un suivi régulier les 12–18 premiers mois.",
  },
  {
    question: "Faut-il absolument un·e thérapeute spécialisé·e ?",
    answer:
      "C'est fortement recommandé. Les mécanismes d'emprise laissent des traces (syndrome post-cultiste, anxiété, troubles dissociatifs, conditionnements résiduels) que les psychologues généralistes peuvent passer à côté. UNADFI et CCMM tiennent des listes d'orientation.",
  },
  {
    question: "Vais-je revoir ma famille restée dans le groupe ?",
    answer:
      "Cela dépend du groupe et de votre famille. Certains imposent un ostracisme strict (rupture totale), d'autres tolèrent un contact minimal. Stratégie : ne pas couper de votre côté, garder un canal ouvert (SMS d'anniversaire, présence aux événements de vie). Le rythme leur appartient.",
  },
  {
    question: "Peut-on porter plainte contre un groupe sectaire ?",
    answer:
      "Oui, sur des qualifications pénales précises (abus de faiblesse, escroquerie, exercice illégal de la médecine, agressions sexuelles, etc.). Conditions : preuves matérielles, expertise sur la sujétion. Un·e avocat·e ou France Victimes vous orientera. La prescription pénale court à partir du dernier acte ou de la cessation de la sujétion.",
  },
  {
    question: "Je n'ose pas chercher de l'aide. Comment faire le premier pas ?",
    answer:
      "Écrivez à une association sans donner votre nom (UNADFI, CCMM). Présentez-vous comme « personne en réflexion » plutôt que « victime » — beaucoup le font, c'est habituel et discret. Le premier échange ne vous engage à rien et vous donnera une orientation.",
  },
  {
    question: "Risque-t-on de retomber dans une autre emprise ?",
    answer:
      "Oui — les sortants sont plus vulnérables aux re-recrutements pendant la phase de reconstruction (vide affectif, recherche de repères). C'est pour cela qu'on insiste sur le suivi thérapeutique et la reconstruction d'un cercle social hors du groupe. Vigilance accrue 2–3 ans après la sortie.",
  },
] as const;

export default function SeReconstruirePage() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/se-reconstruire`;

  const articleJsonLd = articleSchema({
    siteBase,
    pageUrl,
    title: "Se reconstruire après une emprise sectaire — guide post-sortie",
    description:
      "Guide en 4 phases pour la reconstruction post-emprise : sortie immédiate, premiers mois, première année, long terme. Pour les sortants et leurs proches.",
    image: `${siteBase}/opengraph-image`,
    datePublished: "2026-05-01",
    dateModified: "2026-05-01",
    authorName: "Rédaction Crise Conscience (assistance IA, relecture humaine)",
  });

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Accueil", url: `${siteBase}/` },
    { name: "Agir", url: `${siteBase}/aider-un-proche` },
    { name: "Se reconstruire", url: pageUrl },
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
              { label: "Accueil", href: "/" },
              { label: "Agir", href: "/aider-un-proche" },
              { label: "Se reconstruire" },
            ]}
          />

          {/* Hero */}
          <header className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="calm" size="sm">Guide post-sortie</Tag>
              <Tag tone="info" size="sm">Persona : la personne sortante</Tag>
              <span className="text-xs text-[var(--color-text-subtle)]">
                ≈ 12 min de lecture · Mis à jour le 1er mai 2026
              </span>
            </div>

            <h1 className="mt-5 font-display text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] md:text-4xl lg:text-5xl">
              Se reconstruire après une{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
                emprise sectaire
              </span>
            </h1>

            <p className="mt-5 text-pretty text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              Quatre phases dans l&apos;ordre, sur 1 à 5 ans en moyenne. C&apos;est rarement
              linéaire&nbsp;: des doutes, des rechutes émotionnelles, du deuil. Ce qui compte
              n&apos;est pas la rapidité — c&apos;est la solidité des appuis (thérapeutiques,
              sociaux, juridiques).
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="#phase-1-sortie-immediate" variant="primary" size="md">
                Lire les 4 phases
              </Button>
              <Button href="#ressources" variant="secondary" size="md">
                Voir les ressources
              </Button>
            </div>
          </header>

          {/* EmergencyBox immédiate */}
          <EmergencyBox variant="banner" className="mb-10" />

          {/* Phases */}
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
                        <Tag tone="neutral" size="sm">
                          {p.duration}
                        </Tag>
                      </div>

                      {p.body.map((paragraph, i) => (
                        <p
                          key={i}
                          className="mt-3 text-base leading-7 text-[var(--color-text-muted)]"
                        >
                          {paragraph}
                        </p>
                      ))}

                      <div className="mt-5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-4">
                        <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                          Actions concrètes
                        </div>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--color-text-muted)]">
                          {p.actions.map((a, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
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

          {/* À retenir */}
          <KeyTakeaways
            id="a-retenir"
            takeaways={[
              <>
                <strong>72 premières heures</strong>&nbsp;: mise en sécurité uniquement, aucune
                décision majeure.
              </>,
              <>
                <strong>Les 6 premiers mois</strong> sont les plus durs psychologiquement —
                trouvez un·e thérapeute spécialisé·e dès que possible.
              </>,
              <>
                Le <strong>syndrome post-cultiste</strong> (anxiété, vide identitaire,
                flashbacks) est une réaction normale, pas un échec personnel.
              </>,
              <>
                <strong>Anticipez l&apos;ostracisme</strong> du groupe et le deuil des proches
                restés dedans. Suivi psy + groupes de pairs aident à porter ces pertes.
              </>,
              <>
                <strong>Vigilance accrue 2–3 ans</strong> après la sortie&nbsp;: la phase de
                vide affective rend vulnérable au re-recrutement.
              </>,
            ]}
            sources={[
              {
                title: "UNADFI — Aide et accompagnement des victimes",
                href: "https://www.unadfi.org/",
                publisher: "UNADFI",
              },
              {
                title: "CCMM — Centre contre les manipulations mentales",
                href: "https://www.ccmm.asso.fr/",
                publisher: "CCMM",
              },
              {
                title: "Margaret Singer — Cults in our midst (1995)",
                href: "https://www.miviludes.interieur.gouv.fr/",
                publisher: "Réf. académique",
              },
            ]}
          />

          {/* Ressources */}
          <section id="ressources" className="mt-12 scroll-mt-24">
            <Tag tone="info" size="sm">Ressources concrètes</Tag>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl">
              Vers qui se tourner
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-[var(--color-text-muted)]">
              Six portes d&apos;entrée fiables. Choisissez celle qui correspond à votre besoin
              actuel — vous pouvez en cumuler plusieurs.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {RESSOURCES.map((r) => {
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
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5 shrink-0 text-[var(--color-text-subtle)] transition-colors duration-[var(--motion-fast)] group-hover:text-[var(--color-accent)]"
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
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{r.desc}</p>
                  </Wrapper>
                );
              })}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mt-12 scroll-mt-24">
            <Tag tone="info" size="sm">FAQ</Tag>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl">
              Questions fréquentes
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

          {/* CTA témoignages */}
          <section className="mt-12">
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30 bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-surface-1)]/50 to-transparent p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[var(--color-text)]">
                    Vous avez vécu une sortie&nbsp;?
                  </h2>
                  <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
                    Votre témoignage peut aider d&apos;autres personnes. Contribution{" "}
                    <strong>anonyme</strong>, opt-in explicite, vous gardez le contrôle.
                  </p>
                </div>
                <Button href="/temoignages" variant="primary" size="md">
                  Lire les témoignages
                </Button>
              </div>
            </div>
          </section>

          <div className="mt-10">
            <EmergencyBox variant="full" />
          </div>

          <footer className="mt-10 border-t border-[var(--color-border)] pt-6 text-xs leading-6 text-[var(--color-text-subtle)]">
            <p>
              Cette page est une reformulation pédagogique inspirée de travaux de Steven Hassan,
              Margaret Singer (Cults in our midst, 1995) et de l&apos;expérience clinique
              partagée par UNADFI/CCMM. Contenu rédigé avec assistance IA, relu par la rédaction
              Crise Conscience. Pour un cas individuel, consultez un·e thérapeute formé·e.
            </p>
          </footer>
        </div>
      </Container>
    </>
  );
}
