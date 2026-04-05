import Link from "next/link";
import Image from "next/image";

type RelatedArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  coverImage?: string | null;
  tags?: string[] | null;
  publishedAt?: string | null;
};

function formatFR(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "2-digit" });
}

function computeScore(current: RelatedArticle, candidate: RelatedArticle): number {
  let score = 0;
  const currentTags = new Set((current.tags ?? []).map((t) => t.toLowerCase()));
  const candidateTags = (candidate.tags ?? []).map((t) => t.toLowerCase());

  for (const tag of candidateTags) {
    if (currentTags.has(tag)) score += 3;
  }

  // Boost recent articles
  if (candidate.publishedAt) {
    const age = Date.now() - new Date(candidate.publishedAt).getTime();
    const daysOld = age / (1000 * 60 * 60 * 24);
    if (daysOld < 30) score += 2;
    else if (daysOld < 90) score += 1;
  }

  return score;
}

export function RelatedArticles({
  current,
  allArticles,
  max = 3,
}: {
  current: RelatedArticle;
  allArticles: RelatedArticle[];
  max?: number;
}) {
  const candidates = allArticles.filter(
    (a) => a.id !== current.id && a.slug !== current.slug
  );

  if (candidates.length === 0) return null;

  const scored = candidates
    .map((a) => ({ article: a, score: computeScore(current, a) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // Tie-break: most recent first
      const da = a.article.publishedAt ? new Date(a.article.publishedAt).getTime() : 0;
      const db = b.article.publishedAt ? new Date(b.article.publishedAt).getTime() : 0;
      return db - da;
    })
    .slice(0, max);

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-xl font-semibold tracking-tight text-white">
        Articles similaires
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {scored.map(({ article: a }) => {
          const href = `/articles/${encodeURIComponent(a.slug || a.id)}`;
          const date = formatFR(a.publishedAt);
          const cover = a.coverImage || null;

          return (
            <Link
              key={a.id || a.slug}
              href={href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"
            >
              {/* Cover */}
              <div className="relative h-32 w-full overflow-hidden">
                {cover ? (
                  <>
                    <Image
                      src={cover}
                      alt={a.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover opacity-80 transition group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/80 to-transparent" />
                  </>
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/0" />
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {a.tags?.length ? (
                  <span className="mb-2 inline-flex rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/60">
                    {a.tags[0]}
                  </span>
                ) : null}

                <h3 className="text-sm font-semibold tracking-tight text-white/90 line-clamp-2 group-hover:text-white">
                  {a.title}
                </h3>

                {a.excerpt ? (
                  <p className="mt-1.5 text-xs text-white/55 line-clamp-2">
                    {a.excerpt}
                  </p>
                ) : null}

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-orange-300">Lire →</span>
                  {date && (
                    <time className="text-white/40" dateTime={a.publishedAt || undefined}>
                      {date}
                    </time>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
