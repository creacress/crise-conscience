import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import { JsonLd } from "@/app/components/JsonLd";
import EmergencyBox from "@/app/components/EmergencyBox";
import Tag from "@/app/components/ui/Tag";
import Button from "@/app/components/ui/Button";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import { breadcrumbSchema, getSiteBase, organizationRef } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Témoignages — Sortir d'une emprise sectaire",
  description:
    "Recueil de témoignages anonymisés de personnes ayant quitté un groupe sectaire. Récits de sortie, reconstruction et reprise d'autonomie. Témoignages opt-in, vous gardez le contrôle.",
  alternates: { canonical: "/temoignages" },
  openGraph: {
    type: "website",
    url: "/temoignages",
    title: "Témoignages — sortir d'une emprise sectaire",
    description:
      "Récits de sortie et de reconstruction, anonymisés et avec consentement explicite.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Témoignages — sortir d'une emprise",
    description: "Récits de sortie et de reconstruction.",
  },
};

type Testimony = {
  id: string;
  pseudo: string; // initiale ou prénom modifié
  age?: string; // tranche d'âge à la sortie
  duree: string; // années dans le groupe
  excerpt: string;
  full?: string;
  publishedAt: string;
};

// Note : les témoignages réels seront ajoutés via une procédure d'opt-in
// (voir /contact). Pour l'instant, des témoignages-types pédagogiques basés
// sur des trames récurrentes documentées par UNADFI/CCMM.
const TESTIMONIES: Testimony[] = []; // sera peuplé au fur et à mesure

const TYPICAL_PATTERNS = [
  {
    title: "Le doute déclenché par un proche",
    desc: "« Ma sœur a tenu pendant 3 ans sans jamais me faire la leçon. Un jour je l'ai appelée, juste pour parler. C'est ce qui a tout déclenché. »",
    insight: "Le lien préservé est la première porte de sortie. Pas la confrontation.",
  },
  {
    title: "La rupture de soin qui change tout",
    desc: "« On nous demandait de refuser un traitement. Quand mon enfant est tombé malade, j'ai compris que je ne pouvais plus suivre. »",
    insight: "Les enfants ou la santé déclenchent souvent la première dissonance assumée.",
  },
  {
    title: "Le décalage financier",
    desc: "« J'ai compté ce que j'avais versé en 5 ans. J'ai pleuré. C'était mon héritage. »",
    insight: "Documenter les montants est souvent le premier acte concret d'une sortie.",
  },
  {
    title: "L'ostracisme post-sortie",
    desc: "« Le jour où je suis parti, plus personne ne m'a parlé. Comme si je n'avais jamais existé. »",
    insight: "L'ostracisme est presque systématique. C'est le coût initial de la sortie, pas un échec.",
  },
] as const;

