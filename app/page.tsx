import Link from "next/link";
import Container from "@/app/components/Container";
import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/base-url";
import { JsonLd } from "@/app/components/JsonLd";
import { SubscriberCounter } from "@/app/components/SubscriberCounter";
import { organizationSchema, websiteSchema, getSiteBase } from "@/lib/schema";
import ArticleCard from "@/app/components/ArticleCard";
import Button from "@/app/components/ui/Button";
import Tag from "@/app/components/ui/Tag";

type HomeArticle = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  status?: string;
  readingTime?: string;
};

function pickItems(data: any): any[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.result?.items)) return data.result.items;
  if (Array.isArray(data?.result)) return data.result;
  return [];
}

function asStr(v: any) {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function normalizeArticle(a: any): HomeArticle | null {
  const title = asStr(a?.title || a?.name || a?.headline).trim();
  const slug = asStr(a?.slug || a?.id || a?.uid).trim();
  if (!title || !slug) return null;

  const excerpt = asStr(a?.excerpt || a?.summary || a?.description || a?.critique || a?.mistral_text)
    .replace(/\s+/g, " ")
    .trim();

  const category = asStr(a?.category || a?.tag || a?.theme || "Article").trim();
  const publishedAt = asStr(a?.publishedAt || a?.published_at || a?.date || a?.createdAt || a?.created_at).trim();
  const readingTime = asStr(a?.readingTime || a?.reading_time || a?.meta?.readingTime).trim();
  const updatedAt = asStr(a?.updatedAt || a?.updated_at).trim();
  const status = asStr(a?.status).trim();

  return {
    title,
    slug,
    excerpt: excerpt || "Lire l'article…",
    category: category || "Article",
    publishedAt: publishedAt || new Date().toISOString().slice(0, 10),
    updatedAt: updatedAt || undefined,
    status: status || undefined,
    readingTime: readingTime || undefined,
  };
}

async function getLatestArticles(limit = 4): Promise<HomeArticle[]> {
  try {
    const base = await getBaseUrl();
    const res = await fetch(`${base}/api/articles`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    const items = pickItems(json);
    const normalized = items.map(normalizeArticle).filter(Boolean) as HomeArticle[];
    const visible = normalized.filter((a) => {
      const s = (a.status ?? "").toLowerCase();
      return s === "published" || s === "ready" || s === "";
    });
    visible.sort((a, b) => {
      const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      if (db !== da) return db - da;
      const ua = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const ub = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return ub - ua;
    });
    return visible.slice(0, limit);
  } catch {
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Crise Conscience";
  const description =
    "Informer, prévenir et aider face aux dérives sectaires : analyses, ressources fiables et accompagnement.";
  return {
    title,
    description,
    alternates: {
      canonical: "/",
      languages: { "fr-FR": "/", en: "/en", "x-default": "/" },
    },
    openGraph: { type: "website", url: "/", title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

// =====================================================================
// Icônes Lucide-style inline (pas d'emoji UI)
// =====================================================================
function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const props = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
  switch (name) {
    case "brain":
      return (
        <svg {...props}>
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04Z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.04Z" />
        </svg>
      );
    case "alert":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "compass":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case "heart":
      return (
        <svg {...props}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "book":
      return (
        <svg {...props}>
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...props}>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      );
    case "lock":
      return (
        <svg {...props}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...props}>
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2" />
        </svg>
      );
    default:
      return null;
  }
}

// =====================================================================
// Bento hubs (les liens TODO seront repointés Lot 3)
// =====================================================================
const HUBS = [
  {
    title: "Comprendre les mécanismes",
    desc: "Emprise, manipulation, ostracisme. Sans jargon, sans dramatisation.",
    href: "/blog/signaux-emprise",
    icon: "brain",
    tone: "accent" as const,
    span: "lg:col-span-2",
  },
  {
    title: "Reconnaître les signaux",
    desc: "17 critères inspirés des repères MIVILUDES.",
    href: "/blog/signaux-emprise",
    icon: "alert",
    tone: "info" as const,
  },
  {
    title: "Aider un proche",
    desc: "Que dire, que faire, qui appeler. Sans clash frontal.",
    href: "/aider-un-proche",
    icon: "users",
    tone: "calm" as const,
  },
  {
    title: "Se reconstruire",
    desc: "Guide post-sortie en 4 phases : sortie immédiate, premiers mois, 1ʳᵉ année, long terme.",
    href: "/se-reconstruire",
    icon: "compass",
    tone: "accent" as const,
  },
  {
    title: "Test d'emprise",
    desc: "16 questions BITE pour auto-évaluer les signaux. Anonyme, 5 min.",
    href: "/test-emprise",
    icon: "sparkle",
    tone: "info" as const,
  },
  {
    title: "Soutenir l'association",
    desc: "Don ponctuel ou régulier — paiement sécurisé.",
    href: "/don",
    icon: "heart",
    tone: "accent" as const,
  },
];

const HERO_REPERES = [
  { label: "Partenaire UNADFI", icon: "shield" },
  { label: "Sources vérifiées", icon: "check" },
  { label: "Anonymat possible", icon: "lock" },
];

const MISSION = [
  {
    title: "Comprendre",
    desc: "Expliquer les mécanismes d'emprise et les signaux d'alerte sans stigmatisation.",
  },
  {
    title: "Outiller",
    desc: "Centraliser des ressources fiables : guides, institutions, associations.",
  },
  {
    title: "Orienter",
    desc: "Aider à trouver le bon interlocuteur : psychologue, juriste, association.",
  },
  {
    title: "Prévenir",
    desc: "Favoriser la prise de recul et la pensée critique, en français accessible.",
  },
];

export default async function HomePage() {
  const latestArticles = await getLatestArticles(4);

  const siteBase = getSiteBase();
  const organizationJsonLd = organizationSchema(siteBase);
  const websiteJsonLd = websiteSchema(siteBase);

  const latestItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Derniers articles",
    numberOfItems: latestArticles.length,
    itemListElement: latestArticles.map((a, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${siteBase}/articles/${encodeURIComponent(a.slug)}`,
      name: a.title,
    })),
  };

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={latestItemListJsonLd} />
      <Container>
        {/* ============== HERO ============== */}
        <section className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/60 p-8 sm:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-[var(--color-accent)]/15 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[var(--color-info)]/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_10%_10%,rgba(255,255,255,0.08),transparent_60%)]" />
          </div>

          <div className="relative">
            <Tag tone="accent" size="md" icon={<Icon name="sparkle" className="h-3 w-3" />}>
              Association loi 1901 · Partenaire UNADFI
            </Tag>

            <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-center">
              {/* Texte */}
              <div className="lg:col-span-7">
                <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--color-text)] text-balance sm:text-5xl lg:text-6xl">
                  Informer, prévenir et aider face aux{" "}
                  <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
                    dérives sectaires
                  </span>
                  .
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-text-muted)]">
                  Crise Conscience analyse les <strong className="text-[var(--color-text)]">comportements
                  d&apos;emprise</strong> et leurs conséquences psychologiques — jamais les croyances
                  individuelles. Ressources fiables, accompagnement, anonymat possible.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    href="/blog/signaux-emprise"
                    variant="primary"
                    size="lg"
                    iconRight={<Icon name="arrow" className="h-4 w-4" />}
                  >
                    Reconnaître les signaux d&apos;emprise
                  </Button>
                  <Button href="/aider-un-proche" variant="secondary" size="lg">
                    Aider un proche
                  </Button>
                </div>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {HERO_REPERES.map((r) => (
                    <li
                      key={r.label}
                      className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1.5 text-xs text-[var(--color-text-muted)]"
                    >
                      <span className="text-[var(--color-accent)]">
                        <Icon name={r.icon} className="h-3.5 w-3.5" />
                      </span>
                      {r.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Carte « Vous êtes concerné ? » */}
              <div className="lg:col-span-5">
                <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-strong)] bg-[var(--color-surface-2)]/80 p-6 backdrop-blur-sm shadow-[var(--shadow-md)]">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
                    <Icon name="compass" className="h-4 w-4 text-[var(--color-accent)]" />
                    Point de départ rapide
                  </div>
                  <h2 className="mt-2 font-display text-xl font-semibold text-[var(--color-text)]">
                    Vous êtes concerné·e ?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    Trois repères immédiats, à suivre dans cet ordre.
                  </p>

                  <ol className="mt-5 space-y-3">
                    {[
                      "Parler à une personne de confiance hors du groupe.",
                      "Conserver des preuves : messages, montants, dates.",
                      "Demander conseil à un professionnel ou une association.",
                    ].map((step, i) => (
                      <li
                        key={step}
                        className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/60 px-4 py-3"
                      >
                        <span
                          aria-hidden="true"
                          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] text-xs font-semibold text-[var(--color-accent)]"
                        >
                          {i + 1}
                        </span>
                        <span className="text-sm leading-6 text-[var(--color-text-muted)]">{step}</span>
                      </li>
                    ))}
                  </ol>

                  <Button href="/contact" variant="ghost" size="md" className="mt-5 w-full justify-center border border-[var(--color-border)]">
                    Contacter l&apos;association →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============== BENTO HUBS ============== */}
        <section className="mt-14">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
            <div>
              <Tag tone="info" size="sm">Parcours</Tag>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text)]">
                Par où commencer ?
              </h2>
              <p className="mt-1 max-w-xl text-sm text-[var(--color-text-muted)]">
                6 entrées thématiques selon ce que vous cherchez.
              </p>
            </div>
          </div>

          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HUBS.map((h) => (
              <Link
                key={h.title}
                href={h.href}
                className={[
                  "group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)]",
                  "border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6",
                  "transition-[border-color,background-color,box-shadow] duration-[var(--motion-fast)]",
                  "hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]/80 hover:shadow-[var(--shadow-md)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
                  h.span ?? "",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className={[
                    "inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border",
                    h.tone === "accent"
                      ? "border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                      : h.tone === "info"
                      ? "border-sky-400/40 bg-sky-400/10 text-sky-300"
                      : "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
                  ].join(" ")}
                >
                  <Icon name={h.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-[-0.01em] text-[var(--color-text)]">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{h.desc}</p>
                <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm text-[var(--color-accent)] transition-colors duration-[var(--motion-fast)] group-hover:text-[var(--color-accent-hover)]">
                  Accéder
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ============== COMPTEUR ============== */}
        <section className="mt-16">
          <div className="mb-6">
            <Tag tone="calm" size="sm">Communauté</Tag>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text)]">
              Ils suivent Crise Conscience
            </h2>
            <p className="mt-1 max-w-xl text-sm text-[var(--color-text-muted)]">
              Un compteur public, basé sur notre base de données. Pas un chiffre gonflé.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <SubscriberCounter compact ctaHref="/abonnes" ctaLabel="Voir le détail" />
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
                Pourquoi afficher ça ?
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold text-[var(--color-text)]">
                Mesurer l&apos;impact, pas l&apos;ego.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                Plus on est nombreux, plus on diffuse des ressources fiables et plus on réduit l&apos;isolement.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Button href="/inscription" variant="primary" size="sm">
                  S&apos;abonner
                </Button>
                <Button href="/desinscription" variant="secondary" size="sm">
                  Se désinscrire
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ============== DERNIERS ARTICLES ============== */}
        <section className="mt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <Tag tone="neutral" size="sm">Bibliothèque</Tag>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text)]">
                Derniers articles
              </h2>
              <p className="mt-1 max-w-xl text-sm text-[var(--color-text-muted)]">
                Rédigés avec assistance IA, relus par la rédaction humaine.
              </p>
            </div>
            <Button href="/articles" variant="ghost" size="sm" iconRight={<Icon name="arrow" className="h-3.5 w-3.5" />}>
              Tous les articles
            </Button>
          </div>

          {latestArticles.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {latestArticles.map((a) => (
                <ArticleCard
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  title={a.title}
                  excerpt={a.excerpt}
                  category={a.category}
                  publishedAt={a.publishedAt}
                  readingTime={a.readingTime}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 text-sm text-[var(--color-text-muted)]">
              Les premiers dossiers arrivent bientôt. En attendant, consultez notre dossier{" "}
              <Link href="/blog/signaux-emprise" className="text-[var(--color-accent)] underline-offset-2 hover:underline">
                signes d&apos;emprise
              </Link>
              .
            </div>
          )}
        </section>

        {/* ============== MISSION ============== */}
        <section className="mt-16">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-8">
            <div>
              <Tag tone="info" size="sm">Notre mission</Tag>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text)]">
                Pédagogie, empathie, faits.
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[var(--color-text-muted)]">
                Nos quatre boussoles, appliquées sur chaque page, chaque article.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {MISSION.map((m) => (
                <div
                  key={m.title}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-5"
                >
                  <div className="font-display text-base font-semibold text-[var(--color-text)]">
                    {m.title}
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-[var(--color-text-muted)]">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============== CITATION ============== */}
        <section className="mt-16">
          <figure className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-8 sm:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-8 w-8 text-[var(--color-accent)]/60"
              fill="currentColor"
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h2c0 1.25-.5 4-3 4Zm14 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h2c0 1.25-.5 4-3 4Z" />
            </svg>
            <blockquote className="relative mt-4 font-display text-2xl leading-snug text-[var(--color-text)] sm:text-3xl">
              Comprendre les mécanismes, c&apos;est déjà reprendre du pouvoir.
            </blockquote>
            <figcaption className="relative mt-3 text-sm text-[var(--color-text-subtle)]">
              — Crise Conscience
            </figcaption>
          </figure>
        </section>

        {/* ============== CTA FINAL ============== */}
        <section className="mt-16 mb-8">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30 bg-gradient-to-r from-[var(--color-accent-soft)] via-[var(--color-surface-1)]/50 to-transparent p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                  Besoin d&apos;un point d&apos;entrée clair ?
                </div>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)]">
                  Commencez par les ressources essentielles
                </h2>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Guides, numéros utiles, institutions, repères de sécurité.
                </p>
              </div>
              <Button
                href="/ressources"
                variant="primary"
                size="lg"
                iconRight={<Icon name="arrow" className="h-4 w-4" />}
              >
                Voir les ressources
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
