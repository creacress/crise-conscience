import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function asStr(v: unknown, max = 2000) {
  const s = typeof v === "string" ? v : v == null ? "" : String(v);
  return s.trim().slice(0, max);
}

function pickIp(req: NextRequest) {
  const xfwd = req.headers.get("x-forwarded-for") || "";
  const ip = xfwd.split(",")[0]?.trim();
  return ip || req.headers.get("x-real-ip") || "";
}

function isValidEmail(email: string) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// détecte si c’est un submit de <form> (navigation) vs fetch/ajax
function wantsHtml(req: NextRequest) {
  const accept = req.headers.get("accept") || "";
  return accept.includes("text/html");
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
        company: asStr(j?.company, 120), // honeypot
      };
    } catch {
      return null;
    }
  }

  // x-www-form-urlencoded (le cas le + courant en <form>)
  if (ct.includes("application/x-www-form-urlencoded")) {
    try {
      const raw = await req.text();
      const p = new URLSearchParams(raw);
      return {
        firstName: asStr(p.get("firstName"), 120),
        lastName: asStr(p.get("lastName"), 120),
        email: asStr(p.get("email"), 200),
        topic: asStr(p.get("topic"), 50),
        message: asStr(p.get("message"), 8000),
        consent: !!p.get("consent"),
        company: asStr(p.get("company"), 120),
      };
    } catch {
      return null;
    }
  }

  // multipart/form-data
  if (ct.includes("multipart/form-data")) {
    try {
      const fd = await req.formData();
      return {
        firstName: asStr(fd.get("firstName"), 120),
        lastName: asStr(fd.get("lastName"), 120),
        email: asStr(fd.get("email"), 200),
        topic: asStr(fd.get("topic"), 50),
        message: asStr(fd.get("message"), 8000),
        consent: !!fd.get("consent"),
        company: asStr(fd.get("company"), 120),
      };
    } catch {
      return null;
    }
  }

  // fallback
  try {
    const txt = await req.text();
    return { message: asStr(txt, 8000) };
  } catch {
    return null;
  }
}

function respond(req: NextRequest, status: number, json: any) {
  // si ça vient d’un submit navigateur, on redirect vers /contact avec un flag
  if (wantsHtml(req)) {
    const url = new URL("/contact", req.url);
    if (json?.ok) url.searchParams.set("sent", "1");
    else url.searchParams.set("err", json?.reason || "error");
    return NextResponse.redirect(url, { status: 303 });
  }
  return NextResponse.json(json, { status });
}

export async function POST(req: NextRequest) {
  const data = await readBody(req);
  if (!data) return respond(req, 400, { ok: false, reason: "bad_body" });

  const firstName = asStr((data as any).firstName, 120);
  const lastName = asStr((data as any).lastName, 120);
  const email = asStr((data as any).email, 200);
  const topic = asStr((data as any).topic, 50) || "question";
  const message = asStr((data as any).message, 8000);
  const consent = !!(data as any).consent;
  const company = asStr((data as any).company, 120);

  // honeypot
  if (company) return respond(req, 200, { ok: true });

  if (!message || message.length < 10) {
    return respond(req, 400, {
      ok: false,
      reason: "message_too_short",
      // debug safe (optionnel) -> enlève si tu veux
      got: { messageLen: message.length, topic, hasEmail: !!email },
    });
  }

  if (!isValidEmail(email)) return respond(req, 400, { ok: false, reason: "invalid_email" });

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

  // SMTP
  const SMTP_HOST = process.env.SMTP_HOST || "";
  const SMTP_PORT = Number(process.env.SMTP_PORT || "587");
  const SMTP_USER = process.env.SMTP_USER || "";
  const SMTP_PASS = process.env.SMTP_PASS || "";
  const CONTACT_TO = process.env.CONTACT_TO || "contact@criseconscience.org";
  const CONTACT_FROM = process.env.CONTACT_FROM || "no-reply@criseconscience.org";

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      const subject = `[Crise Conscience] ${topic} — ${email || "anonyme"}`;
      const text = [
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
      ].join("\n");

      await transporter.sendMail({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        replyTo: email || undefined,
        subject,
        text,
      });
    } catch {
      // on laisse fallback webhook gérer
    }
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL || "";
  if (webhook) {
    try {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      if (!r.ok) return respond(req, 502, { ok: false, reason: "webhook_failed", status: r.status });
    } catch {
      return respond(req, 502, { ok: false, reason: "webhook_error" });
    }
  }

  return respond(req, 200, { ok: true });
}

export async function GET(req: NextRequest) {
  return NextResponse.json(
    {
      ok: true,
      hint: "POST a contact message to this endpoint.",
      expects: ["firstName", "lastName", "email", "topic", "message", "consent"],
    },
    { status: 200 }
  );
}