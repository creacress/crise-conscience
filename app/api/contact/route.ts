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
  // Les navigations de formulaire (document) envoient ces headers dans la plupart des navigateurs
  const mode = req.headers.get("sec-fetch-mode") || "";
  const dest = req.headers.get("sec-fetch-dest") || "";
  if (mode === "navigate" || dest === "document") return true;

  // Fallback : on ne considère HTML que si le client préfère vraiment du HTML
  const accept = (req.headers.get("accept") || "").toLowerCase();
  const wantsTextHtml = accept.includes("text/html");
  const wantsJson = accept.includes("application/json") || accept.includes("application/*") || accept.includes("*/*");
  return wantsTextHtml && !wantsJson;
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

  // DEBUG: aide à diagnostiquer ce que le client demande (HTML vs JSON)
  const _dbg = {
    ct: req.headers.get("content-type") || "",
    accept: req.headers.get("accept") || "",
    mode: req.headers.get("sec-fetch-mode") || "",
    dest: req.headers.get("sec-fetch-dest") || "",
  };

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
      dbg: { ..._dbg, messageLen: message.length, topic, hasEmail: !!email },
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

  const webhook = process.env.CONTACT_WEBHOOK_URL || "";

  // Aucun mode de livraison configuré => on refuse de répondre OK.
  const hasSmtp = !!(SMTP_HOST && SMTP_USER && SMTP_PASS);
  const hasWebhook = !!webhook;
  if (!hasSmtp && !hasWebhook) {
    return respond(req, 500, {
      ok: false,
      reason: "no_delivery_config",
      dbg: { ..._dbg, hasSmtp, hasWebhook },
    });
  }

  // 1) Tentative d’envoi SMTP (si configuré)
  if (hasSmtp) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465, // 465 = SMTPS
        auth: { user: SMTP_USER, pass: SMTP_PASS },
        tls: {
          // Hostinger et d’autres providers aiment bien ce flag en prod.
          servername: SMTP_HOST,
        },
      });

      // Optionnel mais super utile : valide la connexion/auth
      await transporter.verify();

      const subject = `[Crise Conscience] ${topic} — ${email || "anonyme"}`;

      const esc = (s: unknown) =>
        String(s ?? "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\"/g, "&quot;")
          .replace(/'/g, "&#39;");

      const fullName = [firstName, lastName].filter(Boolean).join(" ") || "—";
      const safeTopic = esc(topic || "question");
      const safeEmail = esc(email || "anonyme");
      const safeMessage = esc(message || "");

      // Fallback texte (utile + mieux pour la délivrabilité)
      const text = [
        "Crise Conscience — nouveau message",
        `Sujet: ${topic}`,
        `Nom: ${fullName}`,
        `Email: ${email || "(anonyme)"}`,
        `Consentement: ${consent ? "oui" : "non"}`,
        `Date: ${payload.meta.at}`,
        "",
        "Message:",
        message,
        "",
        `IP: ${payload.meta.ip || ""}`,
        `UA: ${payload.meta.ua || ""}`,
        `Referrer: ${payload.meta.referer || ""}`,
      ].join("\n");

      // Email HTML moderne (inline CSS pour Gmail/Apple Mail)
      const html = `
<div style="margin:0;padding:0;background:#070B14;">
  <div style="max-width:680px;margin:0 auto;padding:28px 14px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial;">

    <div style="border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);box-shadow:0 20px 60px rgba(0,0,0,.35);">

      <div style="padding:18px 22px;background:linear-gradient(135deg,#0EA5E9 0%,#22C55E 55%,#F59E0B 100%);">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:40px;height:40px;border-radius:12px;background:rgba(7,11,20,.28);display:flex;align-items:center;justify-content:center;font-weight:900;color:#07111f;letter-spacing:.5px;">CC</div>
          <div>
            <div style="font-size:16px;font-weight:900;color:#07111f;">Crise Conscience</div>
            <div style="font-size:12px;color:rgba(7,17,31,.85);margin-top:2px;">Nouveau message — formulaire de contact</div>
          </div>
        </div>
      </div>

      <div style="padding:22px;color:rgba(255,255,255,.92);">

        <div style="font-size:18px;font-weight:900;line-height:1.25;margin:0 0 12px;">${safeTopic}</div>

        <div style="display:flex;flex-wrap:wrap;gap:10px;margin:0 0 18px;">
          <span style="padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);font-size:12px;">👤 ${esc(fullName)}</span>
          <a href="mailto:${encodeURIComponent(email || "")}" style="padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);font-size:12px;color:rgba(255,255,255,.92);text-decoration:none;">✉️ ${safeEmail}</a>
          <span style="padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);font-size:12px;">✅ Consentement : ${consent ? "oui" : "non"}</span>
        </div>

        <div style="border-radius:16px;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.22);padding:16px;white-space:pre-wrap;line-height:1.55;font-size:14px;">
${safeMessage}
        </div>

        <div style="margin-top:18px;display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
          ${email ? `<a href="mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Re: " + subject)}" style="display:inline-block;padding:10px 14px;border-radius:12px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.14);color:rgba(255,255,255,.92);text-decoration:none;font-weight:800;">Répondre</a>` : ""}
          <span style="font-size:12px;color:rgba(255,255,255,.55);">Reçu le ${esc(payload.meta.at)}</span>
        </div>

      </div>

      <div style="padding:14px 22px;border-top:1px solid rgba(255,255,255,.10);color:rgba(255,255,255,.55);font-size:12px;line-height:1.45;">
        IP: ${esc(payload.meta.ip || "")} • UA: ${esc(payload.meta.ua || "")}<br />
        Referrer: ${esc(payload.meta.referer || "")}
      </div>

    </div>

    <div style="max-width:680px;margin:14px auto 0;color:rgba(255,255,255,.35);font-size:11px;line-height:1.4;text-align:center;">
      Message envoyé depuis le site. Si tu ne reconnais pas ce message, tu peux l’ignorer.
    </div>

  </div>
