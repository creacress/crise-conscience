import type { Metadata } from "next";
import LegalLayout, { LegalPlaceholder } from "@/app/components/LegalLayout";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site Crise Conscience : éditeur, hébergeur, directeur de publication, propriété intellectuelle.",
  alternates: {
    canonical: "/mentions-legales",
    languages: { "fr-FR": "/mentions-legales", en: "/en/legal", "x-default": "/mentions-legales" },
  },
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout
      eyebrow="Informations légales"
      title="Mentions légales"
      updatedAt="1er mai 2026"
    >
      <p>
        En application de la loi n°2004-575 du 21 juin 2004 pour la confiance dans l’économie
        numérique, les utilisateurs du site Crise Conscience sont informés de l’identité des
        différents intervenants dans le cadre de sa réalisation et de son suivi.
      </p>

      <h2>Éditeur du site</h2>
      <p>
        Le site <strong>www.criseconscience.org</strong> est édité par l’association{" "}
        <strong>Crise Conscience</strong>, association régie par la loi du 1<sup>er</sup> juillet
        1901, partenaire de l’<a href="https://www.unadfi.org/" target="_blank" rel="noreferrer">
          UNADFI
        </a>{" "}
        (Union Nationale des Associations de Défense des Familles et de l’Individu victimes de
        sectes).
      </p>

      <ul>
        <li>
          <strong>Siège social</strong> :{" "}
          <LegalPlaceholder>[adresse à compléter]</LegalPlaceholder>
        </li>
        <li>
          <strong>Numéro RNA</strong> :{" "}
          <LegalPlaceholder>[W-XXXXXXXXX à compléter]</LegalPlaceholder>
        </li>
        <li>
          <strong>SIREN/SIRET</strong> (si applicable) :{" "}
          <LegalPlaceholder>[à compléter]</LegalPlaceholder>
        </li>
        <li>
          <strong>Email de contact</strong> :{" "}
          <a href="mailto:contact@criseconscience.org">contact@criseconscience.org</a>
        </li>
      </ul>

      <h2>Directeur de la publication</h2>
      <p>
        <LegalPlaceholder>[Nom du président·e ou du directeur·rice de publication à compléter]</LegalPlaceholder>
        , en sa qualité de représentant·e légal·e de l’association.
      </p>

      <h2>Hébergeur</h2>
      <p>
        Le site est hébergé par <strong>Vercel Inc.</strong>
        <br />
        440 N Barranca Avenue #4133, Covina, CA 91723, USA.
        <br />
        Site web :{" "}
        <a href="https://vercel.com" target="_blank" rel="noreferrer">
          vercel.com
        </a>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L’ensemble des éléments accessibles sur le site (textes, images, graphismes, logos, icônes,
        sons, logiciels) sont la propriété exclusive de l’association Crise Conscience, à
        l’exception des éléments réalisés par des tiers n’ayant pas cédé leurs droits d’auteur.
      </p>
      <p>
        Toute reproduction, représentation, modification, publication, adaptation totale ou
        partielle des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite
        sans autorisation écrite préalable, sauf dans le cadre du droit de courte citation pour
        usage pédagogique, journalistique ou de recherche, avec mention explicite de la source.
      </p>

      <h2>Production assistée par IA</h2>
      <p>
        Crise Conscience assume une démarche éditoriale transparente : une partie significative des
        contenus (analyses, dossiers, articles longs) est <strong>produite avec l’assistance d’outils
        d’intelligence artificielle</strong>, puis <strong>relue et validée par la rédaction
        humaine</strong>. Cette double passe vise à garantir la qualité, la véracité et la nuance
        des informations diffusées. Pour toute question sur notre méthode, voir la page{" "}
        <a href="/a-propos">À propos</a>.
      </p>

      <h2>Liens hypertextes</h2>
      <p>
        Le site peut contenir des liens vers d’autres sites internet. Crise Conscience n’exerce
        aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leur
        politique de confidentialité ou leur traitement des données personnelles.
      </p>

      <h2>Limitation de responsabilité</h2>
      <p>
        Les informations diffusées sur le site Crise Conscience ont une vocation pédagogique et
        informative. Elles ne sauraient se substituer à un avis juridique, médical ou
        psychologique professionnel. En cas de danger immédiat, contactez les services d’urgence
        (15 / 17 / 18 / 112).
      </p>

      <h2>Droit applicable</h2>
      <p>
        Le présent site est soumis au droit français. En cas de litige, et après échec d’une
        tentative de résolution amiable, les tribunaux français seront seuls compétents.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative à ces mentions légales :{" "}
        <a href="/contact">formulaire de contact</a> ou{" "}
        <a href="mailto:contact@criseconscience.org">contact@criseconscience.org</a>.
      </p>
    </LegalLayout>
  );
}
