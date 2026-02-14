"use client";

import { AnimatePresence, motion } from "framer-motion";

export type ToastKind = "success" | "error" | "info";

export function Toast({
  open,
  kind,
  title,
  message,
  onClose,
}: {
  open: boolean;
  kind: ToastKind;
  title?: string;
  message: string;
  onClose: () => void;
}) {
  const badge =
    kind === "success" ? "✅" : kind === "error" ? "⚠️" : "ℹ️";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed bottom-5 right-5 z-50 w-[22rem] max-w-[90vw] rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl p-4 shadow-[0_25px_90px_rgba(0,0,0,0.55)]"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-lg">{badge}</div>
            <div className="min-w-0">
              {title && <div className="font-semibold text-white">{title}</div>}
              <div className="mt-1 text-sm text-white/70 leading-relaxed">
                {message}
              </div>
              <button
                onClick={onClose}
                className="mt-3 inline-flex rounded-xl bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/15 transition"
              >
                Ok
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}