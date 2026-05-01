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
  title: "Aider un proche sous emprise sectaire — guide pratique",
  description:
    "Que faire si un proche est sous emprise sectaire ? 5 étapes concrètes (rester en lien, documenter les faits, identifier les risques, demander conseil, préparer la sortie) inspirées des repères MIVILUDES et UNADFI.",
  alternates: {
    canonical: "/aider-un-proche",
    languages: { "fr-FR": "/aider-un-proche", en: "/en/help-a-loved-one", "x-default": "/aider-un-proche" },
  },
  openGraph: {
    type: "article",
    url: "/aider-un-proche",
    title: "Aider un proche sous emprise sectaire — guide pratique",
    description:
      "5 étapes pour accompagner un proche : rester en lien, documenter, alerter, demander conseil, préparer la sortie.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aider un proche sous emprise — guide pratique",
    description:
      "5 étapes concrètes inspirées des repères MIVILUDES et UNADFI. Crise Conscience.",
  },
};

const STEPS = [
  {
    id: "etape-1-rester-en-lien",
    n: 1,
    title: "Rester en lien — sans clash, sans humiliation",
    body: [
      "L'instinct premier — confronter directement (« tu es dans une secte ») — est presque toujours contre-productif. L'emprise se renforce dès que la personne se sent jugée ou attaquée. Le groupe en profite : « tu vois, on t'avait prévenu·e, ils ne te comprennent pas ».",
      "À la place : conserver un lien régulier, neutre, sans condition. Un message court, un appel rapide, une présence aux moments charnières (anniversaire, fêtes, urgences familiales). Vous montrez que la porte reste ouverte.",
    ],
    avoid: "Ne posez pas d'ultimatum, ne coupez pas le lien, ne moquez pas la croyance.",
  },
  {
    id: "etape-2-documenter-les-faits",
    n: 2,
    title: "Documenter les faits, pas les opinions",
    body: [
      "Notez par écrit tout ce qui est observable et daté : changements de comportement, ruptures avec la famille, sommes versées (dons, formations, retraites), durées de présence imposées, messages reçus du groupe, restrictions alimentaires ou de soins, changements de scolarité pour les enfants.",
      "Cette documentation servira à plusieurs niveaux : pour vous-même (sortir du flou émotionnel), pour les professionnels que vous contacterez (psychologue, juriste, association d'aide), et pour un signalement éventuel à la MIVILUDES ou aux autorités.",
    ],
    avoid: "Évitez les jugements de valeur, gardez ce que vous avez vu, lu, entendu — avec dates.",
  },
  {
    id: "etape-3-identifier-les-risques",
    n: 3,
    title: "Identifier les risques immédiats",
    body: [
      "Certaines situations imposent une intervention rapide : enfants exposés (rupture de scolarité, soins refusés), violences ou abus, état psychologique grave, prédation financière en cours, danger immédiat sur la personne.",
      "Si l'un de ces signaux est présent, la priorité change : on ne discute plus, on alerte. Numéros utiles : 119 (enfance en danger), 17 (police), 15 (SAMU), 3919 (violences faites aux femmes), 3114 (prévention suicide).",
    ],
    avoid: "Ne sous-estimez jamais un signal urgent par crainte « d'exagérer ».",
  },
  {
    id: "etape-4-demander-conseil",
    n: 4,
    title: "Demander conseil à des structures spécialisées",
    body: [
      "Vous n'êtes pas seul·e — et vous ne devez pas l'être. Les associations spécialisées en accompagnement aux victimes de dérives sectaires connaissent les mécanismes, les groupes, les ressorts juridiques.",
      "Trois portes d'entrée fiables : l'UNADFI (réseau d'écoute et d'accompagnement, gratuit, présence régionale), le CCMM (Centre contre les manipulations mentales) et la MIVILUDES (mission interministérielle, signalement et conseil). France Victimes complète l'offre pour la dimension juridique.",
    ],
    avoid: "Évitez les forums grand public et les groupes Facebook : information non vérifiée, risque de contre-emprise.",
  },
  {
    id: "etape-5-preparer-la-sortie",
    n: 5,
    title: "Préparer la sortie sans la précipiter",
    body: [
      "Une sortie réussie se prépare. La personne sous emprise a besoin d'un filet : logement temporaire, soutien financier de transition, suivi psychologique compétent (idéalement un·e thérapeute formé·e aux mécanismes d'emprise), reconstruction progressive du lien social, gestion de la culpabilité et de la peur de l'ostracisme.",
      "La phase de sortie est souvent plus difficile que l'entrée : peur de rompre, deuil de la communauté, angoisse identitaire. Tenez bon, ne rejouez pas le clash, soyez présent·e dans la durée.",
    ],
    avoid: "N'imposez pas un calendrier. La sortie a son propre rythme.",
  },
] as const;

