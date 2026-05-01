import type { Metadata } from "next";
import LegalLayout, { LegalPlaceholder } from "@/app/components/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et traitement des données personnelles sur le site Crise Conscience, conformément au RGPD.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: true, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      eyebrow="Données personnelles"
      title="Politique de confidentialité"
      updatedAt="1er mai 2026"
    >
      <p>
        L’association Crise Conscience accorde une importance particulière à la protection de vos
        données personnelles. Cette politique décrit, en application du{" "}
        <abbr title="Règlement Général sur la Protection des Données">RGPD</abbr> et de la loi
        Informatique et Libertés modifiée, comment nous collectons, utilisons et protégeons vos
        informations.
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données est l’association <strong>Crise Conscience</strong>,
        dont le siège est situé à{" "}
        <LegalPlaceholder>[adresse à compléter]</LegalPlaceholder>.
      </p>
      <p>
        Pour toute demande relative à vos données :{" "}
        <a href="mailto:contact@criseconscience.org">contact@criseconscience.org</a>.
      </p>

      <h2>2. Données que nous collectons</h2>
      <p>Nous collectons uniquement les données strictement nécessaires aux finalités déclarées :</p>

      <h3>a. Formulaire de contact</h3>
      <ul>
        <li>Prénom et nom (facultatifs)</li>
        <li>Adresse email (facultative — un envoi anonyme est possible)</li>
        <li>Sujet et contenu du message</li>
      </ul>
      <p>
        <strong>Base légale</strong> : votre consentement (article 6.1.a du RGPD), exprimé par
        l’envoi du formulaire et la case d’acceptation.
        <br />
        <strong>Finalité</strong> : vous répondre, traiter votre demande, vous orienter.
        <br />
        <strong>Durée de conservation</strong> : jusqu’à 3 ans après le dernier échange, puis
        archivage ou suppression.
      </p>

      <h3>b. Inscription à la lettre d’information</h3>
      <ul>
        <li>Adresse email</li>
        <li>Date d’inscription, source d’inscription</li>
        <li>Adresse IP (sous forme hachée, non identifiante)</li>
        <li>User-Agent du navigateur (à des fins anti-abus)</li>
      </ul>
      <p>
        <strong>Base légale</strong> : votre consentement explicite (case à cocher).
        <br />
        <strong>Finalité</strong> : vous envoyer nos publications, ressources et alertes.
        <br />
        <strong>Durée de conservation</strong> : jusqu’à votre désinscription, ou 3 ans
        d’inactivité (absence d’ouverture de nos messages).
      </p>

      <h3>c. Données de navigation et statistiques</h3>
      <p>
        Nous utilisons <a href="https://vercel.com/docs/analytics" target="_blank" rel="noreferrer">
          Vercel Analytics
        </a>
        , un outil de mesure d’audience <strong>respectueux de la vie privée</strong> : pas de
        cookies, pas de profil utilisateur, pas de revente de données. Les statistiques sont
        agrégées et anonymisées.
      </p>

      <h2>3. Destinataires des données</h2>
      <p>
        Vos données ne sont accessibles qu’aux membres habilités de la rédaction de Crise
        Conscience. Elles peuvent être transmises à nos sous-traitants techniques, uniquement pour
        les besoins du service :
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> — hébergement du site (serveurs en Europe / États-Unis avec
          clauses contractuelles types).
        </li>
        <li>
          <strong>Service d’envoi d’emails</strong> —{" "}
          <LegalPlaceholder>[fournisseur à préciser : Brevo, SendGrid, etc.]</LegalPlaceholder>
          , pour la lettre d’information.
        </li>
        <li>
          <strong>n8n</strong> — automatisation interne (relais de messages, traitement des
          articles).
        </li>
      </ul>
      <p>
        Vos données ne sont <strong>jamais vendues, louées ou cédées</strong> à des tiers à des
        fins commerciales.
      </p>

      <h2>4. Transferts hors Union européenne</h2>
      <p>
        Certains de nos sous-traitants (notamment Vercel) peuvent être amenés à traiter des
        données aux États-Unis. Ces transferts sont encadrés par les <strong>clauses
        contractuelles types</strong> de la Commission européenne et, le cas échéant, par
        l’adhésion au <em>Data Privacy Framework</em>.
      </p>

      <h2>5. Vos droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li>
          <strong>Droit d’accès</strong> : obtenir la copie des données vous concernant.
        </li>
        <li>
          <strong>Droit de rectification</strong> : corriger une donnée inexacte.
        </li>
        <li>
          <strong>Droit à l’effacement</strong> (« droit à l’oubli »).
        </li>
        <li>
          <strong>Droit à la limitation</strong> du traitement.
        </li>
        <li>
          <strong>Droit d’opposition</strong> au traitement.
        </li>
        <li>
          <strong>Droit à la portabilité</strong> de vos données.
        </li>
        <li>
          <strong>Droit de retirer votre consentement</strong> à tout moment.
        </li>
        <li>
          <strong>Droit de définir des directives</strong> sur le sort de vos données après votre
          décès.
        </li>
      </ul>
      <p>
        Pour exercer ces droits, écrivez à{" "}
        <a href="mailto:contact@criseconscience.org">contact@criseconscience.org</a> en précisant
        votre demande. Une réponse vous sera apportée dans un délai maximal d’un mois.
      </p>
      <p>
        Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous
        pouvez introduire une réclamation auprès de la{" "}
        <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noreferrer">
          CNIL
        </a>
        .
      </p>

      <h2>6. Sécurité</h2>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos
        données : chiffrement HTTPS, hachage des adresses IP, accès limité aux personnes
        habilitées, sauvegardes régulières, hébergeur certifié.
      </p>

      <h2>7. Confidentialité renforcée pour les témoignages</h2>
      <p>
        Si vous nous contactez pour partager un témoignage ou un signalement, sachez que :
      </p>
      <ul>
        <li>L’envoi anonyme est possible (laissez les champs nom/email vides).</li>
        <li>
          Les données sensibles ne sont consultées que par les personnes strictement nécessaires.
        </li>
        <li>Aucune donnée n’est diffusée publiquement sans votre accord écrit explicite.</li>
      </ul>

      <h2>8. Modifications</h2>
      <p>
        Cette politique peut être mise à jour pour refléter les évolutions de notre service ou de
        la réglementation. Toute modification importante sera signalée sur le site.
      </p>
    </LegalLayout>
  );
}
