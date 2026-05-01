"use client";

import { useMemo, useState } from "react";
import { Toast, ToastKind } from "./Toast";

function normalizeEmail(v: string) {
  return v.trim().toLowerCase();
}

function isValidEmail(v: string) {
  const email = normalizeEmail(v);
  if (!email || email.length > 320) return false;
  if (!email.includes("@")) return false;
  const [u, d] = email.split("@");
  if (!u || !d) return false;
  if (!d.includes(".")) return false;
  return true;
}

export function UnsubscribeCard({
  className = "",
  title = "Se désinscrire",
  subtitle = "Entre ton email pour ne plus recevoir la newsletter.",
  placeholder = "ton@email.fr",
  buttonLabel = "Me désinscrire",
}: {
  className?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonLabel?: string;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    kind: ToastKind;
    title?: string;
    message: string;
  }>({ open: false, kind: "info", message: "" });

  const valid = useMemo(() => isValidEmail(email), [email]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || loading) return;

    setLoading(true);
    try {
      const res = await fetch("/api/subscribers/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizeEmail(email) }),
      });

      const json = await res.json().catch(() => ({} as any));
      if (!res.ok || !json?.ok) throw new Error(json?.reason ?? `HTTP ${res.status}`);

      setEmail("");
      setToast({
        open: true,
        kind: "success",
        title: "C’est fait",
        message:
          "Tu es désinscrit. (Si l’email n’existait pas, on ne divulgue rien : même résultat.)",
      });
    } catch (err: any) {
      setToast({
        open: true,
        kind: "error",
        title: "Erreur",
        message: err?.message ?? "Erreur inconnue",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className={[
          "rounded-3xl border border-white/10 bg-white/[0.04] p-6",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_80px_rgba(0,0,0,0.45)]",
          className,
        ].join(" ")}
      >
        <div className="text-sm text-white/65">Newsletter</div>
        <div className="mt-2 text-lg font-semibold text-white">{title}</div>
        <p className="mt-2 text-sm text-white/65 leading-relaxed">{subtitle}</p>

        <form onSubmit={onSubmit} className="mt-5">
          <div className="flex gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20"
              inputMode="email"
              autoComplete="email"
              aria-label="Adresse email"
            />
            <button
              disabled={!valid || loading}
              className="shrink-0 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15 transition disabled:opacity-50 disabled:hover:bg-white/10"
            >
              {loading ? "…" : buttonLabel}
            </button>
          </div>

          {!valid && email.length > 0 && (
            <div className="mt-2 text-xs text-[var(--color-text-subtle)]">Email invalide.</div>
          )}

          <div className="mt-4 text-xs text-[var(--color-text-subtle)] leading-relaxed">
            Tu peux te réabonner à tout moment depuis le site.
          </div>
        </form>
      </div>

      <Toast
        open={toast.open}
        kind={toast.kind}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
      />
    </>
  );
}