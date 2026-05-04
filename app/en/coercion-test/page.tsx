"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Container from "@/app/components/Container";
import Button from "@/app/components/ui/Button";
import Tag from "@/app/components/ui/Tag";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import ResultModal from "@/app/components/ResultModal";

type Axis = "B" | "I" | "T" | "E";

type Question = { id: string; axis: Axis; text: string };

const QUESTIONS: Question[] = [
  { id: "b1", axis: "B", text: "The group or person controls your schedule (where you go, who you see, what you do with your days)." },
  { id: "b2", axis: "B", text: "Your eating, sleeping or clothing habits have changed to follow the group's instructions." },
  { id: "b3", axis: "B", text: "You have been asked or required to make repeated or growing financial contributions (donations, trainings, paid retreats)." },
  { id: "b4", axis: "B", text: "You have reduced or stopped certain activities (studies, hobbies, healthcare, professional life) due to the group's influence." },
  { id: "i1", axis: "I", text: "The group or person discourages or forbids reading outside sources (media, critical books, websites outside the group)." },
  { id: "i2", axis: "I", text: "The outside world is presented as dangerous, corrupted or hostile (“us versus them” logic)." },
  { id: "i3", axis: "I", text: "The group keeps internal doctrines, rules or teachings revealed only to advanced members." },
  { id: "i4", axis: "I", text: "Criticising the group, leader or doctrine is frowned upon, sanctioned or impossible." },
  { id: "t1", axis: "T", text: "The group uses a specific vocabulary that replaces everyday words and would not be understood by an outsider." },
  { id: "t2", axis: "T", text: "You catch yourself stopping your own critical thinking to avoid questioning teachings." },
  { id: "t3", axis: "T", text: "When a doubt appears, you are asked to “share it with the group” or leader rather than reflect alone." },
  { id: "t4", axis: "T", text: "The group's answers are presented as universal: there is only one right way to think, feel, live." },
  { id: "e1", axis: "E", text: "You feel guilt or shame when you think about leaving the group, taking a weekend off or seeing outside relatives." },
  { id: "e2", axis: "E", text: "You have been told of severe consequences (spiritual, physical, social) if you left the group." },
  { id: "e3", axis: "E", text: "Your relations with family or friends outside the group have weakened, deteriorated or broken." },
  { id: "e4", axis: "E", text: "You are afraid to ask questions or openly express disagreement." },
];

type AnswerValue = "yes" | "uncertain" | "no" | "skip";
const ANSWER_WEIGHT: Record<AnswerValue, number> = { yes: 2, uncertain: 1, no: 0, skip: 0 };
const ANSWER_LABEL: Record<AnswerValue, string> = {
  yes: "Yes",
  uncertain: "Mostly yes / not sure",
  no: "No",
  skip: "Prefer not to answer",
};

type Severity = "vigilance" | "info" | "alert";

const SEVERITY_DATA: Record<
  Severity,
  { tag: "calm" | "info" | "alert"; title: string; desc: string; cta: string; href: string }
> = {
  vigilance: {
    tag: "calm",
    title: "Watchful — few converging signals",
    desc:
      "At this stage, your situation does not show strong patterns of coercion. Stay attentive to changes, keep critical thinking, talk regularly to trusted contacts outside the group. The pattern can build up over time.",
    cta: "Read the 17 MIVILUDES criteria",
    href: "/en/recognize-coercive-control",
  },
  info: {
    tag: "info",
    title: "Alert — several converging signals",
    desc:
      "Several signals appear in your situation. Without making it a diagnosis, this is reason enough to step back, talk to a trusted person outside the group, and consider an exchange with a specialised association.",
    cta: "Help a loved one / help myself",
    href: "/en/help-a-loved-one",
  },
  alert: {
    tag: "alert",
    title: "Caution — strong accumulation of signals",
    desc:
      "The convergence of indicators is significant. This is the time to seek advice from specialised structures (UNADFI, CCMM, MIVILUDES) without delay. If the situation involves physical, psychological or child danger, contact emergency services.",
    cta: "Read the “Help a loved one” guide",
    href: "/en/help-a-loved-one",
  },
};

const AXIS: Record<Axis, { name: string; desc: string }> = {
  B: { name: "Behavior", desc: "What is imposed on your daily life: time, money, habits." },
  I: { name: "Information", desc: "What is filtered, hidden, or presented as the only truth." },
  T: { name: "Thoughts", desc: "What you are asked to think or not think." },
  E: { name: "Emotion", desc: "What you are expected to feel: fear, guilt, shame." },
};

function classifyScore(score: number, max: number): Severity {
  const pct = (score / max) * 100;
  if (pct < 25) return "vigilance";
  if (pct < 55) return "info";
  return "alert";
}

