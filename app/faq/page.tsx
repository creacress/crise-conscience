import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import { JsonLd } from "@/app/components/JsonLd";
import Tag from "@/app/components/ui/Tag";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import EmergencyBox from "@/app/components/EmergencyBox";
import { breadcrumbSchema, faqSchema, getSiteBase } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ — Toutes les questions sur les dérives sectaires",
  description:
    "Questions fréquentes sur les dérives sectaires : reconnaître l'emprise, aider un proche, sortir d'un groupe, se reconstruire, signaler. Réponses sourcées MIVILUDES, UNADFI, Code pénal.",
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "website",
    url: "/faq",
    title: "FAQ — dérives sectaires, emprise, sortie",
    description:
      "Reconnaître, agir, sortir, se reconstruire, signaler. Réponses sourcées institutionnelles.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — dérives sectaires",
    description: "Questions fréquentes avec réponses sourcées.",
  },
};

type Section = {
  id: string;
  title: string;
  intent: string;
  tag: "neutral" | "info" | "calm" | "alert" | "accent";
  items: { id: string; question: string; answer: string }[];
};

const SECTIONS: Section[] = [
  {
    id: "reconnaitre",
    title: "Reconnaître",
    intent: "Repérer les signaux, comprendre les mécanismes, lever le doute.",
    tag: "info",
    items: [
      {
        id: "qu-est-ce-qu-une-derive-sectaire",
        question: "Qu'est-ce qu'une dérive sectaire ?",
        answer:
          "Une dérive sectaire est l'usage de pressions ou de techniques visant à placer une personne en état de sujétion psychologique ou physique, en réduisant son libre arbitre. Le droit français (MIVILUDES) vise les comportements et les dommages observables — jamais les croyances individuelles. Un seul signal ne suffit pas : c'est la convergence et la durée de plusieurs signaux qui qualifient une dérive.",
      },
      {
        id: "secte-vs-derive-sectaire",
        question: "Quelle différence entre « secte » et « dérive sectaire » ?",
        answer:
          "Le mot « secte » n'a pas de définition juridique en France. La loi qualifie les comportements (abus de faiblesse, exercice illégal de la médecine, etc.), pas les organisations en tant que telles. Le terme « dérive sectaire » est privilégié par les institutions (MIVILUDES, UNADFI) car il pointe les pratiques problématiques sans étiqueter un groupe entier ni viser une religion.",
      },
      {
        id: "signaux-d-emprise",
        question: "Quels sont les principaux signaux d'emprise ?",
        answer:
          "Cinq signaux convergents doivent alerter : isolement progressif (rupture avec les proches), contrôle de l'information (sources extérieures décrédibilisées), culpabilisation et ostracisme, exigences financières croissantes, changement radical de comportement et de langage. La MIVILUDES publie une grille de 17 critères inspirant notre dossier complet.",
      },
      {
        id: "test-emprise-fiable",
        question: "Un test en ligne est-il fiable pour confirmer une emprise ?",
        answer:
          "Aucun test en ligne ne pose de diagnostic. Notre outil pédagogique (basé sur le modèle BITE) aide à structurer la réflexion mais ne remplace pas l'avis d'un·e professionnel·le formé·e aux mécanismes d'emprise. Un score élevé est un motif de consultation, pas une certitude.",
      },
      {
        id: "doute-mais-pas-sur",
        question: "J'ai un doute sur un proche mais je ne suis pas sûr·e. Que faire ?",
        answer:
          "Notez par écrit, dans l'ordre chronologique, les changements observables (relations, finances, langage, sommeil, soins, vie sociale). Cette documentation sortira du flou émotionnel et servira aux professionnels que vous contacterez. Demandez un échange à l'UNADFI ou au CCMM — ils écoutent les proches sans engagement.",
      },
    ],
  },
  {
    id: "agir",
    title: "Agir",
    intent: "Que dire, que faire, qui contacter sans précipiter la rupture.",
    tag: "accent",
    items: [
      {
        id: "comment-parler-a-un-proche",
        question: "Comment parler à un proche sans le braquer ?",
        answer:
          "Évitez le clash frontal (« tu es dans une secte »), qui renforce systématiquement l'emprise. Privilégiez un lien régulier et neutre (SMS courts, présences aux événements familiaux), des questions ouvertes sur les faits (« comment vas-tu vraiment ? »), et la patience. Le but : préserver la porte de sortie.",
      },
      {
        id: "que-documenter",
        question: "Que faut-il documenter et comment ?",
        answer:
          "Datez chaque fait observable : changements de comportement, montants versés (dons, formations, retraites), durées d'absence imposées, messages reçus du groupe, restrictions alimentaires ou de soins, rupture de scolarité pour les enfants. Conservez captures, relevés, courriers. Cette traçabilité servira pour le signalement et l'éventuelle action en justice.",
      },
      {
        id: "signaler-a-la-miviludes",
        question: "Comment signaler une dérive sectaire à la MIVILUDES ?",
        answer:
          "Le signalement se fait via le formulaire en ligne sur miviludes.interieur.gouv.fr. Il est confidentiel, ce n'est pas une dénonciation pénale ni un acte définitif. Plusieurs signalements convergents peuvent déclencher une enquête. Pour un mineur en danger immédiat : 119. Pour des faits pénaux (violences, abus) : 17 ou directement le procureur.",
      },
      {
        id: "ultimatums-couper-les-liens",
        question: "Faut-il couper les liens si la personne refuse de partir ?",
        answer:
          "Non. Couper les liens, c'est rejouer la logique du groupe (ostracisme) et fermer la dernière porte de sortie. Maintenez un canal minimal, sans céder aux exigences du groupe (ne pas financer, ne pas valider la doctrine). C'est exigeant mais c'est ce qui préserve la possibilité d'une sortie future.",
      },
      {
        id: "danger-immediat",
        question: "Quand passer aux services d'urgence ?",
        answer:
          "Sans hésiter quand : un mineur est en risque (119), une personne est en détresse psychologique avec idéation suicidaire (3114), il y a des violences ou abus (17, 3919 pour les violences faites aux femmes), un soin médical est refusé alors qu'il est vital (15). Le choix n'est plus celui du dialogue : c'est la sécurité immédiate.",
      },
    ],
  },
  {
    id: "sortir",
    title: "Sortir",
    intent: "Préparer une sortie sans précipitation, avec un filet de sécurité.",
    tag: "calm",
    items: [
      {
        id: "preparer-sortie",
        question: "Comment se prépare une sortie de groupe sectaire ?",
        answer:
          "Une sortie réussie demande un filet : logement de transition (proches, association, hébergement social), soutien financier court terme, suivi psychologique avec un·e thérapeute formé·e à l'emprise, reconstruction progressive du tissu social, anticipation de l'ostracisme du groupe. La précipitation conduit fréquemment à un retour. Comptez plusieurs semaines à plusieurs mois de préparation.",
      },
      {
        id: "duree-emprise",
        question: "Combien de temps faut-il pour sortir d'une emprise ?",
        answer:
          "Il n'y a pas de durée standard. Certaines sorties prennent quelques mois, d'autres plusieurs années. Ce qui compte n'est pas la rapidité mais la solidité du filet (psychologique, social, matériel). Une sortie précipitée sans accompagnement augmente fortement le risque de retour ou de basculement vers un autre groupe.",
      },
      {
        id: "peur-de-quitter",
        question: "J'ai peur de quitter mais je veux partir. Par où commencer ?",
        answer:
          "Contactez l'UNADFI ou le CCMM en parlant comme « personne en réflexion », pas comme « victime » — ils sont habitués et discrets. Identifiez 1 ou 2 proches de confiance hors du groupe et reprenez contact, même par message court. Notez vos doutes par écrit pour vous-même. Ce premier maillage est le début du filet.",
      },
      {
        id: "interner-mon-proche",
        question: "Puis-je faire interner un proche pour le sortir d'une secte ?",
        answer:
          "Non. L'hospitalisation sous contrainte est encadrée par la loi et réservée à des situations psychiatriques précises (péril imminent, soins nécessaires sans consentement éclairé). Elle relève d'un médecin et d'une procédure spécifique, ce n'est pas un outil pour « sortir » quelqu'un d'un groupe. En cas de doute sur l'état psychiatrique : 15 (SAMU) ou un psychiatre.",
      },
    ],
  },
  {
    id: "reconstruire",
    title: "Se reconstruire",
    intent: "Après la sortie : santé mentale, social, matériel, juridique.",
    tag: "info",
    items: [
      {
        id: "therapie-post-emprise",
        question: "Faut-il un·e thérapeute spécialisé·e post-emprise ?",
        answer:
          "C'est fortement recommandé. Les mécanismes d'emprise laissent des traces (syndrome post-cultiste, anxiété, troubles dissociatifs) qui se travaillent avec un·e professionnel·le formé·e — un·e psychologue généraliste sans cette formation peut passer à côté. UNADFI, CCMM et certains CMP ont des listes d'orientation.",
      },
      {
        id: "duree-reconstruction",
        question: "Combien de temps dure la reconstruction ?",
        answer:
          "La reconstruction est un processus long (1 à 5 ans pour les phases majeures, parfois plus pour la dimension identitaire). Elle se fait sur plusieurs plans en parallèle : psychologique, social (refaire un cercle hors du groupe), matériel (logement, emploi, finances), parfois juridique. Ce n'est pas une ligne droite, des phases de doute ou de regret du groupe sont normales.",
      },
      {
        id: "famille-encore-dans-le-groupe",
        question: "Ma famille est encore dans le groupe — comment gérer ?",
        answer:
          "C'est l'une des situations les plus douloureuses post-sortie. Le groupe peut imposer un ostracisme strict (rupture totale). Stratégie : ne pas couper de votre côté, laisser un canal minimal ouvert (anniversaires, événements de vie), accepter que le rythme leur appartienne. Un suivi psy spécialisé aide à gérer le deuil et la culpabilité.",
      },
      {
        id: "recuperer-de-l-argent",
        question: "Puis-je récupérer l'argent versé au groupe ?",
        answer:
          "Parfois, oui — selon la qualification juridique des faits (abus de faiblesse, escroquerie, exercice illégal de la médecine) et les preuves disponibles. Étape 1 : conserver toute la documentation (relevés, courriers, contrats, témoignages). Étape 2 : avocat·e (aide juridictionnelle possible) ou France Victimes. La prescription pénale court à partir du dernier acte ou de la cessation de la sujétion.",
      },
    ],
  },
  {
    id: "association",
    title: "L'association",
    intent: "Méthode éditoriale, partenariats, soutien financier.",
    tag: "neutral",
    items: [
      {
        id: "qui-redige-les-articles",
        question: "Qui rédige les contenus de Crise Conscience ?",
        answer:
          "Nos analyses longues sont rédigées avec assistance d'IA (~70 % du brouillon initial), puis relues, vérifiées et complétées par la rédaction humaine (~30 %). Nous l'assumons publiquement : la transparence sur la méthode est un signal de cohérence pour une association qui parle d'influence et d'emprise.",
      },
      {
        id: "lien-unadfi",
        question: "Quel est le lien entre Crise Conscience et l'UNADFI ?",
        answer:
          "Crise Conscience est partenaire de l'UNADFI (Union Nationale des Associations de Défense des Familles et de l'Individu victimes de sectes). Ce partenariat garantit un cadre éthique, juridique et méthodologique éprouvé. Nous n'agissons pas en nom propre sur les cas individuels — nous orientons systématiquement vers l'UNADFI ou les associations équivalentes.",
      },
      {
        id: "ecrire-anonymement",
        question: "Puis-je vous écrire de manière anonyme ?",
        answer:
          "Oui. Le formulaire de contact accepte les envois anonymes (champs nom et email facultatifs). Aucun témoignage n'est diffusé sans consentement écrit explicite. Aucune donnée n'est revendue ni partagée à des tiers commerciaux.",
      },
      {
        id: "service-d-urgence",
        question: "Crise Conscience est-il un service d'urgence ?",
        answer:
          "Non. Nous ne traitons pas les urgences. En cas de danger immédiat : 15 (SAMU), 17 (police), 18 (pompiers), 112 (urgences européennes), 119 (enfance en danger), 3114 (prévention suicide), 3919 (violences faites aux femmes).",
      },
      {
        id: "don-deductible",
        question: "Mon don est-il déductible des impôts ?",
        answer:
          "La déductibilité fiscale (66 % du don pour les particuliers, dans la limite de 20 % du revenu imposable — article 200 du Code général des impôts) suppose que l'association soit reconnue d'intérêt général ou d'utilité publique. Le statut fiscal de Crise Conscience est en cours d'instruction — nous communiquerons dès que la reconnaissance sera effective.",
      },
    ],
  },
];

