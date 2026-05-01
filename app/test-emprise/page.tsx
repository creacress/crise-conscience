"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Container from "@/app/components/Container";
import Button from "@/app/components/ui/Button";
import Tag from "@/app/components/ui/Tag";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import EmergencyBox from "@/app/components/EmergencyBox";

/**
 * /test-emprise — Outil pédagogique d'auto-évaluation.
 * Inspiration : modèle BITE (Behavior, Information, Thoughts, Emotion) de
 * Steven Hassan, complété par les repères MIVILUDES.
 *
 * Disclaimer juridique critique :
 * - Pas un diagnostic médical
 * - Pas un avis psychologique ou juridique
 * - Aucune donnée n'est envoyée au serveur (calcul 100% client)
 * - Uniquement à but pédagogique
 */

type Axis = "B" | "I" | "T" | "E";

type Question = {
  id: string;
  axis: Axis;
  text: string;
  hint?: string;
};

const QUESTIONS: Question[] = [
  // Behavior — comportements imposés
  { id: "b1", axis: "B", text: "Le groupe ou la personne contrôle votre emploi du temps (où vous allez, qui vous voyez, ce que vous faites de vos journées)." },
  { id: "b2", axis: "B", text: "Vos habitudes alimentaires, de sommeil ou vestimentaires ont changé pour suivre les consignes du groupe." },
  { id: "b3", axis: "B", text: "On vous a demandé ou imposé des contributions financières répétées ou croissantes (dons, formations, retraites payantes)." },
  { id: "b4", axis: "B", text: "Vous avez réduit ou cessé certaines activités (études, hobbies, soins médicaux, vie professionnelle) suite à l'influence du groupe." },

  // Information — contrôle de l'info
  { id: "i1", axis: "I", text: "Le groupe ou la personne décourage ou interdit la lecture de sources extérieures (médias, livres critiques, sites web hors du groupe)." },
  { id: "i2", axis: "I", text: "On vous présente le monde extérieur comme dangereux, corrompu ou ennemi (logique « nous contre eux »)." },
  { id: "i3", axis: "I", text: "Le groupe garde des doctrines, règles ou enseignements internes qu'on ne révèle qu'aux membres avancés." },
  { id: "i4", axis: "I", text: "Critiquer le groupe, le leader ou la doctrine est mal vu, sanctionné ou impossible." },

  // Thoughts — contrôle de la pensée
  { id: "t1", axis: "T", text: "Le groupe utilise un vocabulaire spécifique qui remplace les mots du quotidien et qu'un extérieur ne comprendrait pas." },
  { id: "t2", axis: "T", text: "Vous vous surprenez à arrêter votre propre pensée critique pour ne pas remettre en cause les enseignements." },
  { id: "t3", axis: "T", text: "Quand un doute apparaît, on vous demande de le « confier au groupe » ou au leader plutôt que d'y réfléchir seul·e." },
  { id: "t4", axis: "T", text: "On présente les réponses du groupe comme universelles : il y a une seule bonne façon de penser, sentir, vivre." },

  // Emotion — manipulation émotionnelle
  { id: "e1", axis: "E", text: "Vous ressentez de la culpabilité ou de la honte quand vous pensez à quitter le groupe, partir un week-end ou voir des proches extérieurs." },
  { id: "e2", axis: "E", text: "On vous a parlé de conséquences graves (spirituelles, physiques, sociales) si vous quittiez le groupe." },
  { id: "e3", axis: "E", text: "Vos relations avec votre famille ou vos amis hors du groupe se sont distendues, dégradées ou rompues." },
  { id: "e4", axis: "E", text: "Vous avez peur de poser des questions ou d'exprimer un désaccord ouvertement." },
];

type AnswerValue = "yes" | "uncertain" | "no" | "skip";
const ANSWER_WEIGHT: Record<AnswerValue, number> = {
  yes: 2,
  uncertain: 1,
  no: 0,
  skip: 0,
};
const ANSWER_LABEL: Record<AnswerValue, string> = {
  yes: "Oui",
  uncertain: "Plutôt oui / pas sûr·e",
  no: "Non",
  skip: "Préfère ne pas répondre",
};

