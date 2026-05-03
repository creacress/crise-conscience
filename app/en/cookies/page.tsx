import type { Metadata } from "next";
import LegalLayout from "@/app/components/LegalLayout";
import { ConsentReopenButton } from "@/app/components/ConsentBanner";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "Cookie and tracker policy on the Crise Conscience website. Google Analytics 4 with explicit consent (Consent Mode v2).",
  alternates: {
    canonical: "/en/cookies",
    languages: {
      "fr-FR": "/cookies",
      en: "/en/cookies",
      "x-default": "/cookies",
    },
  },
  robots: { index: true, follow: true },
};

export default function EnCookiesPage() {
  return (
    <LegalLayout
      eyebrow="Trackers & cookies"
      title="Cookie policy"
      updatedAt="May 3, 2026"
    >
      <p>
        Crise Conscience adopts a <strong>privacy-respecting</strong> approach to cookies. This
        page describes precisely what may be deposited on your device, under which conditions,
        and how you can change your preferences at any time.
      </p>

      <p>
        <ConsentReopenButton label="Edit my cookie preferences" />
      </p>

      <h2>1. Strictly necessary cookies (no consent required)</h2>
      <p>
        These cookies are essential for the site to function and do not require your prior
        consent (article 82 of the amended French Data Protection Act).
      </p>
      <ul>
        <li>
          <strong>Vercel session cookies</strong> — deposited by our host to ensure security,
          performance (cache, edge routing) and stability. No profiling.
        </li>
        <li>
          <strong><code>NEXT_LOCALE</code></strong> — stores your language preference (FR or
          EN) for 1 year. No third-party sharing.
        </li>
        <li>
          <strong><code>cc_consent</code></strong> — stores your analytics consent choice
          (granted / denied) for 1 year, so we don&apos;t show the banner on every visit.
        </li>
      </ul>

      <h2>2. Audience measurement with consent — Google Analytics 4</h2>
      <p>
        We use <strong>Google Analytics 4</strong> (GA4), provided by Google Ireland Limited,
        to measure site traffic and improve our content. <strong>GA4 requires your
        consent</strong> (article 82 of the French Data Protection Act) because it deposits
        persistent cookies.
      </p>
      <p>
        On first visit, a banner offers <strong>« Accept »</strong> or{" "}
        <strong>« Refuse »</strong>. Until you respond — or if you refuse — GA4 runs in{" "}
        <strong>Consent Mode v2</strong>: no identifying cookie is deposited, and only
        aggregated modelled measurement (cookieless pings) is transmitted.
      </p>

      <h3>Cookies deposited by GA4 when you accept</h3>
      <ul>
        <li>
          <code>_ga</code> — unique client identifier. Duration: 13 months (CNIL cap).
        </li>
        <li>
          <code>_ga_JEBQTD3DW3</code> — GA4 session state. Duration: 13 months.
        </li>
      </ul>

      <h3>Privacy protection settings applied</h3>
      <ul>
        <li><strong>IP anonymisation</strong> enabled (IP never stored in clear).</li>
        <li><strong>No Google Signals</strong> — no cross-referencing with Google
          advertising data.</li>
        <li><strong>No advertising personalisation</strong>.</li>
        <li><strong>No sharing</strong> with Google advertising services (Ads, DV360,
          etc.).</li>
        <li><strong>Data retention</strong>: maximum 14 months in GA4.</li>
        <li><strong>No advertising cookie</strong> deposited even with consent
          (<code>ad_storage</code> remains denied).</li>
      </ul>

      <h2>3. Complementary audience measurement — Vercel Analytics</h2>
      <p>
        We also use{" "}
        <a href="https://vercel.com/docs/analytics" target="_blank" rel="noreferrer">
          Vercel Analytics
        </a>
        , a <strong>cookie-free</strong> statistics tool with no browser fingerprinting. Aligned
        with the French CNIL&apos;s position on consent-exempt audience measurement, it works
        regardless of your GA4 choice.
      </p>

      <h2>4. What we don&apos;t do</h2>
      <ul>
        <li>No advertising cookie or marketing pixel (Facebook, TikTok, Google Ads, etc.).</li>
        <li>No advertising retargeting.</li>
        <li>No data resale.</li>
        <li>No sharing with data brokers or advertising networks.</li>
        <li>No individual behavioural analysis (no scoring, no profile).</li>
      </ul>

      <h2>5. Embedded external content</h2>
      <p>
        When we cite a source or embed external content (video, institutional document), we
        prefer <strong>clickable links</strong> over integrations that would deposit
        third-party cookies. If you follow an external link, the cookie policy of the visited
        site applies.
      </p>

      <h2>6. Edit or withdraw your consent</h2>
      <p>
        You can change your choice at any time: refuse after accepting, or vice versa. The
        button below reopens the consent banner.
      </p>
      <p>
        <ConsentReopenButton label="Edit my cookie preferences" />
      </p>
      <p>
        You can also configure your browser to block or delete cookies. Most browsers offer
        these settings in their Privacy or Advanced Settings menu.
      </p>
      <ul>
        <li>
          <a
            href="https://support.mozilla.org/en/kb/clear-cookies-and-site-data-firefox"
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
            href="https://support.apple.com/en-us/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noreferrer"
          >
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/en-us/microsoft-edge"
            target="_blank"
            rel="noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>

      <h2>7. Data transfers outside the EU</h2>
      <p>
        Google Analytics 4 involves <strong>data transfers to the United States</strong>{" "}
        (Google LLC). These transfers are governed by the <strong>standard contractual
        clauses</strong> from the European Commission, and Google&apos;s adherence to the{" "}
        <em>EU-U.S. Data Privacy Framework</em>.
      </p>

      <h2>8. Updates</h2>
      <p>
        If we were to integrate a new tool requiring a cookie, we would report it here and
        adapt the consent banner accordingly.
      </p>

      <h2>Going further</h2>
      <ul>
        <li>
          <a href="/en/privacy">Privacy policy (GDPR)</a>
        </li>
        <li>
          <a
            href="https://www.cnil.fr/en/cookies-and-other-tracking-devices"
            target="_blank"
            rel="noreferrer"
          >
            CNIL — Cookies and trackers
          </a>
        </li>
        <li>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Google Privacy Policy
          </a>
        </li>
      </ul>
    </LegalLayout>
  );
}
