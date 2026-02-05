import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Link from "next/link";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  theme: string;
  coverUrl?: string;
  url?: string; // url publique (si n8n publie ailleurs)
  publishedAt?: string;
  readingTime?: string;
};

type ApiResponse = {
  items: Article[];
  meta?: { ok?: boolean; reason?: string; count?: number };
};

function formatFR(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "2-digit" });
}

export default async function ArticlesPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const res = await fetch(`${base}/api/articles`, {
    // en dev, NEXT_PUBLIC_SITE_URL peut être vide => fetch relatif OK
    cache: "no-store",
  }).catch(() => null);

  let data: ApiResponse = { items: [], meta: { ok: false, reason: "API /api/articles indisponible" } };
  if (res && res.ok) {
    try {
      data = (await res.json()) as ApiResponse;
    } catch {
      data = { items: [], meta: { ok: false, reason: "Réponse JSON invalide" } };
    }
  }

  // On considère la sync OK si l'API répond et qu'on a des items
  const items = (data.items ?? []).slice().sort((a, b) => {
    const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return db - da;
  });

  const ok = (data.meta?.ok ?? res?.ok ?? false) || items.length > 0;
  const reason = data.meta?.reason ?? "";
  const count = data.meta?.count ?? items.length;

  // Thèmes uniques (UI simple)
  const themes = Array.from(new Set(items.map((a) => a.theme).filter(Boolean))).slice(0, 12);

  return (
    <Container>
      <SectionTitle
        eyebrow="Articles"
        title="Dossiers & analyses approfondies"
        desc="Ces articles sont générés et publiés automatiquement via n8n (agent IA)."
      />

      {/* Bandeau info N8N */}
      <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-semibold text-white">Source :</span> n8n / API
          </div>
          <div className="text-white/60">
            {ok ? `${count} article(s)` : "Sync non confirmé"}
          </div>
        </div>
        {!ok && reason ? <div className="mt-2 text-orange-300">Pourquoi c’est vide ? {reason}</div> : null}
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
          <h3 className="text-lg font-semibold tracking-tight">Aucun article pour le moment</h3>
          <p className="mt-2 text-white/70 max-w-2xl">
            Nos articles sont générés automatiquement via <span className="text-white">n8n</span>.
            Tant que le workflow ne publie rien (ou que l’API n’est pas configurée), cette page reste vide.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">À vérifier côté n8n</div>
              <ul className="mt-2 space-y-1 text-sm text-white/70">
                <li>• Le webhook répond bien en JSON</li>
                <li>• Le flux renvoie une liste d’articles</li>
                <li>• Token/URL corrects dans `.env.local`</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">Tu veux tester vite ?</div>
              <p className="mt-2 text-sm text-white/70">
                Lance un run manuel du workflow n8n et renvoie 1 article.
                Dès qu’il sort, la page s’auto-remplit.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex justify-center rounded-xl bg-orange-500 px-5 py-3 font-semibold text-black hover:brightness-110 transition"
            >
              Nous contacter
            </Link>
            <Link
              href="/blog"
              className="inline-flex justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              Voir le blog
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((a) => {
            const date = formatFR(a.publishedAt);
            const metaLine = [date, a.readingTime].filter(Boolean).join(" • ");

            const key = a.url ? a.id : a.id;
            const slugOrId = (a as any).slug || a.id; // compat si l'API renvoie slug
            const href = `/articles/${encodeURIComponent(String(slugOrId))}`;

            return (
              <Link
                key={a.id}
                href={href}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                <div className="relative z-10 h-36 w-full overflow-hidden">
                  {a.coverUrl ? (
                    <>
                      <img
                        src={a.coverUrl}
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
                    <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                      {a.theme || "Article"}
                    </span>
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
  );
}