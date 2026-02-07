import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ArticleStatus } from "@/app/generated/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const statusParam = (searchParams.get("status") ?? "").toLowerCase().trim(); // optionnel ?status=published

  // Map query -> Prisma enum values (type-safe)
  const STATUS_MAP: Record<string, ArticleStatus> = {
    draft: ArticleStatus.draft,
    ready: ArticleStatus.ready,
    published: ArticleStatus.published,
  };

  const status = STATUS_MAP[statusParam] ?? null;

  const where = status ? { status } : undefined;

  try {
    const items = await prisma.article.findMany({
      where,
      orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        tags: true,
        status: true,
        publishedAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ ok: true, items }, { headers: { "Cache-Control": "no-store" } });
  } catch (e: any) {
    console.error("/api/articles GET failed", e);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch articles" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}