export default function FAQPage() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/faq`;

  // Aplatissement pour FAQPage schema (recommandé : toutes les Q/R d'un coup,
  // les LLMs et Google AI Overviews préfèrent une seule entité).
  const allFaq = SECTIONS.flatMap((s) => s.items);
  const faqJsonLd = faqSchema(allFaq.map((q) => ({ question: q.question, answer: q.answer })));

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Accueil", url: `${siteBase}/` },
    { name: "FAQ", url: pageUrl },
  ]);

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <Container>
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Accueil", href: "/" },
              { label: "FAQ" },
            ]}
          />

          {/* Hero */}
          <header className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="info" size="sm">FAQ</Tag>
              <Tag tone="neutral" size="sm">{allFaq.length} questions · sourcées</Tag>
            </div>
            <h1 className="mt-5 font-display text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] md:text-4xl lg:text-5xl">
              Toutes les questions sur les{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
                dérives sectaires
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              Cinq sections par intention&nbsp;: <strong className="text-[var(--color-text)]">reconnaître</strong>,{" "}
              <strong className="text-[var(--color-text)]">agir</strong>,{" "}
              <strong className="text-[var(--color-text)]">sortir</strong>,{" "}
              <strong className="text-[var(--color-text)]">se reconstruire</strong>, et l&apos;
              <strong className="text-[var(--color-text)]">association</strong>. Chaque réponse est citable
              individuellement (ancres permanentes).
            </p>
          </header>

          {/* Index sticky des sections */}
          <nav
            aria-label="Aller à une section"
            className="sticky top-[5.5rem] z-10 mb-10 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/95 p-3 backdrop-blur-sm"
          >
            <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
              Aller à
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-muted)] transition-colors duration-[var(--motion-fast)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                  >
                    {s.title}
                    <span className="text-[var(--color-text-subtle)]">({s.items.length})</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sections */}
          <div className="space-y-12">
            {SECTIONS.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                className="scroll-mt-24"
              >
                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <Tag tone={section.tag} size="sm">
                      {section.title}
                    </Tag>
                    <h2
                      id={`${section.id}-title`}
                      className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl"
                    >
                      {section.title}
                    </h2>
                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">{section.intent}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {section.items.map((q) => (
                    <details
                      key={q.id}
                      id={q.id}
                      className="group scroll-mt-24 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5 open:bg-[var(--color-surface-2)]/70"
                    >
                      <summary className="flex cursor-pointer items-start gap-3 text-base font-semibold text-[var(--color-text)] marker:hidden">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-transform duration-[var(--motion-fast)] group-open:rotate-90"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="h-3.5 w-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </span>
                        <span className="flex-1">{q.question}</span>
                        <a
                          href={`#${q.id}`}
                          className="ml-2 hidden rounded-[var(--radius-sm)] px-2 py-1 text-xs font-medium text-[var(--color-text-subtle)] transition-colors duration-[var(--motion-fast)] hover:text-[var(--color-accent)] sm:inline-flex"
                          aria-label="Lien permanent vers cette question"
                        >
                          #
                        </a>
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

          {/* CTA + urgences */}
          <div className="mt-12 space-y-6">
            <EmergencyBox variant="banner" />

            <div className="rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30 bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-surface-1)]/50 to-transparent p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[var(--color-text)]">
                    Une autre question&nbsp;?
                  </h2>
                  <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
                    Le formulaire accepte les envois anonymes. Si la question revient, on
                    l&apos;ajoute à cette FAQ.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-black transition-colors duration-[var(--motion-fast)] hover:bg-[var(--color-accent-hover)]"
                >
                  Poser ma question
                </Link>
              </div>
            </div>
          </div>

          <footer className="mt-10 border-t border-[var(--color-border)] pt-6 text-xs leading-6 text-[var(--color-text-subtle)]">
            <p>
              FAQ produite avec assistance IA, relue par la rédaction Crise Conscience. Sources&nbsp;:
              MIVILUDES, UNADFI, CCMM, France Victimes, Code pénal français (Légifrance), travaux
              de Steven Hassan et Margaret Singer. Mise à jour&nbsp;: 1<sup>er</sup> mai 2026.
            </p>
          </footer>
        </div>
      </Container>
    </>
  );
}
