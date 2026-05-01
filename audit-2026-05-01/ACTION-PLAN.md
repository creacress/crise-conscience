# Plan d'action SEO — Crise Conscience

**Score actuel** : 51/100
**Cible 6 mois** : 75/100
**Date** : 2026-05-01

Plan structuré en 4 vagues : **(1) Lots 1-2 déjà appliqués en local** (à déployer pour fixer 60 % des problèmes), **(2) corrections critiques additionnelles** (issues de cet audit, non couvertes par les lots 1-2), **(3) Lot 3 — contenus**, **(4) Lot 4 — design/refonte**.

---

## Vague 1 — Déployer les lots 1 & 2 (déjà en local, prêts)

C'est la priorité absolue avant tout reste. Beaucoup de findings de cet audit sont déjà adressés dans le code local non déployé.

| # | Action | Fichier | Statut |
|---|---|---|---|
| V1-01 | Mentions légales / Confidentialité / Cookies | [app/mentions-legales](../app/mentions-legales/page.tsx), [app/confidentialite](../app/confidentialite/page.tsx), [app/cookies](../app/cookies/page.tsx) | Fait, à déployer |
| V1-02 | `lib/schema.ts` : Organization NGO enrichi (parentOrganization UNADFI, logo, sameAs, contactPoint, knowsAbout) | [lib/schema.ts](../lib/schema.ts) | Fait, à déployer |
| V1-03 | JSON-LD Article complété (author, dateModified, publisher.logo, mainEntityOfPage, isAccessibleForFree, inLanguage) | [app/articles/[id]/page.tsx](../app/articles/[id]/page.tsx), [app/blog/signeaux-emprise/page.tsx](../app/blog/signeaux-emprise/page.tsx) | Fait, à déployer |
| V1-04 | FAQPage schema sur `/a-propos` | [app/a-propos/page.tsx](../app/a-propos/page.tsx) | Fait, à déployer |
| V1-05 | Composant `KeyTakeaways` (À retenir + Sources) intégré sur `signeaux-emprise` | [app/components/KeyTakeaways.tsx](../app/components/KeyTakeaways.tsx) | Fait, à déployer |
| V1-06 | `app/opengraph-image.tsx` (OG image générée 1200×630) | [app/opengraph-image.tsx](../app/opengraph-image.tsx) | Fait, à déployer |
| V1-07 | `llms.txt` v2 (markdown standard) + `llms-full.txt` créé | [public/llms.txt](../public/llms.txt), [public/llms-full.txt](../public/llms-full.txt) | Fait, à déployer |
| V1-08 | Image hotlinkée jw-cdn.org **retirée** sur signeaux-emprise (remplacée par SVG inline) | [app/blog/signeaux-emprise/page.tsx:164](../app/blog/signeaux-emprise/page.tsx) | Fait, à déployer |
| V1-09 | Footer enrichi (UNADFI, mentions légales, transparence IA) | [app/components/SiteFooter.tsx](../app/components/SiteFooter.tsx) | Fait, à déployer |
| V1-10 | Empty state `/articles` réécrit (suppression mention n8n) | [app/articles/page.tsx](../app/articles/page.tsx) | Fait, à déployer |
| V1-11 | `robots.ts` enrichi (ClaudeBot, Bingbot, Googlebot, training bots bloqués) | [app/robots.ts](../app/robots.ts) | Fait, à déployer |
| V1-12 | Pages légales et `/inscription`, `/desinscription`, `/abonnes`, `/don` ajoutées au sitemap | [app/sitemap.ts](../app/sitemap.ts) | Fait, à déployer |

**Action** : merger les lots 1-2 et déployer. Re-soumettre le sitemap dans GSC.

---

## Vague 2 — Critiques additionnelles révélées par l'audit (non couvertes par lots 1-2)

### Critiques (à fixer en moins d'une semaine)

#### V2-01 — Bug `sitemap.ts` : passer `slug` au lieu de `id` ⚡ BLOQUANT

**Fichier** : [app/sitemap.ts](../app/sitemap.ts)
**Problème** : 5 URLs `/articles/{cuid}` retournent 404 car le sitemap pousse `article.id` (CUID Prisma) alors que la route résout par `slug`.
**Effort** : 15 min.
**Patch** :

