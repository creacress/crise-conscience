import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBaseUrl } from "@/lib/base-url";
import { JsonLd } from "@/app/components/JsonLd";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  coverImage?: string | null;
  tags?: string[] | null;
  publishedAt?: string | null;
  contentHtml?: string | null;
  sourceUrl?: string | null;
};

function asStr(v: unknown): string {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}


function stripDangerousHtml(html: string): string {
  // Minimal safety net: remove script tags.
  // (Best is to sanitize on ingest, but this blocks the worst foot-guns.)
  let out = html.replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, "");

  // Remove inline styles that often force tiny headings / zero margins.
  out = out.replace(/\sstyle\s*=\s*("[^"]*"|'[^']*')/gi, "");

  // Normalize separators so our Tailwind typography spacing applies.
  out = out.replace(/<\s*hr\b[^>]*>/gi, "<hr>");

  // Convert common text separators to <hr>
  // - <p>_____</p> / <div>---</div> / etc.
  out = out.replace(
    /<(p|div|span)\b[^>]*>\s*([_\-—]{3,})\s*<\/\1>/gi,
    "<hr>"
  );

  // If the ingest produced line-break HTML (lots of <br>) instead of real paragraphs,
  // rebuild paragraphs so typography spacing works.
  if (!/<\s*p\b/i.test(out) && /<\s*br\b/i.test(out)) {
    // 2+ <br> => paragraph break
    out = out.replace(/(?:<\s*br\s*\/?>\s*){2,}/gi, "</p><p>");
    // 1 <br> => simple line break
    out = out.replace(/<\s*br\s*\/?>/gi, "<br>");
    out = `<p>${out}</p>`
      .replace(/<p>\s*<\/p>/gi, "")
      .replace(/<p>\s*<hr>\s*<\/p>/gi, "<hr>")
      .replace(/<\/p>\s*<hr>\s*<p>/gi, "<hr>");
  }

  // IMPORTANT: your ingest often produces numbered sections as plain paragraphs (not <h2>/<h3>).
  // Promote them to real headings so typography + TOC work.

  // 1) Numbered titles: "1. Titre..." -> <h2>
  out = out.replace(
    /<p\b[^>]*>\s*(?:<strong\b[^>]*>)?\s*(\d{1,2})\s*\.\s*([\s\S]*?)\s*(?:<\/strong>)?\s*<\/p>/gi,
    (_m, n: string, inner: string) => `<h2>${n}. ${inner}</h2>`
  );

  // 2) Lettered sub-sections: "a. ..." -> <h3>
  out = out.replace(
    /<p\b[^>]*>\s*(?:<strong\b[^>]*>)?\s*([a-z])\s*\.\s*([\s\S]*?)\s*(?:<\/strong>)?\s*<\/p>/gi,
    (_m, l: string, inner: string) => `<h3>${l}. ${inner}</h3>`
  );

  // Normalize heading open tags too (strip weird attributes that can mess sizing).
  out = out.replace(/<\s*h2\b[^>]*>/gi, "<h2>");
  out = out.replace(/<\s*h3\b[^>]*>/gi, "<h3>");
  // N8N content sometimes includes its own <h1> (often duplicating the page title).
  // We normalize <h1> to <h2> so typography stays consistent and TOC logic remains simple.
  out = out.replace(/<\s*h1\b[^>]*>/gi, "<h2>");
  out = out.replace(/<\s*\/\s*h1\s*>/gi, "</h2>");

  return out;
}

function slugifyHeading(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&nbsp;|\u00a0/g, " ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 64);
}

type TocItem = { level: 2 | 3; id: string; text: string };

