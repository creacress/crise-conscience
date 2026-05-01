// app/blog/signe-emprise/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import KeyTakeaways from "@/app/components/KeyTakeaways";
import { JsonLd } from "@/app/components/JsonLd";
import { articleSchema, breadcrumbSchema, getSiteBase } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Identifier une dérive sectaire : signes d’emprise et critères",
  description:
    "Repères concrets pour identifier une dérive sectaire : critères MIVILUDES, mécanismes d’emprise, signaux d’alerte et conseils pour agir.",
  alternates: { canonical: "/blog/signaux-emprise" },
  openGraph: {
    title: "Identifier une dérive sectaire : signes d’emprise et critères",
    description:
      "Critères, signaux d’alerte et conseils d’action, inspirés des repères publics de la MIVILUDES.",
    type: "article",
    url: "/blog/signaux-emprise",
  },
  twitter: {
    card: "summary_large_image",
    title: "Signes d’emprise — comment repérer une dérive sectaire",
    description:
      "Critères MIVILUDES, processus d’emprise et conseils d’action. Crise Conscience.",
  },
};

const OFFICIAL_URL =
  "https://www.miviludes.interieur.gouv.fr/comprendre-prevenir-et-lutter/comment-identifier-derive-sectaire";

const criteria = [
  {
    title: "Déstabilisation mentale / sujétion",
    desc: "Perte d’esprit critique, dépendance psychologique ou physique, décisions imposées (actions ou abstentions) au détriment de la personne.",
  },
  {
    title: "Rupture avec l’entourage",
    desc: "Éloignement des proches (famille, amis), tensions artificiellement entretenues, isolement progressif.",
  },
  {
    title: "Changement radical de comportement",
    desc: "Nouvelle personnalité “sur commande”, langage stéréotypé, priorités bouleversées, abandon d’activités ou d’études.",
  },
  {
    title: "Dénigrement du monde extérieur",
    desc: "Discours “nous contre eux”, suspicion des médias, rupture d’accès à l’information, rejet des institutions.",
  },
  {
    title: "Conditions de vie éprouvantes",
    desc: "Sommeil réduit, rythme exténuant, retraites/stages répétés, contrôle du temps et des fréquentations.",
  },
  {
    title: "Recrutement trompeur",
    desc: "Promesses miracles (bien‑être, guérison, réussite), technique du “pied‑dans‑la‑porte”, dissimulation d’objectifs.",
  },
  {
    title: "Embrigadement des enfants",
    desc: "Contrôle de l’éducation, rupture de scolarité, discours anxiogènes, assignation identitaire.",
  },
  {
    title: "Groupe autoritaire et opaque",
    desc: "Organisation cloisonnée, règles internes, chef charismatique/praticien “référent exclusif”, opacité.",
  },
  {
    title: "Difficulté à quitter le groupe",
    desc: "Culpabilisation, menaces, ostracisme, pression sociale, peur de perdre ses relations.",
  },
  {
    title: "Atteintes aux personnes",
    desc: "Violences, abus, privations, atteintes à l’intégrité physique/psychique, infractions et délits.",
  },
  {
    title: "Troubles à l’ordre public / contestation des institutions",
    desc: "Discours antisocial, opposition systématique, tentatives d’influence ou de déstabilisation.",
  },
  {
    title: "Démêlés judiciaires fréquents",
    desc: "Historique d’affaires, procédures, condamnations, litiges multiples autour du groupe ou du dirigeant.",
  },
  {
    title: "Exigences financières exorbitantes",
    desc: "Dons, formations payantes en chaîne, “cotisations” opaques, endettement, gestion financière obscure.",
  },
  {
    title: "Infiltration des pouvoirs publics",
    desc: "Stratégies d’entrisme : influence, réseaux, tentatives de légitimation institutionnelle.",
  },
  {
    title: "Offre de soins douteuse et exclusive",
    desc: "Promesses de guérison, rejet de la médecine conventionnelle, prescriptions ou pratiques risquées.",
  },
  {
    title: "Habitudes alimentaires inquiétantes",
    desc: "Régimes imposés, restrictions extrêmes, jeûnes forcés, règles alimentaires comme outil de contrôle.",
  },
  {
    title: "Atteinte aux principes républicains",
    desc: "Discours discriminatoires, séparatisme, négation de droits fondamentaux, dérives contraires à la loi.",
  },
] as const;

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title, desc }: { kicker?: string; title: string; desc?: string }) {
  return (
    <div className="mb-5">
      {kicker ? <p className="text-xs tracking-widest text-white/50">{kicker}</p> : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{title}</h2>
      {desc ? <p className="mt-2 text-white/70">{desc}</p> : null}
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{desc}</p>
    </div>
  );
}

export default function Page() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/blog/signaux-emprise`;

  const articleJsonLd = articleSchema({
    siteBase,
    pageUrl,
    title: "Signes d’emprise — comment repérer une dérive sectaire",
    description:
      "Critères MIVILUDES, processus d’emprise (séduction, dépendance, isolement) et conseils d’action.",
    image: `${siteBase}/opengraph-image`,
    datePublished: "2026-01-10",
    dateModified: "2026-05-01",
    authorName: "Rédaction Crise Conscience (assistance IA, relecture humaine)",
  });

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Accueil", url: `${siteBase}/` },
    { name: "Blog", url: `${siteBase}/blog` },
    { name: "Signes d’emprise", url: pageUrl },
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {/* Hero */}
      <header className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2">
              <Badge>Prévention</Badge>
              <Badge>Emprise</Badge>
              <Badge>Repères concrets</Badge>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Signes d’emprise : comment repérer une dérive sectaire
            </h1>
            <p className="mt-4 text-white/70">
              Ici, on résume et structure des repères publics (notamment ceux de la MIVILUDES) pour
              t’aider à reconnaître un <b>faisceau d’indices</b> : un signe isolé n’est pas une preuve,
              mais plusieurs signaux convergents doivent alerter.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#criteres"
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Voir les critères
              </a>
              <a
                href="#agir"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Comment agir
              </a>
              <a
                href={OFFICIAL_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
              >
                Source officielle
              </a>
            </div>
          </div>

          <div className="w-full max-w-sm space-y-4">
            <figure
              aria-hidden="true"
              className="relative h-56 w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/15 via-white/[0.04] to-sky-500/10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_30%,rgba(251,146,60,0.18),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_75%_70%,rgba(56,189,248,0.14),transparent_60%)]" />
              <svg
                viewBox="0 0 320 224"
                className="absolute inset-0 h-full w-full opacity-80"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="cc-pulse" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(251,146,60,0.55)" />
                    <stop offset="60%" stopColor="rgba(251,146,60,0.10)" />
                    <stop offset="100%" stopColor="rgba(251,146,60,0)" />
                  </radialGradient>
                </defs>
                {[28, 56, 88, 124].map((r) => (
                  <circle
                    key={r}
                    cx="160"
                    cy="112"
                    r={r}
                    fill="none"
                    stroke="rgba(255,255,255,0.10)"
                    strokeWidth="1"
                  />
                ))}
                <circle cx="160" cy="112" r="12" fill="url(#cc-pulse)" />
                <circle cx="160" cy="112" r="4" fill="rgba(251,146,60,0.95)" />
              </svg>
              <figcaption className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/30 p-3 text-center text-xs text-white/70 backdrop-blur-sm">
                L’emprise progresse par cercles concentriques.
              </figcaption>
            </figure>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm font-semibold text-white">Mini‑checklist (à garder en tête)</p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>• Isolement progressif + rupture avec les proches</li>
                <li>• Dépendance (affective, financière, cognitive)</li>
                <li>• Contrôle du temps, de l’info, des choix</li>
                <li>• Pressions / culpabilisation / menaces</li>
                <li>• Promesses “miracles” + exigences croissantes</li>
              </ul>
              <p className="mt-4 text-xs text-white/50">
                L’important : regarder la dynamique de contrôle, pas l’étiquette du groupe.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Définition */}
      <section className="mt-12">
        <SectionTitle
          kicker="COMPRENDRE"
          title="Définition (en clair)"
          desc="Une dérive sectaire, c’est l’usage de pressions/techniques pour placer une personne en état de sujétion (psychologique ou physique), en réduisant son libre arbitre et avec des conséquences dommageables." 
        />

        <div className="grid gap-4 md:grid-cols-3">
          <Card
            title="On ne “combat” pas une croyance"
            desc="En France, l’approche vise des comportements et des dommages (atteintes aux personnes, aux biens, à la cohésion sociale), pas une religion ou une opinion." 
          />
          <Card
            title="Le faisceau d’indices"
            desc="Un critère seul ne suffit généralement pas : c’est l’accumulation et la cohérence des signaux qui font apparaître une dynamique d’emprise." 
          />
          <Card
            title="Effets fréquents"
            desc="Ruptures familiales, rupture de soins, prédation financière, scolarité entravée, citoyenneté et autonomie affaiblies." 
          />
        </div>
      </section>

      {/* Critères */}
      <section id="criteres" className="mt-12">
        <SectionTitle
          kicker="REPÉRER"
          title="Critères d’alerte (liste indicative)"
          desc="Ces critères reprennent l’esprit des repères MIVILUDES, reformulés pour être lisibles."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {criteria.map((c) => (
            <div
              key={c.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <h3 className="text-base font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm text-white/70">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/70">
            <b className="text-white">Astuce pratique :</b> note les faits, dates, messages, montants,
            changements observables. Les éléments concrets aident à sortir du flou et à demander de l’aide.
          </p>
        </div>
      </section>

      {/* Emprise */}
      <section className="mt-12">
        <SectionTitle
          kicker="MÉCANIQUE"
          title="L’emprise : un processus progressif"
          desc="Les techniques d’emprise fonctionnent rarement “en une fois”. Elles avancent par étapes, et c’est justement ce qui les rend difficiles à repérer." 
        />

        <div className="grid gap-4 md:grid-cols-3">
          <Card
            title="1) Séduction / valorisation"
            desc="On te fait te sentir “spécial”, compris, choisi. Ça baisse la vigilance et encourage à livrer des fragilités." 
          />
          <Card
            title="2) Dépendance + endoctrinement"
            desc="Nouveaux repères, nouvelles “vérités”, routines imposées. La relation devient centrale et coûteuse à remettre en question." 
          />
          <Card
            title="3) Isolement + contrôle"
            desc="Distance avec les proches, contrôle du temps, de l’info, des choix. Souvent s’ajoutent des exigences financières ou de travail." 
          />
        </div>

        <details className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <summary className="cursor-pointer text-sm font-semibold text-white">
            Pourquoi c’est si dur de partir ?
          </summary>
          <div className="mt-3 space-y-2 text-sm text-white/70">
            <p>Parce que l’emprise mélange peur, culpabilité, perte de repères et parfois dépendance financière.</p>
            <p>
              La sortie peut entraîner solitude, rupture des liens, pression du groupe (ostracisme), voire menaces.
              C’est un processus qui prend du temps.
            </p>
          </div>
        </details>
      </section>

      {/* Agir */}
      <section id="agir" className="mt-12">
        <SectionTitle
          kicker="AGIR"
          title="Que faire si tu es inquiet (toi ou un proche)"
          desc="Objectif : sécurité, faits, soutien. Pas de duel frontal — l’emprise adore les ruptures." 
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-base font-semibold text-white">Priorités</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>• Rester en lien (calme, sans humiliation).</li>
              <li>• Documenter des faits (dates, pressions, montants, messages).</li>
              <li>• Identifier les risques immédiats (santé, violences, mineurs, argent).</li>
              <li>• Chercher de l’aide (assos d’aide aux victimes, professionnels, signalement).</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-base font-semibold text-white">À éviter</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>• Le clash “tu es dans une secte” (souvent contre‑productif).</li>
              <li>• Les ultimatums sans filet de sécurité.</li>
              <li>• Les débats infinis : vise le concret (contrôle, isolement, argent, soins).</li>
              <li>• Rester seul : s’appuyer sur des structures compétentes.</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
          <h3 className="text-base font-semibold text-white">Ressources officielles</h3>
          <p className="mt-2 text-sm text-white/70">
            Pour le détail complet, les définitions et la liste originale des critères, consulte la page MIVILUDES.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={OFFICIAL_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Ouvrir la page MIVILUDES
            </a>
            <Link
              href="/contact"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contacter l’association
            </Link>
          </div>

          <p className="mt-4 text-xs text-white/50">
            En cas d’urgence / danger immédiat : appelle les services d’urgence adaptés (17/112 en France).
          </p>
        </div>
      </section>

      {/* À retenir + Sources (citation-friendly) */}
      <KeyTakeaways
        takeaways={[
          <>
            Une dérive sectaire vise des <strong>comportements et des dommages</strong>, jamais une
            croyance ou une religion en tant que telles.
          </>,
          <>
            Aucun signe isolé ne suffit : c’est l’<strong>accumulation cohérente</strong> de
            signaux dans la durée qui qualifie une dynamique d’emprise.
          </>,
          <>
            Le processus type avance par paliers :{" "}
            <strong>séduction → dépendance → isolement</strong>.
          </>,
          <>
            Trois priorités d’action : <strong>rester en lien</strong>, <strong>documenter les
            faits</strong>, <strong>chercher de l’aide spécialisée</strong> (associations,
            professionnels).
          </>,
          <>
            En cas de danger immédiat : <strong>15 / 17 / 18 / 112</strong>.
          </>,
        ]}
        sources={[
          {
            title: "MIVILUDES — Comment identifier une dérive sectaire",
            href: OFFICIAL_URL,
            publisher: "Mission interministérielle (Ministère de l’Intérieur)",
          },
          {
            title: "UNADFI — Réseau d’aide aux victimes de dérives sectaires",
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
            publisher: "France Victimes",
          },
        ]}
      />

      {/* Footer note */}
      <footer className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
        <p>
          Cette page est une reformulation pédagogique basée sur des repères publics. Contenu
          rédigé avec assistance IA, relu par la rédaction Crise Conscience. Pour la version
          officielle complète, voir la source MIVILUDES ci-dessus.
        </p>
      </footer>
    </main>
  );
}