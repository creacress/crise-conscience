import type { Metadata } from "next";
import LegalLayout from "@/app/components/LegalLayout";
import { ConsentReopenButton } from "@/app/components/ConsentBanner";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description:
    "Politique d’utilisation des cookies et traceurs sur le site Crise Conscience. Google Analytics 4 avec consentement explicite (Consent Mode v2).",
  alternates: {
    canonical: "/cookies",
    languages: { "fr-FR": "/cookies", en: "/en/cookies", "x-default": "/cookies" },
  },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalLayout
      eyebrow="Traceurs & cookies"
      title="Politique de cookies"
      updatedAt="3 mai 2026"
    >
      <p>
        Crise Conscience adopte une approche <strong>respectueuse de la vie privée</strong> en
        matière de cookies. Cette page décrit précisément ce qui peut être déposé sur votre
        terminal, dans quelles conditions, et comment vous pouvez modifier vos préférences à
        tout moment.
      </p>

      <p>
        <ConsentReopenButton />
      </p>

      <h2>1. Cookies strictement nécessaires (sans consentement)</h2>
      <p>
        Ces cookies sont indispensables au fonctionnement du site et ne nécessitent pas votre
        consentement préalable (article 82 de la loi Informatique et Libertés modifiée).
      </p>
      <ul>
        <li>
          <strong>Cookies de session Vercel</strong> — déposés par notre hébergeur pour assurer
          la sécurité, la performance (cache, edge routing) et la stabilité du site. Pas de
          profilage.
        </li>
        <li>
          <strong><code>NEXT_LOCALE</code></strong> — mémorise votre choix de langue (FR ou EN)
          pour 1 an. Pas de partage tiers.
        </li>
        <li>
          <strong><code>cc_consent</code></strong> — mémorise votre choix de consentement
          analytique (granted / denied) pour 1 an, afin de ne pas réafficher le bandeau à chaque
          visite.
        </li>
      </ul>

      <h2>2. Mesure d’audience avec consentement — Google Analytics 4</h2>
      <p>
        Nous utilisons{" "}
        <strong>Google Analytics 4</strong> (GA4), édité par Google Ireland Limited, pour
        mesurer la fréquentation du site et améliorer nos contenus. <strong>GA4 nécessite votre
        consentement</strong> (article 82 LIL) car il dépose des cookies persistants.
      </p>
      <p>
        Au premier accès, un bandeau vous propose <strong>« Accepter »</strong> ou{" "}
        <strong>« Refuser »</strong>. Tant que vous n’avez pas répondu — ou si vous refusez — GA4
        fonctionne en <strong>mode « Consent Mode v2 »</strong> : aucun cookie identifiant n’est
        déposé, et seules des mesures modélisées agrégées (pings cookieless) sont transmises.
      </p>

      <h3>Cookies déposés par GA4 lorsque vous acceptez</h3>
      <ul>
        <li>
          <code>_ga</code> — identifiant client unique. Durée : 13 mois (cap CNIL).
        </li>
        <li>
          <code>_ga_JEBQTD3DW3</code> — état de la session GA4. Durée : 13 mois.
        </li>
      </ul>

      <h3>Configuration de protection appliquée</h3>
      <ul>
        <li><strong>Anonymisation IP</strong> activée (l’IP n’est jamais stockée en clair).</li>
        <li><strong>Pas de signaux Google</strong> (Google Signals désactivé) — pas de
          recoupement avec les données publicitaires Google.</li>
        <li><strong>Pas de personnalisation publicitaire</strong>.</li>
        <li><strong>Pas de partage</strong> avec les services publicitaires Google (Ads, DV360,
          etc.).</li>
        <li><strong>Durée de conservation</strong> des données utilisateurs : 14 mois maximum
          dans GA4.</li>
        <li><strong>Aucun cookie publicitaire</strong> n’est déposé même avec consentement
          (<code>ad_storage</code> reste denied).</li>
      </ul>

      <h2>3. Mesure d’audience complémentaire — Vercel Analytics</h2>
      <p>
        Nous utilisons également{" "}
        <a href="https://vercel.com/docs/analytics" target="_blank" rel="noreferrer">
          Vercel Analytics
        </a>
        , un outil de statistiques <strong>sans cookie</strong> et sans empreinte navigateur
        (fingerprinting). Conforme à la position de la CNIL sur la mesure d’audience exemptée de
        consentement, il fonctionne quel que soit votre choix sur GA4.
      </p>

      <h2>4. Ce que nous ne faisons pas</h2>
      <ul>
        <li>Aucun cookie publicitaire ni pixel marketing (Facebook, TikTok, Google Ads, etc.).</li>
        <li>Aucun reciblage publicitaire.</li>
        <li>Aucune revente de données.</li>
        <li>Aucun partage avec un courtier de données ou un réseau publicitaire.</li>
        <li>Aucune analyse comportementale individuelle (pas de scoring, pas de profil).</li>
      </ul>

      <h2>5. Contenus externes embarqués</h2>
      <p>
        Lorsque nous citons une source ou intégrons un contenu externe (vidéo, document
        institutionnel), nous privilégions les <strong>liens cliquables</strong> plutôt que les
        intégrations qui déposeraient des cookies tiers. Si vous suivez un lien externe, la
        politique de cookies du site visité s’applique.
      </p>

      <h2>6. Modifier ou retirer votre consentement</h2>
      <p>
        Vous pouvez à tout moment changer votre choix : refuser après avoir accepté, ou
        l’inverse. Le bouton ci-dessous rouvre le bandeau de consentement.
      </p>
      <p>
        <ConsentReopenButton />
      </p>
      <p>
        Vous pouvez aussi paramétrer votre navigateur pour bloquer ou supprimer les cookies. La
        plupart des navigateurs proposent ces réglages dans leur menu Confidentialité ou
        Paramètres avancés.
      </p>
      <ul>
        <li>
          <a
            href="https://support.mozilla.org/fr/kb/effacer-les-cookies-pour-supprimer-les-information"
            target="_blank"
            rel="noreferrer"
          >
            Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noreferrer"
          >
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/fr-fr/microsoft-edge"
            target="_blank"
            rel="noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>

      <h2>7. Transferts de données hors UE</h2>
      <p>
        Google Analytics 4 implique des <strong>transferts de données vers les États-Unis</strong>{" "}
        (Google LLC). Ces transferts sont encadrés par les <strong>clauses contractuelles
        types</strong> de la Commission européenne, et l’adhésion de Google au{" "}
        <em>EU-U.S. Data Privacy Framework</em>.
      </p>

      <h2>8. Évolutions</h2>
      <p>
        Si nous étions amenés à intégrer un nouvel outil nécessitant un cookie, nous le
        signalerions ici et adapterions le bandeau de consentement en conséquence.
      </p>

      <h2>Pour aller plus loin</h2>
      <ul>
        <li>
          <a href="/confidentialite">Politique de confidentialité (RGPD)</a>
        </li>
        <li>
          <a href="https://www.cnil.fr/fr/cookies-et-traceurs" target="_blank" rel="noreferrer">
            CNIL — Cookies et traceurs
          </a>
        </li>
        <li>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Politique de confidentialité Google
          </a>
        </li>
      </ul>
    </LegalLayout>
  );
}
