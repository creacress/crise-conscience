import type { Metadata } from "next";
import LegalLayout from "@/app/components/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "Cookie and tracker policy on the Crise Conscience website. Minimal, privacy-respecting approach.",
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
      updatedAt="May 1, 2026"
    >
      <p>
        Crise Conscience adopts a <strong>minimal</strong> approach to cookies and trackers.
        This page describes precisely what we deposit on your device and why.
      </p>

      <h2>Our principle: zero superfluous cookie</h2>
      <p>
        Our site <strong>does not deposit any advertising cookie or third-party tracker</strong>.
        We do not use Facebook pixel, Google Ads, or any tracking network.
      </p>
      <p>
        Consequence: <strong>we do not ask for your consent</strong> via an intrusive cookie
        banner, because we do not need it for the uses described below.
      </p>

      <h2>Strictly necessary cookies</h2>
      <p>
        These cookies are essential for the site to function and do not require your prior
        consent (article 82 of the amended French Data Protection Act).
      </p>
      <ul>
        <li>
          <strong>Vercel session cookies</strong> — deposited by our host to ensure security,
          performance (cache, edge routing) and stability. No profiling.
        </li>
      </ul>

      <h2>Anonymous audience measurement</h2>
      <p>
        We use{" "}
        <a href="https://vercel.com/docs/analytics" target="_blank" rel="noreferrer">
          Vercel Analytics
        </a>
        , a <strong>cookie-free</strong> statistics tool, with no browser fingerprinting. Data
        is aggregated and anonymised: we see traffic trends, never individual behaviour.
      </p>
      <p>
        This tool aligns with the French CNIL's position on consent-exempt audience
        measurement, provided the following criteria are respected — which we apply:
      </p>
      <ul>
        <li>strictly statistical purpose;</li>
        <li>no cross-referencing with other processing;</li>
        <li>no transmission to third parties;</li>
        <li>aggregated data, no individual profile.</li>
      </ul>

      <h2>Embedded external content</h2>
      <p>
        When we cite a source or embed external content (video, institutional document), we
        prefer <strong>clickable links</strong> over integrations that would deposit
        third-party cookies. If you follow an external link, the cookie policy of the visited
        site applies.
      </p>

      <h2>Your choices</h2>
      <p>
        Even though our site does not deposit cookies, you can at any time configure your
        browser to block or delete cookies. Most browsers offer these settings in their
        Privacy or Advanced Settings menu.
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

      <h2>Updates</h2>
      <p>
        If we were to integrate a new tool requiring a consent-based cookie, we would
        implement a collection mechanism compliant with CNIL recommendations and update this
        page.
      </p>

      <h2>Going further</h2>
      <ul>
        <li>
          <a href="/en/privacy">Privacy policy (GDPR)</a>
        </li>
        <li>
          <a href="https://www.cnil.fr/en/cookies-and-other-tracking-devices" target="_blank" rel="noreferrer">
            CNIL — Cookies and trackers
          </a>
        </li>
      </ul>
    </LegalLayout>
  );
}
