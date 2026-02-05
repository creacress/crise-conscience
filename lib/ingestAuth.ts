import type { NextRequest } from "next/server";

type AuthResult =
  | { ok: true }
  | { ok: false; status: number; reason: string };

function pickServerToken() {
  // accepte plusieurs noms pour éviter de tourner en rond
  return (
    process.env.INGEST_TOKEN ||
    process.env.N8N_INGEST_TOKEN ||
    process.env.ARTICLE_INGEST_TOKEN ||
    ""
  ).trim();
}

function getHeader(req: NextRequest, name: string) {
  return (req.headers.get(name) || "").trim();
}

export function assertIngestAuth(req: NextRequest): AuthResult {
  const serverToken = pickServerToken();

  // ✅ c’est exactement TON message actuel
  if (!serverToken) {
    return { ok: false, status: 500, reason: "server_ingest_token_missing" };
  }

  // 1) Header custom
  const token = getHeader(req, "x-ingest-token");

  // 2) Support Authorization: Bearer xxx (optionnel mais pratique)
  const authz = getHeader(req, "authorization");
  const bearer =
    authz.toLowerCase().startsWith("bearer ") ? authz.slice(7).trim() : "";

  const provided = token || bearer;

  console.log("INGEST_TOKEN loaded?", Boolean(process.env.INGEST_TOKEN));

  if (!provided) {
    return { ok: false, status: 401, reason: "missing_ingest_token" };
  }

  if (provided !== serverToken) {
    return { ok: false, status: 403, reason: "invalid_ingest_token" };
  }

  return { ok: true };
}