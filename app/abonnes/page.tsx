import Container from "@/app/components/Container";
import { SubscriberCounter } from "@/app/components/SubscriberCounter";
import { SubscribeCard } from "@/app/components/SubscribeCard";

export const metadata = {
  title: "Compteur d’abonnés — Crise Conscience",
  description:
    "Suivre la croissance de la communauté et comprendre l’impact concret de chaque abonnement.",
};

export default function Page() {
  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-200px,rgba(255,255,255,0.10),transparent_60%)]" />

      <Container className="relative py-12">
        <div className="max-w-3xl">
          <div className="text-sm text-white/60">Transparence</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Compteur d’abonnés
          </h1>
          <p className="mt-4 text-white/65 leading-relaxed">
            Une communauté = de la portée, des ressources, et des gens moins isolés.
            On mesure ça proprement, sans gonfler les chiffres.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <SubscriberCounter ctaHref="/contact" ctaLabel="Nous écrire" />
          <SubscribeCard />
        </div>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <h2 className="text-lg font-semibold text-white">Ce que ça débloque</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/65 leading-relaxed">
            <li>• Plus de ressources pédagogiques (guides, articles, fiches).</li>
            <li>• Meilleure diffusion (réseaux, SEO, relais associatifs).</li>
            <li>• Plus de temps pour répondre, orienter, accompagner.</li>
          </ul>
        </section>
      </Container>
    </main>
  );
}