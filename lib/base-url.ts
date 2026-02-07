import { headers } from "next/headers";

/**
 * Next.js 16+: `headers()` is async (returns a Promise).
 * Keep this helper async and await it from server components / route handlers.
 */
export async function getBaseUrl() {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) return "http://localhost:3000";
  return `${proto}://${host}`.replace(/\/$/, "");
}

/**
 * Convenience helper when you already have a Request object (route handlers).
 */
export function getBaseUrlFromRequest(req: Request) {
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!host) return "http://localhost:3000";
  return `${proto}://${host}`.replace(/\/$/, "");
}