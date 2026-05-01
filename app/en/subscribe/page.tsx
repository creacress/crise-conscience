import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import { SubscribeCard } from "@/app/components/SubscribeCard";
import { SubscriberCounter } from "@/app/components/SubscriberCounter";
import Breadcrumb from "@/app/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Newsletter — Free subscription",
  description:
    "Subscribe to the Crise Conscience newsletter: vetted resources on coercive control, warning signs, prevention updates. No spam, one-click unsubscribe.",
  alternates: {
    canonical: "/en/subscribe",
    languages: {
      "fr-FR": "/inscription",
      en: "/en/subscribe",
      "x-default": "/inscription",
    },
  },
};

export default function EnSubscribePage() {
  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-200px,rgba(255,255,255,0.10),transparent_60%)]" />

      <Container className="relative py-12">
        <Breadcrumb
          className="mb-6"
          items={[
            { label: "Home", href: "/en" },
            { label: "Newsletter" },
          ]}
        />

        <div className="max-w-3xl">
          <div className="text-sm text-[var(--color-text-subtle)]">Newsletter</div>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-[var(--color-text)] md:text-5xl">
            Subscribe
          </h1>
          <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed">
            A sober newsletter: useful resources, warning signs, news, prevention. No spam, no
            drama. Just reliable content.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <SubscribeCard />

          <div className="space-y-4">
            <SubscriberCounter compact ctaHref="/abonnes" ctaLabel="See the counter" />

            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6">
              <div className="text-sm text-[var(--color-text-muted)]">Transparency</div>
              <div className="mt-2 text-lg font-semibold text-[var(--color-text)]">Full control.</div>
              <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                You can unsubscribe at any time. We do not sell your data. And we publicly
                display the subscriber counter to avoid inflated numbers.
              </p>
              <Link
                href="/en/unsubscribe"
                className="mt-4 inline-flex w-full justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-2 font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg)] transition"
              >
                Unsubscribe
              </Link>
            </div>
          </div>
        </div>

        <section className="mt-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-7">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">
            What you will receive
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
            <li>• Resources: guides, fact sheets, articles (short, actionable formats).</li>
            <li>• Updates: weak signals, public decisions, useful initiatives.</li>
            <li>• Prevention: understand coercion mechanisms without sensationalism.</li>
          </ul>
        </section>
      </Container>
    </main>
  );
}
