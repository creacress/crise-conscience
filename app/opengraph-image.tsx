import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Crise Conscience — Informer, prévenir et aider face aux dérives sectaires";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(80% 60% at 15% 15%, rgba(251,146,60,0.30), transparent 60%), radial-gradient(70% 60% at 85% 85%, rgba(56,189,248,0.20), transparent 60%), linear-gradient(135deg, #0b1220 0%, #0a0f1a 100%)",
          color: "white",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif",
          letterSpacing: "-0.01em",
        }}
      >
        {/* Top: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(0,0,0,0.30)",
              color: "rgb(253,186,116)",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            CC
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, fontWeight: 700 }}>Crise Conscience</div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.65)" }}>
              Prévenir • Informer • Aider
            </div>
          </div>
        </div>

        {/* Center: claim */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.85)",
              fontSize: 22,
              marginBottom: 28,
            }}
          >
            Association partenaire de l’UNADFI
          </div>

          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "white",
            }}
          >
            Informer, prévenir et aider face aux{" "}
            <span style={{ color: "rgb(253,186,116)" }}>dérives sectaires</span>.
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.65)",
            fontSize: 22,
          }}
        >
          <div>www.criseconscience.org</div>
          <div style={{ display: "flex", gap: 12 }}>
            <span
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              Sources vérifiées
            </span>
            <span
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              Confidentialité
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
