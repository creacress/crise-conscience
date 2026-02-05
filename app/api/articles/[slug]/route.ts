import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ slug: string }> }
) {
  const { slug } = await ctx.params;
  const s = decodeURIComponent(slug ?? "").trim();
  if (!s) {
    return NextResponse.json({ ok: false, reason: "missing_slug" }, { status: 400 });
  }

  const article = await prisma.article.findUnique({
    where: { slug: s },
  });

  if (!article) {
    return NextResponse.json({ ok: false, reason: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, article });
}