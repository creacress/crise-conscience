"use client";

import { useMemo, useState } from "react";
import Button from "@/app/components/ui/Button";
import Tag from "@/app/components/ui/Tag";

/**
 * DonateTunnel — composant de don en 3 étapes :
 * 1. Montant (preset + libre)
 * 2. Fréquence (unique / mensuel)
 * 3. Récapitulatif + redirection paiement
 *
 * Comportement quand l'API Stripe n'est pas (encore) configurée :
 * - 404 ou erreur réseau : on affiche un message gracieux + alternatives
 *   (contact pour don par chèque/virement). On ne fait pas crasher la page.
 */

type Frequency = "once" | "monthly";

type Preset = {
  amount: number; // en EUR
  impact: string; // narratif court "Avec X€ on finance Y"
};

const PRESETS: Preset[] = [
  { amount: 10, impact: "1 mois d'hébergement de notre veille automatisée" },
  { amount: 25, impact: "1 article long sourcé (relecture humaine incluse)" },
  { amount: 60, impact: "1 mois de fonctionnement complet du site" },
];

const MIN_AMOUNT = 2;
const MAX_AMOUNT = 5000;

function clampInt(v: string | number, min = MIN_AMOUNT, max = MAX_AMOUNT) {
  const n = typeof v === "number" ? v : Math.floor(Number(v));
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function formatEuro(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function DonateTunnel() {
  const [amount, setAmount] = useState<number>(25);
  const [customInput, setCustomInput] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>("once");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  const finalAmount = useMemo(
    () => (customInput ? clampInt(customInput) : amount),
    [customInput, amount],
  );

  // 66 % de déductibilité fiscale potentielle (statut associatif en cours
  // d'instruction — info à confirmer dans les mentions légales).
  const deductibleNet = useMemo(() => Math.round(finalAmount * 0.34), [finalAmount]);

  function pickPreset(n: number) {
    setAmount(n);
    setCustomInput("");
    setErrorMsg(null);
  }

  async function handleDonate() {
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount, frequency }),
      });

      if (res.status === 404) {
        // Route pas encore déployée — fallback gracieux.
        setUnavailable(true);
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(
          (data?.message as string) ||
            (data?.error as string) ||
            "Le paiement n'a pas pu démarrer. Réessayez dans un instant.",
        );
        return;
      }

      if (data?.url) {
        window.location.href = data.url as string;
        return;
      }

      setErrorMsg("Réponse inattendue du serveur (URL manquante).");
    } catch {
      setErrorMsg("Erreur réseau. Vérifiez votre connexion et réessayez.");
    } finally {
      setLoading(false);
    }
  }

  // ============== Affichage de l'état "indisponible" (fallback) ==============
  if (unavailable) {
    return (
      <section
        aria-labelledby="don-unavailable-title"
        className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8"
      >
        <Tag tone="info" size="sm">Don en ligne — bientôt disponible</Tag>
        <h2
          id="don-unavailable-title"
          className="mt-3 font-display text-xl font-semibold text-[var(--color-text)] sm:text-2xl"
        >
          Le paiement en ligne sécurisé arrive très vite.
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
          Notre passerelle Stripe est en cours de finalisation. En attendant, vous pouvez nous
          soutenir par <strong className="text-[var(--color-text)]">chèque</strong> ou{" "}
          <strong className="text-[var(--color-text)]">virement bancaire</strong> — écrivez-nous
          pour recevoir nos coordonnées (RIB, ordre du chèque, adresse postale).
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" variant="primary" size="md">
            Demander nos coordonnées
          </Button>
          <Button onClick={() => setUnavailable(false)} variant="ghost" size="md">
            Réessayer le don en ligne
          </Button>
        </div>
      </section>
    );
  }

  // ============== Tunnel normal ==============
  return (
    <section
      aria-labelledby="don-tunnel-title"
      className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8"
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        Faire un don
      </div>
      <h2
        id="don-tunnel-title"
        className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl"
      >
        Soutenir Crise Conscience
      </h2>

      {/* ===== Étape 1 : Montant ===== */}
      <div className="mt-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
          <span
            aria-hidden="true"
            className="inline-flex h-5 w-5 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] text-[10px] font-bold text-[var(--color-accent)]"
          >
            1
          </span>
          Choisissez un montant
        </div>

        <div
          role="radiogroup"
          aria-label="Montants suggérés"
          className="mt-3 grid gap-2 sm:grid-cols-3"
        >
          {PRESETS.map((p) => {
            const checked = !customInput && amount === p.amount;
            return (
              <button
                key={p.amount}
                type="button"
                role="radio"
                aria-checked={checked}
                onClick={() => pickPreset(p.amount)}
                className={`group flex h-full flex-col items-start gap-1 rounded-[var(--radius-md)] border p-4 text-left transition-colors duration-[var(--motion-fast)] cursor-pointer ${
                  checked
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                    : "border-[var(--color-border)] bg-[var(--color-bg)]/40 hover:border-[var(--color-border-strong)]"
                }`}
              >
                <div
                  className={`font-display text-2xl font-semibold ${
                    checked ? "text-[var(--color-accent)]" : "text-[var(--color-text)]"
                  }`}
                >
                  {formatEuro(p.amount)}
                </div>
                <div className="text-xs leading-5 text-[var(--color-text-muted)]">{p.impact}</div>
              </button>
            );
          })}
        </div>

        {/* Montant libre */}
        <label className="mt-4 block">
          <span className="mb-2 block text-xs font-medium text-[var(--color-text-subtle)]">
            ou montant personnalisé (min. {formatEuro(MIN_AMOUNT)} — max. {formatEuro(MAX_AMOUNT)})
          </span>
          <div className="relative">
            <input
              type="number"
              inputMode="numeric"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Saisir un autre montant"
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/60 px-4 py-3 pr-12 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] outline-none transition-colors duration-[var(--motion-fast)] focus:border-[var(--color-accent)] focus:bg-[var(--color-bg)]/80"
              aria-label="Montant personnalisé en euros"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[var(--color-text-subtle)]"
            >
              €
            </span>
          </div>
        </label>
      </div>

      {/* ===== Étape 2 : Fréquence ===== */}
      <div className="mt-7">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
          <span
            aria-hidden="true"
            className="inline-flex h-5 w-5 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] text-[10px] font-bold text-[var(--color-accent)]"
          >
            2
          </span>
          Choisissez la fréquence
        </div>

        <div role="radiogroup" aria-label="Fréquence du don" className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            { v: "once" as const, label: "Don unique", desc: "Un seul prélèvement aujourd'hui." },
            { v: "monthly" as const, label: "Don mensuel", desc: "Reconductible, résiliable à tout moment." },
          ].map((f) => {
            const checked = frequency === f.v;
            return (
              <button
                key={f.v}
                type="button"
                role="radio"
                aria-checked={checked}
                onClick={() => setFrequency(f.v)}
                className={`flex h-full flex-col items-start gap-1 rounded-[var(--radius-md)] border p-4 text-left transition-colors duration-[var(--motion-fast)] cursor-pointer ${
                  checked
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                    : "border-[var(--color-border)] bg-[var(--color-bg)]/40 hover:border-[var(--color-border-strong)]"
                }`}
              >
                <div
                  className={`font-display text-base font-semibold ${
                    checked ? "text-[var(--color-accent)]" : "text-[var(--color-text)]"
                  }`}
                >
                  {f.label}
                </div>
                <div className="text-xs leading-5 text-[var(--color-text-muted)]">{f.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== Étape 3 : Récapitulatif ===== */}
      <div className="mt-7">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)]">
          <span
            aria-hidden="true"
            className="inline-flex h-5 w-5 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] text-[10px] font-bold text-[var(--color-accent)]"
          >
            3
          </span>
          Récapitulatif
        </div>

        <div className="mt-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-5">
          <div className="flex items-baseline justify-between gap-3">
            <div className="text-sm text-[var(--color-text-muted)]">Montant</div>
            <div className="font-display text-3xl font-semibold text-[var(--color-text)]">
              {formatEuro(finalAmount)}
              {frequency === "monthly" ? (
                <span className="ml-1 text-base font-normal text-[var(--color-text-subtle)]">
                  /mois
                </span>
              ) : null}
            </div>
          </div>

          {/* Bandeau déductibilité — placeholder explicite tant que reconnu IG */}
          <div className="mt-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-3 text-xs leading-6 text-[var(--color-text-muted)]">
            <strong className="text-[var(--color-text)]">Déductibilité fiscale.</strong> Si Crise
            Conscience est reconnue d&apos;intérêt général,{" "}
            <strong className="text-[var(--color-accent)]">66&nbsp;% de votre don</strong> seraient
            déductibles : un don de {formatEuro(finalAmount)} ne vous coûterait que{" "}
            <strong className="text-[var(--color-text)]">{formatEuro(deductibleNet)}</strong>{" "}
            après réduction d&apos;impôt.{" "}
            <span className="rounded-md bg-[var(--color-accent-soft)] px-1.5 py-0.5 text-[var(--color-accent)]">
              [reconnaissance fiscale en cours d&apos;instruction]
            </span>
          </div>
        </div>

        {errorMsg ? (
          <div
            role="alert"
            className="mt-4 rounded-[var(--radius-md)] border border-[var(--color-alert-border)] bg-[var(--color-alert-bg)] p-3 text-sm text-[var(--color-alert)]"
          >
            {errorMsg}
          </div>
        ) : null}

        <div className="mt-5">
          <Button
            onClick={handleDonate}
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full"
          >
            {loading ? "Redirection…" : `Donner ${formatEuro(finalAmount)}${frequency === "monthly" ? " /mois" : ""}`}
          </Button>
        </div>

        <ul className="mt-4 grid gap-1.5 text-xs text-[var(--color-text-subtle)] sm:grid-cols-2">
          <li className="flex items-center gap-1.5">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3 text-[var(--color-accent)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Paiement sécurisé via Stripe
          </li>
          <li className="flex items-center gap-1.5">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3 text-[var(--color-accent)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Aucune donnée bancaire stockée
          </li>
          <li className="flex items-center gap-1.5">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3 text-[var(--color-accent)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Résiliation en 1 clic (mensuel)
          </li>
          <li className="flex items-center gap-1.5">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3 text-[var(--color-accent)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Reçu Stripe envoyé par email
          </li>
        </ul>
      </div>
    </section>
  );
}
