/**
 * i18n minimal (sans bibliothèque) pour Crise Conscience.
 *
 * Architecture :
 * - FR = canonique (pages servies sur /, /a-propos, /faq…)
 * - EN = traduction (pages servies sur /en, /en/about, /en/faq…)
 * - Mapping bidirectionnel entre les chemins via `LOCALE_PATH_MAP`.
 *
 * Pour les chaînes UI partagées (header, footer, breadcrumb), on utilise un
 * dictionnaire simple. Les contenus longs (pages éditoriales) sont traduits
 * dans des composants dédiés sous `app/en/*`.
 */

export type Locale = "fr" | "en";

/**
 * Mapping FR ↔ EN des chemins de page publics.
 * Les clés sont les paths FR canoniques (sans /en).
 * `null` = la page n'a pas (encore) de traduction EN dédiée → on renvoie sur /en (home).
 */
export const LOCALE_PATH_MAP: Record<string, string | null> = {
  "/": "/en",
  "/a-propos": "/en/about",
  "/faq": "/en/faq",
  "/contact": "/en/contact",
  "/don": "/en/donate",
  "/blog/signaux-emprise": "/en/recognize-coercive-control",
  "/aider-un-proche": "/en/help-a-loved-one",
  "/glossaire": "/en/glossary",
  "/test-emprise": "/en/coercion-test",
  "/se-reconstruire": "/en/recovering",
  "/temoignages": "/en/testimonies",
  "/ressources": "/en/resources",
  "/articles": "/en",
  "/blog": "/en",
  "/inscription": "/en/subscribe",
  "/desinscription": "/en/unsubscribe",
  "/abonnes": "/en",
  "/mentions-legales": "/en/legal",
  "/confidentialite": "/en/privacy",
  "/cookies": "/en/cookies",
};

/** Inverse : paths EN → paths FR canoniques. */
export const REVERSE_LOCALE_PATH_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(LOCALE_PATH_MAP)
    .filter(([, en]) => Boolean(en))
    .map(([fr, en]) => [en as string, fr]),
);

/** Renvoie la locale déduite d'un pathname. */
export function detectLocale(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return "fr";
}

/** Renvoie le chemin équivalent dans l'autre locale (utilisé par le LanguageSwitcher). */
export function alternatePath(pathname: string, target: Locale): string {
  const current = detectLocale(pathname);
  if (current === target) return pathname;

  if (target === "en") {
    // FR -> EN
    return LOCALE_PATH_MAP[pathname] ?? "/en";
  }

  // EN -> FR
  return REVERSE_LOCALE_PATH_MAP[pathname] ?? "/";
}

// =====================================================================
// Dictionnaire UI partagé (header, footer, breadcrumb, CTA récurrents)
// =====================================================================

type Dict = Record<string, string>;

