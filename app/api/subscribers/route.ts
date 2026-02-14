

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

// ----------------------------
// Helpers
// ----------------------------
function asStr(v: unknown, max = 2000) {
  const s = typeof v === "string" ? v : v == null ? "" : String(v);
  return s.trim().slice(0, max);
}

function pickIp(req: NextRequest) {
  // Works on Vercel/most reverse proxies.
  const xfwd = req.headers.get("x-forwarded-for") || "";
  const ip = xfwd.split(",")[0]?.trim() || "";
  return ip;
}

function hashIp(ip: string) {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT || "change-me";
  return crypto.createHmac("sha256", salt).update(ip).digest("hex");
}

function isValidEmail(email: string) {
  // Pragmatic (not RFC-perfect) validation
  if (!email || email.length > 320) return false;
  if (!email.includes("@")) return false;
  const [user, domain] = email.split("@");
  if (!user || !domain) return false;
  if (!domain.includes(".")) return false;
  return true;
}

function safeJson(res: NextResponse, body: any, init?: ResponseInit) {
  return NextResponse.json(body, init);
}

// ----------------------------
// Simple in-memory rate limiter
// Best-effort (works great against basic spam; for "hard" rate limit use Redis/Upstash)
// ----------------------------
const RL_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RL_MAX = 10; // 10 requests / window / ip

type Bucket = { n: number; resetAt: number };

const g = globalThis as unknown as { __cc_subs_rl?: Map<string, Bucket> };
const rlStore: Map<string, Bucket> = g.__cc_subs_rl ?? (g.__cc_subs_rl = new Map());

function rlKey(ip: string) {
  return ip || "no-ip";
}

function checkRateLimit(ip: string) {
  const key = rlKey(ip);
  const now = Date.now();
  const cur = rlStore.get(key);

  if (!cur || now > cur.resetAt) {
    rlStore.set(key, { n: 1, resetAt: now + RL_WINDOW_MS });
    return { ok: true as const, retryAfterSec: 0 };
  }

  if (cur.n >= RL_MAX) {
    const retryAfterSec = Math.max(1, Math.ceil((cur.resetAt - now) / 1000));
    return { ok: false as const, retryAfterSec };
  }

  cur.n += 1;
  rlStore.set(key, cur);
  return { ok: true as const, retryAfterSec: 0 };
}

// ----------------------------
// Routes
// ----------------------------
export async function GET() {
  const count = await prisma.subscriber.count({
    where: { status: "ACTIVE" },
  });

  return NextResponse.json(
    { ok: true, count, updatedAt: new Date().toISOString() },
    {
      headers: {
        // Cache côté edge (Vercel) + SWR
        "Cache-Control": "s-maxage=30, stale-while-revalidate=300",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const ct = req.headers.get("content-type") || "";
    const body: any = ct.includes("application/json")
      ? await req.json()
      : Object.fromEntries((await req.formData()).entries());

    // Anti-spam 1) Honeypot (champ caché)
    const hp = asStr(body.company ?? "", 200);
    if (hp) {
      // On répond "ok" pour ne pas aider les bots
      return safeJson(NextResponse.next() as any, { ok: true });
    }

    const ip = pickIp(req);

    // Source "trusted" (n8n/import) via header secret
    const token = req.headers.get("x-subscribers-token") || "";
    const trusted = Boolean(token) && token === (process.env.SUBSCRIBERS_API_TOKEN || "");

    // Anti-spam 2) Rate limit (bypass possible pour trusted)
    if (!trusted) {
      const lim = checkRateLimit(ip);
      if (!lim.ok) {
        return NextResponse.json(
          { ok: false, reason: "rate_limited" },
          {
            status: 429,
            headers: { "Retry-After": String(lim.retryAfterSec) },
          }
        );
      }
    }

    // Anti-spam 3) Minimal payload sanity
    // (on évite les payloads absurdes et les injections triviales)
    const email = asStr(body.email ?? "", 320).toLowerCase();
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, reason: "invalid_email" }, { status: 400 });
    }

    // Réduit les bots basiques qui envoient des emails "jetables" ultra longs
    if (email.length < 6) {
      return NextResponse.json({ ok: false, reason: "invalid_email" }, { status: 400 });
    }

    const firstName = asStr(body.firstName ?? "", 80) || null;
    const lastName = asStr(body.lastName ?? "", 80) || null;

    const ipHash = hashIp(ip);
    const userAgent = asStr(req.headers.get("user-agent") || "", 220) || null;

    const source = trusted
      ? (asStr(body.source ?? "N8N", 20).toUpperCase() as any)
      : "WEBSITE";

    await prisma.subscriber.upsert({
      where: { email },
      create: {
        email,
        status: "ACTIVE",
        source,
        firstName,
        lastName,
        ipHash,
        userAgent,
        consent: true,
        subscribedAt: new Date(),
      },
      update: {
        status: "ACTIVE",
        unsubscribedAt: null,
        // On met à jour uniquement si fourni (sinon on garde l'existant)
        firstName: firstName ?? undefined,
        lastName: lastName ?? undefined,
        ipHash: ipHash ?? undefined,
        userAgent: userAgent ?? undefined,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, reason: "server_error", detail: e?.message ?? "error" },
      { status: 500 }
    );
  }
}