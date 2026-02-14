"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type State = {
  loading: boolean;
  count: number;
  error: string | null;
};

export function useSubscriberCount() {
  const [state, setState] = useState<State>({
    loading: true,
    count: 0,
    error: null,
  });

  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    controllerRef.current?.abort();
    const ac = new AbortController();
    controllerRef.current = ac;

    (async () => {
      try {
        setState((s) => ({ ...s, loading: true, error: null }));

        const res = await fetch("/api/subscribers", {
          signal: ac.signal,
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = (await res.json()) as { ok?: boolean; count?: number };

        const count = Number(json?.count ?? 0);
        setState({
          loading: false,
          count: Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0,
          error: null,
        });
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        setState({
          loading: false,
          count: 0,
          error: e?.message ?? "error",
        });
      }
    })();

    return () => ac.abort();
  }, []);

  return useMemo(() => state, [state]);
}