```ts
// app/sitemap.ts (extrait)
const rows = await prisma.article.findMany({
  select: { slug: true, updatedAt: true, createdAt: true, status: true },
  where: { status: "published" },
  orderBy: { updatedAt: "desc" },
});

articleRoutes = rows.map((a) => ({
  url: `${base}/articles/${encodeURIComponent(a.slug)}`,
  lastModified: new Date(a.updatedAt ?? a.createdAt ?? Date.now()),
}));
```

Après déploiement, soumettre à nouveau le sitemap dans GSC pour forcer le recrawl.

#### V2-02 — `not-found` doit forcer `noindex`

**Fichiers à créer/modifier** : `app/not-found.tsx`, `app/articles/[id]/not-found.tsx`
**Problème** : payload RSC ré-injecte `<meta name="robots" content="index, follow">` qui écrase le `noindex` initial sur les pages 404.
**Effort** : 15 min.
**Patch** :

```tsx
// app/not-found.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Page introuvable</h1>
      <p className="mt-4 text-white/70">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link href="/" className="mt-8 inline-flex rounded-xl bg-orange-500 px-5 py-3 font-semibold text-black">
        Retour à l'accueil
      </Link>
    </main>
  );
}
```

Idem pour `app/articles/[id]/not-found.tsx`.

#### V2-03 — Renommer `/blog/signeaux-emprise` → `/blog/signaux-emprise` + 301

**Fichier** : renommer le dossier `app/blog/signeaux-emprise` → `app/blog/signaux-emprise`.
**Problème** : faute de frappe ("signeaux") qui empêche le ciblage exact du keyword "signaux d'emprise" (volume estimé +30 % vs orthographe correcte).
**Effort** : 30 min.
**Patch** :
1. `git mv app/blog/signeaux-emprise app/blog/signaux-emprise`
2. Ajouter dans `next.config.ts` :
   ```ts
   async redirects() {
     return [
       { source: "/blog/signeaux-emprise", destination: "/blog/signaux-emprise", permanent: true },
     ];
   }
   ```
3. Mettre à jour les liens internes (footer, home, llms.txt, llms-full.txt, sitemap.ts).

#### V2-04 — `/don` : ajouter DonateAction + WebPage schema + transparence financière

