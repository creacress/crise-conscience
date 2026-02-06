import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { assertIngestAuth } from "@/lib/ingestAuth";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

function asStr(v: unknown) {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function normalizeStatus(v: unknown) {
  const s = asStr(v).trim().toLowerCase();
  if (["published", "publish", "ready", "ok", "live"].includes(s)) return "published";
  return "draft";
}

function parseDateOrNull(v: unknown) {
  if (!v) return null;
  const d = new Date(asStr(v));
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function POST(req: NextRequest) {
  const auth = assertIngestAuth(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, reason: auth.reason }, { status: auth.status });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  const title = asStr(body?.title).trim();
  const slug = asStr(body?.slug).trim();
  const contentHtml = asStr(body?.contentHtml).trim();

  if (!title || !slug || !contentHtml) {
    return NextResponse.json(
      { ok: false, reason: "missing_fields", need: ["title", "slug", "contentHtml"] },
      { status: 400 }
    );
  }

  const tags: string[] = Array.isArray(body?.tags)
    ? (body.tags as unknown[])
        .map(asStr)
        .map((s: string) => s.trim())
        .filter((s: string) => Boolean(s))
    : [];

  const status = normalizeStatus(body?.status);
  const publishedAt = status === "published" ? parseDateOrNull(body?.publishedAt) ?? new Date() : null;

  const data = {
    title,
    slug,
    excerpt: asStr(body?.excerpt || "").trim() || null,
    coverImage: asStr(body?.coverImage || "").trim() || null,
    contentHtml,
    status: status as any,
    publishedAt,
    tags,
    notionPageId: asStr(body?.notionPageId || "").trim() || null,
  };

  const saved = await prisma.article.upsert({
    where: { slug },
    create: data,
    update: data,
    select: { id: true, slug: true, updatedAt: true },
  });

  // Ensure the UI reflects newly ingested content (ISR / caching)
  revalidatePath("/articles");
  revalidatePath(`/articles/${slug}`);

  return NextResponse.json({ ok: true, article: saved });
}