const FR: Dict = {
  // Brand
  "brand.tagline": "Prévenir • Informer • Aider",
  // Header
  "nav.understand": "Comprendre",
  "nav.understand_desc": "Mécanismes, signaux, repères pédagogiques.",
  "nav.act": "Agir",
  "nav.act_desc": "Que faire, qui contacter, comment se protéger.",
  "nav.support": "Soutenir",
  "nav.support_desc": "Lettre d'information, don, suivre l'association.",
  "nav.contact_us": "Nous contacter",
  "nav.home": "Accueil",
  "nav.skip": "Aller au contenu principal",
  "nav.menu_open": "Ouvrir le menu",
  "nav.menu_close": "Fermer le menu",
  "nav.urgency": "Urgence ? 15 / 17 / 18 / 112 — prévention suicide 3114.",

  // Items navigation
  "page.signals": "Signaux d'emprise",
  "page.signals_desc": "17 critères MIVILUDES",
  "page.glossary": "Glossaire",
  "page.glossary_desc": "18 termes clés sourcés",
  "page.faq": "FAQ",
  "page.faq_desc": "Toutes vos questions",
  "page.articles": "Articles",
  "page.articles_desc": "Dossiers et analyses",
  "page.help_loved_one": "Aider un proche",
  "page.help_loved_one_desc": "Guide pratique en 5 étapes",
  "page.test": "Test d'emprise",
  "page.test_desc": "Auto-évaluation BITE, 5 min",
  "page.recovering": "Se reconstruire",
  "page.recovering_desc": "Guide post-sortie en 4 phases",
  "page.resources": "Ressources",
  "page.resources_desc": "Institutions, associations",
  "page.testimonies": "Témoignages",
  "page.testimonies_desc": "Récits de sortie anonymisés",
  "page.subscribe": "Lettre d'information",
  "page.subscribe_desc": "Analyses et ressources",
  "page.donate": "Faire un don",
  "page.donate_desc": "Paiement Stripe sécurisé",
  "page.about": "À propos",
  "page.about_desc": "Mission & UNADFI",

  // Footer
  "footer.legal_title": "Mentions légales",
  "footer.contents_title": "Contenus",
  "footer.association_title": "Association",
  "footer.legal_mentions": "Mentions légales",
  "footer.privacy": "Confidentialité",
  "footer.cookies": "Cookies",
  "footer.copyright": "Association Crise Conscience — Tous droits réservés.",
  "footer.transparency": "Contenus rédigés avec assistance IA, relus humainement",

  // Language switcher
  "lang.switch": "English",
  "lang.current": "Français",
};

const EN: Dict = {
  "brand.tagline": "Prevent • Inform • Support",
  "nav.understand": "Understand",
  "nav.understand_desc": "Mechanisms, warning signs, educational references.",
  "nav.act": "Take action",
  "nav.act_desc": "What to do, who to contact, how to protect yourself.",
  "nav.support": "Support us",
  "nav.support_desc": "Newsletter, donations, follow the association.",
  "nav.contact_us": "Contact us",
  "nav.home": "Home",
  "nav.skip": "Skip to main content",
  "nav.menu_open": "Open menu",
  "nav.menu_close": "Close menu",
  "nav.urgency": "Emergency? In France dial 15 / 17 / 18 / 112 — suicide prevention 3114.",

  "page.signals": "Coercive control signs",
  "page.signals_desc": "17 MIVILUDES criteria",
  "page.glossary": "Glossary",
  "page.glossary_desc": "Key sourced terms",
  "page.faq": "FAQ",
  "page.faq_desc": "All your questions",
  "page.articles": "Articles",
  "page.articles_desc": "In-depth analysis",
  "page.help_loved_one": "Help a loved one",
  "page.help_loved_one_desc": "Practical 5-step guide",
  "page.test": "Coercion self-check",
  "page.test_desc": "BITE-based, 5 min, anonymous",
  "page.recovering": "Recovering",
  "page.recovering_desc": "Post-exit guide in 4 phases",
  "page.resources": "Resources",
  "page.resources_desc": "Institutions, associations",
  "page.testimonies": "Testimonies",
  "page.testimonies_desc": "Anonymous exit accounts",
  "page.subscribe": "Newsletter",
  "page.subscribe_desc": "Analyses and resources",
  "page.donate": "Donate",
  "page.donate_desc": "Secure Stripe checkout",
  "page.about": "About",
  "page.about_desc": "Mission & UNADFI",

  "footer.legal_title": "Legal",
  "footer.contents_title": "Content",
  "footer.association_title": "Association",
  "footer.legal_mentions": "Legal notice",
  "footer.privacy": "Privacy",
  "footer.cookies": "Cookies",
  "footer.copyright": "Crise Conscience association — All rights reserved.",
  "footer.transparency": "Content drafted with AI assistance, reviewed by our editorial team",

  "lang.switch": "Français",
  "lang.current": "English",
};

const DICTS: Record<Locale, Dict> = { fr: FR, en: EN };

export function t(locale: Locale, key: string): string {
  return DICTS[locale][key] ?? DICTS.fr[key] ?? key;
}

export const SITE_NAME = "Crise Conscience";

export const HREFLANG_MAP = {
  fr: "fr-FR",
  en: "en",
  default: "x-default",
} as const;
