import { NextRequest, NextResponse } from "next/server";

/**
 * Géo-redirection FR ↔ EN.
 *
 * Logique :
 * - Pages FR (canoniques) servies sur `/`, `/about`, `/faq`, etc.
 * - Pages EN servies sous `/en/...`
 * - Au 1er accès :
 *     · si visiteur français (FR / DOM-TOM) → on laisse sur le FR
 *     · sinon → redirect 302 vers /en (et set cookie NEXT_LOCALE=en)
 * - Si l'utilisateur a déjà un cookie NEXT_LOCALE, on respecte sa préférence.
 * - On ne redirige JAMAIS un visiteur déjà sur /en (évite les boucles).
 * - On ignore les assets statiques, les routes API, le sitemap, robots, llms,
 *   et les fichiers Next internes.
 *
 * Détection pays :
 * - En production Vercel : header `x-vercel-ip-country` (auto, fiable, gratuit).
 * - En dev local / hors Vercel : pas de header → on ne redirige pas (locale FR).
 */

const COOKIE_NAME = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 an

// Les départements et collectivités français : on les considère comme FR.
const FRENCH_TERRITORIES = new Set([
  "FR", // France métropolitaine
  "GP", // Guadeloupe
  "MQ", // Martinique
  "GF", // Guyane française
  "RE", // Réunion
  "YT", // Mayotte
  "PM", // Saint-Pierre-et-Miquelon
  "BL", // Saint-Barthélemy
  "MF", // Saint-Martin (FR)
  "WF", // Wallis-et-Futuna
  "PF", // Polynésie française
  "NC", // Nouvelle-Calédonie
  "TF", // Terres australes françaises
]);

// Préfixes ignorés (pas de redirection) — assets, API, fichiers SEO.
const IGNORED_PREFIXES = ["/api", "/_next", "/_vercel", "/static"];
const IGNORED_FILES = new Set([
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/llms-full.txt",
  "/manifest.json",
  "/opengraph-image",
]);

function shouldIgnore(pathname: string): boolean {
  if (IGNORED_FILES.has(pathname)) return true;
  if (pathname.includes(".")) return true; // *.png, *.svg, *.css, *.js, *.txt…
  return IGNORED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldIgnore(pathname)) {
    return NextResponse.next();
  }

  // Déjà sur /en/* → on respecte, on s'assure juste que le cookie est aligné.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const existing = request.cookies.get(COOKIE_NAME)?.value;
    if (existing !== "en") {
      const res = NextResponse.next();
      res.cookies.set(COOKIE_NAME, "en", { path: "/", maxAge: COOKIE_MAX_AGE, sameSite: "lax" });
      return res;
    }
    return NextResponse.next();
  }

  // FR canonique : on respecte si l'utilisateur a explicitement choisi FR.
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value;
  if (cookieLocale === "fr") {
    return NextResponse.next();
  }

  // Si cookie EN défini : redirige vers /en.
  if (cookieLocale === "en") {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url, 302);
  }

  // Aucun cookie : on s'appuie sur la géolocalisation Vercel.
  const country = request.headers.get("x-vercel-ip-country") || "";

  // En dev local ou hébergeur sans header géo : on reste FR (canonique).
  if (!country) {
    return NextResponse.next();
  }

  // FR ou DOM-TOM → FR canonique.
  if (FRENCH_TERRITORIES.has(country)) {
    const res = NextResponse.next();
    res.cookies.set(COOKIE_NAME, "fr", { path: "/", maxAge: COOKIE_MAX_AGE, sameSite: "lax" });
    return res;
  }

  // Hors France → redirect EN + cookie EN.
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  const res = NextResponse.redirect(url, 302);
  res.cookies.set(COOKIE_NAME, "en", { path: "/", maxAge: COOKIE_MAX_AGE, sameSite: "lax" });
  return res;
}

export const config = {
  // Tous les chemins sauf API, _next, fichiers avec extension.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
