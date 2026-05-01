# Plan de refonte UI/UX — Crise Conscience

> Action `ui-ux-pro-max plan` · Contexte YMYL anti-dérives sectaires · Stack Next.js 16 / React 19 / Tailwind v4 / Framer Motion 12.

Plan de la couche **design system + composants + parcours**. Les corrections SEO/technique (sitemap, schémas, OG, fonts, ISR, CSP) sont traitées séparément dans [ACTION-PLAN.md](ACTION-PLAN.md).

---

## 1. Identité visuelle

### Style retenu : **Calm Editorial Dark + Bento subtil + micro-glassmorphism**

Sur 67 styles dispos dans le skill, on écarte pour un sujet YMYL :
- brutalism, neumorphism, claymorphism, skeuomorphism (peu crédibles)
- glassmorphism plein écran (illisible, contraste dangereux)
- "AI gradient" agressif (associé aux sites d'opinion)

Compromis retenu : **dark editorial calme**, typographie comme matière principale, **bento discret** (home, /faq, /ressources), **glass léger** uniquement sur cartes flottantes (KeyTakeaways, EmergencyBox, sticky CTAs). Inspirations : The Atlantic dark, Le Monde Édition, Linear, Stripe Press.

### Palette retenue : **« Aube apaisée »**

Conserve la base actuelle (#0b1220 + orange + sky) mais **corrige les contrastes** signalés par l'audit (`text-white/45`, `text-white/50` < WCAG AA).

| Rôle | Token | Hex | Usage |
|---|---|---|---|
| Background base | `--bg` | `#0B1220` | body |
| Surface 1 | `--surface-1` | `#111A2E` | cartes |
| Surface 2 | `--surface-2` | `#172238` | cartes hover, modales |
| Border subtle | `--border` | `#243049` | séparateurs |
| Border strong | `--border-strong` | `#3A4A6B` | focus / actif |
| Texte primaire | `--text` | `#F1F5F9` | corps (16,1:1) |
| Texte secondaire | `--text-muted` | `#CBD5E1` | sous-titres (10,3:1) |
| Texte tertiaire | `--text-subtle` | `#94A3B8` | méta (5,1:1 — plancher AA) |
| Accent action | `--accent` | `#FB923C` (orange-400) | CTA principaux |
| Accent action hover | `--accent-hover` | `#F97316` | |
| Accent info | `--info` | `#38BDF8` (sky-400) | liens, breadcrumbs |
| Accent calme | `--calm` | `#A7F3D0` (emerald-200) | succès, "À retenir" |
| Urgence | `--alert` | `#FCA5A5` (red-300) | EmergencyBox |
| Bordure d'urgence | `--alert-border` | `#7F1D1D` | EmergencyBox |

**Règle A11y absolue** : interdiction des opacités blanches < 60 % sur `--bg`. On bannit `text-white/45`, `text-white/50` et on les remplace par `--text-subtle`. Le pur `#FFFFFF` plafonné à `#F1F5F9` (évite halo).

### Font pairing retenu : **Fraunces (titres) + Inter (corps)**

- **Fraunces** (Google Fonts, variable, 9 axes) — serif éditorial humaniste, registre presse de qualité, chaleureux sans religieux. `h1`–`h3`, citations, key takeaways.
- **Inter** (déjà en place) — sans neutre lisible, conservé pour corps, UI, chiffres.
- Optionnel : **JetBrains Mono** pour références légales (article 223-15-2, loi About-Picard).

Migration via `next/font/google` (audit V2-11). Tailles min 16 px corps mobile, 18 px desktop, line-height 1.65 corps, 1.2 titres, line-length 68ch sur les pages éditoriales.

---

## 2. Design tokens (Tailwind v4 `@theme`)

- **Couleurs** : tokens ci-dessus + variantes 50–900 standard slate/orange/sky/emerald/red.
- **Typographie** : `--font-display` Fraunces var, `--font-sans` Inter var, `--font-mono` JetBrains Mono. Échelle modulaire ratio 1.250 (Major Third) : 12/14/16/18/20/25/31/39/49/61 px. Tracking `-0.02em` display, `0` sans. `text-balance` sur tous les `h1`/`h2`.
- **Spacing** : multiples de 4 (0.25rem), grille 8 px stricte. Préset `section-y` = 96 / 128 / 160 px selon breakpoint.
- **Radius** : `sm 6` / `md 10` / `lg 14` / `xl 20` / `pill 9999`.
- **Shadow** : 3 niveaux (sm `0 1px 2px rgba(0,0,0,.4)`, md `0 8px 24px rgba(0,0,0,.35)`, glow-accent CTA primaire). Pas d'ombres dramatiques.
- **Motion** (Framer Motion 12) : `ease-soft cubic-bezier(0.22, 1, 0.36, 1)`, durations 150 / 220 / 360 ms. `prefers-reduced-motion` → durées 0, `whileInView` désactivé.
- **Z-index** : 10 sticky, 20 dropdown, 30 overlay, 40 modal, 50 toast, 60 skip-link.

---

## 3. Inventaire des composants (24)

| # | Composant | Statut | Notes clés |
|---|---|---|---|
| C-01 | `SkipLink` | Créer | Premier focus, lien `#main` |
| C-02 | `SiteHeader` + `HamburgerNav` | Refondre | Sticky backdrop blur, focus trap mobile, méga-menu desktop "Comprendre / Agir / Soutenir" |
| C-03 | `Breadcrumb` | Créer | Visible toutes pages profondeur ≥1, JSON-LD aligné |
| C-04 | `Button` | Refondre | 4 variants, 3 tailles, loading state, focus-ring 2 px |
| C-05 | `Card` | Refondre | Hover : pas de scale, border-strong + shadow-md |
| C-06 | `ArticleCard` | Refondre | Cover auto-générée si pas d'image |
| C-07 | `Hero` | Refondre | 3 layouts : home (split + chiffres), pillar (centered), service (form-side) |
| C-08 | `KeyTakeaways` | Garder | Ajouter ancres + permalink |
| C-09 | `Sources` (citation block) | Créer | `<cite>` + footnote IEEE-style |
| C-10 | `EmergencyBox` | **Créer (critique)** | 3114 / 15 / 17 / 18 / 112 / 119 / 3919, contraste AAA, icône+label, tel: links |
| C-11 | `FAQAccordion` | Créer | `<details>`/`<summary>` natif, schema FAQPage |
| C-12 | `GlossaryEntry` | Créer | DefinedTerm, ancre, "voir aussi" |
| C-13 | `TestimonialCard` | Créer | Pseudo + initiales, badge "anonymisé", aucune photo |
| C-14 | `Form` | Refondre | Labels visibles, `aria-describedby`, RGPD checkbox explicite |
| C-15 | `DonateTunnel` | Créer | 3 montants suggérés + libre, badge déductibilité, badge sécurité |
| C-16 | `SubscriberCounter` | Garder | Réduire motion sur prefers-reduced-motion |
| C-17 | `LegalLayout` | Garder | Vérifier line-length (68ch) |
| C-18 | `EmpriseQuiz` | Créer | 15-20 critères BITE, progress bar, résultat structuré, **disclaimer obligatoire** |
| C-19 | `Footer` | Refondre | 4 colonnes desktop, mention 70/30, RNA, UNADFI |
| C-20 | `MethodBadge` "70 % IA / 30 % humain" | Créer | Badge → tooltip → page méthode |
| C-21 | `ReadingProgress` | Créer (article) | Barre top + reading-time |
| C-22 | `ToC` | Créer (article long) | Sticky desktop, `aria-current` |
| C-23 | `Toast` / `Banner` | Créer | Cookies, succès formulaire |
| C-24 | `Tag` | Refondre | Catégorie article, focus visible |

Anti-patterns appliqués : pas d'emoji-icône (Lucide/Heroicons SVG), pas de scale au hover, `cursor-pointer` partout, transitions 150-300 ms, focus visible.

---

## 4. Wireframes des 7 pages clés

### `/` (Home — Persona D + entrée vers A/B/C)
1. Header sticky.
2. **Hero split** : H1 Fraunces (2 lignes max) + sous-titre Inter + 2 CTA primaire/secondaire ("Aider un proche" / "Comprendre l'emprise"). Carte droite "chiffres clés" (années existence, personnes accompagnées, partenaire UNADFI).
3. **Bento 2×3** : 6 cartes hubs (Comprendre, Reconnaître les signaux, Aider un proche, Test d'emprise, Se reconstruire, Soutenir).
4. **Section Méthode** : badge 70/30, 3 piliers, lien `/a-propos`.
5. **3 articles récents**.
6. **Témoignage anonymisé** (1 unique, fort).
7. **CTA bandeau don** + déductibilité 66 %.
8. Footer + EmergencyBox sticky bas (mobile only).

Ratio image/texte 30/70 (illustrations SVG inline, pas de photos stock).

### `/aider-un-proche` (HowTo, Persona A)
1. Breadcrumb.
2. Hero centered + reading-time + date MAJ.
3. **EmergencyBox immédiate** (sans scroll).
4. **5 étapes** (HowTo schema), chacune : numéro, titre, paragraphe 80–120 mots, encart "À ne pas faire", illustration SVG.
5. **FAQ** 6–8 questions (FAQPage).
6. **KeyTakeaways** + Sources (MIVILUDES, UNADFI, CCMM).
7. CTA contact.

### `/test-emprise` (Persona B en crise — sensible)
1. Breadcrumb + **disclaimer immédiat** : "Cet outil n'est ni un diagnostic ni un avis médical. Détresse → 3114."
2. Hero court + "Commencer le test (5 min)".
3. **Quiz** : 15 critères BITE, 1 question/écran, progress bar, navigation clavier, "je préfère ne pas répondre".
4. **Résultat** : score qualitatif (3 paliers : vigilance / alerte / danger), **jamais de diagnostic médical**, redirige vers `/aider-un-proche` ou `/se-reconstruire`.
5. EmergencyBox + CTA contact + don.

### `/faq` (tous personas)
1. Breadcrumb + H1 + intro 60 mots.
2. **Recherche/filtre** par thème (Reconnaître / Agir / Sortir / Reconstruire / Donner).
3. **Accordéons** groupés (FAQPage schema, max 12/groupe).
4. CTA "Une autre question ?" → `/contact`.

### `/glossaire` (Persona C)
1. Breadcrumb + H1 + intro 80 mots.
2. **Index alphabétique sticky** (A-Z, états désactivés grisés).
3. **Définitions** : nom (Fraunces 25 px), définition (Inter 18 px, max 80 mots), source citée, "voir aussi".
4. CTA newsletter.

### `/articles/[slug]` (article détail)
1. Breadcrumb.
2. **Hero article** : tag, H1, lede, méta (auteur, date publi, MAJ, reading-time, badge 70/30).
3. **2 colonnes desktop** : ToC sticky gauche + corps droite (max 68ch).
4. **KeyTakeaways** en haut du corps.
5. Corps + citations stylisées + Sources block.
6. **EmergencyBox** si article sensible.
7. **3 articles liés**.
8. **CTA contextualisé** (don ou newsletter).

### `/don` (conversion)
1. Breadcrumb.
2. Hero émotionnel court + chiffre concret ("Avec 30 €, vous financez X heures d'écoute").
3. **DonateTunnel** : 3 montants + libre, fréquence (unique/mensuel), bouton primaire large.
4. **Bloc transparence** : déductibilité 66 %, RNA, statut intérêt général, lien rapport d'activité, badge sécurité paiement.
5. **FAQ don** (5 questions).
6. EmergencyBox + footer.

---

## 5. Stratégie A11y (WCAG 2.1 AA, viser AAA sur EmergencyBox)

- **Skip-link** `#main` en première position du DOM, visible au focus.
- **Contrastes** : tous les textes ≥ 4.5:1, gros titres ≥ 3:1. `--text-subtle` (#94A3B8) mesuré 5,1:1 sur #0B1220. **Suppression `text-white/45`, `text-white/50`** (3,9:1 et 4,2:1, sous AA).
- **Focus visible** : ring 2 px `--accent` + offset 2 px sur tout focusable. Pas d'`outline: none` sans remplacement.
- **Navigation clavier** : ordre DOM = ordre visuel. `HamburgerNav` focus trap quand ouvert + `Escape` ferme.
- **Couleur jamais signal unique** : EmergencyBox = icône + label + couleur ; Tags = label + couleur.
- **`prefers-reduced-motion`** respecté globalement (Framer Motion `useReducedMotion` à la racine).
- **Forms** : `<label for>`, `aria-describedby` erreurs, `aria-invalid`, hint visible.
- **Quiz `/test-emprise`** : navigable clavier seul, NVDA + VoiceOver OK, jamais de validation auto sans confirmation.
- **Images** : alt descriptif si informatif, `alt=""` si décoratif. SVG inline avec `role="img"` + `<title>`.
- **Touch targets** : 44×44 px minimum.
- **Tests** : axe-core CI, passage manuel VoiceOver sur 3 parcours critiques (proche / test / don).

---

## 6. Stratégie responsive

- **Breakpoints Tailwind v4** : sm 640, md 768, lg 1024, xl 1280, 2xl 1536. **Mobile-first**.
- **Container queries** (`@container`) sur `ArticleCard` (horizontale↔verticale), `Hero` (split↔stack), `Bento` (1↔2↔3 colonnes).
- **Navigation** : hamburger < lg, méga-menu ≥ lg.
- **Typographie fluide** : `font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem)` corps éditorial.
- **Largeurs max** : `max-w-prose` (65ch) long-form, `max-w-6xl` hubs, `max-w-7xl` home.
- Pas de scroll horizontal. Tableau `/glossaire` : liste mobile, tableau desktop.

---

## 7. Stratégie images

- **Pas de photos stock**, pas de visages — sujet sensible, photo = piège émotionnel + privacy.
- **Illustrations SVG inline** maison (4 motifs : silhouette ouverte, main tendue, livre ouvert, bouclier+cœur). Évite tout hotlink (jw-cdn.org supprimé).
- **Hero pages clés** : composition CSS (gradient `--accent → --info` à 8 % d'opacité sur `--bg`) + SVG inline. Zéro requête réseau, zéro CLS.
- **OG images dynamiques** par page via `app/[route]/opengraph-image.tsx`. 1200×630, WebP fallback PNG.
- **Twitter card** = `summary_large_image`.
- **Cover articles** : si pas de coverImage en DB, génération en build : gradient catégorie + initiales + tag.
- **Lazy loading** : `loading="lazy"` sauf hero LCP. `width`/`height` toujours déclarés (corrige CLS V2-14).
- **Format** : AVIF + WebP via `next/image`.

---

## 8. Plan de migration (effort total ≈ 22,5 j-homme)

| Chantier | Action | Pré-requis | Effort |
|---|---|---|---|
| **M-1.** Tokens design + Tailwind v4 `@theme` | Crée | `next/font` (V2-11) | 1 j |
| **M-2.** Migration palette (suppr `white/45`, `white/50`) | Refond | M-1 | 1 j |
| **M-3.** Composants atomiques (Button, Card, Tag, Form) | Refond | M-1 | 2 j |
| **M-4.** SiteHeader + Méga-menu + SkipLink | Refond | M-3 | 1,5 j |
| **M-5.** Footer + EmergencyBox | Refond + Crée | M-3 | 1 j |
| **M-6.** Hero + Bento home | Refond | M-3, M-4 | 1,5 j |
| **M-7.** ArticleCard auto-cover + page article | Refond | M-3 | 1,5 j |
| **M-8.** KeyTakeaways + Sources + Breadcrumb + ToC | Garde + Crée | M-3 | 1 j |
| **M-9.** FAQAccordion + page `/faq` | Crée | M-3 | 1 j |
| **M-10.** GlossaryEntry + page `/glossaire` | Crée | M-3 | 1,5 j |
| **M-11.** `/aider-un-proche` (HowTo + FAQ) | Crée | M-5, M-8, M-9 | 2 j |
| **M-12.** `/test-emprise` (Quiz BITE) | Crée | M-5, disclaimer juridique relu | 3 j |
| **M-13.** `/se-reconstruire` + `/temoignages` | Crée | M-3, M-8 | 2,5 j |
| **M-14.** DonateTunnel + refonte `/don` | Crée | M-3 + Stripe/HelloAsso | 2 j |
| **M-15.** A11y audit (axe + manuel) | — | tout précédent | 1 j |
| **M-16.** Lighthouse / CWV + correctifs | — | tout précédent | 0,5 j |

**On garde** : `KeyTakeaways`, `LegalLayout`, `SubscriberCounter`, `HamburgerNav` (refond mineur), pages légales, helper `lib/schema.ts`.
**On remplace** : palette opacités blanches, hero home, ArticleCard, page `/articles` listing, page `/don`, Footer.
**On ajoute** : `SkipLink`, `Breadcrumb`, `EmergencyBox`, `FAQAccordion`, `GlossaryEntry`, `TestimonialCard`, `DonateTunnel`, `EmpriseQuiz`, `MethodBadge`, `ReadingProgress`, `ToC`, `Toast`, `Sources`, et 6 nouvelles pages (`/aider-un-proche`, `/glossaire`, `/faq`, `/test-emprise`, `/se-reconstruire`, `/temoignages`).

---

## Décision dark-only

Reste dark only en V1 : Persona C (journaliste/chercheur) lit aussi le soir, le sujet impose un registre sobre. Tokens prêts pour bascule light future.

## Prochaine étape

Valider ce plan, puis lancer l'action `build` du skill sur **M-1 → M-3** (tokens + composants atomiques) pour produire concrètement Tailwind v4 `@theme` + composants `Button` / `Card` / `Form` / `EmergencyBox`.