</div>
`.trim();

      const info = await transporter.sendMail({
        // IMPORTANT (Hostinger) : l’adresse expéditrice doit appartenir à l’utilisateur SMTP
        from: `Crise Conscience <${SMTP_USER}>`,
        sender: SMTP_USER,
        to: CONTACT_TO,
        replyTo: email ? email : undefined,
        subject,
        text,
        html,
      });

      // ✅ Si on arrive ici, nodemailer a bien accepté l’envoi côté SMTP.
      // (Ça ne garantit pas 100% la livraison finale, mais ça élimine les faux OK.)
      return respond(req, 200, {
        ok: true,
        deliveredBy: "smtp",
        messageId: (info as any)?.messageId || null,
      });
    } catch (e: any) {
      console.error("[contact] SMTP failed:", e);

      // Si un webhook est aussi configuré, on tente le fallback.
      if (!hasWebhook) {
        return respond(req, 502, {
          ok: false,
          reason: "smtp_failed",
          error: e?.message || "unknown_smtp_error",
          dbg: {
            ..._dbg,
            smtp: {
              host: SMTP_HOST,
              port: SMTP_PORT,
              user: SMTP_USER,
              from: CONTACT_FROM,
              to: CONTACT_TO,
            },
          },
        });
      }
    }
  }

  // 2) Fallback webhook (si configuré)
  if (hasWebhook) {
    try {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      if (!r.ok) {
        return respond(req, 502, { ok: false, reason: "webhook_failed", status: r.status });
      }
      return respond(req, 200, { ok: true, deliveredBy: "webhook" });
    } catch (e: any) {
      console.error("[contact] webhook error:", e);
      return respond(req, 502, { ok: false, reason: "webhook_error", error: e?.message || "unknown_webhook_error" });
    }
  }

  // Normalement jamais atteint (car on return dans smtp/webhook)
  return respond(req, 500, { ok: false, reason: "delivery_unreachable" });
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