function stripTagsToText(html: string): string {
  return html
    .replace(/<\s*br\s*\/?\s*>/gi, " ")
    .replace(/<\s*\/\s*p\s*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|\u00a0/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function injectHeadingIdsAndBuildToc(inputHtml: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Map<string, number>();

  const withIds = inputHtml.replace(
    /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_m, tagRaw: string, attrsRaw: string, innerRaw: string) => {
      const tag = String(tagRaw).toLowerCase();
      const level = tag === "h2" ? 2 : 3;

      // If already has an id, keep it.
      const hasId = /\sid\s*=\s*(["']).*?\1/i.test(attrsRaw);

      const text = stripTagsToText(innerRaw);
      const base = slugifyHeading(text) || (level === 2 ? "section" : "subsection");

      let id = base;
      const n = used.get(base) ?? 0;
      if (n > 0) id = `${base}-${n + 1}`;
      used.set(base, n + 1);

      toc.push({ level: level as 2 | 3, id, text });

      const attrs = hasId ? attrsRaw : `${attrsRaw} id=\"${id}\"`;
      return `<${tag}${attrs}>${innerRaw}</${tag}>`;
    }
  );

  return { html: withIds, toc };
}

function estimateReadingTimeMinutes(text: string): number {
  const words = text
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
  // French reading speed ~200 wpm
  return Math.max(1, Math.round(words / 200));
}

async function fetchArticleByIdOrSlug(idOrSlug: string): Promise<Article | null> {
  const base = await getBaseUrl();
  const raw = decodeURIComponent(idOrSlug ?? "").trim();
  const key = encodeURIComponent(raw);

  // Some of your API versions expect:
  // - /api/articles/:idOrSlug
  // So we try a small cascade.
  const candidates = [
    `${base}/api/articles/${key}`,
  ];

  let lastErrText = "";
  let lastStatus: number | null = null;

  for (const url of candidates) {
    const res = await fetch(url, {
      cache: "no-store",
      headers: { accept: "application/json" },
    });

    if (res.status === 404) continue;

    // If the route exists but complains about missing_slug (400), try the next candidate.
    if (res.status === 400) {
      const t = await res.text().catch(() => "");
      lastErrText = t;
      lastStatus = 400;
      // Heuristic: only skip on the known error
      if (t.includes("missing_slug") || t.includes("missing_id")) continue;
      // Otherwise, surface the 400 (it is likely a real validation error)
      throw new Error(`GET ${url} -> ${res.status} ${t}`);
    }

    if (!res.ok) {
      const t = await res.text().catch(() => "");
      throw new Error(`GET ${url} -> ${res.status} ${t}`);
    }

    const data = (await res.json().catch(() => null)) as any;
    const a = (data?.article ?? data) as any;
    if (!a) return null;

    return {
      id: asStr(a.id || a.identifiant),
      slug: asStr(a.slug || a.limace),
      title: asStr(a.title || a.titre),
      excerpt: asStr(a.excerpt || a.extrait) || null,
      coverImage: asStr(
        a.coverImage ||
          a.coverimage ||
          a.image_de_couverture ||
          a.image ||
          a.cover
      ) || null,
      tags: Array.isArray(a.tags || a.etiquettes)
        ? (a.tags || a.etiquettes)
            .map((s: unknown) => asStr(s))
            .filter(Boolean)
        : null,
      publishedAt: asStr(a.publishedAt || a.publieA || a.published_at) || null,
      contentHtml: asStr(a.contentHtml || a.content_html || a.content || a.html) || null,
      sourceUrl: asStr(a.sourceUrl || a.source_url || a.source) || null,
    };
  }

  // If we tried everything and got a known "missing_*" error, treat as not found.
  if (lastStatus === 400 && (lastErrText.includes("missing_slug") || lastErrText.includes("missing_id"))) {
    return null;
  }

  // Last chance: if you only have a list API (/api/articles) returning { items: [...] },
  // fetch it and find the article locally.
  try {
    const res = await fetch(`${base}/api/articles`, {
      cache: "no-store",
      headers: { accept: "application/json" },
    });

    if (res.ok) {
      const data = (await res.json().catch(() => null)) as any;
      const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
      const found = items.find((x: any) => {
        const sid = asStr(x?.slug || x?.id);
        return sid === raw;
      });

      if (found) {
        const a = found as any;
        return {
          id: asStr(a.id || a.identifiant),
          slug: asStr(a.slug || a.limace || a.id),
          title: asStr(a.title || a.titre),
          excerpt: asStr(a.excerpt || a.extrait) || null,
          coverImage:
            asStr(
              a.coverImage ||
                a.coverimage ||
                a.image_de_couverture ||
                a.image ||
                a.cover
            ) || null,
          tags: Array.isArray(a.tags || a.etiquettes)
            ? (a.tags || a.etiquettes)
                .map((s: unknown) => asStr(s))
                .filter(Boolean)
            : null,
          publishedAt: asStr(a.publishedAt || a.publieA || a.published_at) || null,
          contentHtml: asStr(a.contentHtml || a.content_html || a.content || a.html) || null,
          sourceUrl: asStr(a.sourceUrl || a.source_url || a.source) || null,
        };
      }
    }
  } catch {
    // ignore; treat as not found
  }

  return null;
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const key = decodeURIComponent(id ?? "").trim();
  if (!key) return {};

  const article = await fetchArticleByIdOrSlug(key);
  if (!article) return { title: "Article introuvable" };

  const title = article.title || "Article";
  const description = article.excerpt || "";

  // Base URL stable pour canonical/OG (prod), fallback en dev.
  const envBase = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  const base = (envBase || (await getBaseUrl())).replace(/\/$/, "");

  const pathname = `/articles/${encodeURIComponent(key)}`;

  const imageAbs = article.coverImage
    ? article.coverImage.startsWith("http")
      ? article.coverImage
      : `${base}${article.coverImage.startsWith("/") ? "" : "/"}${article.coverImage}`
    : undefined;

  const publishedTime = article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined;

  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      type: "article",
      url: pathname,
      title,
      description,
      images: imageAbs ? [{ url: imageAbs }] : undefined,
      publishedTime,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageAbs ? [imageAbs] : undefined,
    },
  };
}

export default async function ArticlePage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const key = decodeURIComponent(id ?? "").trim();
  if (!key) notFound();

  const base = await getBaseUrl();

  const article = await fetchArticleByIdOrSlug(key);
  if (!article) notFound();

  const rawHtml = article.contentHtml ? stripDangerousHtml(article.contentHtml) : "";
  const { html, toc } = rawHtml ? injectHeadingIdsAndBuildToc(rawHtml) : { html: "", toc: [] };
  const readingMinutes = rawHtml ? estimateReadingTimeMinutes(stripTagsToText(rawHtml)) : 1;

  const envBase = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  const siteBase = (envBase || base).replace(/\/$/, "");
  const pathname = `/articles/${encodeURIComponent(key)}`;
  const pageUrl = `${siteBase}${pathname}`;

  const imageAbs = article.coverImage
    ? article.coverImage.startsWith("http")
      ? article.coverImage
      : `${siteBase}${article.coverImage.startsWith("/") ? "" : "/"}${article.coverImage}`
    : undefined;

  const publishedTime = article.publishedAt
    ? new Date(article.publishedAt).toISOString()
    : undefined;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt || undefined,
    image: imageAbs ? [imageAbs] : undefined,
    datePublished: publishedTime,
    dateModified: publishedTime,
    mainEntityOfPage: pageUrl,
    author: {
      "@type": "Organization",
      name: "Crise Conscience",
      url: siteBase,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteBase}/#organization`,
      name: "Crise Conscience",
      url: siteBase,
    },
    inLanguage: "fr-FR",
    keywords: article.tags?.join(", ") || "dérives sectaires, emprise, analyse critique",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteBase}/#website`,
      name: "Crise Conscience",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${siteBase}/` },
      { "@type": "ListItem", position: 2, name: "Articles", item: `${siteBase}/articles` },
      { "@type": "ListItem", position: 3, name: article.title, item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

 {/* Fallback typography CSS: ensures readable styling even if Tailwind Typography (prose) isn't generated */}
<style>{`
  #__content {
    color: rgba(255, 255, 255, 0.86);
  }

  #__content p {
    margin-top: 1.1rem;
    line-height: 1.85;
    font-size: 1rem;
    letter-spacing: 0.005em;
    color: rgba(255, 255, 255, 0.86);
  }

  #__content p:first-child {
    margin-top: 0;
  }

  #__content a {
    color: rgba(253, 186, 116, 0.95);
    text-decoration: none;
  }

  #__content a:hover {
    text-decoration: underline;
  }

  #__content strong {
    color: rgba(255, 255, 255, 0.96);
    font-weight: 650;
  }

  #__content h2 {
    margin-top: 2.75rem;
    margin-bottom: 1.1rem;
    padding: 0.55rem 0.85rem;
    border-radius: 0.9rem;
    font-size: 1.45rem;
    line-height: 1.25;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: rgba(255, 255, 255, 0.96);
    background: rgba(255, 255, 255, 0.028);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
    scroll-margin-top: 7rem;
  }

  #__content h3 {
    margin-top: 1.9rem;
    margin-bottom: 0.7rem;
    font-size: 1.15rem;
    line-height: 1.35;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.92);
    scroll-margin-top: 7rem;
  }

  #__content ul,
  #__content ol {
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
    padding-left: 1.5rem;
  }

  #__content li {
    margin-top: 0.4rem;
    line-height: 1.7;
  }

  #__content hr {
    margin: 2.2rem 0;
    border: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.10);
    border-radius: 999px;
  }

  #__content blockquote {
    margin: 1.8rem 0;
    padding: 0.7rem 1rem;
    border-left: 3px solid rgba(251, 146, 60, 0.5);
    background: rgba(255, 255, 255, 0.03);
    border-radius: 0.8rem;
    color: rgba(255, 255, 255, 0.82);
  }

  #__content code {
    padding: 0.15rem 0.35rem;
    border-radius: 0.35rem;
    background: rgba(255, 255, 255, 0.06);
    color: rgba(253, 230, 138, 0.95);
  }

  @media (min-width: 768px) {
    #__content p {
      font-size: 1.05rem;
    }
    #__content h2 {
      font-size: 1.65rem;
    }
    #__content h3 {
      font-size: 1.22rem;
    }
  }
