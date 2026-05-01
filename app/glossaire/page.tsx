import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import { JsonLd } from "@/app/components/JsonLd";
import Tag from "@/app/components/ui/Tag";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import EmergencyBox from "@/app/components/EmergencyBox";
import { breadcrumbSchema, getSiteBase } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Glossaire des dérives sectaires — définitions claires et sourcées",
  description:
    "Définitions des termes clés sur les dérives sectaires : emprise, sujétion, ostracisme, BITE model, faisceau d'indices, manipulation mentale, déconversion. Sources MIVILUDES, Code pénal, recherche académique.",
  alternates: { canonical: "/glossaire" },
  openGraph: {
    type: "website",
    url: "/glossaire",
    title: "Glossaire des dérives sectaires — Crise Conscience",
    description:
      "Termes clés expliqués clairement : emprise, sujétion, ostracisme, BITE model, manipulation mentale… Avec sources institutionnelles.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glossaire des dérives sectaires",
    description:
      "Définitions sourcées : emprise, sujétion, ostracisme, BITE model, manipulation mentale.",
  },
};

type Term = {
  slug: string;
  term: string;
  short: string; // 1 phrase auto-portante (citable)
  long: string;
  source?: { label: string; href: string };
  related?: string[]; // slugs
};

// Ordre alphabétique pour la page (le tri sera appliqué au rendu).
const TERMS: Term[] = [
  {
    slug: "abus-de-faiblesse",
    term: "Abus de faiblesse",
    short:
      "Délit pénal français qui sanctionne l'exploitation d'une personne en état de sujétion psychologique ou physique pour la conduire à un acte gravement préjudiciable.",
    long:
      "Article 223-15-2 du Code pénal. Spécifiquement renforcé par la loi About-Picard de 2001 pour viser les dérives sectaires : il sanctionne l'exploitation frauduleuse de l'état de sujétion psychologique ou physique d'une personne. Peines pouvant aller jusqu'à 3 ans d'emprisonnement et 375 000 € d'amende, aggravées en bande organisée.",
    source: {
      label: "Légifrance — article 223-15-2 du Code pénal",
      href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037289588/",
    },
    related: ["emprise", "sujetion"],
  },
  {
    slug: "bite-model",
    term: "BITE model",
    short:
      "Modèle d'analyse de l'emprise mentale développé par Steven Hassan, structuré en quatre axes : Behavior, Information, Thoughts, Emotion.",
    long:
      "Cadre proposé par Steven Hassan dans son ouvrage Combating Cult Mind Control (1988). Le modèle BITE inventorie les techniques de contrôle exercées par un groupe ou un individu sur ses adeptes selon quatre dimensions : contrôle du Comportement (emploi du temps, finances, habitudes), de l'Information (filtrage, dissimulation, dénigrement des sources extérieures), de la Pensée (langage interne, arrêt de l'esprit critique, doctrine totalisante) et des Émotions (culpabilité, peur, ostracisme). Outil utilisé en thérapie post-emprise.",
    related: ["emprise", "manipulation-mentale", "ostracisme"],
  },
  {
    slug: "deconversion",
    term: "Déconversion",
    short:
      "Processus par lequel une personne quitte progressivement un système de croyances ou un groupe sectaire et reconstruit son identité.",
    long:
      "La déconversion n'est ni un événement unique ni une décision prise une fois pour toutes. C'est un processus en plusieurs phases : doute, dissociation cognitive, retrait progressif, sortie effective, reconstruction. La phase de sortie est souvent plus difficile que l'entrée — elle implique un deuil de la communauté, la peur de l'ostracisme, et la reconstruction d'un cadre de référence.",
    related: ["ostracisme", "se-reconstruire", "sujetion"],
  },
  {
    slug: "derive-sectaire",
    term: "Dérive sectaire",
    short:
      "En droit français, atteinte aux personnes ou à la cohésion sociale résultant de l'usage de pressions ou techniques visant à placer une personne en état de sujétion.",
    long:
      "Définition opérationnelle de la MIVILUDES : « action visant à abuser de la fragilité d'une personne ou à la manipuler à son insu, par le biais d'une situation d'emprise psychologique ». Le droit français vise les comportements et les dommages — pas les croyances individuelles. C'est le faisceau d'indices (multiplicité et durée des signaux) qui qualifie une dérive, pas un signe isolé.",
    source: {
      label: "MIVILUDES — Comprendre la dérive sectaire",
      href: "https://www.miviludes.interieur.gouv.fr/comprendre-prevenir-et-lutter/comment-identifier-derive-sectaire",
    },
    related: ["emprise", "faisceau-indices", "miviludes"],
  },
  {
    slug: "emprise",
    term: "Emprise",
    short:
      "Domination psychologique progressive d'une personne ou d'un groupe sur un individu, qui réduit son libre arbitre et l'enferme dans une dépendance.",
    long:
      "L'emprise n'est jamais immédiate — elle progresse par paliers : séduction et valorisation initiale, dépendance affective et endoctrinement, isolement et contrôle. Elle exploite des besoins légitimes (sens, appartenance, reconnaissance) et les retourne contre la personne. Elle se reconnaît au faisceau d'indices, pas à un signe unique. Sortir d'une emprise est un processus long.",
    source: {
      label: "MIVILUDES — Critères d'identification",
      href: "https://www.miviludes.interieur.gouv.fr/comprendre-prevenir-et-lutter/comment-identifier-derive-sectaire",
    },
    related: ["sujetion", "manipulation-mentale", "bite-model"],
  },
  {
    slug: "faisceau-indices",
    term: "Faisceau d'indices",
    short:
      "Méthode d'analyse qui qualifie une dérive sectaire par la convergence et la durée de plusieurs signaux, et non par un critère isolé.",
    long:
      "Principe central de l'approche MIVILUDES. Aucun signal pris isolément ne suffit à caractériser une dérive sectaire — c'est l'accumulation cohérente, dans le temps, de plusieurs signaux observables (isolement, contrôle financier, rupture de soins, embrigadement des enfants, etc.) qui fait basculer une situation. Cette méthode protège des qualifications hâtives et permet une analyse documentée.",
    related: ["derive-sectaire", "miviludes", "emprise"],
  },
  {
    slug: "gourou",
    term: "Gourou",
    short:
      "Figure charismatique exerçant une autorité totale et exclusive sur un groupe, présentée comme dépositaire d'une vérité ou d'un pouvoir uniques.",
    long:
      "Le gourou tire son autorité d'un récit fondateur (révélation, élection spirituelle, savoir caché) qui ne peut pas être discuté. Il concentre les décisions, contrôle l'information interne, et organise généralement la culpabilité ou la peur autour de la remise en cause de sa parole. Sa figure est un signal MIVILUDES (« groupe autoritaire et opaque »).",
    related: ["groupe-ferme", "manipulation-mentale"],
  },
  {
    slug: "groupe-ferme",
    term: "Groupe fermé / opaque",
    short:
      "Groupe dont les règles internes, la doctrine ou le fonctionnement sont délibérément cachés aux membres extérieurs ou aux nouveaux entrants.",
    long:
      "L'opacité est un signal d'alerte MIVILUDES. Elle peut prendre plusieurs formes : doctrines révélées par paliers, règles tacites, hiérarchie non documentée, gestion financière non transparente. Elle sert deux objectifs simultanés : verrouiller l'engagement progressif (« on ne peut pas savoir avant d'être dedans ») et empêcher la critique extérieure.",
    related: ["gourou", "miviludes", "recrutement-trompeur"],
  },
  {
    slug: "manipulation-mentale",
    term: "Manipulation mentale",
    short:
      "Ensemble de techniques visant à influencer les décisions, croyances et comportements d'une personne en réduisant sa pensée critique.",
    long:
      "Recouvre des techniques documentées en psychologie sociale : pied dans la porte, dissonance cognitive entretenue, isolement informationnel, charge émotionnelle, langage interne. Différente de l'influence ordinaire par son caractère systématique, sa volonté de réduire l'autonomie de la personne et la durée d'exposition. Le terme juridique français correspondant est « abus frauduleux de l'état de sujétion ».",
    related: ["bite-model", "emprise", "abus-de-faiblesse"],
  },
  {
    slug: "miviludes",
    term: "MIVILUDES",
    short:
      "Mission interministérielle de vigilance et de lutte contre les dérives sectaires, rattachée au ministère de l'Intérieur.",
    long:
      "Créée en 2002, la MIVILUDES observe les dérives sectaires, conseille les pouvoirs publics, accueille les signalements et publie des repères pédagogiques. Elle ne combat pas les religions : son périmètre est strictement celui des comportements et des dommages observables. Son secrétariat reçoit les signalements de particuliers (anonymat possible).",
    source: {
      label: "Site officiel de la MIVILUDES",
      href: "https://www.miviludes.interieur.gouv.fr/",
    },
    related: ["derive-sectaire", "faisceau-indices", "signalement"],
  },
  {
    slug: "ostracisme",
    term: "Ostracisme",
    short:
      "Exclusion organisée d'une personne par son groupe d'appartenance, utilisée comme outil de pression ou de sanction.",
    long:
      "L'ostracisme prend des formes très concrètes : rupture de tous les liens (famille, amis, conjoint·e) avec celui ou celle qui quitte le groupe, blacklisting professionnel dans certains milieux, silence collectif. Il est l'un des principaux freins à la sortie d'une emprise, car la personne sortante perd simultanément sa communauté, ses repères et parfois son cadre matériel.",
    related: ["sujetion", "deconversion", "groupe-ferme"],
  },
  {
    slug: "recrutement-trompeur",
    term: "Recrutement trompeur",
    short:
      "Technique consistant à dissimuler les véritables objectifs ou la nature d'un groupe lors du premier contact pour faciliter l'engagement.",
    long:
      "Forme typique : ateliers de bien-être ou conférences à thème neutre qui servent de porte d'entrée à un système de croyances ou à un mouvement structuré. Promesses miracles (guérison, réussite, équilibre), techniques du « pied-dans-la-porte », identité réelle du groupe révélée tardivement — autant de signaux MIVILUDES.",
    related: ["miviludes", "groupe-ferme", "manipulation-mentale"],
  },
  {
    slug: "se-reconstruire",
    term: "Reconstruction post-emprise",
    short:
      "Processus thérapeutique et social pour retrouver autonomie, repères et liens après une sortie de groupe sectaire.",
    long:
      "La reconstruction porte sur plusieurs plans simultanés : psychologique (traumas, syndrome post-cultiste, reconstruction du sens), social (nouveau tissu relationnel, parfois rupture avec la famille restée dans le groupe), matériel (logement, emploi, finances), juridique (récupération de fonds, dépôt de plainte si délits). Un suivi par un·e thérapeute formé·e aux mécanismes d'emprise est recommandé.",
    related: ["deconversion", "ostracisme"],
  },
  {
    slug: "signalement",
    term: "Signalement",
    short:
      "Démarche par laquelle un particulier ou un professionnel transmet à la MIVILUDES, à la police ou aux services sociaux des faits évocateurs de dérive sectaire.",
    long:
      "Le signalement n'est pas une dénonciation pénale ni un acte définitif. Il alimente une veille publique et peut, par convergence avec d'autres signalements, déclencher une enquête. Il est confidentiel. La MIVILUDES, le 119 (enfance en danger), le procureur de la République ou la gendarmerie peuvent en être destinataires selon la nature des faits.",
    source: {
      label: "MIVILUDES — Signaler une dérive sectaire",
      href: "https://www.miviludes.interieur.gouv.fr/",
    },
    related: ["miviludes", "abus-de-faiblesse"],
  },
  {
    slug: "sortie-spirituelle",
    term: "Sortie spirituelle (sortie d'un groupe)",
    short:
      "Étape de quitter physiquement et symboliquement un groupe d'emprise, avec ou sans rupture publique.",
    long:
      "Distincte de la déconversion (qui désigne le processus complet), la sortie est l'événement (ou la séquence d'événements) où la personne cesse les pratiques, coupe les liens organisationnels, ou s'autoexclut. Elle peut être discrète (« silent exit ») ou marquée (déclaration publique, plainte). La sortie réussie demande presque toujours un filet préparé en amont.",
    related: ["deconversion", "ostracisme", "se-reconstruire"],
  },
  {
    slug: "sujetion",
    term: "Sujétion psychologique",
    short:
      "État caractérisé d'une personne sous emprise dont le libre arbitre est altéré, juridiquement reconnu en droit français.",
    long:
      "L'« état de sujétion psychologique ou physique » est un élément constitutif du délit d'abus frauduleux de l'état de faiblesse (article 223-15-2 du Code pénal). Il se caractérise médicalement et juridiquement par une altération profonde du jugement, une dépendance affective ou cognitive, et une réduction du libre arbitre. Sa caractérisation requiert généralement une expertise.",
    source: {
      label: "Légifrance — article 223-15-2",
      href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037289588/",
    },
    related: ["emprise", "abus-de-faiblesse"],
  },
  {
    slug: "syndrome-post-cultiste",
    term: "Syndrome post-cultiste",
    short:
      "Ensemble de symptômes psychologiques observés chez des personnes ayant quitté un groupe d'emprise (anxiété, troubles dissociatifs, perte de repères).",
    long:
      "Décrit notamment par Margaret Singer (Cults in our midst, 1995) et discuté en psychiatrie sociale. Symptômes courants : flashbacks, anxiété diffuse, troubles du sommeil, sentiment de vide identitaire, difficultés à prendre des décisions, peur de la sphère publique. L'accompagnement par un·e thérapeute formé·e à ces mécanismes améliore significativement la trajectoire de reconstruction.",
    related: ["deconversion", "se-reconstruire"],
  },
];

