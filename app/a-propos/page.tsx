

export const metadata = {
  title: "À propos – Crise Conscience",
  description:
    "Crise Conscience est une association dédiée à l’analyse critique, à la prévention des dérives sectaires et à la promotion de l’esprit critique.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-16">
      {/* Header */}
      <header className="mb-14 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-8 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
          À propos de Crise Conscience
        </h1>
        <p className="mt-6 max-w-3xl text-pretty text-base leading-7 text-white/80">
          Crise Conscience est une association indépendante engagée dans l’analyse critique des discours
          religieux, idéologiques et organisationnels à caractère dogmatique. Notre objectif est de
          fournir des outils de compréhension, d’information et de prévention face aux dérives
          sectaires et aux mécanismes d’emprise.
        </p>
      </header>

      {/* Mission */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">
          Notre mission
        </h2>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/80 leading-7">
          <p>
            L’association Crise Conscience a pour mission de promouvoir l’esprit critique et l’analyse
            rationnelle face aux systèmes de croyances fermés. Nous étudions les mécanismes de
            conditionnement psychologique, de contrôle social et de manipulation idéologique afin
            d’aider chacun à mieux les identifier.
          </p>
          <p className="mt-4">
            Nous nous adressons aussi bien au grand public qu’aux chercheurs, professionnels,
            journalistes ou institutions souhaitant mieux comprendre ces phénomènes.
          </p>
        </div>
      </section>

      {/* Axes */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">
          Nos axes de travail
        </h2>
        <ul className="space-y-4">
          <li className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-white/80">
            <strong className="text-white">Analyse critique</strong> : études d’articles, doctrines,
            discours institutionnels et stratégies de communication.
          </li>
          <li className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-white/80">
            <strong className="text-white">Prévention</strong> : sensibilisation aux dérives sectaires
            et aux mécanismes d’emprise psychologique.
          </li>
          <li className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-white/80">
            <strong className="text-white">Information</strong> : mise à disposition de ressources,
            articles, analyses et sources vérifiées.
          </li>
          <li className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-white/80">
            <strong className="text-white">Accompagnement intellectuel</strong> : aide à la
            compréhension pour les personnes en questionnement ou en reconstruction.
          </li>
        </ul>
      </section>

      {/* Valeurs */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">
          Nos valeurs
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/80">
            <strong className="text-white">Indépendance</strong>
            <p className="mt-2">
              Crise Conscience est indépendante de toute organisation religieuse, politique ou
              idéologique.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/80">
            <strong className="text-white">Rigueur intellectuelle</strong>
            <p className="mt-2">
              Nos analyses s’appuient sur des sources vérifiables, des travaux académiques et une
              méthodologie critique.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/80">
            <strong className="text-white">Humanisme</strong>
            <p className="mt-2">
              Nous plaçons la dignité humaine, la liberté de conscience et l’autonomie individuelle au
              centre de notre démarche.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/80">
            <strong className="text-white">Pédagogie</strong>
            <p className="mt-2">
              Rendre compréhensibles des sujets complexes est une priorité de l’association.
            </p>
          </div>
        </div>
      </section>

      {/* Positionnement */}
      <section className="mb-20">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">
          Notre positionnement
        </h2>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/80 leading-7">
          <p>
            Crise Conscience ne combat pas les croyances individuelles. L’association s’intéresse aux
            systèmes, aux structures de pouvoir et aux méthodes de contrôle qui peuvent porter atteinte
            à la liberté de pensée et à l’intégrité psychologique.
          </p>
          <p className="mt-4">
            Notre démarche se veut analytique, documentée et respectueuse des personnes, tout en étant
            ferme sur les faits et les mécanismes observables.
          </p>
        </div>
      </section>
    </main>
  );
}