`}</style>

      <main
        id="top"
        className="mx-auto w-full max-w-7xl px-4 pb-24 pt-10"
      >
      <div className="mb-6 flex items-center justify-between gap-3">
        <Link
          href="/articles"
          className="text-sm text-white/70 hover:text-white"
        >
          ← Retour aux articles
        </Link>

        {article.sourceUrl ? (
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-white/70 hover:text-white"
          >
            Source ↗
          </a>
        ) : null}
      </div>

      <header className="mb-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.06)] md:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-white/65">
          {article.publishedAt ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
              {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </span>
          ) : null}

          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
            ≈ {readingMinutes} min de lecture
          </span>

          {article.tags?.length ? (
            <span className="flex flex-wrap gap-2">
              {article.tags.slice(0, 6).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-2 py-1"
                >
                  {t}
                </span>
              ))}
            </span>
          ) : null}
        </div>

        <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {article.title}
        </h1>

        {article.excerpt ? (
          <p className="mt-5 max-w-3xl text-pretty text-[15px] leading-7 text-white/80 md:text-base">
            {article.excerpt}
          </p>
        ) : null}

        {article.coverImage ? (
          <div className="mt-7 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.8)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverImage.startsWith("http") ? article.coverImage : `${base}${article.coverImage}`}
              alt=""
              className="h-[240px] w-full object-cover md:h-[380px]"
              loading="lazy"
            />
          </div>
        ) : null}
      </header>

      <section className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* CONTENT */}
        <div className="min-w-0 space-y-6">
          {toc.length ? (
            <details className="rounded-2xl border border-white/10 bg-white/5 p-4 lg:hidden">
              <summary className="cursor-pointer select-none text-sm font-medium text-white/80">
                Sommaire de l’article
              </summary>
              <nav className="mt-3 space-y-2 text-sm">
                {toc
                  .filter((i) => i.text)
                  .slice(0, 18)
                  .map((i) => (
                    <a
                      key={i.id}
                      href={`#${i.id}`}
                      className={
                        i.level === 2
                          ? "block text-white/85 hover:text-white"
                          : "ml-3 block text-white/70 hover:text-white"
                      }
                    >
                      {i.text}
                    </a>
                  ))}
              </nav>
            </details>
          ) : null}
          <div
            id="__content"
            className={[
              "rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8",
              "prose prose-invert max-w-none prose-lg md:prose-xl",
              "prose-p:leading-[1.9] prose-p:text-white/85 prose-p:text-[16px] md:prose-p:text-[18px] prose-p:tracking-[0.01em]",
              "prose-p:mt-6",
              "prose-headings:scroll-mt-28 prose-headings:text-white",
              "prose-h2:mt-16 prose-h2:mb-7 prose-h2:rounded-2xl prose-h2:bg-white/[0.035] prose-h2:px-4 prose-h2:py-3 prose-h2:text-3xl prose-h2:leading-tight prose-h2:font-semibold prose-h2:tracking-tight prose-h2:ring-1 prose-h2:ring-white/10",
              "prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-xl prose-h3:leading-snug prose-h3:font-semibold prose-h3:text-white/90",
              "prose-a:text-orange-300 prose-a:no-underline hover:prose-a:underline",
              "prose-strong:text-white",
              "prose-hr:border-white/10",
              "prose-hr:my-12",
              "prose-hr:rounded-full",
              "prose-blockquote:my-8 prose-blockquote:rounded-xl prose-blockquote:border-l-orange-400/50 prose-blockquote:bg-white/[0.03] prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:text-white/80",
              "prose-ul:my-6 prose-ol:my-6 prose-ul:pl-6 prose-ol:pl-6",
              "prose-li:my-2 prose-li:leading-7 prose-li:marker:text-white/40",
              "prose-code:rounded prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:text-orange-200",
            ].join(" ")}
          >
            {html ? (
              <div dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <p className="text-white/70">Contenu indisponible.</p>
            )}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <Link href="/articles" className="text-sm text-white/70 hover:text-white">
              ← Retour aux articles
            </Link>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="sticky top-24 hidden h-fit lg:block">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.8)]">
            <div className="text-xs font-medium text-white/60">Dans cet article</div>

            {toc.length ? (
              <nav className="mt-3 space-y-2 text-sm">
                {toc
                  .filter((i) => i.text)
                  .slice(0, 18)
                  .map((i) => (
                    <a
                      key={i.id}
                      href={`#${i.id}`}
                      className={
                        i.level === 2
                          ? "block rounded-lg px-2 py-1 text-white/85 hover:bg-white/[0.06] hover:text-white"
                          : "ml-3 block rounded-lg px-2 py-1 text-white/70 hover:bg-white/[0.06] hover:text-white"
                      }
                    >
                      {i.text}
                    </a>
                  ))}
              </nav>
            ) : (
              <div className="mt-3 text-sm text-white/60">Aucun sommaire détecté.</div>
            )}

            <div className="mt-4 border-t border-white/10 pt-4 text-xs text-white/60">
              <div className="flex items-center justify-between">
                <span>Haut</span>
                <a href="#top" className="text-orange-300 hover:underline">
                  ↑
                </a>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span>Source</span>
                {article.sourceUrl ? (
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-300 hover:underline"
                  >
                    Ouvrir ↗
                  </a>
                ) : (
                  <span>—</span>
                )}
              </div>
            </div>
          </div>
        </aside>
      </section>
      </main>
    </>
  );
}