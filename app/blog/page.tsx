import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Link from "next/link";
import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/base-url";
import { JsonLd } from "@/app/components/JsonLd";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  category: "Témoignages" | "Analyses" | "Actualités";
  date: string;
  readTime: string;
  cover?: string;
  href: string;
};

const POSTS: Post[] = [
  {
    id: "1",
    title: "Reconnaître les signaux d’emprise : 7 indicateurs concrets",
    excerpt:
      "Une checklist simple pour repérer quand une influence devient une emprise : isolement, culpabilisation, contrôle, rupture du lien social…",
    category: "Analyses",
    date: "2026-01-10",
    readTime: "6 min",
    href: "/blog/signaux-emprise",
  }
];

const CATEGORIES = ["Tous", "Témoignages", "Analyses", "Actualités"] as const;

function formatFR(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "2-digit" });
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Blog — Témoignages, analyses et actualités sur les dérives sectaires";
  const description =
    "Blog Crise Conscience : témoignages de victimes de sectes, analyses critiques des mécanismes d'emprise, actualités sur la prévention des dérives sectaires. Contenus sourcés et accessibles.";

  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    openGraph: {
      type: "website",
      url: "/blog",
      title: "Blog Crise Conscience — Analyses et témoignages",
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog Crise Conscience — Analyses et témoignages",
      description,
    },
  };
}

export default async function BlogPage() {
  const filtered = POSTS; // (on branchera filtre + pagination après via searchParams)

  const base = await getBaseUrl();
  const envBase = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  const siteBase = (envBase || base).replace(/\/$/, "");
  const pageUrl = `${siteBase}/blog`;

  const itemList = filtered.slice(0, 200).map((p, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    url: `${siteBase}${p.href.startsWith("/") ? "" : "/"}${p.href}`,
    name: p.title,
  }));

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog",
    description:
      "Actualités, témoignages et analyses : des contenus clairs, sourcés et accessibles pour comprendre, prévenir et agir.",
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "Crise Conscience",
      url: siteBase,
    },
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Liste des articles de blog",
    numberOfItems: filtered.length,
    itemListElement: itemList,
  };

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <Container>
      <SectionTitle
        as="h1"
        eyebrow="Blog"
        title="Actualités, témoignages et analyses"
        desc="Des contenus clairs, sourcés et accessibles pour comprendre, prévenir et agir."
      />

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search (UI only for now) */}
        <div className="flex-1">
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="text-[var(--color-text-subtle)]">🔎</span>
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
              placeholder="Rechercher un article… (bientôt)"
              disabled
            />
          </div>
        </div>

        {/* Categories (UI only for now) */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`rounded-full border px-3 py-1 text-xs transition
                ${cat === "Tous" ? "border-white/15 bg-white/10 text-white" : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"}
              `}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <Link
            key={post.id}
            href={post.href}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            {/* Cover */}
            <div className="h-36 w-full bg-gradient-to-br from-white/10 to-white/0" />
            <div className="p-5">
              <div className="flex items-center justify-between gap-3 text-xs text-white/60">
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                  {post.category}
                </span>
                <span>
                  {formatFR(post.date)} • {post.readTime}
                </span>
              </div>

              <div className="mt-3 text-base font-semibold tracking-tight group-hover:text-white">
                {post.title}
              </div>
              <p className="mt-2 text-sm text-white/70">{post.excerpt}</p>

              <div className="mt-4 text-sm text-orange-300">Lire →</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination (UI placeholder) */}
      <div className="mt-10 flex items-center justify-center gap-2">
        <button
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
          type="button"
          disabled
        >
          ← Précédent
        </button>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          Page 1 / 1
        </div>
        <button
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
          type="button"
          disabled
        >
          Suivant →
        </button>
      </div>
      </Container>
    </>
  );
}