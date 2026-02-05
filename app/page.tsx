import Link from "next/link";
import Container from "@/app/components/Container";
import SectionTitle from "@/app/components/SectionTitle";

const quickLinks = [
  {
    title: "Comprendre les mécanismes",
    desc: "Signaux d’alerte, emprise, manipulation…",
    href: "/blog/signeaux-emprise",
    icon: "🧠",
  },
  {
    title: "Lire des témoignages",
    desc: "Parcours, reconstruction, soutien.",
    href: "/blog",
    icon: "💬",
  },
  {
    title: "Accéder aux ressources",
    desc: "Guides, institutions, numéros utiles.",
    href: "/ressources",
    icon: "📚",
  },
];

// ✅ Derniers articles (réels) — récup depuis ton API interne
// On normalise au max car ton /api/articles peut renvoyer différentes shapes (items/data/result...)

type HomeArticle = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
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

  return {
    title,
    slug,
    excerpt: excerpt || "Lire l’article…",
    category: category || "Article",
    publishedAt: publishedAt || new Date().toISOString().slice(0, 10),
    readingTime: readingTime || undefined,
  };
}

async function getLatestArticles(limit = 4): Promise<HomeArticle[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/articles?limit=${limit}`, {
      // ✅ en prod: ISR léger. En dev: refresh à chaque req.
      next: { revalidate: 60 },
      cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    });

    if (!res.ok) return [];

    const json = await res.json();
    const items = pickItems(json);

    return items
      .map(normalizeArticle)
      .filter(Boolean)
      .slice(0, limit) as HomeArticle[];
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function HomePage() {
  const latestArticles = await getLatestArticles(4);
  return (
    <Container>
      {/* HERO (plus moderne) */}
      <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.04] to-transparent p-8 sm:p-12">
        {/* décor */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_10%_10%,rgba(255,255,255,0.10),transparent_60%)]" />
        </div>

        <div className="relative">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            Association • Prévention • Information
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
                Informer, prévenir et aider face aux{" "}
                <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
                  dérives sectaires
                </span>
                .
              </h1>

              <p className="mt-4 text-white/70 text-base sm:text-lg leading-relaxed">
                Crise Conscience propose des contenus clairs, des ressources fiables et un espace de contact
                pour accompagner personnes concernées, proches et professionnels.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/articles"
                  className="inline-flex justify-center rounded-xl bg-orange-500 px-5 py-3 font-semibold text-black hover:brightness-110 transition"
                >
                  Découvrir les articles
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
                >
                  Obtenir de l’aide / nous contacter
                </Link>
              </div>

              {/* mini stats / repères */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                {["Ressources vérifiées", "Approche pédagogique", "Confidentialité", "Mise à jour régulière"].map(
                  (t) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70"
                    >
                      <span className="mr-2 text-orange-300">✓</span>
                      {t}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* bloc focus */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-white/70">Point de départ rapide</div>
                <div className="mt-2 text-lg font-semibold">Vous êtes concerné ?</div>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">
                  Quelques repères immédiats : que faire, quoi éviter, et vers qui se tourner.
                </p>

                <div className="mt-4 space-y-3">
                  {["Parler à une personne de confiance", "Conserver des preuves", "Demander conseil (pro/asso)"]
                    .map((x) => (
                      <div
                        key={x}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                      >
                        <span className="mt-0.5 text-orange-300">→</span>
                        <div className="text-sm text-white/75">{x}</div>
                      </div>
                    ))}
                </div>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex w-full justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-semibold text-white hover:bg-white/10 transition"
                >
                  Contacter l’association
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NAV RAPIDE */}
      <section className="mt-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-orange-500/10 blur-2xl" />
              </div>
              <div className="relative">
                <div className="text-2xl">{c.icon}</div>
                <div className="mt-3 font-semibold tracking-tight group-hover:text-white">
                  {c.title}
                </div>
                <div className="mt-1 text-sm text-white/60">{c.desc}</div>
                <div className="mt-4 text-sm text-orange-300">Accéder →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* DERNIERS ARTICLES */}
      <section className="mt-14">
        <SectionTitle
          eyebrow="Derniers articles"
          title="Extraits récents"
          desc="Cette zone est prête pour l’automatisation (n8n + Strapi / RSS → /api/articles)."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {(latestArticles.length ? latestArticles : []).map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">
                  {a.category}
                </span>
                <span className="text-xs text-white/50">{formatDate(a.publishedAt)}</span>
                {a.readingTime ? (
                  <>
                    <span className="text-xs text-white/50">•</span>
                    <span className="text-xs text-white/50">{a.readingTime}</span>
                  </>
                ) : null}
              </div>

              <div className="mt-3 text-lg font-semibold tracking-tight group-hover:text-white">
                {a.title}
              </div>
              <p className="mt-2 text-sm text-white/65 leading-relaxed line-clamp-3">
                {a.excerpt}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-orange-300">Lire →</div>
                <div className="text-xs text-white/45">Article</div>
              </div>
            </Link>
          ))}
        </div>

        {!latestArticles.length ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            Aucun article publié pour le moment. Dès qu’un article est envoyé via n8n → /api/articles, il apparaîtra ici.
          </div>
        ) : null}

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/articles"
            className="inline-flex justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
          >
            Voir tous les articles
          </Link>
          <Link
            href="/blog"
            className="inline-flex justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
          >
            Voir le blog
          </Link>
        </div>
      </section>

      {/* MISSION */}
      <section className="mt-14 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
          <SectionTitle title="Notre mission" desc="Une approche pédagogique, empathique et factuelle." />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Comprendre",
                desc: "Expliquer les mécanismes d’emprise et les signaux d’alerte.",
              },
              {
                title: "Outiller",
                desc: "Centraliser des ressources fiables (guides, institutions, associations).",
              },
              {
                title: "Orienter",
                desc: "Aider à trouver le bon interlocuteur : psy, juriste, asso, etc.",
              },
              {
                title: "Prévenir",
                desc: "Favoriser la prise de recul et la pensée critique, sans stigmatisation.",
              },
            ].map((x) => (
              <div
                key={x.title}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <div className="font-semibold">{x.title}</div>
                <p className="mt-1 text-sm text-white/65 leading-relaxed">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CITATION / TEMOIGNAGE */}
      <section className="mt-14">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-8">
          <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
          <p className="relative text-lg sm:text-xl text-white/80 leading-relaxed">
            “Comprendre les mécanismes, c’est déjà reprendre du pouvoir.”
          </p>
          <p className="relative mt-2 text-sm text-white/60">— Crise Conscience</p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mt-14">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-orange-500/15 via-white/5 to-sky-500/10 p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm text-white/70">Besoin d’un point d’entrée clair ?</div>
              <div className="mt-1 text-xl font-semibold">Commencez par les ressources essentielles</div>
              <p className="mt-1 text-sm text-white/60">
                Guides, numéros utiles, institutions, repères de sécurité.
              </p>
            </div>
            <Link
              href="/ressources"
              className="inline-flex justify-center rounded-xl bg-orange-500 px-5 py-3 font-semibold text-black hover:brightness-110 transition"
            >
              Voir les ressources
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}