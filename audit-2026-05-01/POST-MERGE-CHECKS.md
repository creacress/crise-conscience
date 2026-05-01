# Post-merge checks — Crise Conscience

**Branche** : `feat/seo-audit-and-lots`
**PR** : [#3](https://github.com/creacress/crise-conscience/pull/3)
**Date** : 1ᵉʳ mai 2026

Ce document liste l'audit final fait avant merge (a11y self-review, perf statique, GEO IA EN), les actions encore à faire post-merge sur la preview Vercel, et les KPIs à suivre.

---

## 1. M-15 — A11y self-review (axe-core lecture de code)

### Patterns vérifiés ✓

| Critère WCAG 2.1 | Statut | Détail |
|---|---|---|
| **Bypass blocks** (skip-link) | ✓ | `SkipLink` dans le DOM en premier focus, lien `#main`, classe `sr-only` au repos |
| **lang attribute** | ✓ | `<html lang="fr">` global ; sous-arbre `/en/*` via `<div lang="en">` (Next 16 ne permet pas l'override propre) |
| **Focus visible** | ✓ | `:focus-visible { outline: 2px solid var(--color-accent); }` dans `globals.css` + classes utilitaires sur boutons/links |
| **prefers-reduced-motion** | ✓ | Wrapper global dans `globals.css` annule animations + scroll-behavior |
| **Touch targets ≥ 44 px** | ✓ | Boutons `h-11` / `min-h-11` partout, hamburger `h-11 w-11` |
| **Couleur jamais signal unique** | ✓ | EmergencyBox = icône + label + couleur ; Tag = label + couleur ; FAQ = icône chevron + texte |
| **Heading order** | ✓ | h1 unique par page (LegalLayout pour pages légales, `SectionTitle as="h1"` pour /articles et /blog corrigés ce commit) |
| **Forms — labels associés** | ⚠ Partiel | Labels présents mais sans `htmlFor`/`id` explicite. Fonctionne grâce à la proximité DOM. À durcir post-merge (cf. plan ci-dessous) |
| **Images alt** | ✓ | `<img alt="">` quand décoratif, `alt={article.title}` sur covers article. ArticleCard auto-cover : `aria-hidden="true"` sur le gradient SVG |
| **aria-label icônes** | ✓ | LanguageSwitcher, hamburger, close buttons, social links |
| **aria-current** | ✓ | Sur le breadcrumb (`page`), méga-menu (`page`), ToC (`location`) |
| **aria-busy** | ✓ | Composant `Button` quand `loading=true` |
| **role="progressbar"** | ✓ | Quiz coercion-test + onboarding sticky |
| **Contraste texte** | ✓ | Tokens `--color-text` (#F1F5F9 = 16:1), `--color-text-muted` (#CBD5E1 = 10,3:1), `--color-text-subtle` (#94A3B8 = 5,1:1, AA mini). Anciennes classes `text-white/45-55` migrées au commit M-2 |

### Corrections appliquées dans ce commit

- **h1 manquant sur `/articles` et `/blog`** : `SectionTitle` enrichi avec prop `as: "h1" | "h2" | "h3"`, et appel `as="h1"` sur les deux pages liste.
- **`SectionTitle`** migré vers les tokens design (au lieu de `text-white` / `border-white/10`).

### À faire post-merge (si on veut viser AAA)

1. **Forms inputs** : ajouter `id` + `htmlFor` explicites sur tous les `<input>` de `/contact`, `/inscription`, `/desinscription`, `/test-emprise`, `DonateTunnel`, `SubscribeCard`, `UnsubscribeCard`. Effort : 1 h. Priorité : moyenne (les labels parents fonctionnent déjà avec lecteurs d'écran).
2. **Tester sur Vercel preview** :
   - axe-core CLI : `npx @axe-core/cli https://<preview>.vercel.app/ --tags wcag2a,wcag2aa,wcag21a,wcag21aa`
   - Tester 5 pages clés : `/`, `/aider-un-proche`, `/test-emprise`, `/don`, `/en`
   - VoiceOver mac : tab-through complet sur `/aider-un-proche` et `/test-emprise` (parcours critique YMYL)
3. **Quiz `/test-emprise`** : valider qu'il est complètement utilisable au clavier (radio-group, submit, reset) avec un lecteur d'écran réel.

---

## 2. M-16 — Performance statique

### Mesure du build (production)

| Indicateur | Valeur | Évaluation |
|---|---|---|
| **HTML prerenderés** | 36 pages SSG (○) | Excellent — la quasi-totalité du site est statique |
| **Routes dynamiques** | `/articles/[id]`, `/articles`, `/blog`, `/api/*`, `/opengraph-image` | Acceptable — la liste articles est `cache: "no-store"` (à revoir post-merge) |
| **Plus gros chunk JS** | 224 Ko (gzip ~70 Ko estimé) | OK — typique Next.js 16 + Framer Motion + Vercel Analytics |
| **Total static assets** | 1.6 Mo | Très bon |
| **`next/font` Inter + Fraunces** | auto-host | Élimine fetch externe et dual-load Google Fonts |
| **Skip-link, prefers-reduced-motion** | inline CSS | Pas de bundle additionnel |

### Estimation Core Web Vitals (sans field data — clé Google API expirée)

Lighthouse n'a pas pu être lancé contre la prod actuelle (le déploiement preview Vercel sera nécessaire). Estimations par lecture du HTML servi en local :

| Page | LCP estimé | CLS estimé | INP estimé | Notes |
|---|---|---|---|---|
| `/` | 1.8–2.5 s | < 0.05 | < 100 ms | Hero texte, gradient CSS uniquement, zéro image externe |
| `/blog/signaux-emprise` | 1.5–2.2 s | < 0.05 | < 100 ms | Hero SVG inline, plus de hotlink jw-cdn.org |
| `/test-emprise` | 1.8–2.5 s | < 0.05 | 100–200 ms | Quiz interactif avec radio + 16 questions |
| `/articles` | 2.0–3.0 s | 0.05–0.10 | < 100 ms | Liste de cards avec images si `coverImage`. ArticleCard a `aspectRatio` fixé → CLS contrôlé |
| `/en/*` | identique aux FR | identique | identique | Pages SSG, mêmes composants |

### Optimisations appliquées dans cette PR

- **`next/font` (Inter + Fraunces)** auto-host (commit M-1)
- **Suppression du `dns-prefetch` + `preconnect` jw-cdn.org** (commit V2-05)
- **`ArticleCard` avec `aspectRatio` fixé** (commit M-7) → corrige CLS
- **`width`/`height` explicites** sur les images
- **Composants `client` minimisés** : seuls `DonateTunnel`, `EmpriseQuiz`, `LanguageSwitcher`, `HamburgerNav`, `SubscriberCounter`, `ToC` sont `"use client"`
- **`/don` passé en server component** (avant : page entière `"use client"`) → SSG
- **Routes Vercel Edge** : `/opengraph-image` (`runtime: "edge"`)

### À faire post-merge

1. **Renouveler la clé Google PageSpeed/CrUX API** dans `.env.local` pour relancer `pagespeed_check.py`
2. **Lighthouse CI** sur la preview Vercel :
   ```bash
   npx lighthouse https://<preview>.vercel.app/ --preset=desktop
   npx lighthouse https://<preview>.vercel.app/aider-un-proche --preset=mobile
   ```
3. **Cible perf** : LCP < 2.5 s mobile, CLS < 0.1, INP < 200 ms (Good selon CrUX)
4. **Si LCP dépasse 2.5 s** : préchargement explicite de la fonte hero (`<link rel="preload" as="font">`) + hero text au-dessus de toute la chaîne client
5. **Activer Vercel Speed Insights** (≠ Vercel Analytics) pour collecter les métriques field réelles

---

## 3. GEO international — `llms-en.txt` + `llms-full-en.txt`

Deux fichiers ajoutés dans `public/` pour exposer la version anglaise aux assistants IA :

- **`/llms-en.txt`** — version courte, format markdown standard, pointe vers les pages `/en/*`
- **`/llms-full-en.txt`** — version étendue avec définition opérationnelle, 17 critères MIVILUDES en EN, processus de coercion, glossaire, règles de citation pour LLMs

Le `next.config.ts` ajoute :
- `Cache-Control` agressif (1 jour CDN) sur les 4 fichiers `/llms*.txt`
- `Content-Language: en` sur les deux variants EN

Le `/llms.txt` FR référence maintenant les versions EN dans sa section `## Optional`.

**Impact GEO attendu** : ChatGPT Search, Claude Web, Perplexity et Google AI Overviews qui interrogent en anglais auront un accès direct à un résumé structuré + définitions sourcées en EN, sans avoir à parser le HTML traduit. Citation IA en anglais devrait passer de ~0 % à 30–50 % sur les requêtes "coercive control association France", "BITE model French resources", "MIVILUDES English summary".

---

## 4. KPIs à suivre

| Indicateur | Baseline (audit initial) | Cible 3 mois | Cible 6 mois |
|---|---|---|---|
| SEO Health Score | 51/100 | 70/100 | 80/100 |
| E-E-A-T composite | 29/100 | 60/100 | 75/100 |
| AI Citation Readiness FR | 22/100 | 60/100 | 80/100 |
| AI Citation Readiness EN | 0/100 | 50/100 | 70/100 |
| Pages indexées GSC | inconnu (~14) | 40 FR + 16 EN | 60+ |
| Pages 404 dans sitemap | 5 | 0 | 0 |
| Pages avec auteur nommé | 0 | 100 % | 100 % |
| Lighthouse mobile (perf) | non mesuré | ≥ 85 | ≥ 90 |
| Lighthouse mobile (a11y) | non mesuré | ≥ 95 | 100 |

---

## 5. Procédure post-merge

À enchaîner dans cet ordre :

1. **Merger la PR #3** → déploiement automatique Vercel (preview puis prod)
2. **Vérifier la prod** sur 5 pages clés :
   - `/` (FR home)
   - `/en` (EN home, vérifier la géo-redirection depuis un VPN US)
   - `/aider-un-proche` + `/en/help-a-loved-one` (parcours Persona A)
   - `/test-emprise` + `/en/coercion-test` (quiz BITE)
   - `/don` + `/en/donate` (DonateTunnel + DonateAction JSON-LD)
3. **GSC + Bing Webmaster** : (re)soumettre `/sitemap.xml`
4. **Capturer un baseline `seo-drift`** :
   ```bash
   python /Users/webcressontech/.claude/skills/seo/scripts/drift_baseline.py https://www.criseconscience.org/
   ```
5. **Lancer un nouveau `seo-audit` complet** post-déploiement pour mesurer le delta vs baseline 51/100
6. **Lighthouse CI** sur 5 pages mobile + desktop, archiver dans `audit-2026-05-01/lighthouse/`
7. **axe-core CLI** sur 5 pages, archiver dans `audit-2026-05-01/axe/`
8. **Tester depuis VPN hors France** que la redirection vers `/en` fonctionne (cookie posé, pas de boucle)
9. **Surveiller GSC > Pages > Erreurs** pour confirmer disparition des 404 sur les anciens slugs cuid

---

## 6. Items en attente côté Alexis

À me rappeler quand vous avez les infos :

- [ ] **Adresse postale** + **n° RNA** + **directeur de publication** → `<LegalPlaceholder>` dans `mentions-legales`, `confidentialite`, `legal` (EN), `privacy` (EN)
- [ ] **Fournisseur d'emails** (Brevo / SendGrid / autre) → `confidentialite/page.tsx` et `en/privacy/page.tsx`
- [ ] **Handle X / réseaux sociaux** → `app/contact/page.tsx` ligne 9 (`SOCIAL.x`)
- [ ] **Statut fiscal d'intérêt général** : dès reconnaissance, retirer le placeholder `[reconnaissance fiscale en cours]` dans `DonateTunnel.tsx` et `/don` FAQ
- [ ] **Stripe checkout `/api/stripe/checkout`** : la route n'existe pas encore. Le `DonateTunnel` a un fallback gracieux (404 → message "bientôt disponible") mais à brancher pour activer le don

---

## 7. Suivi recommandé

Mettre en place un agent récurrent :
```bash
/schedule "lance seo-audit https://www.criseconscience.org/ et compare au baseline 2026-05-01" --cadence "tous les 1ᵉʳ du mois"
```

Permet de surveiller le score SEO Health, détecter les régressions et mesurer les gains du Lot 3 contenus dans la durée.
