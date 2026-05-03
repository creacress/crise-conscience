import type { Metadata } from "next";
import LegalLayout, { LegalPlaceholder } from "@/app/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "Privacy policy and processing of personal data on the Crise Conscience website, in accordance with GDPR.",
  alternates: {
    canonical: "/en/privacy",
    languages: {
      "fr-FR": "/confidentialite",
      en: "/en/privacy",
      "x-default": "/confidentialite",
    },
  },
  robots: { index: true, follow: true },
};

export default function EnPrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Personal data"
      title="Privacy policy"
      updatedAt="May 1, 2026"
    >
      <p>
        The Crise Conscience association attaches particular importance to protecting your
        personal data. This policy describes, pursuant to{" "}
        <abbr title="General Data Protection Regulation">GDPR</abbr> and the amended French
        Data Protection Act, how we collect, use and protect your information.
      </p>

      <h2>1. Data controller</h2>
      <p>
        The data controller is the <strong>Crise Conscience</strong> association, with
        registered office at{" "}
        <LegalPlaceholder>[address to be completed]</LegalPlaceholder>.
      </p>
      <p>
        For any request relating to your data:{" "}
        <a href="mailto:contact@criseconscience.org">contact@criseconscience.org</a>.
      </p>

      <h2>2. Data we collect</h2>
      <p>We collect only the data strictly necessary for the stated purposes:</p>

      <h3>a. Contact form</h3>
      <ul>
        <li>First and last name (optional)</li>
        <li>Email address (optional — anonymous submission possible)</li>
        <li>Subject and message content</li>
      </ul>
      <p>
        <strong>Legal basis:</strong> your consent (GDPR article 6.1.a), expressed by sending
        the form and ticking the consent checkbox.
        <br />
        <strong>Purpose:</strong> reply to you, process your request, orient you.
        <br />
        <strong>Retention:</strong> up to 3 years after the last exchange, then archiving or
        deletion.
      </p>

      <h3>b. Newsletter subscription</h3>
      <ul>
        <li>Email address</li>
        <li>Subscription date, source</li>
        <li>IP address (hashed, non-identifying)</li>
        <li>Browser User-Agent (anti-abuse purposes)</li>
      </ul>
      <p>
        <strong>Legal basis:</strong> your explicit consent (checkbox).
        <br />
        <strong>Purpose:</strong> send you our publications, resources and alerts.
        <br />
        <strong>Retention:</strong> until your unsubscription, or 3 years of inactivity.
      </p>

      <h3>c. Browsing data and statistics</h3>
      <p>We use two audience measurement tools:</p>
      <ul>
        <li>
          <strong>
            <a href="https://vercel.com/docs/analytics" target="_blank" rel="noreferrer">
              Vercel Analytics
            </a>
          </strong>{" "}
          — <strong>cookie-free</strong>, no browser fingerprinting, aligned with French CNIL
          guidance for consent-exempt audience measurement. Aggregated, anonymised data, never
          sold.
        </li>
        <li>
          <strong>Google Analytics 4</strong> (Google Ireland Limited) — fuller audience
          measurement, deposits persistent cookies <strong>only if you consent</strong>{" "}
          (consent banner, Consent Mode v2). IP anonymisation, no Google Signals, no
          advertising personalisation, no sharing with Google advertising services, retention
          capped at 14 months. See details in our{" "}
          <a href="/en/cookies">cookie policy</a>.
        </li>
      </ul>
      <p>
        <strong>Legal basis</strong>: legitimate interest (Vercel Analytics) + explicit
        consent (GA4, GDPR article 6.1.a).
        <br />
        <strong>You can withdraw your consent</strong> to Google Analytics at any time from the{" "}
        <a href="/en/cookies">Cookies</a> page.
      </p>

      <h2>3. Data recipients</h2>
      <p>
        Your data is only accessible to authorised members of the Crise Conscience editorial
        team. It may be transmitted to our technical processors only for service purposes:
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> — hosting (servers in EU/USA with standard contractual
          clauses).
        </li>
        <li>
          <strong>Email service:</strong>{" "}
          <LegalPlaceholder>[provider to specify: Brevo, SendGrid, etc.]</LegalPlaceholder>
          , for the newsletter.
        </li>
        <li>
          <strong>n8n</strong> — internal automation (message relay, article processing).
        </li>
        <li>
          <strong>Google Ireland Limited</strong> — Google Analytics 4 (audience
          measurement), only if you consent. Data processed in EU and United States (standard
          contractual clauses + Data Privacy Framework).
        </li>
      </ul>
      <p>
        Your data is <strong>never sold, rented or transferred</strong> to third parties for
        commercial purposes.
      </p>

      <h2>4. Transfers outside the European Union</h2>
      <p>
        Some of our processors (notably Vercel and Google) may process data in the United
        States. These transfers are governed by <strong>standard contractual clauses</strong>{" "}
        from the European Commission and these providers&apos; adherence to the{" "}
        <em>EU-U.S. Data Privacy Framework</em>.
      </p>

      <h2>5. Your rights</h2>
      <p>Pursuant to GDPR, you have the following rights:</p>
      <ul>
        <li>
          <strong>Right of access:</strong> obtain a copy of data concerning you.
        </li>
        <li>
          <strong>Right of rectification:</strong> correct inaccurate data.
        </li>
        <li>
          <strong>Right to erasure</strong> (“right to be forgotten”).
        </li>
        <li>
          <strong>Right to restriction</strong> of processing.
        </li>
        <li>
          <strong>Right to object</strong> to processing.
        </li>
        <li>
          <strong>Right to portability</strong> of your data.
        </li>
        <li>
          <strong>Right to withdraw consent</strong> at any time.
        </li>
        <li>
          <strong>Right to give directives</strong> on the fate of your data after death.
        </li>
      </ul>
      <p>
        To exercise these rights, write to{" "}
        <a href="mailto:contact@criseconscience.org">contact@criseconscience.org</a> specifying
        your request. A response will be provided within a maximum of one month.
      </p>
      <p>
        If, after contacting us, you consider your rights are not respected, you can lodge a
        complaint with the{" "}
        <a href="https://www.cnil.fr/en/plaintes" target="_blank" rel="noreferrer">
          CNIL
        </a>{" "}
        (French data protection authority).
      </p>

      <h2>6. Security</h2>
      <p>
        We implement technical and organisational measures to protect your data: HTTPS
        encryption, IP hashing, restricted access to authorised people, regular backups,
        certified hosting.
      </p>

      <h2>7. Reinforced confidentiality for testimonies</h2>
      <p>
        If you contact us to share a testimony or report, please note that:
      </p>
      <ul>
        <li>Anonymous submission is possible (leave name/email fields empty).</li>
        <li>Sensitive data is consulted only by strictly necessary personnel.</li>
        <li>No data is publicly disseminated without explicit written agreement.</li>
      </ul>

      <h2>8. Updates</h2>
      <p>
        This policy may be updated to reflect service evolution or regulatory changes. Any
        important modification will be reported on the site.
      </p>
    </LegalLayout>
  );
}