type Severity = "vigilance" | "info" | "alerte";

const SEVERITY_DATA: Record<
  Severity,
  { tag: "calm" | "info" | "alert"; title: string; desc: string; cta: string; href: string }
> = {
  vigilance: {
    tag: "calm",
    title: "Vigilance — peu de signaux convergents",
    desc: "À ce stade, votre situation ne montre pas de motifs forts d'emprise. Restez attentif·ve aux évolutions, gardez un esprit critique, parlez régulièrement à des personnes de confiance hors du groupe. Le faisceau d'indices peut s'épaissir avec le temps.",
    cta: "Lire les 17 critères MIVILUDES",
    href: "/blog/signaux-emprise",
  },
  info: {
    tag: "info",
    title: "Alerte — plusieurs signaux convergents",
    desc: "Plusieurs signaux convergents apparaissent dans votre situation. Sans en faire un diagnostic, c'est un motif suffisant pour prendre du recul, en parler à une personne de confiance hors du groupe, et envisager un échange avec une association spécialisée.",
    cta: "Aider un proche / m'aider",
    href: "/aider-un-proche",
  },
  alerte: {
    tag: "alert",
    title: "Danger — accumulation forte de signaux",
    desc: "Le faisceau d'indices est important. C'est le moment de demander conseil à des structures spécialisées (UNADFI, CCMM, MIVILUDES) sans tarder. Si la situation comporte un danger physique, psychologique ou pour des mineurs, contactez les services d'urgence.",
    cta: "Lire le guide « Aider un proche »",
    href: "/aider-un-proche",
  },
};

type AxisLabel = Record<Axis, { name: string; desc: string }>;
const AXIS: AxisLabel = {
  B: {
    name: "Comportement (Behavior)",
    desc: "Ce qu'on impose à votre vie quotidienne : temps, argent, habitudes.",
  },
  I: {
    name: "Information",
    desc: "Ce qu'on filtre, dissimule, ou présente comme la seule vérité.",
  },
  T: {
    name: "Pensée (Thoughts)",
    desc: "Ce qu'on demande de penser ou de ne pas penser.",
  },
  E: {
    name: "Émotion",
    desc: "Ce qu'on attend que vous ressentiez : peur, culpabilité, honte.",
  },
};

function classifyScore(score: number, max: number): Severity {
  const pct = (score / max) * 100;
  if (pct < 25) return "vigilance";
  if (pct < 55) return "info";
  return "alerte";
}

