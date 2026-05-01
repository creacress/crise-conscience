import type { ReactNode } from "react";
import Container from "@/app/components/Container";
import DonateTunnel from "@/app/components/DonateTunnel";
import EmergencyBox from "@/app/components/EmergencyBox";
import Tag from "@/app/components/ui/Tag";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import { JsonLd } from "@/app/components/JsonLd";
import { faqSchema } from "@/lib/schema";

// Cette page reste un Server Component : seul DonateTunnel est client.
// Le layout (app/don/layout.tsx) injecte le JSON-LD WebPage + DonateAction
// + BreadcrumbList ; on ajoute ici un FAQPage schema spécifique au don.

const REASONS = [
  {
    title: "Infrastructure & sécurité",
    desc: "Hébergement Vercel, sauvegardes, durcissement RGPD, audit régulier.",
    icon: "shield",
  },
  {
    title: "Analyses & rédaction",
    desc: "Veille, recoupement de sources, écriture, relecture humaine systématique.",
    icon: "book",
  },
  {
    title: "Ressources publiques",
    desc: "Glossaire, FAQ, guides pratiques, traductions vers d'autres langues à venir.",
    icon: "compass",
  },
  {
    title: "Outils gratuits",
    desc: "Test BITE, contact anonyme, accompagnement orienté UNADFI/CCMM.",
    icon: "sparkle",
  },
] as const;

const TRANSPARENCY = [
  {
    title: "Indépendance éditoriale",
    desc: "Aucune sponsorisation opaque. Aucun lien commercial avec un éditeur, un groupe religieux ou un parti politique.",
  },
  {
    title: "Méthode 70 % IA / 30 % humain",
    desc: "Brouillons rédigés avec assistance IA, relus et validés par la rédaction. Mention systématique sur chaque article.",
  },
  {
    title: "Sources vérifiables",
    desc: "MIVILUDES, UNADFI, CCMM, Code pénal (Légifrance), travaux académiques. Liens cliquables, jamais de citation tronquée.",
  },
  {
    title: "Aucun reversement à des tiers commerciaux",
    desc: "Les dons servent strictement aux frais de fonctionnement de l'association.",
  },
] as const;

const FAQ = [
  {
    question: "Mon don est-il déductible des impôts ?",
    answer:
      "La déductibilité fiscale (66 % du don pour les particuliers, dans la limite de 20 % du revenu imposable — article 200 du Code général des impôts) suppose que l'association soit reconnue d'intérêt général ou d'utilité publique. Le statut fiscal de Crise Conscience est en cours d'instruction. Nous communiquerons par email à tous les donateurs dès que la reconnaissance sera effective.",
  },
  {
    question: "Comment recevoir un reçu pour mon don ?",
    answer:
      "Stripe envoie automatiquement un reçu de paiement par email (à l'adresse utilisée pour le don). Pour un justificatif au nom de l'association, écrivez-nous via la page Contact après votre don : nous vous le retournons sous 48 à 72 heures.",
  },
  {
    question: "Puis-je arrêter un don mensuel à tout moment ?",
    answer:
      "Oui, en un clic depuis l'email Stripe que vous recevez à la première transaction (lien de gestion d'abonnement). Vous pouvez aussi nous écrire pour résilier — la prise en compte est immédiate, aucun engagement de durée.",
  },
  {
    question: "Comment l'argent est-il utilisé ?",
    answer:
      "Quatre postes principaux : hébergement et sécurité du site, analyses et rédaction de contenus (relecture humaine), production de ressources publiques (FAQ, glossaire, guides, futur contenu vidéo et audio), outils gratuits (test, contact anonymisé). Aucun reversement à des tiers commerciaux.",
  },
  {
    question: "Y a-t-il un rapport d'activité public ?",
    answer:
      "Le rapport d'activité annuel sera publié sur cette page dès la première clôture d'exercice. Il inclura : recettes (subventions, dons, ressources propres), dépenses détaillées, indicateurs d'impact (pages vues, demandes de contact orientées, nouvelles ressources publiées).",
  },
  {
    question: "Acceptez-vous les dons par chèque ou virement bancaire ?",
    answer:
      "Oui. Écrivez-nous via le formulaire de contact en mentionnant « don par chèque » ou « don par virement » : nous vous transmettrons l'adresse postale ou le RIB de l'association. Le reçu de don sera fourni dans tous les cas.",
  },
] as const;

