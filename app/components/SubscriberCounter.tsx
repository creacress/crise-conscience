"use client";

import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSubscriberCount } from "./useSubscriberCount";

function format(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n);
}

function milestoneCopy(n: number) {
  if (n >= 5000)
    return { title: "On devient un signal public.", desc: "Réseau solide, impact réel, actions possibles à grande échelle." };
  if (n >= 1000)
    return { title: "Masse critique atteinte.", desc: "Assez nombreux pour peser, assez visibles pour aider plus loin." };
  if (n >= 300)
    return { title: "Communauté en place.", desc: "On peut produire plus de ressources et améliorer l’accompagnement." };
  if (n >= 100)
    return { title: "On commence à compter.", desc: "Chaque soutien rend la prévention plus accessible." };
  if (n >= 20)
    return { title: "Les fondations sont là.", desc: "Les premières briques d’un projet durable." };
  return { title: "Début de trajectoire.", desc: "Chaque personne compte. Littéralement." };
}

export function SubscriberCounter({
  className = "",
  compact = false,
  ctaHref = "/abonnes",
  ctaLabel = "Voir le compteur",
}: {
  className?: string;
  compact?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const { loading, count, error } = useSubscriberCount();

  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  const mv = useMotionValue(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const unsub = mv.on("change", (v) => setShown(Math.floor(v)));
    return () => unsub();
  }, [mv]);

  useEffect(() => {
    if (!inView) return;
    const to = loading ? 0 : count;
    const controls = animate(mv, to, {
      duration: Math.min(1.6, 0.6 + to / 1500),
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [inView, loading, count, mv]);

  const copy = useMemo(() => milestoneCopy(count), [count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={[
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_80px_rgba(0,0,0,0.45)]",
        className,
      ].join(" ")}
    >
      {/* glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-[28rem] rounded-full bg-white/5 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-white/65">Personnes abonnées</div>
            <div className="mt-2 flex items-baseline gap-3">
              <div className="text-4xl font-semibold tracking-tight text-white">
                {format(shown)}
              </div>
              <div className="text-xs text-white/50">
                {loading ? "chargement…" : error ? "indisponible" : "mis à jour automatiquement"}
              </div>
            </div>

            {!compact && (
              <>
                <div className="mt-4 text-lg font-semibold text-white">{copy.title}</div>
                <p className="mt-2 max-w-xl text-sm text-white/65 leading-relaxed">{copy.desc}</p>
              </>
            )}
          </div>

          <a
            href={ctaHref}
            className="shrink-0 rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 transition"
          >
            {ctaLabel}
          </a>
        </div>

        {!compact && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>0</span><span>100</span><span>300</span><span>1k</span><span>5k</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full border border-white/10 bg-black/40">
              <motion.div
                className="h-full bg-white/20"
                initial={{ width: "0%" }}
                animate={inView ? { width: `${Math.min(100, (count / 5000) * 100)}%` } : {}}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}