const FAQ = [
  {
    question: "Combien de temps cela prend-il avant qu'un proche sorte d'une emprise ?",
    answer:
      "Il n'y a pas de réponse unique. Certaines sorties prennent des mois, d'autres plusieurs années. Ce qui compte n'est pas la rapidité mais la solidité du filet de sortie : lien préservé, accompagnement professionnel, reconstruction du tissu social. Une sortie précipitée sans filet conduit fréquemment à un retour au groupe.",
  },
  {
    question: "Faut-il signaler à la MIVILUDES dès qu'on a un doute ?",
    answer:
      "Oui, sans hésiter. Le signalement n'est ni une dénonciation ni un acte définitif. Il alimente la veille publique, peut déclencher une enquête si plusieurs signalements convergent, et vous donne accès à une orientation. Il est confidentiel.",
  },
  {
    question: "Mon proche refuse tout dialogue. Que faire ?",
    answer:
      "Ne forcez pas. Maintenez un canal de communication minimal (SMS courts, messages d'anniversaire, présences aux événements familiaux). Documentez en parallèle, contactez une association. Quand la fenêtre s'ouvrira (un doute, une crise interne au groupe, un événement de vie), votre lien préservé sera la première porte de sortie.",
  },
  {
    question: "Mon proche m'accuse d'être manipulé par sa famille ou les médias. Comment réagir ?",
    answer:
      "C'est un schéma classique : le groupe inverse l'accusation pour isoler. Ne contre-argumentez pas frontalement. Reformulez : « Je ne te demande pas de me croire, je te demande juste de garder le lien ». Évitez les débats sur la doctrine — ils renforcent l'emprise.",
  },
  {
    question: "Puis-je faire interner mon proche s'il refuse de partir ?",
    answer:
      "L'hospitalisation sous contrainte (HSC) est encadrée par la loi et réservée à des situations précises (péril imminent, soins psychiatriques nécessaires). Elle n'est pas un outil pour « sortir » quelqu'un d'une secte. Elle relève d'un médecin, pas d'un proche. En cas de doute sur l'état psychiatrique : contactez le SAMU (15) ou un psychiatre.",
  },
  {
    question: "Comment financer un avocat ou une thérapie pour aider à la sortie ?",
    answer:
      "Aide juridictionnelle si les revenus sont sous le plafond, consultations gratuites en CMP (Centre médico-psychologique), associations d'aide aux victimes (France Victimes — gratuit), permanences UNADFI. Le CCMM oriente aussi vers des thérapeutes formés à la déprogrammation.",
  },
] as const;

const SOURCES = [
  {
    title: "MIVILUDES — Comprendre, prévenir et lutter contre les dérives sectaires",
    href: "https://www.miviludes.interieur.gouv.fr/",
    publisher: "Mission interministérielle (Ministère de l'Intérieur)",
  },
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
    title: "France Victimes — Aide aux victimes",
    href: "https://www.france-victimes.fr/",
    publisher: "Fédération France Victimes",
  },
] as const;

