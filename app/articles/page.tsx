import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Link from "next/link";
import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/base-url";
import { JsonLd } from "@/app/components/JsonLd";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Articles";
  const description =
    "Dossiers & analyses approfondies sur les dérives sectaires : compréhension, signaux d’emprise, prévention et ressources.";

  return {
    title,
    description,
    alternates: { canonical: "/articles" },
    openGraph: {
      type: "website",
      url: "/articles",
      title: `${title} • Crise Conscience`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} • Crise Conscience`,
      description,
    },
  };
}

type Article = {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  theme?: string;
  tags?: string[];
  status?: string;
  coverUrl?: string;
  coverImage?: string;
  url?: string; // url publique (si n8n publie ailleurs)
  publishedAt?: string;
  readingTime?: string;
};

type ApiResponse = {
  ok?: boolean;
  items?: Article[];
  error?: string;
  reason?: string;
  meta?: { ok?: boolean; reason?: string; count?: number };
};

function formatFR(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "2-digit" });
}

function resolveUrlMaybe(url: any, base: string) {
  const u = typeof url === "string" ? url.trim() : url == null ? "" : String(url).trim();
  if (!u) return "";
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  // URL relative du site (ex: /uploads/cover.webp)
  if (u.startsWith("/")) return base ? `${base}${u}` : u;
  return u;
}

export default async function ArticlesPage() {
  const base = await getBaseUrl();
  const res = await fetch(`${base}/api/articles`, {
    cache: "no-store",
  }).catch(() => null);

  let data: ApiResponse = { items: [], ok: false, reason: "API /api/articles indisponible" };
  if (res && res.ok) {
    try {
      data = (await res.json()) as ApiResponse;
    } catch {
      data = { items: [], ok: false, reason: "Réponse JSON invalide" };
    }
  }

  const rawItems = Array.isArray((data as any)?.items) ? ((data as any).items as Article[]) : [];

  // Tri robuste: publishedAt desc, sinon updatedAt desc, sinon rien
  const items = rawItems.slice().sort((a: any, b: any) => {
    const da = a?.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const db = b?.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    if (db !== da) return db - da;
    const ua = a?.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const ub = b?.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return ub - ua;
  });

  const ok = Boolean((data as any)?.ok ?? data.meta?.ok ?? res?.ok) || items.length > 0;
  const reason = (data as any)?.reason ?? (data as any)?.error ?? data.meta?.reason ?? "";
  const count = data.meta?.count ?? items.length;

  // Thèmes uniques (UI simple)
  const themes = Array.from(
    new Set(
      items
        .map((a) => a.theme || (Array.isArray((a as any).tags) ? (a as any).tags[0] : ""))
        .filter(Boolean)
    )
  ).slice(0, 12);

  const envBase = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  const siteBase = (envBase || base).replace(/\/$/, "");
  const pageUrl = `${siteBase}/articles`;

  const itemList = items.slice(0, 200).map((a: any, idx: number) => {
    const slugOrId = a?.slug || a?.id;
    const url = `${siteBase}/articles/${encodeURIComponent(String(slugOrId))}`;
    return {
      "@type": "ListItem",
      position: idx + 1,
      url,
      name: a?.title || undefined,
    };
  });

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Articles",
    description:
      "Dossiers & analyses approfondies sur les dérives sectaires : compréhension, signaux d’emprise, prévention et ressources.",
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
    name: "Liste des articles",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: items.length,
    itemListElement: itemList,
  };

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <Container>
      <SectionTitle
        as="h1"
        eyebrow="Articles"
        title="Dossiers & analyses approfondies"
        desc="Une bibliothèque d’analyses sur les dérives sectaires, les mécanismes d’emprise, la prévention et la reconstruction."
      />

      {/* Méta-information : transparence éditoriale */}
      <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-semibold text-white">Méthode :</span> rédaction assistée par IA, relue par la rédaction humaine.
          </div>
          <div className="text-white/60">
            {ok && count > 0 ? `${count} article${count > 1 ? "s" : ""}` : ""}
          </div>
        </div>
      </div>

      {/* Thèmes (si dispo) */}
      {themes.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {themes.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Empty state */}
      {items.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-lg font-semibold tracking-tight">
            Les premiers dossiers arrivent bientôt.
          </h3>
          <p className="mt-2 text-white/70 max-w-2xl">
            Notre bibliothèque d’analyses est en cours de construction. En attendant, vous pouvez
            consulter notre blog, nos ressources, ou nous écrire pour orienter nos prochains sujets.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">Commencer à lire</div>
              <p className="mt-2 text-sm text-white/70">
                Notre dossier sur les <em>signaux d’emprise</em> est un bon point d’entrée pour
                comprendre les mécanismes en jeu.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">Suggérer un sujet</div>
              <p className="mt-2 text-sm text-white/70">
                Une thématique vous tient à cœur ? Une question sans réponse claire ?
                Écrivez-nous, nous priorisons en fonction des demandes.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/blog/signaux-emprise"
              className="inline-flex justify-center rounded-xl bg-orange-500 px-5 py-3 font-semibold text-black hover:brightness-110 transition"
            >
              Lire les signaux d’emprise
            </Link>
            <Link
              href="/ressources"
              className="inline-flex justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              Voir les ressources
            </Link>
            <Link
              href="/contact"
              className="inline-flex justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              Suggérer un sujet
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((a) => {
            const date = formatFR(a.publishedAt);
            const metaLine = [date, a.readingTime].filter(Boolean).join(" • ");

            // Tolérance aux différents noms de champs venant de n8n/API
            const rawCover =
              a.coverUrl ??
              (a as any).coverImage ??
              (a as any).cover_image ??
              (a as any).cover_url ??
              (a as any).imageUrl ??
              (a as any).image_url ??
              (a as any).photo_url ??
              (a as any).photoUrl ??
              "";

            const cover = resolveUrlMaybe(rawCover, base);

            const slugOrId = (a as any).slug || (a as any).id || a.id; // compat si l'API renvoie slug
            const href = `/articles/${encodeURIComponent(String(slugOrId))}`;

            const theme = a.theme || (Array.isArray((a as any).tags) ? (a as any).tags[0] : "") || "Article";

            return (
              <Link
                key={a.id}
                href={href}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                <div className="relative z-10 h-36 w-full overflow-hidden">
                  {cover ? (
                    <>
                      <img
                        src={cover}
                        alt={a.title}
                        className="h-full w-full object-cover opacity-90"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/80 via-[#0b1220]/20 to-transparent" />
                    </>
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/0" />
                  )}
                </div>
                <div className="relative z-10 p-5">
                  <div className="flex items-center justify-between gap-3 text-xs text-white/60">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                        {theme}
                      </span>
                      {a.status ? (
                        <span className="inline-flex rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[11px] text-white/65">
                          {String(a.status)}
                        </span>
                      ) : null}
                    </div>
                    {metaLine ? <span>{metaLine}</span> : <span />}
                  </div>

                  <div className="mt-3 text-base font-semibold tracking-tight group-hover:text-white">
                    {a.title}
                  </div>
                  <p className="mt-2 text-sm text-white/70">{a.excerpt}</p>

                  {a.url ? (
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex text-xs text-white/60 hover:text-white transition"
                    >
                      Voir la source ↗
                    </a>
                  ) : null}

                  <div className="mt-4 text-sm text-orange-300">
                    Lire →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      </Container>
    </>
  );
}