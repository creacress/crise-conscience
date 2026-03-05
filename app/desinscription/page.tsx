import Container from "@/app/components/Container";
import { UnsubscribeCard } from "@/app/components/UnsubscribeCard";

export const metadata = {
  title: "Désinscription newsletter — Crise Conscience",
  description: "Se désinscrire de la newsletter de l’association Crise Conscience. Désinscription en un clic, sans culpabilisation.",
  alternates: { canonical: "/desinscription" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-200px,rgba(255,255,255,0.10),transparent_60%)]" />

      <Container className="relative py-12">
        <div className="max-w-2xl">
          <div className="text-sm text-white/60">Newsletter</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Désinscription
          </h1>
          <p className="mt-4 text-white/65 leading-relaxed">
            Tu peux te désinscrire en un clic. Zéro drama, zéro culpabilisation.
          </p>

          <div className="mt-8">
            <UnsubscribeCard />
          </div>
        </div>
      </Container>
    </main>
  );
}