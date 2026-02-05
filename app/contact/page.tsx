export const metadata = {
  title: "Contact – Crise Conscience",
  description:
    "Contactez Crise Conscience : questions, signalements, partenariats. Formulaire sécurisé et coordonnées.",
};

// --- À PERSONNALISER
const CONTACT_EMAIL = "contact@criseconscience.org";
const SOCIAL = {
  linkedin: "linkedin.com/in/association-crise-conscience-58a5173a8",
  x: "https://x.com/TON_COMPTE",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-16">
      {/* Header */}
      <header className="mb-12 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-8 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Contact
        </h1>
        <p className="mt-6 max-w-3xl text-pretty text-base leading-7 text-white/80">
          Une question, un témoignage, un signalement ou une demande de partenariat ? Écris-nous.
          Nous lisons tout. Les messages sensibles peuvent être envoyés de façon anonyme.
        </p>
      </header>

      <section className="grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Form */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white">Envoyer un message</h2>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Réponse sous 48–72h en moyenne. Si urgence immédiate : appelle les services d’urgence.
              </p>
            </div>
            <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 md:inline">
              Formulaire
            </span>
          </div>

          <form className="space-y-4" method="post" action="/api/contact">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium text-white/70">Prénom (optionnel)</label>
                <input
                  name="firstName"
                  autoComplete="given-name"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none ring-0 transition focus:border-white/20 focus:bg-black/40"
                  placeholder="Ex : Alex"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-white/70">Nom (optionnel)</label>
                <input
                  name="lastName"
                  autoComplete="family-name"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none ring-0 transition focus:border-white/20 focus:bg-black/40"
                  placeholder="Ex : Martin"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium text-white/70">Email (optionnel)</label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none ring-0 transition focus:border-white/20 focus:bg-black/40"
                  placeholder="Ex : alex@mail.com"
                />
                <p className="mt-2 text-xs text-white/50">
                  Si tu préfères rester anonyme, laisse vide.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-white/70">Sujet</label>
                <select
                  name="topic"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 focus:bg-black/40"
                  defaultValue="question"
                >
                  <option value="question">Question</option>
                  <option value="temoignage">Témoignage</option>
                  <option value="signalement">Signalement / inquiétude</option>
                  <option value="partenariat">Partenariat / presse</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-white/70">Message</label>
              <textarea
                name="message"
                required
                rows={8}
                className="w-full resize-y rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white placeholder:text-white/35 outline-none transition focus:border-white/20 focus:bg-black/40"
                placeholder="Décris ta situation, ton contexte, et ce que tu attends de nous…"
              />
              <p className="mt-2 text-xs text-white/50">
                Évite d’indiquer des informations personnelles sensibles si ce n’est pas nécessaire.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <label className="flex items-center gap-2 text-xs text-white/60">
                <input
                  name="consent"
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/20 bg-black/30"
                />
                J’accepte que mon message soit traité pour me répondre.
              </label>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Envoyer
              </button>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs leading-6 text-white/60">
              <strong className="text-white/75">Note :</strong> ce formulaire n’est pas un service d’urgence.
              En cas de danger immédiat, contacte les services compétents (112 / 15 / 17 / 18).
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-sm font-semibold text-white">Coordonnées</h3>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Email : <span className="text-white/85">{CONTACT_EMAIL}</span>
            </p>

            <div className="mt-4 flex items-center gap-2">
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/80 transition hover:bg-white/[0.06] hover:text-white"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.6 0 4.265 2.37 4.265 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 114.126 0c0 1.14-.925 2.065-2.063 2.065zM6.814 20.452H3.86V9h2.954v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a
                href={SOCIAL.x}
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/80 transition hover:bg-white/[0.06] hover:text-white"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                  <path d="M18.244 2H21l-6.53 7.458L22.5 22h-6.2l-4.86-6.45L5.8 22H3l7.02-8.02L1.5 2h6.36l4.4 5.87L18.244 2zm-1.09 18h1.72L6.94 3.93H5.1L17.154 20z"/>
                </svg>
              </a>

            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                Réponse 48–72h
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                Anonyme possible
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                Confidentialité
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-sm font-semibold text-white">Conseils rapides</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                Décris les faits : dates, contexte, éléments observables.
              </li>
              <li className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                Si tu en as : liens, documents, captures, références.
              </li>
              <li className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                Dis-nous ce que tu cherches : ressources, écoute, orientation.
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-orange-500/10 to-white/[0.02] p-6">
            <h3 className="text-sm font-semibold text-white">Ressources utiles</h3>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Si tu es en recherche d’aide institutionnelle, tu peux aussi consulter les ressources
              officielles et associatives.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a className="text-orange-300 hover:underline" href="/ressources">
                  Voir la page Ressources
                </a>
              </li>
              <li>
                <a className="text-orange-300 hover:underline" href="/articles">
                  Lire les analyses
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}