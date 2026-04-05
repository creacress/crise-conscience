import Container from "@/app/components/Container";
import { SubscribeCard } from "@/app/components/SubscribeCard";
import { SubscriberCounter } from "@/app/components/SubscriberCounter";
import { Breadcrumb } from "@/app/components/Breadcrumb";
import Link from "next/link";

export const metadata = {
  title: "Newsletter Crise Conscience — Inscription gratuite",
  description:
    "Inscrivez-vous à la newsletter de Crise Conscience : ressources vérifiées sur les dérives sectaires, signaux d’emprise, actualités de prévention. Sans spam, désinscription en un clic.",
  alternates: { canonical: "/inscription" },
};

export default function Page() {
  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-200px,rgba(255,255,255,0.10),transparent_60%)]" />

      <Container className="relative py-12">
        <Breadcrumb items={[{ label: "Inscription", href: "/inscription" }]} />
        <div className="max-w-3xl">
          <div className="text-sm text-white/60">Newsletter</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Inscription
          </h1>
          <p className="mt-4 text-white/65 leading-relaxed">
            Une newsletter sobre : ressources utiles, signaux d’emprise, actus, prévention.
            Pas de spam, pas de drama. Juste du contenu fiable.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <SubscribeCard />

          <div className="space-y-4">
            <SubscriberCounter compact ctaHref="/abonnes" ctaLabel="Voir le compteur" />

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm text-white/70">Transparence</div>
              <div className="mt-2 text-lg font-semibold">Contrôle total.</div>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                Tu peux te désinscrire à tout moment. On ne vend pas tes données.
                Et on affiche le compteur publiquement pour éviter les chiffres gonflés.
              </p>
              <Link
                href="/desinscription"
                className="mt-4 inline-flex w-full justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-semibold text-white hover:bg-white/10 transition"
              >
                Se désinscrire
              </Link>
            </div>
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <h2 className="text-lg font-semibold text-white">Ce que tu recevras</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/65 leading-relaxed">
            <li>• Ressources : guides, fiches, articles (formats courts et actionnables).</li>
            <li>• Actus : signaux faibles, décisions publiques, initiatives utiles.</li>
            <li>• Prévention : comprendre les mécanismes d’emprise sans sensationnalisme.</li>
          </ul>
        </section>
      </Container>
    </main>
  );
}