**Fichier** : `app/don/page.tsx`
**Problème** : 0 JSON-LD, pas de mention déductibilité fiscale (66 % d'intérêt général), pas de lien rapport d'activité.
**Effort** : 1h (texte + schema).
**Snippet** : voir le rapport `seo-schema` (section 3.2).

#### V2-05 — Retirer le `preconnect` jw-cdn.org du layout

**Fichier** : probablement [app/layout.tsx](../app/layout.tsx) ou un composant chargé dans le head.
**Problème** : `<link rel="preconnect" href="https://cms-imgp.jw-cdn.org">` + `<link rel="dns-prefetch">` toujours dans le `<head>` alors qu'aucune ressource n'est plus servie de ce CDN. Signal indésirable + warmup réseau inutile.
**Effort** : 5 min.
**Action** : grep `jw-cdn` dans tout le repo et nettoyer.

```bash
grep -rn "jw-cdn" /Users/webcressontech/Documents/crise-conscience/app
```

### Élevés (à fixer dans les 2 semaines)

#### V2-06 — Bio "L'équipe / Rédaction" sur `/a-propos` + méthode 70/30 visible

**Fichier** : [app/a-propos/page.tsx](../app/a-propos/page.tsx)
**Problème** : E-E-A-T critique pour YMYL. La méthode 70/30 IA/humain doit être visible dans le HTML, pas seulement dans `llms.txt`.
**Note** : la version locale post-lot 1-2 a déjà une section "Notre méthode éditoriale" — à enrichir avec une section "L'équipe" même générique ("équipe de bénévoles spécialisés en sciences sociales, relue par des professionnels de la santé mentale et du droit").

#### V2-07 — Numéros d'urgence visibles sur pages sensibles

**Fichiers** : `/blog/signaux-emprise`, `/ressources`, `/contact`, `/aider-un-proche` (futur).
**Numéros** : 15 (SAMU), 17 (Police), 18 (Pompiers), 112 (urgences européennes), **3114 (prévention suicide)**, 119 (enfance en danger), 3919 (violences faites aux femmes).
**Forme** : composant `EmergencyBox` à créer, à insérer en pied de chaque page sensible.

#### V2-08 — Réécrire le 1er paragraphe de `/a-propos`

**Problème** : l'incipit en prod commence par "analyse critique des discours religieux, idéologiques et organisationnels à caractère dogmatique" → un LLM résumant la page peut classer Crise Conscience comme "anti-religion".
**Cible** : "Crise Conscience est une association loi 1901, partenaire de l'UNADFI, dédiée à la prévention des dérives sectaires en France. Nous analysons les comportements d'emprise et leurs conséquences — jamais les croyances individuelles."
**Note** : la version locale (post lot 1-2) a déjà cette amélioration ; à confirmer au déploiement.

#### V2-09 — Trailing slash + canonical home

**Problème** : canonical = `https://www.criseconscience.org` (sans /) mais `/` sert sans redirect.
**Patch** : choisir une politique. Recommandé : conserver sans slash final (alignement avec le canonical actuel) ; ajouter un redirect dans `vercel.json` ou `next.config.ts`.

#### V2-10 — CSP minimal

**Fichier** : `next.config.ts` headers.
**Effort** : 1h (initiale) + suivi.
**Snippet** : voir le rapport `seo-technical` (F5).

#### V2-11 — `next/font` au lieu de Google Fonts en stylesheet

**Problème** : `Inter:wght@400;500;600;700&display=swap` chargé en double (`<link rel="stylesheet">` + `<link rel="preload">`). Migration vers `next/font/google` élimine la latence externe et le double chargement.
**Effort** : 30 min.

```ts
// app/layout.tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], display: "swap", weight: ["400","500","600","700"] });

export default function RootLayout({ children }) {
  return <html lang="fr" className={inter.className}>...</html>;
}
```

#### V2-12 — Activer ISR (cache Vercel Edge) sur les pages statiques

**Fichiers** : pages Server Components publiques.
**Effort** : 30 min.
**Patch** : ajouter `export const revalidate = 3600;` sur les pages statiques (home, /a-propos, /ressources, /blog/*, /mentions-legales, /confidentialite, /cookies). Évite le `no-store` systématique et permet le cache Vercel Edge → TTFB réduit.

#### V2-13 — Sitemap : différencier `lastModified`, retirer `changefreq` & `priority`

Voir snippet complet du rapport `seo-sitemap` (section 7).

#### V2-14 — Images : `width`/`height` sur toutes les `<img>`, migration `next/image`

**Pages concernées** : `/articles` (4 vignettes), `/blog/signaux-emprise` (1 image).
**Effort** : 1h.
**Bénéfice** : élimine le risque CLS, optimisation auto WebP.

### Moyens (à fixer dans le mois)

| # | Action | Effort |
|---|---|---|
| V2-15 | Retirer `Host:` du `robots.txt` source | 5 min |
| V2-16 | Page 404 en français + lien retour | 15 min |
| V2-17 | Ajouter `lastUpdated` et `license` (CC BY-NC ou RSL-1.0) à `llms.txt` | 10 min |
| V2-18 | Supprimer ou conditionner `SearchAction` du WebSite tant que la recherche n'existe pas | 5 min |
| V2-19 | Ajouter BreadcrumbList sur toutes les pages de profondeur ≥ 1 | 30 min |
| V2-20 | `meta description` < 160 caractères (pages /blog/signeaux-emprise notamment 227 chars) | 15 min |
| V2-21 | H1 manquant sur `/articles` et `/blog` (CollectionPage) | 15 min |
| V2-22 | Espace parasite dans le H1 home (`"...sectaires ."`) | 5 min |
| V2-23 | IndexNow webhook après publication d'article | 1-2h |
| V2-24 | Supprimer cannibalisation `/blog` ↔ `/articles` (301 de `/blog` vers `/articles`, garder uniquement `/blog/<slug>` ou tout migrer vers `/articles/<slug>`) | 1h |

---

## Vague 3 — Lot 3 contenus (utiliser `seo-cluster` + `seo-content`)

Toutes les pages ci-dessous doivent suivre la règle 70/30 IA/humain et inclure :
- bio auteur ou rédaction nommée + signal d'expertise,
- dates `publié le` / `mis à jour le` visibles,
- numéros d'urgence en pied de page,
- bloc `KeyTakeaways` (À retenir + Sources),
- breadcrumb visible + JSON-LD BreadcrumbList,
- schema spécifique (FAQPage, HowTo, DefinedTermSet selon le cas).

| # | Page | Schemas requis | Persona ciblé |
|---|---|---|---|
| V3-01 | `/aider-un-proche` (HowTo 5 étapes + FAQ) | HowTo + FAQPage + Article | Persona A |
| V3-02 | `/test-emprise` (checklist BITE model interactive) | SoftwareApplication ou DefinedTermSet | Persona B en crise |
| V3-03 | `/glossaire` (20-30 termes : emprise, sujétion, ostracisme, BITE model, faisceau d'indices, gourou, sortie spirituelle…) | DefinedTermSet + DefinedTerm | Persona C |
| V3-04 | `/se-reconstruire` (guide long + témoignages anonymisés structurés) | Article + Person (témoins, anonymisés) | Persona B |
| V3-05 | `/faq` (30-50 questions thématisées) | FAQPage | Tous personas |
| V3-06 | `/temoignages` (recueil structuré, opt-in explicite) | CollectionPage + Person | Persona B + D |
| V3-07 | Plus 5-10 articles de fond pour `/articles` (long-form 1200-1800 mots, sourcés) | Article + KeyTakeaways | Tous |

**Workflow recommandé** :
1. Lancer `seo-cluster` avec les keywords cibles → architecture sémantique hub-and-spoke.
2. Pour chaque page : `seo-content` (E-E-A-T), `seo-schema` (génération du JSON-LD), `seo-image-gen` (hero + OG dédiés).
3. Ajouter les pages au sitemap + soumission GSC + IndexNow.

---

## Vague 4 — Lot 4 design (utiliser `ui-ux-pro-max`)

Une fois Vague 1-3 stabilisées :

1. **`ui-ux-pro-max plan`** sur la home + parcours principaux (palette, typographie, composants, tokens design).
2. **Logo SVG** dédié (actuellement : disque orange + texte). Cible : pictogramme conscience/conscience/œil ouvert minimal, deux variantes light/dark.
3. **OG images par page** (déjà fait pour la racine via `app/opengraph-image.tsx`, à dériver pour les pages stratégiques : signaux-emprise, aider-un-proche, glossaire, faq).
4. **A11y** : skip-link, contrastes (audit `text-white/45`, `text-white/50` qui sont sous WCAG AA), labels ARIA, focus visible, navigation clavier.
5. **Filtres `/blog` fonctionnels** (catégories en `searchParams`).
6. **Refonte `/articles` en grille** avec couvertures auto-générées (gradient + initiales du titre) si pas de `coverImage`.
7. **Refonte `/don`** avec composant tunnel (montants suggérés, déductibilité affichée, badge sécurisé).

---

## Suivi & metrics

### Mesures à faire post-déploiement

- [ ] Renouveler la clé Google API (PageSpeed/CrUX) → `python scripts/google_auth.py --check`
- [ ] Connecter Google Search Console + GA4 → permet `seo-google` sur les prochains audits
- [ ] Capturer un baseline `seo-drift` post-déploiement Vague 1 :
  ```bash
  python scripts/drift_baseline.py https://www.criseconscience.org/
  ```
- [ ] Relancer `seo-audit` 2 semaines après le déploiement de la Vague 1 pour mesurer le delta

### KPIs à suivre

| Indicateur | Baseline | Cible 1 mois | Cible 6 mois |
|---|---|---|---|
| SEO Health Score | 51 | 65 | 75 |
| E-E-A-T composite | 29 | 50 | 70 |
| AI Citation Readiness | 22 | 50 | 75 |
| SXO Gap Score | 37 | 55 | 70 |
| URLs indexées (GSC) | ? | 14 saines | 30+ |
| Pages 404 dans sitemap | 5 | 0 | 0 |
| Pages avec `og:image` | 0 | 14 | 100 % |
| Pages avec auteur nommé | 0 | 9 (statiques) | 100 % |
| Mentions Crise Conscience dans AI Overviews | 0 (estimé) | 1-2 | 5-10 |

---

## Ordre de bataille recommandé

| Quand | Quoi |
|---|---|
| **Cette semaine** | Vague 1 (déploiement lots 1-2) + V2-01, V2-02, V2-03, V2-04, V2-05 |
| **Semaine suivante** | V2-06 à V2-14 (E-E-A-T + perf + cache + canonical + CSP) |
| **Semaines 3-4** | V2-15 à V2-24 (moyens) + baseline `seo-drift` |
| **Mois 2** | Vague 3 — pages /aider-un-proche, /faq, /glossaire (priorité 1) |
| **Mois 3-4** | Vague 3 — /test-emprise, /se-reconstruire, /temoignages + 5-10 articles |
| **Mois 5-6** | Vague 4 — refonte design `ui-ux-pro-max`, logo, A11y, filtres blog |