const TERMS_SORTED = [...TERMS].sort((a, b) =>
  a.term.localeCompare(b.term, "fr", { sensitivity: "base" }),
);

// Index alphabétique des lettres présentes
const LETTERS = Array.from(
  new Set(
    TERMS_SORTED.map((t) => t.term.charAt(0).toUpperCase()).filter((c) => /[A-Z]/.test(c)),
  ),
);

export default function GlossairePage() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/glossaire`;

  // DefinedTermSet — schema explicite pour citation IA
  const definedTermSetJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${pageUrl}#glossary`,
    name: "Glossaire des dérives sectaires",
    description:
      "Termes clés sur les dérives sectaires, les mécanismes d'emprise et le cadre juridique français, avec définitions sourcées.",
    inLanguage: "fr-FR",
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
    { name: "Accueil", url: `${siteBase}/` },
    { name: "Comprendre", url: `${siteBase}/blog/signaux-emprise` },
    { name: "Glossaire", url: pageUrl },
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
              { label: "Accueil", href: "/" },
              { label: "Comprendre", href: "/blog/signaux-emprise" },
              { label: "Glossaire" },
            ]}
          />

          {/* Hero */}
          <header className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="info" size="sm">Glossaire</Tag>
              <Tag tone="neutral" size="sm">{TERMS.length} termes · sourcés</Tag>
            </div>
            <h1 className="mt-5 font-display text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] md:text-4xl lg:text-5xl">
              Glossaire des{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
                dérives sectaires
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              Termes clés expliqués clairement, avec leurs sources institutionnelles ou
              académiques. Chaque définition est citable individuellement (ancres permanentes).
            </p>
          </header>

          {/* Index alphabétique */}
          <nav
            aria-label="Index alphabétique"
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

          {/* Termes */}
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
                      aria-label={`Lien permanent vers ${t.term}`}
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

                  {/* Définition courte (citable) */}
                  <p className="mt-3 border-l-2 border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)]/40 px-4 py-2 text-base leading-relaxed text-[var(--color-text)]">
                    <strong className="text-[var(--color-accent)]">Définition&nbsp;:</strong>{" "}
                    {t.short}
                  </p>

                  {/* Définition longue */}
                  <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{t.long}</p>

                  {/* Source */}
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

                  {/* Voir aussi */}
                  {t.related && t.related.length > 0 ? (
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                      <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
                        Voir aussi
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

          {/* Pied : urgences + CTA */}
          <div className="mt-12 space-y-6">
            <EmergencyBox variant="banner" />

            <div className="rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30 bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-surface-1)]/50 to-transparent p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[var(--color-text)]">
                    Un terme manque, une définition mérite d&apos;être précisée&nbsp;?
                  </h2>
                  <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
                    Le glossaire évolue avec la veille. Écrivez-nous, on intègre vos retours.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-black transition-colors duration-[var(--motion-fast)] hover:bg-[var(--color-accent-hover)]"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>

          <footer className="mt-10 border-t border-[var(--color-border)] pt-6 text-xs leading-6 text-[var(--color-text-subtle)]">
            <p>
              Glossaire produit avec assistance IA, relu par la rédaction Crise Conscience.
              Sources : MIVILUDES, Code pénal français (Légifrance), travaux académiques de Steven
              Hassan, Robert Lifton, Margaret Singer. Dernière mise à jour&nbsp;: 1<sup>er</sup> mai 2026.
            </p>
          </footer>
        </div>
      </Container>
    </>
  );
}
