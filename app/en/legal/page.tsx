import type { Metadata } from "next";
import LegalLayout, { LegalPlaceholder } from "@/app/components/LegalLayout";

export const metadata: Metadata = {
  title: "Legal notice",
  description:
    "Legal notice of Crise Conscience: publisher, host, publication director, intellectual property.",
  alternates: {
    canonical: "/en/legal",
    languages: {
      "fr-FR": "/mentions-legales",
      en: "/en/legal",
      "x-default": "/mentions-legales",
    },
  },
  robots: { index: true, follow: true },
};

export default function EnLegalPage() {
  return (
    <LegalLayout
      eyebrow="Legal information"
      title="Legal notice"
      updatedAt="May 1, 2026"
    >
      <p>
        In application of the French law of June 21, 2004 on confidence in the digital economy
        (LCEN), users of the Crise Conscience website are informed of the identity of the
        different stakeholders in its design and follow-up.
      </p>

      <h2>Publisher of the website</h2>
      <p>
        The website <strong>www.criseconscience.org</strong> is published by the{" "}
        <strong>Crise Conscience</strong> association, registered under the French law of July
        1, 1901, partner of the{" "}
        <a href="https://www.unadfi.org/" target="_blank" rel="noreferrer">
          UNADFI
        </a>{" "}
        (Union Nationale des Associations de Défense des Familles et de l'Individu victimes de
        sectes).
      </p>

      <ul>
        <li>
          <strong>Registered address:</strong>{" "}
          <LegalPlaceholder>[address to be completed]</LegalPlaceholder>
        </li>
        <li>
          <strong>RNA number:</strong>{" "}
          <LegalPlaceholder>[W-XXXXXXXXX to be completed]</LegalPlaceholder>
        </li>
        <li>
          <strong>SIREN/SIRET</strong> (if applicable):{" "}
          <LegalPlaceholder>[to be completed]</LegalPlaceholder>
        </li>
        <li>
          <strong>Contact email:</strong>{" "}
          <a href="mailto:contact@criseconscience.org">contact@criseconscience.org</a>
        </li>
      </ul>

      <h2>Publication director</h2>
      <p>
        <LegalPlaceholder>[Name of the president or publication director to be completed]</LegalPlaceholder>
        , as legal representative of the association.
      </p>

      <h2>Host</h2>
      <p>
        The website is hosted by <strong>Vercel Inc.</strong>
        <br />
        440 N Barranca Avenue #4133, Covina, CA 91723, USA.
        <br />
        Website:{" "}
        <a href="https://vercel.com" target="_blank" rel="noreferrer">
          vercel.com
        </a>
      </p>

      <h2>Intellectual property</h2>
      <p>
        All elements accessible on the site (text, images, graphics, logos, icons, sounds,
        software) are the exclusive property of the Crise Conscience association, except for
        elements produced by third parties who have not assigned their copyrights.
      </p>
      <p>
        Any reproduction, representation, modification, publication, total or partial
        adaptation of the site's elements, regardless of the medium or process used, is
        forbidden without prior written authorisation, except in the framework of short
        citation right for educational, journalistic or research use, with explicit attribution.
      </p>

      <h2>AI-assisted production</h2>
      <p>
        Crise Conscience commits to a transparent editorial approach: a significant portion of
        the long-form content (analyses, dossiers, long articles) is{" "}
        <strong>produced with AI assistance</strong>, then{" "}
        <strong>reviewed and validated by the human editorial team</strong>. This dual pass aims
        at quality, accuracy and nuance of the information disseminated. For any question on
        our method, see the <a href="/en/about">About</a> page.
      </p>

      <h2>Hyperlinks</h2>
      <p>
        The site may contain links to other websites. Crise Conscience exercises no control
        over these sites and disclaims any responsibility regarding their content, privacy
        policy or processing of personal data.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        Information disseminated on the Crise Conscience site is for educational and
        informational purposes only. It does not replace professional legal, medical or
        psychological advice. In case of immediate danger in France, contact emergency services
        (15 / 17 / 18 / 112).
      </p>

      <h2>Applicable law</h2>
      <p>
        This site is subject to French law. In case of dispute, and after attempted amicable
        resolution, French courts will have sole jurisdiction.
      </p>

      <h2>Contact</h2>
      <p>
        For any question regarding this legal notice:{" "}
        <a href="/en/contact">contact form</a> or{" "}
        <a href="mailto:contact@criseconscience.org">contact@criseconscience.org</a>.
      </p>
    </LegalLayout>
  );
}