export default function EnCoercionTestPage() {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const total = QUESTIONS.length;
  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / total) * 100);
  const allAnswered = answered === total;

  const score = useMemo(
    () => Object.values(answers).reduce((s, v) => s + ANSWER_WEIGHT[v], 0),
    [answers],
  );

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
    setModalOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function submit() {
    setSubmitted(true);
    setModalOpen(true);
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
            { label: "Home", href: "/en" },
            { label: "Take action", href: "/en/help-a-loved-one" },
            { label: "Coercion self-check" },
          ]}
        />

        <header className="mb-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone="info" size="sm">Educational tool</Tag>
            <Tag tone="calm" size="sm">100% anonymous · 5 min</Tag>
            <Tag tone="neutral" size="sm">No data sent to server</Tag>
          </div>
          <h1 className="mt-5 font-display text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] md:text-4xl lg:text-5xl">
            Self-check: spot the signs of{" "}
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] bg-clip-text text-transparent">
              coercion
            </span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
            16 questions inspired by the <strong className="text-[var(--color-text)]">BITE
            model</strong> (<em>Behavior, Information, Thoughts, Emotion</em>) by Steven Hassan,
            complemented by MIVILUDES references. The test is <strong>not a medical
            diagnosis</strong> — it is an educational tool to structure your reflection.
          </p>
        </header>

        <aside
          role="note"
          aria-label="Disclaimer"
          className="mb-8 rounded-[var(--radius-xl)] border border-[var(--color-alert-border)] bg-[var(--color-alert-bg)] p-5 text-sm leading-6 text-[var(--color-text-muted)]"
        >
          <strong className="text-[var(--color-text)]">Important.</strong> This tool replaces
          neither a medical diagnosis nor professional psychological or legal advice. None of
          your answers are sent to a server — the score is computed entirely in your browser. If
          you are in distress, in France call{" "}
          <a className="font-semibold text-[var(--color-alert)] underline underline-offset-2" href="tel:3114">
            3114
          </a>{" "}
          (suicide prevention, free, 24/7) or{" "}
          <a className="font-semibold text-[var(--color-alert)] underline underline-offset-2" href="tel:112">
            112
          </a>{" "}
          (emergencies).
        </aside>

        {!submitted ? (
          <>
            <div className="sticky top-[5.5rem] z-10 mb-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)]/95 p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-subtle)]">
                <span>
                  Question <strong className="text-[var(--color-text)]">{answered}</strong> of {total}
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

            <ol className="space-y-4">
              {QUESTIONS.map((q, idx) => {
                const current = answers[q.id];
                return (
                  <li key={q.id} id={q.id} className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5">
                    <div className="flex items-start gap-3">
                      <span aria-hidden="true" className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface-2)] font-mono text-xs font-bold text-[var(--color-text-muted)]">
                        {idx + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                          {AXIS[q.axis].name}
                        </div>
                        <p className="mt-1.5 text-base leading-relaxed text-[var(--color-text)]">{q.text}</p>

                        <fieldset className="mt-4">
                          <legend className="sr-only">Answer to question {idx + 1}</legend>
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
                  ? "All questions answered — you can see the result."
                  : `${total - answered} question${total - answered > 1 ? "s" : ""} left.`}
              </p>
              <Button onClick={submit} variant="primary" size="lg" disabled={!allAnswered}>
                See result
              </Button>
            </div>
          </>
        ) : (
          <section id="result" aria-live="polite" className="space-y-6 scroll-mt-24">
            <div
              className={`rounded-[var(--radius-xl)] border p-6 sm:p-8 ${
                severity === "alert"
                  ? "border-[var(--color-alert-border)] bg-[var(--color-alert-bg)]"
                  : severity === "info"
                  ? "border-sky-400/30 bg-sky-400/5"
                  : "border-emerald-400/30 bg-emerald-400/5"
              }`}
            >
              <Tag tone={sev.tag} size="md">Indicative result</Tag>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl">
                {sev.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-text-muted)]">{sev.desc}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[var(--color-text-subtle)]">Total score</div>
                  <div className="mt-1 text-3xl font-semibold text-[var(--color-text)]">
                    {score} <span className="text-base text-[var(--color-text-subtle)]">/ {max}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button href={sev.href} variant="primary" size="md">{sev.cta}</Button>
                  <Button onClick={reset} variant="ghost" size="md">Retake the test</Button>
                </div>
              </div>
            </div>

            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-6">
              <h3 className="font-display text-lg font-semibold text-[var(--color-text)]">
                Detail by axis — BITE model
              </h3>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Reading by control dimension (Behavior, Information, Thoughts, Emotion).
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
                            pct >= 55 ? "bg-[var(--color-alert)]" : pct >= 25 ? "bg-[var(--color-accent)]" : "bg-emerald-400"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/en/help-a-loved-one"
                className="block rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5 transition-[border-color,background-color] duration-[var(--motion-fast)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]/80"
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">Next step</div>
                <div className="mt-1 font-display text-lg font-semibold text-[var(--color-text)]">
                  Help a loved one — 5-step guide
                </div>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  What to do concretely, in which order, who to contact.
                </p>
              </Link>
              <Link
                href="/en/contact"
                className="block rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/70 p-5 transition-[border-color,background-color] duration-[var(--motion-fast)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]/80"
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">Talk about it</div>
                <div className="mt-1 font-display text-lg font-semibold text-[var(--color-text)]">
                  Contact us (anonymous possible)
                </div>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Reply within 48–72 h. Your data is not shared.
                </p>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-1)]/40 px-4 py-3 text-sm text-[var(--color-text-subtle)]">
              <span>Need a calming word?</span>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-1 font-medium text-[var(--color-accent)] transition-colors duration-[var(--motion-fast)] hover:bg-[var(--color-accent-soft)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                Reopen the message
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </button>
            </div>
          </section>
        )}

        <ResultModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          severity={severity}
          locale="en"
          contactHref="/en/contact"
        />

        <footer className="mt-12 border-t border-[var(--color-border)] pt-6 text-xs leading-6 text-[var(--color-text-subtle)]">
          <p>
            Educational test inspired by Steven Hassan's BITE model (Combating Cult Mind Control,
            1988) and MIVILUDES references. No data is transmitted to the server. AI-assisted
            drafting, human-reviewed by Crise Conscience editorial team. For an individual case,
            consult specialised associations (UNADFI, CCMM) or a professional.
          </p>
        </footer>
      </div>
    </Container>
  );
}
