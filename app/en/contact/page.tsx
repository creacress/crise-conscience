import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbSchema, getSiteBase } from "@/lib/schema";
import Tag from "@/app/components/ui/Tag";
import Breadcrumb from "@/app/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Contact — Crise Conscience",
  description:
    "Reach out to Crise Conscience. Anonymous submissions accepted. Sensitive cases preserved with strict confidentiality.",
  alternates: {
    canonical: "/en/contact",
    languages: { "fr-FR": "/contact", en: "/en/contact", "x-default": "/contact" },
  },
};

const CONTACT_EMAIL = "contact@criseconscience.org";

export default function EnContactPage() {
  const siteBase = getSiteBase();
  const pageUrl = `${siteBase}/en/contact`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteBase}/en` },
          { name: "Contact", url: pageUrl },
        ])}
      />

      <Container>
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/en" },
              { label: "Contact" },
            ]}
          />

          <header className="mb-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
            <Tag tone="info" size="sm">Contact</Tag>
            <h1 className="mt-3 font-display text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] md:text-4xl">
              Reach out — anonymously if you wish
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)]">
              A question, a testimony, a concern, a partnership request? Write to us. Sensitive
              messages can be sent fully anonymously.
            </p>
          </header>

          <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold tracking-[-0.01em] text-[var(--color-text)]">
              How to reach us
            </h2>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-[var(--color-text-muted)]">
              <li>
                <strong className="text-[var(--color-text)]">Email:</strong>{" "}
                <a
                  className="text-[var(--color-accent)] hover:underline"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>
                . Average reply time 48–72&nbsp;h.
              </li>
              <li>
                <strong className="text-[var(--color-text)]">French contact form:</strong>{" "}
                <Link className="text-[var(--color-accent)] hover:underline" href="/contact">
                  /contact
                </Link>
                . Anonymous submissions accepted (name and email optional).
              </li>
              <li>
                <strong className="text-[var(--color-text)]">Press &amp; partnerships:</strong>{" "}
                same email, mention &quot;Press&quot; or &quot;Partnership&quot; in the subject.
              </li>
            </ul>

            <div className="mt-6 rounded-[var(--radius-md)] border border-[var(--color-alert-border)] bg-[var(--color-alert-bg)] p-4 text-sm leading-6 text-[var(--color-text-muted)]">
              <strong className="text-[var(--color-text)]">Important.</strong> This is not an
              emergency service. In France, in case of immediate danger: <strong>15</strong>{" "}
              (medical), <strong>17</strong> (police), <strong>18</strong> (firefighters),{" "}
              <strong>112</strong> (EU emergencies), <strong>3114</strong> (suicide prevention),{" "}
              <strong>119</strong> (children at risk).
            </div>
          </section>

          <section className="mt-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold tracking-[-0.01em] text-[var(--color-text)]">
              For testimonies and sensitive cases
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
              Strict confidentiality. We never share or publish content without your explicit
              written consent. Data is processed only to reply to you. See our{" "}
              <Link className="text-[var(--color-accent)] hover:underline" href="/confidentialite">
                privacy policy
              </Link>
              .
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--color-text-muted)]">
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-1 text-[var(--color-accent)]">
                  ✓
                </span>
                Anonymous submission possible.
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-1 text-[var(--color-accent)]">
                  ✓
                </span>
                We do not contact your relatives, employer or group on your behalf.
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-1 text-[var(--color-accent)]">
                  ✓
                </span>
                We orient toward UNADFI, CCMM, France Victimes or specialised therapists when
                needed.
              </li>
            </ul>
          </section>

          <footer className="mt-10 border-t border-[var(--color-border)] pt-6 text-xs leading-6 text-[var(--color-text-subtle)]">
            <p>
              Need the French page?{" "}
              <Link className="text-[var(--color-accent)] hover:underline" href="/contact">
                Lire la version française
              </Link>
              .
            </p>
          </footer>
        </div>
      </Container>
    </>
  );
}