export default function TemoignagesPage() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/temoignages`;

  // CollectionPage avec hasPart Testimonial (CreativeWork)
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: "Témoignages — Sortir d'une emprise sectaire",
    description:
      "Recueil de témoignages anonymisés de personnes ayant quitté un groupe sectaire. Opt-in explicite, anonymat garanti.",
    url: pageUrl,
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${siteBase}/#website` },
    publisher: organizationRef(siteBase),
    hasPart: TESTIMONIES.map((t) => ({
      "@type": "CreativeWork",
      "@id": `${pageUrl}#${t.id}`,
      name: `Témoignage de ${t.pseudo}`,
      author: { "@type": "Person", name: t.pseudo },
      datePublished: t.publishedAt,
      genre: "testimony",
      inLanguage: "fr-FR",
      isAccessibleForFree: true,
    })),
  };

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Accueil", url: `${siteBase}/` },
    { name: "Se reconstruire", url: `${siteBase}/se-reconstruire` },
    { name: "Témoignages", url: pageUrl },
  ]);

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <Container>
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Accueil", href: "/" },
              { label: "Se reconstruire", href: "/se-reconstruire" },
              { label: "Témoignages" },
            ]}
          />

          {/* Hero */}
          <header className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="info" size="sm">Recueil</Tag>
              <Tag tone="calm" size="sm">100% anonyme · opt-in explicite</Tag>
            </div>
            <h1 className="mt-5 font-display text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] md:text-4xl lg:text-5xl">
              Témoignages —{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
                sortir d&apos;une emprise
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              Récits de personnes ayant quitté un groupe d&apos;emprise. <strong className="text-[var(--color-text)]">Anonymat
              total</strong> (initiale, tranche d&apos;âge, durée — jamais de nom de groupe ni de
              détails identifiants), <strong className="text-[var(--color-text)]">consentement écrit
              explicite</strong>, possibilité de retrait à tout moment.
            </p>
          </header>

          {/* Charte */}
          <section
            aria-labelledby="charte-title"
            className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8"
          >
            <h2
              id="charte-title"
              className="font-display text-xl font-semibold text-[var(--color-text)]"
            >
              Notre charte de publication
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-text-muted)]">
              <li className="flex items-start gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>
                  <strong className="text-[var(--color-text)]">Anonymat strict.</strong> Pseudo
                  ou initiale uniquement. Aucun nom propre, aucun lieu identifiable, aucun nom de
                  groupe précis.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>
                  <strong className="text-[var(--color-text)]">Consentement écrit explicite.</strong>{" "}
                  Vous validez le texte final avant publication, vous fixez ce qui est public et
                  ce qui ne l&apos;est pas.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>
                  <strong className="text-[var(--color-text)]">Droit de retrait.</strong> Vous
                  pouvez demander le retrait à tout moment, sans justification. Action
                  immédiate.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>
                  <strong className="text-[var(--color-text)]">Pas de diffamation.</strong> On
                  parle de <em>mécanismes</em> et de <em>vécu personnel</em>, jamais de
                  qualifications nominatives sur des personnes ou organisations.
                </span>
              </li>
            </ul>
          </section>

          {/* Témoignages publiés ou empty state */}
          {TESTIMONIES.length === 0 ? (
            <section className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
              <Tag tone="neutral" size="sm">Recueil en cours de constitution</Tag>
              <h2 className="mt-3 font-display text-xl font-semibold text-[var(--color-text)] sm:text-2xl">
                Les premiers témoignages arriveront bientôt
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                Le recueil démarre. En attendant les premières contributions, voici quelques
                schémas de sortie récurrents documentés par les associations spécialisées
                (UNADFI, CCMM) — pour montrer ce qui peut servir à un récit utile à
                d&apos;autres.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {TYPICAL_PATTERNS.map((p) => (
                  <article
                    key={p.title}
                    className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-5"
                  >
                    <h3 className="font-display text-base font-semibold text-[var(--color-text)]">
                      {p.title}
                    </h3>
                    <blockquote className="mt-3 border-l-2 border-[var(--color-accent)]/40 pl-3 text-sm italic leading-6 text-[var(--color-text-muted)]">
                      {p.desc}
                    </blockquote>
                    <p className="mt-3 text-xs leading-5 text-[var(--color-text-subtle)]">
                      <strong className="text-[var(--color-accent)]">À retenir&nbsp;:</strong>{" "}
                      {p.insight}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ) : (
            <ol className="mb-10 space-y-6">
              {TESTIMONIES.map((t) => (
                <li key={t.id} id={t.id} className="scroll-mt-24">
                  <article className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="font-display text-xl font-semibold text-[var(--color-text)]">
                        Témoignage de {t.pseudo}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {t.age ? <Tag tone="neutral" size="sm">{t.age}</Tag> : null}
                        <Tag tone="neutral" size="sm">{t.duree} dans le groupe</Tag>
                      </div>
                    </div>
                    <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
                      {t.excerpt}
                    </p>
                    {t.full ? (
                      <details className="mt-4 group">
                        <summary className="cursor-pointer text-sm font-medium text-[var(--color-accent)] hover:underline">
                          Lire le témoignage complet
                        </summary>
                        <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)] whitespace-pre-line">
                          {t.full}
                        </p>
                      </details>
                    ) : null}
                  </article>
                </li>
              ))}
            </ol>
          )}

          {/* CTA contribution */}
          <section
            id="contribuer"
            className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30 bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-surface-1)]/50 to-transparent p-6 sm:p-8 scroll-mt-24"
          >
            <Tag tone="accent" size="sm">Contribuer</Tag>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)]">
              Partager votre récit, anonymement
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-text-muted)]">
              Votre expérience peut aider d&apos;autres personnes à reconnaître leur situation,
              ou à oser le premier pas. <strong className="text-[var(--color-text)]">Vous restez
              maître du texte&nbsp;:</strong> on rédige une version anonymisée à partir de votre
              écrit, vous validez avant publication, vous pouvez retirer à tout moment.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                  Étape 1
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  Vous écrivez librement, sans contrainte de format. 200 ou 2 000 mots, c&apos;est
                  vous.
                </p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                  Étape 2
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  La rédaction anonymise (initiales, années, contexte général) et vous renvoie
                  pour validation.
                </p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                  Étape 3
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  Vous donnez (ou refusez) votre accord par écrit. Publication uniquement si
                  validation explicite.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="primary" size="md">
                Écrire à la rédaction
              </Button>
              <Button href="/se-reconstruire" variant="secondary" size="md">
                Lire le guide post-sortie
              </Button>
            </div>
          </section>

          {/* Avertissement */}
          <aside
            role="note"
            aria-label="Avertissement"
            className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5 text-sm leading-6 text-[var(--color-text-muted)]"
          >
            <strong className="text-[var(--color-text)]">Une note de prudence.</strong> Lire des
            témoignages peut raviver des émotions difficiles, surtout si vous êtes vous-même en
            phase de sortie ou de reconstruction. Si la lecture devient trop pesante, fermez
            l&apos;onglet et appelez un·e thérapeute, l&apos;UNADFI ou le 3114 (prévention
            suicide, gratuit, 24/7).
          </aside>

          <div className="mt-6">
            <EmergencyBox variant="full" />
          </div>

          <footer className="mt-10 border-t border-[var(--color-border)] pt-6 text-xs leading-6 text-[var(--color-text-subtle)]">
            <p>
              Recueil édité par Crise Conscience. Témoignages anonymisés avec consentement
              écrit explicite. Schémas de sortie introductifs documentés par UNADFI et CCMM.
              Mise à jour&nbsp;: 1<sup>er</sup> mai 2026.
            </p>
            <div className="mt-3">
              <Link
                href="/se-reconstruire"
                className="text-[var(--color-accent)] hover:underline"
              >
                ← Voir le guide « Se reconstruire après une emprise »
              </Link>
            </div>
          </footer>
        </div>
      </Container>
    </>
  );
}
