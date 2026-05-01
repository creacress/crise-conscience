import type { Metadata } from "next";
import LegalLayout from "@/app/components/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description:
    "Politique d’utilisation des cookies et traceurs sur le site Crise Conscience. Approche minimale et respectueuse de la vie privée.",
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
      updatedAt="1er mai 2026"
    >
      <p>
        Crise Conscience adopte une approche <strong>minimale</strong> en matière de cookies et de
        traceurs. Cette page décrit précisément ce que nous déposons sur votre terminal et
        pourquoi.
      </p>

      <h2>Notre principe : zéro cookie superflu</h2>
      <p>
        Notre site <strong>ne dépose aucun cookie publicitaire ni traceur de tiers</strong>. Nous
        n’utilisons pas de pixel Facebook, Google Ads, ni de réseau de tracking.
      </p>
      <p>
        Conséquence : <strong>nous ne demandons pas votre consentement</strong> à un bandeau cookies
        intrusif, car nous n’en avons pas besoin pour les usages décrits ci-dessous.
      </p>

      <h2>Cookies strictement nécessaires</h2>
      <p>
        Ces cookies sont indispensables au fonctionnement du site et ne nécessitent pas votre
        consentement préalable (article 82 de la loi Informatique et Libertés modifiée).
      </p>
      <ul>
        <li>
          <strong>Cookies de session Vercel</strong> — déposés par notre hébergeur pour assurer la
          sécurité, la performance (cache, edge routing) et la stabilité du site. Pas de profilage.
        </li>
      </ul>

      <h2>Mesure d’audience anonyme</h2>
      <p>
        Nous utilisons <a href="https://vercel.com/docs/analytics" target="_blank" rel="noreferrer">
          Vercel Analytics
        </a>
        , un outil de statistiques <strong>sans cookie</strong> et sans empreinte navigateur
        (fingerprinting). Les données sont agrégées et anonymisées : nous voyons des tendances de
        fréquentation, jamais des comportements individuels.
      </p>
      <p>
        Cet outil est conforme à la position de la CNIL sur la mesure d’audience exemptée de
        consentement, à condition de respecter les critères suivants — que nous appliquons :
      </p>
      <ul>
        <li>finalité strictement statistique ;</li>
        <li>pas de croisement avec d’autres traitements ;</li>
        <li>pas de transmission à des tiers ;</li>
        <li>données agrégées, pas de profil individuel.</li>
      </ul>

      <h2>Contenus externes embarqués</h2>
      <p>
        Lorsque nous citons une source ou intégrons un contenu externe (vidéo, document
        institutionnel), nous privilégions les <strong>liens cliquables</strong> plutôt que les
        intégrations qui déposeraient des cookies tiers. Si vous suivez un lien externe, la
        politique de cookies du site visité s’applique.
      </p>

      <h2>Vos choix</h2>
      <p>
        Même si notre site n’en dépose pas, vous pouvez à tout moment paramétrer votre navigateur
        pour bloquer ou supprimer les cookies. La plupart des navigateurs proposent ces réglages
        dans leur menu Confidentialité ou Paramètres avancés.
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

      <h2>Évolutions</h2>
      <p>
        Si nous étions amenés à intégrer un nouvel outil nécessitant un cookie soumis à
        consentement, nous mettrions en place un mécanisme de recueil conforme aux
        recommandations de la CNIL et nous mettrions cette page à jour.
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
      </ul>
    </LegalLayout>
  );
}