export default function TestEmprisePage() {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = QUESTIONS.length;
  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / total) * 100);
  const allAnswered = answered === total;

  const score = useMemo(() => {
    return Object.values(answers).reduce((s, v) => s + ANSWER_WEIGHT[v], 0);
  }, [answers]);

  // Score par axe (BITE)
  const byAxis = useMemo(() => {
    const acc: Record<Axis, { score: number; max: number }> = {
      B: { score: 0, max: 0 },
      I: { score: 0, max: 0 },
      T: { score: 0, max: 0 },
      E: { score: 0, max: 0 },
    };
    QUESTIONS.forEach((q) => {
      acc[q.axis].max += 2;
      const v = answers[q.id];
      if (v) acc[q.axis].score += ANSWER_WEIGHT[v];
    });
    return acc;
  }, [answers]);

  const max = total * 2;
  const severity: Severity = classifyScore(score, max);
  const sev = SEVERITY_DATA[severity];

  function pick(qid: string, value: AnswerValue) {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function submit() {
    setSubmitted(true);
    if (typeof window !== "undefined") {
      const el = document.getElementById("result");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <Container>
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          className="mb-6"
          items={[
            { label: "Accueil", href: "/" },
            { label: "Agir", href: "/aider-un-proche" },
            { label: "Test d'emprise" },
          ]}
        />

        {/* Hero */}
        <header className="mb-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone="info" size="sm">Outil pédagogique</Tag>
            <Tag tone="calm" size="sm">100% anonyme · 5 min</Tag>
            <Tag tone="neutral" size="sm">Aucune donnée envoyée</Tag>
          </div>
          <h1 className="mt-5 font-display text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] md:text-4xl lg:text-5xl">
            Test d&apos;auto-évaluation : repérer les signaux d&apos;
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
              emprise
            </span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
            16 questions inspirées du <strong className="text-[var(--color-text)]">modèle BITE</strong>{" "}
            (<em>Behavior, Information, Thoughts, Emotion</em>) de Steven Hassan, complété par
            les repères MIVILUDES. Le test n&apos;est pas un diagnostic médical — c&apos;est un
            outil pédagogique pour structurer votre réflexion.
          </p>
        </header>

        {/* Disclaimer juridique */}
        <aside
          role="note"
          aria-label="Avertissement"
          className="mb-8 rounded-[var(--radius-xl)] border border-[var(--color-alert-border)] bg-[var(--color-alert-bg)] p-5 text-sm leading-6 text-[var(--color-text-muted)]"
        >
          <strong className="text-[var(--color-text)]">Important.</strong> Cet outil ne remplace ni
          un diagnostic médical, ni un avis psychologique ou juridique professionnel. Aucune de vos
          réponses n&apos;est envoyée à un serveur — le score est calculé entièrement dans votre
          navigateur. Si vous êtes en détresse, appelez le{" "}
          <a className="font-semibold text-[var(--color-alert)] underline underline-offset-2" href="tel:3114">
            3114
          </a>{" "}
          (prévention suicide, gratuit, 24/7) ou le{" "}
          <a className="font-semibold text-[var(--color-alert)] underline underline-offset-2" href="tel:112">
            112
          </a>{" "}
          (urgences).
        </aside>

        {!submitted ? (
          <>
            {/* Progress bar */}
            <div className="sticky top-[5.5rem] z-10 mb-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/95 p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-subtle)]">
                <span>
                  Question <strong className="text-[var(--color-text)]">{answered}</strong> sur {total}
                </span>
                <span>{progress}%</span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-2)]"
              >
                <div
                  className="h-full rounded-full bg-[var(--color-accent)] transition-[width] duration-[var(--motion-base)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Quiz */}
            <ol className="space-y-4">
              {QUESTIONS.map((q, idx) => {
                const current = answers[q.id];
                return (
                  <li
                    key={q.id}
                    id={q.id}
                    className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface-2)] font-mono text-xs font-bold text-[var(--color-text-muted)]"
                      >
                        {idx + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                          {AXIS[q.axis].name}
                        </div>
                        <p className="mt-1.5 text-base leading-relaxed text-[var(--color-text)]">{q.text}</p>

                        <fieldset className="mt-4">
                          <legend className="sr-only">Réponse à la question {idx + 1}</legend>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {(["yes", "uncertain", "no", "skip"] as AnswerValue[]).map((v) => {
                              const checked = current === v;
                              return (
                                <label
                                  key={v}
                                  className={`flex cursor-pointer items-center gap-2 rounded-[var(--radius-md)] border px-3 py-2 text-sm transition-colors duration-[var(--motion-fast)] ${
                                    checked
                                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                                      : "border-[var(--color-border)] bg-[var(--color-bg)]/40 text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={q.id}
                                    value={v}
                                    checked={checked}
                                    onChange={() => pick(q.id, v)}
                                    className="h-4 w-4 accent-[var(--color-accent)] cursor-pointer"
                                  />
                                  <span>{ANSWER_LABEL[v]}</span>
                                </label>
                              );
                            })}
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[var(--color-text-subtle)]">
                {allAnswered
                  ? "Toutes les questions sont remplies — vous pouvez voir le résultat."
                  : `Encore ${total - answered} question${total - answered > 1 ? "s" : ""} à répondre.`}
              </p>
              <Button
                onClick={submit}
                variant="primary"
                size="lg"
                disabled={!allAnswered}
              >
                Voir le résultat
              </Button>
            </div>
          </>
        ) : (
          <section
            id="result"
            aria-live="polite"
            className="space-y-6 scroll-mt-24"
          >
            <div
              className={`rounded-[var(--radius-xl)] border p-6 sm:p-8 ${
                severity === "alerte"
                  ? "border-[var(--color-alert-border)] bg-[var(--color-alert-bg)]"
                  : severity === "info"
                  ? "border-sky-400/30 bg-sky-400/5"
                  : "border-emerald-400/30 bg-emerald-400/5"
              }`}
            >
              <Tag tone={sev.tag} size="md">
                Résultat indicatif
              </Tag>

              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl">
                {sev.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-text-muted)]">
                {sev.desc}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[var(--color-text-subtle)]">
                    Score global
                  </div>
                  <div className="mt-1 text-3xl font-semibold text-[var(--color-text)]">
                    {score} <span className="text-base text-[var(--color-text-subtle)]">/ {max}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button href={sev.href} variant="primary" size="md">
                    {sev.cta}
                  </Button>
                  <Button onClick={reset} variant="ghost" size="md">
                    Refaire le test
                  </Button>
                </div>
              </div>
            </div>

            {/* Détail par axe BITE */}
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6">
              <h3 className="font-display text-lg font-semibold text-[var(--color-text)]">
                Détail par axe — modèle BITE
              </h3>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Lecture par dimension de contrôle (Behavior, Information, Thoughts, Emotion).
              </p>

              <ul className="mt-5 space-y-4">
                {(Object.keys(AXIS) as Axis[]).map((a) => {
                  const v = byAxis[a];
                  const pct = v.max ? Math.round((v.score / v.max) * 100) : 0;
                  return (
                    <li key={a}>
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <div>
                          <div className="font-semibold text-[var(--color-text)]">{AXIS[a].name}</div>
                          <div className="text-xs text-[var(--color-text-subtle)]">{AXIS[a].desc}</div>
                        </div>
                        <div className="font-mono text-sm font-bold text-[var(--color-text)]">
                          {v.score}/{v.max}
                        </div>
                      </div>
                      <div
                        role="progressbar"
                        aria-valuenow={pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--color-surface-2)]"
                      >
                        <div
                          className={`h-full rounded-full transition-[width] duration-[var(--motion-base)] ${
                            pct >= 55
                              ? "bg-[var(--color-alert)]"
                              : pct >= 25
                              ? "bg-[var(--color-accent)]"
                              : "bg-emerald-400"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Liens et urgences */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/aider-un-proche"
                className="block rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5 transition-[border-color,background-color] duration-[var(--motion-fast)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]/80"
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                  Étape suivante
                </div>
                <div className="mt-1 font-display text-lg font-semibold text-[var(--color-text)]">
                  Aider un proche — guide en 5 étapes
                </div>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Que faire concrètement, dans quel ordre, qui contacter.
                </p>
              </Link>
              <Link
                href="/contact"
                className="block rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5 transition-[border-color,background-color] duration-[var(--motion-fast)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]/80"
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                  En parler
                </div>
                <div className="mt-1 font-display text-lg font-semibold text-[var(--color-text)]">
                  Nous contacter (anonymat possible)
                </div>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Réponse sous 48–72 h. Vos données ne sont pas partagées.
                </p>
              </Link>
            </div>

            <EmergencyBox variant="full" />
          </section>
        )}

        <footer className="mt-12 border-t border-[var(--color-border)] pt-6 text-xs leading-6 text-[var(--color-text-subtle)]">
          <p>
            Test pédagogique inspiré du modèle BITE de Steven Hassan (Combating Cult Mind Control,
            1988) et des repères MIVILUDES. Aucune donnée n&apos;est transmise au serveur.
            Contenu rédigé avec assistance IA, relu par la rédaction Crise Conscience. Pour un cas
            individuel, consultez les associations spécialisées (UNADFI, CCMM) ou un·e
            professionnel·le.
          </p>
        </footer>
      </div>
    </Container>
  );
}
