import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ArticleStatus } from "@/app/generated/prisma";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const statusParam = searchParams.get("status"); // optionnel ?status=published

  // Prisma expects the enum type, so we validate the query param.
  const status =
    statusParam === "draft" || statusParam === "ready" || statusParam === "published"
      ? (statusParam as ArticleStatus)
      : null;

  const where = status ? { status } : undefined;

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

  return NextResponse.json({ ok: true, items });
}