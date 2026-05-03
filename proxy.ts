import { NextRequest, NextResponse } from "next/server";

/**
 * Géo-redirection FR ↔ EN — version corrigée (no-clobber + only-if-translated).
 *
 * Logique correcte :
 * - Pages FR (canoniques) servies sur `/`, `/a-propos`, `/faq`, etc.
 * - Pages EN servies sous `/en/...` UNIQUEMENT pour les paths listés dans
 *   `TRANSLATED_FR_TO_EN`. Toutes les autres pages sont FR-only.
 * - Cookie `NEXT_LOCALE` mémorise le choix de l'utilisateur (1 an).
 *
 * Règles :
 * 1. Si le path est sur `/en/*` : on laisse passer sans toucher au cookie
 *    (l'utilisateur peut consulter une page EN ponctuellement sans changer
 *    sa préférence globale). Le LanguageSwitcher est responsable de poser
 *    le cookie quand l'utilisateur veut explicitement changer.
 * 2. Si cookie `fr` : reste sur FR, pas de redirection.
 * 3. Si cookie `en` : redirige FR → EN UNIQUEMENT si la page a une
 *    traduction. Sinon, sert la page FR (mieux que d'envoyer sur une 404).
 * 4. Si pas de cookie : géolocalisation Vercel.
 *    - FR ou DOM-TOM → reste FR + cookie `fr`.
 *    - Hors France → redirige vers EN si traduction existe + cookie `en`.
 *      Sinon : reste FR + cookie `en` (préférence mémorisée pour la suite).
 *
 * Détection pays :
 * - Production Vercel : header `x-vercel-ip-country` (auto, fiable, gratuit).
 * - Dev local : header absent → on reste sur FR canonique.
 */

const COOKIE_NAME = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 an

// DOM-TOM français.
const FRENCH_TERRITORIES = new Set([
  "FR", "GP", "MQ", "GF", "RE", "YT", "PM", "BL", "MF", "WF", "PF", "NC", "TF",
]);

/**
 * Mapping FR → EN. Une page n'est dans cette liste QUE si elle a une vraie
 * traduction EN servie. Sinon le proxy ne redirige pas vers /en/<path>.
 *
 * À synchroniser avec lib/i18n.ts (LOCALE_PATH_MAP).
 */
const TRANSLATED_FR_TO_EN: Record<string, string> = {
  "/": "/en",
  "/a-propos": "/en/about",
  "/faq": "/en/faq",
  "/contact": "/en/contact",
  "/don": "/en/donate",
  "/blog/signaux-emprise": "/en/recognize-coercive-control",
  "/aider-un-proche": "/en/help-a-loved-one",
  "/test-emprise": "/en/coercion-test",
  "/glossaire": "/en/glossary",
  "/se-reconstruire": "/en/recovering",
  "/temoignages": "/en/testimonies",
  "/ressources": "/en/resources",
  "/inscription": "/en/subscribe",
  "/desinscription": "/en/unsubscribe",
  "/mentions-legales": "/en/legal",
  "/confidentialite": "/en/privacy",
  "/cookies": "/en/cookies",
};

// Préfixes ignorés (assets, API, fichiers SEO).
const IGNORED_PREFIXES = ["/api", "/_next", "/_vercel", "/static"];
const IGNORED_FILES = new Set([
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/llms-full.txt",
  "/llms-en.txt",
  "/llms-full-en.txt",
  "/manifest.json",
  "/opengraph-image",
]);

function shouldIgnore(pathname: string): boolean {
  if (IGNORED_FILES.has(pathname)) return true;
  if (pathname.includes(".")) return true;
  return IGNORED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldIgnore(pathname)) {
    return NextResponse.next();
  }

  // 1. Path déjà sur /en/* : on laisse passer SANS toucher au cookie.
  // Pourquoi : si un utilisateur FR partage un lien /en/about à un anglophone,
  // ou clique sur un permalien EN ponctuellement, on ne veut pas écraser sa
  // préférence globale. Seul le LanguageSwitcher est habilité à modifier le
  // cookie côté client.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value;

  // 2. Cookie FR : reste sur FR.
  if (cookieLocale === "fr") {
    return NextResponse.next();
  }

  // 3. Cookie EN : redirige FR → EN UNIQUEMENT si la traduction existe.
  // Sinon (page FR-only), sert la page FR — mieux qu'une 404.
  if (cookieLocale === "en") {
    const enPath = TRANSLATED_FR_TO_EN[pathname];
    if (enPath) {
      const url = request.nextUrl.clone();
      url.pathname = enPath;
      return NextResponse.redirect(url, 302);
    }
    return NextResponse.next();
  }

  // 4. Aucun cookie : géolocalisation Vercel.
  const country = request.headers.get("x-vercel-ip-country") || "";

  // Dev local ou hébergeur sans header géo : reste FR.
  if (!country) {
    return NextResponse.next();
  }

  // FR ou DOM-TOM → FR + cookie fr.
  if (FRENCH_TERRITORIES.has(country)) {
    const res = NextResponse.next();
    res.cookies.set(COOKIE_NAME, "fr", { path: "/", maxAge: COOKIE_MAX_AGE, sameSite: "lax" });
    return res;
  }

  // Hors France : redirige vers EN si traduction existe + cookie en.
  // Sinon : sert la page FR + cookie en (préférence mémorisée pour la suite).
  const enPath = TRANSLATED_FR_TO_EN[pathname];
  if (enPath) {
    const url = request.nextUrl.clone();
    url.pathname = enPath;
    const res = NextResponse.redirect(url, 302);
    res.cookies.set(COOKIE_NAME, "en", { path: "/", maxAge: COOKIE_MAX_AGE, sameSite: "lax" });
    return res;
  }
  const res = NextResponse.next();
  res.cookies.set(COOKIE_NAME, "en", { path: "/", maxAge: COOKIE_MAX_AGE, sameSite: "lax" });
  return res;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
