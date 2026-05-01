import { Breadcrumb } from "@/app/components/Breadcrumb";
import { JsonLd } from "@/app/components/JsonLd";
import EmergencyBox from "@/app/components/EmergencyBox";

export const metadata = {
    title: "Ressources contre les dérives sectaires — Guides, aide et institutions",
    description:
      "Toutes les ressources pour comprendre et agir face aux dérives sectaires : MIVILUDES, UNADFI, CCMM, France Victimes, guides pratiques, kit d’analyse et outils pour développer l’esprit critique.",
    alternates: { canonical: "/ressources" },
    openGraph: {
      type: "website" as const,
      url: "/ressources",
      title: "Ressources contre les dérives sectaires — Crise Conscience",
      description:
        "Guides, institutions officielles (MIVILUDES, UNADFI, CCMM), numéros utiles et outils pour repérer et agir face aux dérives sectaires.",
    },
  };
  
  type Resource = {
    title: string;
    description: string;
    href: string;
    badge?: string;
  };
  
  const QUICK: Resource[] = [
    {
      title: "Comprendre les dérives sectaires",
      description:
        "Définitions, signaux d’alerte, mécanismes d’emprise et repères pour analyser une situation.",
      href: "/articles",
      badge: "Lecture",
    },
    {
      title: "Faire un signalement",
      description:
        "Orientations et contacts utiles pour agir de façon structurée et documentée.",
      href: "/contact",
      badge: "Action",
    },
    {
      title: "Bibliothèque",
      description:
        "Sélection de documents : rapports, guides, articles, et ressources pédagogiques.",
      href: "#bibliotheque",
      badge: "Docs",
    },
  ];
  
  const CATEGORIES: {
    id: string;
    title: string;
    subtitle: string;
    items: Resource[];
  }[] = [
    {
      id: "institutionnel",
      title: "Ressources institutionnelles",
      subtitle:
        "Cadres, repères et dispositifs publics (France / Europe). À consulter en priorité pour les démarches formelles.",
      items: [
        {
          title: "MIVILUDES – informations & repères",
          description:
            "Mission interministérielle : compréhension, prévention, accompagnement, et rapports annuels.",
          href: "https://www.miviludes.interieur.gouv.fr/",
          badge: "Officiel",
        },
        {
          title: "Service-public.fr – démarches & droits",
          description:
            "Ressources pratiques : démarches, plaintes, associations d’aide, et orientation.",
          href: "https://www.service-public.fr/",
          badge: "Officiel",
        },
        {
          title: "Conseil de l’Europe – droits & libertés",
          description:
            "Cadre général des droits fondamentaux et de la liberté de conscience.",
          href: "https://www.coe.int/",
          badge: "Europe",
        },
      ],
    },
    {
      id: "aide",
      title: "Aide & accompagnement",
      subtitle:
        "Associations, écoute et orientation. Selon ta situation, privilégie un accompagnement juridique/psy adapté.",
      items: [
        {
          title: "UNADFI",
          description:
            "Réseau associatif d’aide aux victimes de dérives sectaires : écoute, orientation, accompagnement.",
          href: "https://www.unadfi.org/",
          badge: "Association",
        },
        {
          title: "CCMM",
          description:
            "Centre contre les manipulations mentales : prévention, information, accompagnement.",
          href: "https://www.ccmm.asso.fr/",
          badge: "Association",
        },
        {
          title: "France Victimes",
          description:
            "Aide aux victimes : accès au droit, soutien, orientation vers des structures locales.",
          href: "https://www.france-victimes.fr/",
          badge: "Aide",
        },
      ],
    },
    {
      id: "lecture",
      title: "Guides & lectures",
      subtitle:
        "Outils pédagogiques : esprit critique, rhétorique, manipulation, biais cognitifs.",
      items: [
        {
          title: "Esprit critique : bases et méthodes",
          description:
            "Une sélection de contenus pour structurer une démarche : sources, preuves, arguments, biais.",
          href: "/articles",
          badge: "Méthode",
        },
        {
          title: "Analyses Crise Conscience",
          description:
            "Nos articles longs : mécanismes d’emprise, doctrines, discours, stratégies institutionnelles.",
          href: "/articles",
          badge: "Crise Conscience",
        },
      ],
    },
    {
      id: "pro",
      title: "Espace professionnels",
      subtitle:
        "Pour psychologues, juristes, enseignants, journalistes : repères, vigilance, documentation.",
      items: [
        {
          title: "Kit d’analyse rapide",
          description:
            "Grille de lecture : signaux d’alerte, emprise, isolement, contrôle, dépendance, rupture.",
          href: "#kit",
          badge: "Toolkit",
        },
        {
          title: "Contact partenariat / presse",
          description:
            "Demande d’entretien, intervention, collaboration, relecture ou mise en relation.",
          href: "/contact",
          badge: "Contact",
        },
      ],
    },
  ];
  
  function Badge({ children }: { children: string }) {
    return (
      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
        {children}
      </span>
    );
  }
  
  function Card({ item }: { item: Resource }) {
    const isExternal = /^https?:\/\//.test(item.href);
    return (
      <a
        href={item.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-white/90 group-hover:text-white">
            {item.title}
          </h3>
          {item.badge ? <Badge>{item.badge}</Badge> : null}
        </div>
        <p className="mt-2 text-sm leading-6 text-white/70">{item.description}</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-orange-300">
          <span className="opacity-80 group-hover:opacity-100">Ouvrir</span>
          <span className="opacity-60">→</span>
        </div>
      </a>
    );
  }
  
  export default function ResourcesPage() {
    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Où signaler une dérive sectaire en France ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Vous pouvez contacter la MIVILUDES (Mission interministérielle de vigilance et de lutte contre les dérives sectaires) via leur site officiel miviludes.interieur.gouv.fr, ou appeler le 01 42 75 76 08. En cas de danger immédiat, contactez le 17 (police) ou le 112.",
          },
        },
        {
          "@type": "Question",
          name: "Quelles associations aident les victimes de sectes ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Les principales associations sont l'UNADFI (Union nationale des Associations de Défense des Familles et de l'Individu victimes de sectes) et le CCMM (Centre Contre les Manipulations Mentales). France Victimes propose également un accompagnement via le 116 006.",
          },
        },
        {
          "@type": "Question",
          name: "Comment développer son esprit critique face aux manipulations ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Développez votre esprit critique en vérifiant les sources, en identifiant les biais cognitifs, en questionnant les arguments d'autorité et en consultant des ressources variées. Crise Conscience propose des analyses et des guides pour structurer cette démarche.",
          },
        },
      ],
    };

    return (
      <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-16">
        <Breadcrumb items={[{ label: "Ressources", href: "/ressources" }]} />
        <JsonLd data={faqJsonLd} />
        {/* Header */}
        <header className="mb-12 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-8 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]">
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/65">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Base documentaire</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Repères</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Aide & orientation</span>
          </div>
  
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Ressources
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-7 text-white/80">
            Une sélection de ressources utiles pour comprendre les dérives sectaires, repérer les mécanismes d’emprise,
            et trouver des dispositifs d’aide. On privilégie les sources vérifiables et les organismes reconnus.
          </p>
  
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {QUICK.map((q) => (
              <a
                key={q.title}
                href={q.href}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-white/90">{q.title}</h3>
                  {q.badge ? <Badge>{q.badge}</Badge> : null}
                </div>
                <p className="mt-2 text-sm leading-6 text-white/70">{q.description}</p>
              </a>
            ))}
          </div>
        </header>
  
        {/* Categories */}
        <section className="grid gap-6" id="bibliotheque">
          {CATEGORIES.map((c) => (
            <section
              key={c.id}
              id={c.id}
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">{c.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/70">{c.subtitle}</p>
                </div>
                <a
                  href="#top"
                  className="text-xs text-[var(--color-text-subtle)] transition hover:text-white/80"
                >
                  Retour en haut
                </a>
              </div>
  
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {c.items.map((item) => (
                  <Card key={item.title} item={item} />
                ))}
              </div>
            </section>
          ))}
  
          {/* Pro toolkit */}
          <section
            id="kit"
            className="rounded-3xl border border-white/10 bg-gradient-to-b from-orange-500/10 to-white/[0.02] p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold tracking-tight text-white">Kit d’analyse rapide</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
              Une grille de lecture simple pour aider à repérer les signes d’emprise : isolement, culpabilisation,
              contrôle de l’information, pression à la conformité, rupture sociale, peur, dépendance.
              (Version complète bientôt disponible en PDF.)
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Isolement", "Contrôle", "Culpabilité", "Peur", "Dépendance", "Rupture"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
  
          {/* Urgences (YMYL) */}
          <EmergencyBox variant="full" />

          {/* Disclaimer */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="text-xl font-semibold text-white">Important</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Cette page propose une orientation générale et des ressources. Elle ne remplace pas un avis juridique ou
              médical. En cas de danger immédiat, consultez les numéros d&apos;urgence ci-dessus.
            </p>
            <div className="mt-5">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Nous contacter
              </a>
            </div>
          </section>
        </section>
      </main>
    );
  }
  