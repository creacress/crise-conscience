# Audit SEO complet — Crise Conscience

**Domaine audité** : https://www.criseconscience.org/
**Date** : 1er mai 2026
**Périmètre** : 14 URLs (sitemap public)
**Type d'organisation détecté** : ONG / Association loi 1901 (sujet YMYL : santé mentale + juridique)
**Outillage** : suite `claude-seo` (orchestrateur + 6 spécialistes : technical, content, schema, geo, sxo, sitemap) + analyse perf statique manuelle (PageSpeed indisponible — clé API expirée)

---

## SEO Health Score : **51 / 100**

| Catégorie | Poids | Score | Pondéré |
|---|---|---|---|
| Technical SEO | 22 % | 61 / 100 | 13,4 |
| Content Quality (E-E-A-T) | 23 % | 34 / 100 | 7,8 |
| On-Page SEO | 20 % | 50 / 100 | 10,0 |
| Schema / Structured data | 10 % | 50 / 100 | 5,0 |
| Performance (CWV, lab) | 10 % | 60 / 100 | 6,0 |
| AI Search Readiness (GEO) | 10 % | 56 / 100 | 5,6 |
| Images | 5 % | 60 / 100 | 3,0 |
| **Total** | **100 %** | | **50,8** |

Scores complémentaires (hors pondération) :
- **SXO Gap Score (intent ↔ page-type)** : 37 / 100
- **E-E-A-T composite** : 29 / 100 (Trust 32, Authority 35, Expertise 30, Experience 18)
- **Score AI Citation Readiness** : 22 / 100
- **Citabilité par plateforme IA** : Perplexity 45, ChatGPT 42, Claude 40, Google AIO 38, Bing Copilot 35

**Lecture** : le site a une infrastructure technique solide pour son âge (Next.js SSR, JSON-LD centralisé, llms.txt + llms-full.txt en place, robots autorisant les crawlers IA recherche), mais souffre de défauts critiques bloquants côté indexation (sitemap → 5 articles 404), de contenu insuffisant (5 pages sur 9 < 500 mots), et d'absence quasi totale de signaux E-E-A-T sur un sujet YMYL où ils sont prérequis (auteur nommé, dates de mise à jour visibles, sources institutionnelles citées, disclaimer urgences).

---

## Top 5 problèmes critiques

1. **5 URLs d'articles dans le sitemap retournent 404** ([app/sitemap.ts](../app/sitemap.ts)) — `article.id` (CUID Prisma) est poussé alors que la route `/articles/[id]/page.tsx` résout par `slug`. Google gaspille du budget crawl, déprécie le sitemap, et les contenus longs les plus citables du site sont inaccessibles. **Bloquant pour la citation IA.**
2. **Pages 404 marquées `index, follow` via le RSC** — le payload RSC injecte un `<meta name="robots" content="index, follow">` qui écrase le `noindex` initial du `<head>`. Conséquence : Googlebot indexe des pages 404 comme indexables.
3. **Slug erroné `/blog/signeaux-emprise`** — faute de frappe ("signeaux" au lieu de "signaux") sur la seule page longue du site, avec image hotlinkée jw-cdn.org. Cible mal le keyword exact "signaux d'emprise". Corrigé en local, à déployer + ajouter une 301.
4. **`/don` n'a aucun JSON-LD** et aucun signal de transparence financière (statut fiscal, déductibilité 66 %, lien rapport d'activité). Page critique pour la légitimité associative et la conversion.
5. **Aucun auteur nommé sur le site (sujet YMYL)** — pas de bio, pas de credentials, pas de bloc équipe. Signal E-E-A-T fortement pénalisant pour Google AIO et les LLMs en général.

## Top 5 quick wins (impact fort, effort faible)

1. **Fix `app/sitemap.ts`** : remplacer `article.id` par `article.slug` + supprimer `changefreq`/`priority` (ignorés par Google), différencier les `lastModified` des pages statiques.
2. **Forcer `noindex` sur les `not-found`** : ajouter `export const metadata = { robots: { index: false, follow: false } }` dans `app/articles/[id]/not-found.tsx` et `app/not-found.tsx`.
3. **Renommer `/blog/signeaux-emprise` → `/blog/signaux-emprise`** + redirect 301. Ajouter un bloc "À retenir" via `KeyTakeaways` (déjà en local) en fin de page.
4. **Retirer le `preconnect`/`dns-prefetch` vers `cms-imgp.jw-cdn.org`** dans le layout — il ne sert à rien depuis qu'on retire l'image, et il signale un partenariat indésirable.
5. **Ajouter une bio "L'équipe / La rédaction" sur `/a-propos`** + déclarer la méthode 70/30 IA/humain dans le HTML (et pas seulement dans `llms.txt`).

