import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { assertIngestAuth } from "@/lib/ingestAuth";

export const runtime = "nodejs";

function asStr(v: unknown) {
  return typeof v === "string" ? v : v == null ? "" : String(v);
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

  const data = {
    title,
    slug,
    excerpt: asStr(body?.excerpt || "").trim() || null,
    coverImage: asStr(body?.coverImage || "").trim() || null,
    contentHtml,
    status: (asStr(body?.status || "draft").trim() || "draft") as any,
    publishedAt: body?.publishedAt ? new Date(body.publishedAt) : null,
    tags,
    notionPageId: asStr(body?.notionPageId || "").trim() || null,
  };

  const saved = await prisma.article.upsert({
    where: { slug },
    create: data,
    update: data,
    select: { id: true, slug: true, updatedAt: true },
  });

  return NextResponse.json({ ok: true, article: saved });
}