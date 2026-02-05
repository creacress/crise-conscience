

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// Basic, pragmatic contact endpoint.
// - Accepts form POST (application/x-www-form-urlencoded or multipart/form-data) and JSON
// - Optional forwarding to n8n via CONTACT_WEBHOOK_URL
// - Simple anti-spam: honeypot + length limits

function asStr(v: unknown, max = 2000) {
  const s = typeof v === "string" ? v : v == null ? "" : String(v);
  return s.trim().slice(0, max);
}

function pickIp(req: NextRequest) {
  // Works on Vercel/most reverse proxies.
  const xfwd = req.headers.get("x-forwarded-for") || "";
  const ip = xfwd.split(",")[0]?.trim();
  return ip || req.headers.get("x-real-ip") || "";
}

async function readBody(req: NextRequest) {
  const ct = req.headers.get("content-type") || "";

  // JSON
  if (ct.includes("application/json")) {
    try {
      const j = await req.json();
      return {
        firstName: asStr(j?.firstName, 120),
        lastName: asStr(j?.lastName, 120),
        email: asStr(j?.email, 200),
        topic: asStr(j?.topic, 50),
        message: asStr(j?.message, 8000),
        consent: !!j?.consent,
        // honeypot (optional)
        company: asStr(j?.company, 120),
      };
    } catch {
      return null;
    }
  }

  // FormData (browser form)
  if (ct.includes("multipart/form-data") || ct.includes("application/x-www-form-urlencoded")) {
    try {
      const fd = await req.formData();
      return {
        firstName: asStr(fd.get("firstName"), 120),
        lastName: asStr(fd.get("lastName"), 120),
        email: asStr(fd.get("email"), 200),
        topic: asStr(fd.get("topic"), 50),
        message: asStr(fd.get("message"), 8000),
        consent: !!fd.get("consent"),
        // honeypot (optional)
        company: asStr(fd.get("company"), 120),
      };
    } catch {
      return null;
    }
  }

  // Unknown content-type: try text
  try {
    const txt = await req.text();
    return { message: asStr(txt, 8000) };
  } catch {
    return null;
  }
}

function isValidEmail(email: string) {
  if (!email) return true; // optional
  // Simple sanity check, not RFC-perfect.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  const data = await readBody(req);
  if (!data) {
    return NextResponse.json({ ok: false, reason: "bad_body" }, { status: 400 });
  }

  const firstName = asStr((data as any).firstName, 120);
  const lastName = asStr((data as any).lastName, 120);
  const email = asStr((data as any).email, 200);
  const topic = asStr((data as any).topic, 50) || "question";
  const message = asStr((data as any).message, 8000);
  const consent = !!(data as any).consent;
  const company = asStr((data as any).company, 120); // honeypot

  // Honeypot: if filled, silently accept.
  if (company) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (!message || message.length < 10) {
    return NextResponse.json({ ok: false, reason: "message_too_short" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, reason: "invalid_email" }, { status: 400 });
  }

  // We don't hard-block if consent is false because you may want anonymous reports.
  // But we expose it to your automation.

  const payload = {
    firstName,
    lastName,
    email,
    topic,
    message,
    consent,
    meta: {
      ip: pickIp(req),
      ua: req.headers.get("user-agent") || "",
      referer: req.headers.get("referer") || "",
      at: new Date().toISOString(),
    },
  };

  // --- Email delivery (SMTP)
  // Configure these in env (Vercel/hosting):
  // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM
  const SMTP_HOST = process.env.SMTP_HOST || "";
  const SMTP_PORT = Number(process.env.SMTP_PORT || "587");
  const SMTP_USER = process.env.SMTP_USER || "";
  const SMTP_PASS = process.env.SMTP_PASS || "";

  const CONTACT_TO = process.env.CONTACT_TO || "contact@criseconscience.org";
  const CONTACT_FROM = process.env.CONTACT_FROM || "no-reply@criseconscience.org";

  // Only attempt SMTP if configured.
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      const subject = `[Crise Conscience] ${topic} — ${email || "anonyme"}`;
      const lines = [
        `Sujet: ${topic}`,
        `Nom: ${[firstName, lastName].filter(Boolean).join(" ") || "(non renseigné)"}`,
        `Email: ${email || "(anonyme)"}`,
        `Consentement: ${consent ? "oui" : "non"}`,
        `IP: ${payload.meta.ip || ""}`,
        `UA: ${payload.meta.ua || ""}`,
        `Referrer: ${payload.meta.referer || ""}`,
        `Date: ${payload.meta.at}`,
        "",
        "Message:",
        message,
      ];

      await transporter.sendMail({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        replyTo: email || undefined,
        subject,
        text: lines.join("\n"),
      });
    } catch {
      // If SMTP fails, we still allow webhook fallback below (if configured).
    }
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL || "";
  if (webhook) {
    try {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        // Avoid caching/proxy surprises
        cache: "no-store",
      });

      if (!r.ok) {
        return NextResponse.json(
          { ok: false, reason: "webhook_failed", status: r.status },
          { status: 502 }
        );
      }
    } catch {
      return NextResponse.json({ ok: false, reason: "webhook_error" }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      hint: "POST a contact message to this endpoint.",
      expects: ["firstName", "lastName", "email", "topic", "message", "consent"],
    },
    { status: 200 }
  );
}