import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function asStr(v: unknown, max = 320) {
  const s = typeof v === "string" ? v : v == null ? "" : String(v);
  return s.trim().slice(0, max);
}

function isValidEmail(email: string) {
  if (!email || email.length > 320) return false;
  if (!email.includes("@")) return false;
  const [user, domain] = email.split("@");
  if (!user || !domain) return false;
  if (!domain.includes(".")) return false;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ct = req.headers.get("content-type") || "";
    const body: any = ct.includes("application/json")
      ? await req.json()
      : Object.fromEntries((await req.formData()).entries());

    const email = asStr(body.email ?? "").toLowerCase();
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, reason: "invalid_email" }, { status: 400 });
    }

    // On reste “privacy-friendly”: si email inconnu -> ok quand même
    await prisma.subscriber
      .update({
        where: { email },
        data: { status: "UNSUBSCRIBED", unsubscribedAt: new Date() },
      })
      .catch(() => null);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, reason: "server_error", detail: e?.message ?? "error" },
      { status: 500 }
    );
  }
}