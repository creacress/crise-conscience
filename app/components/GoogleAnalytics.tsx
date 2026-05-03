import Script from "next/script";

/**
 * Google Analytics 4 avec Google Consent Mode v2.
 *
 * Comportement :
 * - Le script gtag.js est chargé sur toutes les pages.
 * - Par défaut, TOUS les consentements sont en `denied` (pas de tracking,
 *   pas de cookies persistants identifiants). GA collecte alors uniquement
 *   des "pings" sans identifiant pour la mesure modélisée — conforme CNIL.
 * - Quand l'utilisateur clique "Accepter" dans ConsentBanner, le composant
 *   appelle `gtag('consent', 'update', { ... 'granted' })` et GA bascule
 *   en mode normal.
 * - Si l'utilisateur clique "Refuser" ou ne fait rien, on reste en denied.
 *
 * L'ID GA4 est lu depuis NEXT_PUBLIC_GA_ID (Vercel env var).
 * Si non défini, le composant ne rend rien.
 */
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      {/* Consent Mode v2 — default DENIED before GA loads */}
      <Script
        id="ga-consent-default"
        strategy="beforeInteractive"
      >{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;

        // Consent Mode v2 — tout en denied par défaut (CNIL-friendly).
        // Le ConsentBanner mettra à jour vers 'granted' si l'utilisateur accepte.
        gtag('consent', 'default', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'denied',
          'functionality_storage': 'granted',
          'security_storage': 'granted',
          'wait_for_update': 500
        });

        // Active la mesure modélisée même sans consentement (cookieless pings).
        gtag('set', 'ads_data_redaction', true);
        gtag('set', 'url_passthrough', true);
      `}</Script>

      {/* gtag.js loader */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />

      {/* GA4 init — IP anonymized, no advertising features */}
      <Script id="ga-init" strategy="afterInteractive">{`
        gtag('js', new Date());
        gtag('config', '${gaId}', {
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });
      `}</Script>
    </>
  );
}