export default function AiderUnProchePage() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/aider-un-proche`;

  // HowTo schema (Lot 3 — opportunité GEO/AI Overviews)
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Aider un proche sous emprise sectaire",
    description:
      "Guide pratique en 5 étapes pour accompagner un proche pris dans une dérive sectaire, sans clash frontal et avec un filet de sortie solide.",
    inLanguage: "fr-FR",
    totalTime: "P30D",
    supply: [],
    tool: [
      { "@type": "HowToTool", name: "Carnet pour documenter les faits" },
      { "@type": "HowToTool", name: "Numéros d'urgence (15, 17, 18, 112, 119, 3114, 3919)" },
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
    title: "Aider un proche sous emprise sectaire — guide pratique en 5 étapes",
    description:
      "Que faire si un proche est sous emprise sectaire ? Guide pratique inspiré des repères MIVILUDES et UNADFI : rester en lien, documenter les faits, identifier les risques, demander conseil, préparer la sortie.",
    image: `${siteBase}/opengraph-image`,
    datePublished: "2026-05-01",
    dateModified: "2026-05-01",
    authorName: "Rédaction Crise Conscience (assistance IA, relecture humaine)",
  });

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Accueil", url: `${siteBase}/` },
    { name: "Agir", url: `${siteBase}/contact` },
    { name: "Aider un proche", url: pageUrl },
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
              { label: "Accueil", href: "/" },
              { label: "Aider un proche" },
            ]}
          />

          {/* Hero */}
          <header className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="accent" size="sm">Guide pratique</Tag>
              <Tag tone="info" size="sm">Persona : proche inquiet</Tag>
              <span className="text-xs text-[var(--color-text-subtle)]">
                ≈ 8 min de lecture · Mis à jour le 1er mai 2026
              </span>
            </div>

            <h1 className="mt-5 font-display text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] md:text-4xl lg:text-5xl">
              Que faire si un proche est sous{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
                emprise sectaire
              </span>
              &nbsp;?
            </h1>

            <p className="mt-5 text-pretty text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              5 étapes concrètes, dans l&apos;ordre. Inspirées des repères publics de la
              <strong className="text-[var(--color-text)]"> MIVILUDES</strong> et de la pratique
              d&apos;accompagnement de l&apos;<strong className="text-[var(--color-text)]">UNADFI</strong>.
              L&apos;objectif&nbsp;: garder le lien, documenter les faits, et préparer une sortie
              solide.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="#etape-1-rester-en-lien" variant="primary" size="md">
                Lire les 5 étapes
              </Button>
              <Button href="#faq" variant="secondary" size="md">
                Voir la FAQ
              </Button>
            </div>
          </header>

          {/* EmergencyBox immédiate (variant banner) */}
          <EmergencyBox variant="banner" className="mb-10" />

          {/* Étapes */}
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
                          <strong className="text-[var(--color-text)]">À éviter&nbsp;:</strong>{" "}
                          {s.avoid}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>

          {/* À retenir + Sources */}
          <KeyTakeaways
            takeaways={[
              <>
                <strong>Lien d&apos;abord</strong>, débat ensuite — jamais d&apos;ultimatum, jamais
                de clash frontal.
              </>,
              <>
                <strong>Documentez tout</strong> : faits, dates, montants, messages. Le flou
                émotionnel est l&apos;allié de l&apos;emprise.
              </>,
              <>
                <strong>Mesurez les risques</strong> : enfants, soins, violences, finances.
                Certains signaux imposent une alerte immédiate (15 / 17 / 119 / 3114).
              </>,
              <>
                <strong>Ne restez pas seul·e</strong>. Trois portes fiables : UNADFI, CCMM,
                MIVILUDES. France Victimes pour la dimension juridique.
              </>,
              <>
                <strong>Préparez la sortie</strong> : logement, finances, suivi psy formé,
                reconstruction du tissu social. La phase de sortie est plus dure que l&apos;entrée.
              </>,
            ]}
            sources={SOURCES.map((s) => ({ ...s }))}
          />

          {/* FAQ */}
          <section id="faq" className="mt-12 scroll-mt-24">
            <div className="mb-6">
              <Tag tone="info" size="sm">FAQ</Tag>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl">
                Questions fréquentes des proches
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
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{q.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA contact */}
          <section className="mt-12">
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30 bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-surface-1)]/50 to-transparent p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[var(--color-text)]">
                    Vous voulez en parler ?
                  </h2>
                  <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
                    Le formulaire de contact accepte les envois <strong>anonymes</strong>. On lit
                    tout, on répond sous 48–72&nbsp;h.
                  </p>
                </div>
                <Button href="/contact" variant="primary" size="md">
                  Nous contacter
                </Button>
              </div>
            </div>
          </section>

          {/* EmergencyBox finale (variant compact) */}
          <div className="mt-10">
            <EmergencyBox variant="full" />
          </div>

          <footer className="mt-10 border-t border-[var(--color-border)] pt-6 text-xs leading-6 text-[var(--color-text-subtle)]">
            <p>
              Cette page est une reformulation pédagogique inspirée de repères publics. Contenu
              rédigé avec assistance IA, relu par la rédaction Crise Conscience. Pour un cas
              individuel, contactez les associations spécialisées listées ci-dessus.
            </p>
            <div className="mt-3">
              <Link
                href="/blog/signaux-emprise"
                className="text-[var(--color-accent)] hover:underline"
              >
                ← Lire aussi : 17 signaux d&apos;emprise (MIVILUDES)
              </Link>
            </div>
          </footer>
        </div>
      </Container>
    </>
  );
}