const ICON_PATHS: Record<string, ReactNode> = {
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  book: (
    <>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  sparkle: (
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2" />
  ),
};

function Icon({ name }: { name: keyof typeof ICON_PATHS }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

export default function DonPage() {
  const faqJsonLd = faqSchema(FAQ.map((q) => ({ question: q.question, answer: q.answer })));

  return (
    <>
      <JsonLd data={faqJsonLd} />

      <Container>
        <div className="mx-auto max-w-5xl">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Accueil", href: "/" },
              { label: "Faire un don" },
            ]}
          />

          {/* ===== HERO ===== */}
          <header className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <Tag tone="accent" size="md">
                  Soutenir l&apos;association
                </Tag>
                <h1 className="mt-4 font-display text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--color-text)] sm:text-4xl lg:text-5xl">
                  Soutenir une information{" "}
                  <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
                    libre et rigoureuse
                  </span>
                  .
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)]">
                  Votre don finance des analyses vérifiables, une veille automatisée, et des
                  ressources publiques accessibles. Sans dépendre d&apos;intérêts extérieurs.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Tag tone="calm" size="sm">Paiement Stripe sécurisé</Tag>
                  <Tag tone="info" size="sm">Reçu envoyé par email</Tag>
                  <Tag tone="neutral" size="sm">Résiliation en 1 clic</Tag>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-strong)] bg-[var(--color-surface-2)]/80 p-6 backdrop-blur-sm">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
                    Concrètement
                  </div>
                  <ul className="mt-3 space-y-3 text-sm leading-6 text-[var(--color-text-muted)]">
                    <li className="flex items-baseline gap-3">
                      <span className="font-display text-2xl font-semibold text-[var(--color-accent)]">
                        10€
                      </span>
                      <span>1 mois d&apos;hébergement de notre veille automatisée.</span>
                    </li>
                    <li className="flex items-baseline gap-3">
                      <span className="font-display text-2xl font-semibold text-[var(--color-accent)]">
                        25€
                      </span>
                      <span>1 article long sourcé (relecture humaine incluse).</span>
                    </li>
                    <li className="flex items-baseline gap-3">
                      <span className="font-display text-2xl font-semibold text-[var(--color-accent)]">
                        60€
                      </span>
                      <span>1 mois de fonctionnement complet du site.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </header>

          {/* ===== TUNNEL + REASONS ===== */}
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {/* Pourquoi donner */}
              <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
                <Tag tone="info" size="sm">À quoi servent les dons</Tag>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)]">
                  Quatre postes, c&apos;est tout.
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Pas de marketing de la peur, pas d&apos;intermédiaire commercial.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {REASONS.map((r) => (
                    <div
                      key={r.title}
                      className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-5"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                        >
                          <Icon name={r.icon} />
                        </span>
                        <div className="min-w-0">
                          <div className="font-display text-base font-semibold text-[var(--color-text)]">
                            {r.title}
                          </div>
                          <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
                            {r.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Transparence */}
              <section className="mt-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
                <Tag tone="calm" size="sm">Engagement de transparence</Tag>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)]">
                  Notre cadre.
                </h2>

                <ul className="mt-5 space-y-3">
                  {TRANSPARENCY.map((t) => (
                    <li
                      key={t.title}
                      className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-4"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <div className="min-w-0">
                        <div className="font-semibold text-[var(--color-text)]">{t.title}</div>
                        <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
                          {t.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* FAQ */}
              <section id="faq" className="mt-6 scroll-mt-24">
                <Tag tone="info" size="sm">FAQ</Tag>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)]">
                  Questions fréquentes sur le don
                </h2>
                <div className="mt-5 space-y-3">
                  {FAQ.map((q, i) => (
                    <details
                      key={i}
                      className="group rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5 open:bg-[var(--color-surface-2)]/70"
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
                      </summary>
                      <p className="mt-3 pl-9 text-sm leading-7 text-[var(--color-text-muted)]">
                        {q.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* ===== Sidebar : tunnel sticky desktop ===== */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-[6rem]">
                <DonateTunnel />

                <div className="mt-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/30 p-4 text-xs leading-6 text-[var(--color-text-muted)]">
                  <strong className="text-[var(--color-text)]">Petit don régulier ou gros don
                  unique&nbsp;?</strong> Les deux nous aident — mais un don mensuel, même
                  modeste, donne de la visibilité budgétaire et permet de planifier sereinement.
                </div>
              </div>
            </aside>
          </div>

          {/* ===== Urgences ===== */}
          <div className="mt-12">
            <EmergencyBox variant="banner" />
          </div>

          <footer className="mt-10 border-t border-[var(--color-border)] pt-6 text-xs leading-6 text-[var(--color-text-subtle)]">
            <p>
              Crise Conscience est une association loi 1901, partenaire de l&apos;UNADFI. Le
              statut fiscal d&apos;intérêt général est en cours d&apos;instruction.
              N&apos;hésitez pas à nous écrire pour toute question.
            </p>
          </footer>
        </div>
      </Container>
    </>
  );
}