---

## 1. Technical SEO — score 61/100

### Crawlabilité & indexabilité

| # | Finding | Impact | Source |
|---|---|---|---|
| T-1 | 5 URLs `/articles/{cuid}` du sitemap → 404 (résolution par slug, mais sitemap pousse id) | **Critique** | [seo-technical], [seo-sitemap] |
| T-2 | Pages 404 ré-injectées en `index, follow` par le payload RSC | **Critique** | [seo-technical] |
| T-3 | `ItemList` sur la home référence des URLs encodées (`/articles/Le%20bien%20et%20le%20mal%20%3A...`) avec `:`, espaces, `…` — fragile | Élevé | [seo-technical], [seo-schema] |
| T-4 | Canonical de la home sans trailing slash, mais `/` accessible sans redirect — duplication potentielle | Élevé | [seo-technical] |
| T-5 | Page 404 : `<title>` + message "This page could not be found." en anglais | Faible | [seo-technical] |

### Sécurité / en-têtes HTTP

| # | Finding | Impact |
|---|---|---|
| T-6 | Pas de `Content-Security-Policy` | Élevé (sécu) |
| T-7 | HSTS preload **présent**, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` complet ✓ | OK |
| T-8 | `robots.txt` contient `Host:` (directive Yandex, ignorée Google/Bing) | Faible |

### Cache / protocole / runtime

| # | Finding | Impact |
|---|---|---|
| T-9 | Toutes les pages HTML en `cache-control: private, no-cache, no-store` → `x-vercel-cache: MISS` systématique. Pas d'ISR. | Élevé (perf) |
| T-10 | HTTP/2, gzip, immutable cache sur `/_next/static/*` (1 an) ✓ | OK |
| T-11 | SSR confirmé : H1, navigation, liens internes dans le HTML initial | OK |
| T-12 | Payload RSC `__next_f` ~50 Ko sur certaines pages (notamment 404) | Moyen |

---

## 2. Content Quality / E-E-A-T — score 34/100

### Volumétrie

| Page | Mots | Verdict |
|---|---|---|
| `/blog/signeaux-emprise` | 909 | Page la plus riche, mais < 1 500 attendu sur un YMYL profond |
| `/` (home) | 564 | Acceptable mais sans densité thématique |
| `/ressources` | 496 | Limite (cible : 600+, contextualisation des ressources) |
| `/don` | 415 | OK mais sans statut fiscal ni lien rapport d'activité |
| `/a-propos` | 403 | **Thin** — manque bio équipe, RNA, méthode éditoriale visible |
| `/articles` (liste) | 339 | Liste sans intro éditoriale |
| `/contact` | 297 | Thin (pas d'adresse postale, pas de délai de réponse, pas de mention RGPD sous formulaire) |
| `/inscription` | 240 | Thin (consentement RGPD à expliciter) |
| `/blog` (liste) | 188 | **Thin sévère** — 1 seul article, doublon avec /articles |

### Signaux E-E-A-T manquants (sujet YMYL)

- **Aucun auteur nommé** sur aucune page. "Rédaction Crise Conscience" est trop générique.
- **Aucune date de mise à jour visible** dans le HTML (les dates sont dans la DB mais pas systématiquement affichées).
- **Numéros d'urgence (15/17/18/112, 3114 prévention suicide)** absents des pages sensibles (signeaux-emprise, ressources, contact). Présents seulement dans `llms-full.txt` côté local.
- **Méthode éditoriale 70/30 IA/humain** déclarée dans `llms.txt` mais pas dans le HTML lu par Googlebot/utilisateur.
- **Mentions légales / Politique RGPD / Cookies** : pages créées en local (lots 1-2) mais non déployées en prod.
- **Disclaimer "ne remplace pas un accompagnement professionnel"** : absent.
- **Sources institutionnelles citées** dans le contenu : sous-utilisées (MIVILUDES seul, sans appui DSM, Lifton, Hassan, Académie nationale de médecine).

### Cannibalisation `/articles` vs `/blog`

Coexistence sans distinction éditoriale claire. `/blog` ne contient qu'un article (orphelin) ; `/articles` est la bibliothèque mais pointe vers des 404. Recommandation : conserver `/articles`, rediriger `/blog` → `/articles` en 301, et migrer `/blog/signaux-emprise` → `/articles/signaux-emprise`.

---

## 3. On-Page SEO — score 50/100

| Page | Title (chars) | Description (chars) | H1 | Verdict |
|---|---|---|---|---|
| `/` | 75 | 200 | 1 | OK |
| `/articles` | 65 | 188 | **0** | H1 manquant ! |
| `/blog` | 87 | 188 | 0 | H1 manquant |
| `/ressources` | 89 | 193 | 1 | Description longue (193 > 160 recommandé) |
| `/a-propos` | 84 | 192 | 1 | OK |
| `/contact` | 84 | 171 | 1 | OK |
| `/inscription` | 69 | 183 | 1 | OK |
| `/don` | 59 | 173 | 1 | OK |
| `/blog/signeaux-emprise` | **103** | **227** | 1 | Title tronqué, description tronquée |

- Espace parasite dans le H1 de la home (`"dérives sectaires ."`).
- Aucune page n'a d'`og:image` (image OG manquante partout — partage social peu attractif).
- Liens internes : navigation cohérente, mais pas de fil d'Ariane visible (BreadcrumbList n'apparaît qu'en JSON-LD sur certaines pages).

---

## 4. Schema / Structured data — score 50/100

| Page | Schemas en prod | Statut | Manques |
|---|---|---|---|
| `/` | NGO, WebSite, ItemList | Avertissement | NGO sans `logo`, `parentOrganization`, `foundingDate`, `nonprofitStatus`. SearchAction WebSite pointe vers une recherche inexistante. ItemList renvoie vers slugs probables qui sont 404. |
| `/articles` | CollectionPage, ItemList, BreadcrumbList | Avertissement | h1=0, ItemList vers 404 |
| `/blog` | CollectionPage, ItemList | Avertissement | Pas de BreadcrumbList |
| `/a-propos` | AboutPage, BreadcrumbList | Valide | Pas de FAQPage (corrigé en local) |
| `/ressources` | BreadcrumbList, FAQPage | Info | Pas de CollectionPage avec `hasPart` listant les ressources |
| `/contact` | ContactPage, BreadcrumbList | Avertissement | ContactPage trop minimal (pas de `contactPoint` enrichi) |
| `/inscription` | BreadcrumbList | Manque | Pas de WebPage ni RegisterAction/SubscribeAction |
| `/don` | **Aucun** | **Critique** | DonateAction + WebPage absents |
| `/blog/signeaux-emprise` | Article, FAQPage, BreadcrumbList | Erreur | Article sans `author`, `dateModified`, `publisher.logo`, `mainEntityOfPage`. HowTo absent. |

Snippets JSON-LD prêts à l'emploi fournis par l'agent `seo-schema` pour : NGO enrichi, DonateAction, Article complet, CollectionPage `/ressources` avec `hasPart`. Helper `lib/schema.ts` créé en local couvre déjà la plupart des recommandations.

---

## 5. Performance (CWV — analyse statique) — score 60/100

| Page | HTML (Ko) | CSS | Scripts inline (Ko) | Images | LCP candidat |
|---|---|---|---|---|---|
| `/` | 67 | 2 (Next + Google Fonts dupliqué) | 39,3 | 0 | H1 (text) |
| `/blog/signeaux-emprise` | 69 | 2 | 41,6 | 1 (jw-cdn.org externe, sans width/height) | image |
| `/articles` | 57 | 2 | 29,3 | 4 (sans width/height) | image |

### Findings perf

- **`Inter:wght@400;500;600;700&display=swap` chargé deux fois** dans le head (`<link rel="stylesheet">` + `<link rel="preload">`) — duplication. Migrer vers `next/font/google` (auto-host, élimine le fetch externe).
- **`<link rel="preconnect" href="https://cms-imgp.jw-cdn.org">` + `<link rel="dns-prefetch">`** vers le CDN Témoins de Jéhovah, héritage de l'image hotlinkée. À retirer immédiatement (signal indésirable + warmup réseau inutile).
- **Toutes les images servies sans `width`/`height` explicites** — risque CLS sur mobile, surtout sur `/articles` (4 vignettes) et `/blog/signeaux-emprise`. À normaliser via `next/image` ou via `width/height` HTML.
- **Inline JS ~30-40 Ko** par page (RSC payload). Acceptable mais à surveiller au fur et à mesure que le volume de contenu augmente.
- **Pages servies en `no-store`** : pas de cache CDN Vercel Edge → TTFB élevé non amorti.

### Estimation lab (sans field data)

- **LCP** : home ~2,0-2,5 s (texte), articles ~2,5-3,5 s (image externe non préchargée).
- **CLS** : risque modéré sur pages avec images (absence de dimensions).
- **INP** : faible (peu de JS interactif au-dessus du fold ; `framer-motion` n'apparaît pas dans le bundle de la home — chargé en lazy via `SubscriberCounter` plus bas).

---

## 6. AI Search Readiness (GEO) — score 56/100

### Forces
- `llms.txt` ET `llms-full.txt` présents en prod (rare pour une asso française, signal positif).
- `robots.txt` autorise OAI-SearchBot, Google-Extended, PerplexityBot, anthropic-ai (training côté prod, contrairement à la version source qui le bloque), YouBot, meta-externalagent, cohere-ai.
- JSON-LD structuré (Organization NGO, ItemList, CollectionPage, Article).
- Positionnement "comportements pas religions" cohérent à 3 niveaux (HTML, llms.txt, llms-full.txt).

### Manques

| # | Finding | Impact |
|---|---|---|
| G-1 | Articles `/articles/{slug}` en 404 → contenu long le plus citable inaccessible | Critique |
| G-2 | Bloc "À retenir" prescrit dans `llms.txt` mais absent du HTML des pages (composant `KeyTakeaways` créé en local mais pas déployé) | Élevé |
| G-3 | `og:image` absent partout — pas de visuel pour les partages / cartes IA | Élevé |
| G-4 | Pas de date de fondation (`foundingDate`), pas de `numberOfEmployees`, pas de `member` dans Organization | Moyen |
| G-5 | Présence Wikipedia/Wikidata absente, présence YouTube absente — corrélation forte avec citation IA | Moyen |
| G-6 | `llms.txt` n'a pas de `last-updated` ni de `license` (CC-BY-NC, RSL-1.0) | Faible |
| G-7 | Page `/a-propos` : incipit "analyse critique des discours religieux" passe avant "dérives sectaires" → risque de résumé inexact par un LLM | Élevé |
| G-8 | Robots.txt prod en retard sur la source (manque ClaudeBot/Bingbot/etc.) | Moyen |

### Probabilité de citation IA actuelle (estimation)

| Prompt | Citation probable |
|---|---|
| "Comment reconnaître une dérive sectaire ?" | 25 % |
| "Que faire si un proche est dans une secte ?" | 15 % |
| "Signes emprise psychologique liste" | 35 % |
| "Dérive sectaire définition France" | 20 % |
| "MIVILUDES secte signalement" | 5 % (l'entité authoritative est MIVILUDES elle-même) |

---

## 7. SXO — Search Experience Optimization (gap = 37/100)

### Mismatches détectés

- **`/blog/signeaux-emprise`** vs intent "comment reconnaître une emprise" : URL `/blog/` traitée comme contenu périssable par Google ; il faudrait du long-form pérenne avec FAQ intégrée. La faute "signeaux" tue le ciblage exact.
- **`/` (home)** vs intent "association anti dérives sectaires" : pas de chiffres (personnes accompagnées, années d'existence), `parentOrganization` UNADFI pas dans le balisage de la home.
- **`/ressources`** vs intent "que faire si un proche est dans une secte" : page-bibliothèque alors que l'intent est "guide pratique étapes + CTA contact".

### Personas et adéquation actuelle

| Persona | User story | Page-type idéal | Page actuelle | Adéquation |
|---|---|---|---|---|
| **A — Le proche inquiet** | "Quoi faire maintenant ?" | Guide pratique étapes + CTA contact | `/ressources` (liste de liens) | 20/100 |
| **B — La personne sortante** | "Comment je me reconstruis ?" | Outil checklist + parcours reconstruction | aucune | 0/100 |
| **C — Le chercheur / journaliste** | "Source citable" | Glossaire + définitions légales | `/a-propos` partiel | 35/100 |
| **D — Le curieux** | "Définition simple" | Article listicle + FAQ courte | `/blog/signeaux-emprise` | 40/100 |

### Top 5 nouvelles pages prioritaires (validation roadmap + ajout)

1. **`/aider-un-proche`** — guide HowTo en 5 étapes + FAQ + CTA sticky. Couvre Persona A. Concurrence faible-moyenne.
2. **`/test-emprise`** *(nouveau, suggestion forte)* — outil interactif checklist (15-20 critères BITE model). Keyword "test emprise" quasi vierge concurrentiellement.
3. **`/glossaire`** — DefinedTermSet, 20-30 termes (emprise, sujétion, ostracisme, BITE model, faisceau d'indices, sortie spirituelle, décompte de sortie, gourou). Couvre Persona C, génère featured snippets.
4. **`/se-reconstruire`** — guide long + témoignages structurés (Persona B inexistant aujourd'hui).
5. **`/faq`** — 30-50 questions thématisées (Reconnaître / Agir / Sortir / Reconstruction). FAQPage schema.

---

## 8. Sitemap — analyses détaillées

- Format XML valide. 14 URLs.
- **5 URLs en 404** (cause confirmée : `id` au lieu de `slug` dans `app/sitemap.ts`).
- `lastmod` identique sur les 9 statiques (date de déploiement) — peu crédible pour Googlebot.
- `changefreq` et `priority` présents alors que Google les ignore depuis ~2017.
- Pages légales manquantes (à ajouter post-déploiement).
- Pages roadmap manquantes (à ajouter au fur et à mesure).
- Pas besoin de sitemap-index avant 500+ URLs.
- Pas besoin de hreflang (monolingue).
- Pas besoin de sitemap image (illustrations SVG inline).

Snippet `app/sitemap.ts` corrigé fourni par l'agent `seo-sitemap`.

---

## 9. Robots.txt

```
User-Agent: *           Allow: /
User-Agent: OAI-SearchBot Allow: /
User-Agent: Google-Extended Allow: /
User-Agent: PerplexityBot   Allow: /
User-Agent: anthropic-ai    Allow: /     (← incohérent avec source : source bloque, prod autorise)
User-Agent: cohere-ai       Allow: /
User-Agent: YouBot          Allow: /
User-Agent: meta-externalagent Allow: /
User-Agent: GPTBot          Disallow: /
User-Agent: CCBot           Disallow: /
User-Agent: Bytespider      Disallow: /
Host: https://www.criseconscience.org   (← directive Yandex, à supprimer)
Sitemap: https://www.criseconscience.org/sitemap.xml
```

**Désynchronisation prod ↔ source** : la version locale (`app/robots.ts` après lots 1-2) ajoute ClaudeBot, ChatGPT-User, Claude-Web, Applebot-Extended, Googlebot, Bingbot, DuckDuckBot, Qwantify ; et bloque `anthropic-ai` côté training. À redéployer pour aligner.

---

## 10. Limitations de cet audit

- **PageSpeed Insights / CrUX** : clé Google API expirée → pas de field data CWV. À renouveler la clé pour relancer un check (`scripts/google_auth.py --check`).
- **DataForSEO non configuré** : pas de SERP positions live, pas de backlinks DA/PA, pas de keyword difficulty.
- **Google Search Console / GA4** : non connectés → pas de rapport d'indexation réel ni de trafic organique.
- **Lighthouse local** : non lancé pour ne pas alourdir l'audit. Recommandé en suivi : `npx lighthouse https://www.criseconscience.org`.
- **L'agent `seo-content`** a travaillé sur les données fournies sans accès direct aux fetches → certaines hypothèses (absence de bio CA, statuts non liés, etc.) sont à confirmer manuellement page par page mais cohérentes avec le crawl.

---

## Annexes

- Crawl complet : [crawl-summary.json](crawl-summary.json)
- HTML servi pour les 14 URLs : [pages/](pages/)
- robots.txt prod : [pages/robots.txt](pages/robots.txt)
- sitemap.xml prod : [pages/sitemap.xml](pages/sitemap.xml)
- llms.txt prod : [pages/llms.txt](pages/llms.txt)
