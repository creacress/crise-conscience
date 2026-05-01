"use client";

import { useMemo, useState } from "react";

const presetAmounts = [5, 10, 25, 50, 100];

type DonateReason = {
  title: string;
  text: string;
  icon: string;
};

const reasons: DonateReason[] = [
  {
    title: "Infrastructure & sécurité",
    text: "Hébergement, protection anti‑abus, sauvegardes et durcissement du service.",
    icon: "🛡️",
  },
  {
    title: "Analyses & contre‑discours",
    text: "Recherche, recoupement des sources, rédaction et relecture éditoriale.",
    icon: "🧠",
  },
  {
    title: "Ressources pédagogiques",
    text: "Guides, fiches, formats courts, et contenus accessibles au grand public.",
    icon: "📚",
  },
  {
    title: "Automatisation & veille",
    text: "Collecte, tri, publication et mise à jour via n8n — sans sacrifier la rigueur.",
    icon: "⚙️",
  },
];

function clampInt(v: string, min: number, max: number) {
  const n = Math.floor(Number(v));
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

export default function DonPage() {
  const [loadingAmount, setLoadingAmount] = useState<number | null>(null);
  const [custom, setCustom] = useState<string>("15");
  const [error, setError] = useState<string | null>(null);

  const customAmount = useMemo(() => clampInt(custom, 2, 5000), [custom]);

  async function handleDonate(amount: number) {
    setError(null);
    setLoadingAmount(amount);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          data?.message ||
          data?.error ||
          "Impossible de démarrer le paiement. Réessaie dans un instant.";
        setError(String(msg));
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      setError("Réponse Stripe inattendue (URL manquante).");
    } catch {
      setError("Erreur réseau. Vérifie ta connexion et réessaie.");
    } finally {
      setLoadingAmount(null);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* top glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-24 right-[-60px] h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute top-40 left-10 h-[320px] w-[320px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              Soutenir l’association
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
              Soutenir une information libre,
              <span className="block text-orange-400">rigoureuse et indépendante</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
              Ton don aide Crise Conscience à produire des analyses vérifiables, à maintenir une veille
              automatisée, et à publier des ressources utiles — sans dépendre d’intérêts extérieurs.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/60">
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 transition hover:bg-white/10">
                Paiement Stripe sécurisé
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 transition hover:bg-white/10">
                Aucune donnée bancaire stockée
              </span>
              <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-orange-200 transition hover:bg-orange-500/15">
                Transparence & utilité publique
              </span>
            </div>
          </div>
        </section>

        {/* GRID */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* LEFT */}
          <div className="lg:col-span-7">
            {/* WHY */}
            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h2 className="text-lg font-semibold md:text-xl">À quoi servent les dons ?</h2>
              <p className="mt-2 text-sm text-white/70">
                On préfère être clair : ton soutien finance du concret, mesurable, et utile.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {reasons.map((r) => (
                  <div
                    key={r.title}
                    className="group rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:bg-white/10"
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-lg">
                        {r.icon}
                      </div>
                      <div>
                        <div className="font-semibold">{r.title}</div>
                        <div className="mt-1 text-sm text-white/70">{r.text}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-white/70">
                <div className="font-semibold text-white">Notre promesse</div>
                <p className="mt-2 leading-relaxed">
                  Pas de marketing de la peur, pas d’approximation : des sources, du contexte, et des
                  explications. Le don sert à garder ce niveau d’exigence.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h2 className="text-lg font-semibold md:text-xl">FAQ</h2>

              <div className="mt-5 space-y-3">
                <details className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5">
                  <summary className="cursor-pointer font-semibold text-white/95">
                    Mon don est‑il déductible des impôts ?
                  </summary>
                  <div className="mt-2 text-sm text-white/75 leading-relaxed">
                    <p>
                      Crise Conscience est une association loi 1901. La déductibilité fiscale (66 %
                      du don pour les particuliers, dans la limite de 20 % du revenu imposable —
                      article 200 du Code général des impôts) n&apos;est possible que si
                      l&apos;association est <strong>reconnue d&apos;intérêt général</strong> ou
                      d&apos;utilité publique.
                    </p>
                    <p className="mt-2">
                      <strong>Statut actuel :</strong>{" "}
                      <span className="rounded-md bg-orange-500/15 px-1.5 py-0.5 text-orange-200">
                        [reconnaissance fiscale en cours d&apos;instruction — à confirmer]
                      </span>
                      . Tant que ce statut n&apos;est pas confirmé, nous n&apos;émettons pas de reçu
                      fiscal CERFA. Vous serez informé·e dès que la reconnaissance sera effective.
                    </p>
                  </div>
                </details>

                <details className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <summary className="cursor-pointer font-semibold text-white/90">
                    Est‑ce que je reçois un reçu ?
                  </summary>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    Stripe vous envoie automatiquement un reçu de paiement par email. Pour un
                    justificatif au nom de l&apos;association, écrivez‑nous via la page Contact
                    après le don.
                  </p>
                </details>

                <details className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <summary className="cursor-pointer font-semibold text-white/90">
                    Comment l&apos;argent est‑il utilisé ?
                  </summary>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    Hébergement, outils de veille et d&apos;analyse, frais de fonctionnement
                    (assurance, juridique), production de ressources pédagogiques. Le rapport
                    d&apos;activité annuel sera publié sur cette page dès la première clôture
                    d&apos;exercice.
                  </p>
                </details>

                <details className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <summary className="cursor-pointer font-semibold text-white/90">
                    Puis‑je donner un autre montant ?
                  </summary>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    Oui : vous pouvez choisir un montant personnalisé juste à droite. Minimum 2€.
                  </p>
                </details>

                <details className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <summary className="cursor-pointer font-semibold text-white/90">
                    Vos analyses sont‑elles partisanes ?
                  </summary>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    Notre boussole : méthode, sources, esprit critique. Nous parlons de
                    comportements et de dommages observables, pas de croyances individuelles.
                  </p>
                </details>
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <aside className="lg:col-span-5">
            <div className="sticky top-6 space-y-6">
              {/* DONATE */}
              <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold md:text-xl">Faire un don</h2>
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/70">
                    1 paiement
                  </span>
                </div>

                <p className="mt-2 text-sm text-white/70">
                  Choisis un montant — redirection vers Stripe.
                </p>

                {error ? (
                  <div className="mt-4 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
                    {error}
                  </div>
                ) : null}

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleDonate(amount)}
                      disabled={loadingAmount === amount}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-orange-500/40 hover:bg-orange-500/10 focus:outline-none focus:ring-2 focus:ring-orange-500/30 disabled:opacity-60"
                    >
                      {loadingAmount === amount ? "Chargement…" : `${amount} €`}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <label className="block text-xs font-semibold text-white/80">
                    Montant personnalisé
                  </label>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="relative flex-1">
                      <input
                        value={custom}
                        onChange={(e) => setCustom(e.target.value)}
                        inputMode="numeric"
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 pr-12 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
                        placeholder="15"
                        aria-label="Montant personnalisé"
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/50">
                        €
                      </span>
                    </div>
                    <button
                      onClick={() => handleDonate(customAmount)}
                      disabled={loadingAmount === customAmount}
                      className="rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 disabled:opacity-60"
                    >
                      {loadingAmount === customAmount ? "…" : "Donner"}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-white/55">
                    Minimum 2€ — maximum 5000€ (sécurité).
                  </p>
                </div>

                <div className="mt-5 text-xs text-white/60 leading-relaxed">
                  Paiement sécurisé via Stripe. Aucune donnée bancaire n’est stockée sur notre site.
                </div>
              </section>

              {/* TRUST */}
              <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
                <h3 className="text-base font-semibold">Transparence</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/70">
                  <li className="flex gap-3">
                    <span className="mt-0.5">✓</span>
                    <span>Objectifs clairs : prévention, analyse, ressources.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5">✓</span>
                    <span>Automatisation utile (n8n) + vérification humaine.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5">✓</span>
                    <span>Indépendance éditoriale : pas de sponsorisation opaque.</span>
                  </li>
                </ul>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-white/60">
                  Astuce : un petit don régulier (même rare) est parfois plus puissant qu’un gros don
                  unique.
                </div>
              </section>
            </div>
          </aside>
        </div>

        {/* FOOTER NOTE */}
        <footer className="mt-12 text-center text-xs text-white/55">
          Merci pour ton soutien — il finance la rigueur, pas le bruit.
        </footer>
      </div>
    </main>
  );
}