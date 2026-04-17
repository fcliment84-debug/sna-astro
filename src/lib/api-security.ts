/**
 * Shared security helpers for the /api/* serverless endpoints.
 *
 * What this covers:
 *   1. HTML escaping for user-supplied text interpolated into email bodies
 *   2. Origin allowlist (rejects cross-site POSTs)
 *   3. Simple in-memory rate limiting per client IP
 *
 * Notes on rate limiting on Vercel Hobby: serverless instances are
 * stateless between cold starts, and a single region can have several
 * warm instances. The limiter works per-instance, so it's not a hard
 * ceiling — it blocks naive flooding (hundreds of requests from one
 * script) but not distributed abuse. For that you'd need Vercel KV /
 * Upstash / Turnstile. Still, this is dramatically better than nothing.
 */

// ── 1. HTML escape ─────────────────────────────────────────────
const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape user-supplied text before interpolating into HTML email templates. */
export function escapeHtml(input: unknown): string {
  if (input === null || input === undefined) return "";
  return String(input).replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);
}

/** Escape every string in an array and join with ", ". */
export function escapeHtmlList(arr: unknown[] | undefined | null): string {
  if (!Array.isArray(arr) || arr.length === 0) return "—";
  return arr.map((v) => escapeHtml(v)).join(", ");
}

// ── 2. Origin allowlist ────────────────────────────────────────
const ALLOWED_ORIGIN_EXACT = new Set([
  "https://snaconsultoriaacustica.com",
  "https://www.snaconsultoriaacustica.com",
]);

/**
 * True if the request's Origin header is our production site or a
 * Vercel preview deployment of this project.
 *
 * We tolerate absent Origin (some privacy tools strip it) to avoid
 * breaking legitimate submissions, but reject any EXPLICIT foreign
 * origin.
 */
export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Missing origin → accept (privacy tools)
  if (ALLOWED_ORIGIN_EXACT.has(origin)) return true;
  // Vercel preview URLs: https://sna-astro-<hash>-<scope>.vercel.app
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return true;
  return false;
}

// ── 3. Cloudflare Turnstile verification ──────────────────────
/**
 * Verify a Turnstile token with Cloudflare's siteverify endpoint.
 * Returns true if the token is valid for this request.
 *
 * Requires the TURNSTILE_SECRET_KEY env var. If not configured, we
 * skip verification (useful for local dev before secrets are set).
 */
export async function verifyTurnstile(
  token: string | undefined | null,
  remoteIp?: string
): Promise<boolean> {
  const secret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("TURNSTILE_SECRET_KEY not set — skipping verification");
    return true;
  }
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body }
    );
    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
    if (!data.success) {
      console.warn("Turnstile verification failed:", data["error-codes"]);
    }
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return false;
  }
}

// ── 4. In-memory rate limiter ─────────────────────────────────
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS = 3;
const ipHits = new Map<string, number[]>();

/** Extract a best-effort client IP from common proxy headers. */
export function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

/**
 * Returns true if the request is within the allowed rate, false if it
 * should be throttled. Also prunes old entries.
 */
export function rateLimitOk(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const prev = ipHits.get(ip) ?? [];
  const recent = prev.filter((t) => t > windowStart);
  if (recent.length >= MAX_REQUESTS) {
    ipHits.set(ip, recent);
    return false;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  // Opportunistic cleanup of stale keys when the map gets big.
  if (ipHits.size > 1000) {
    for (const [k, v] of ipHits) {
      if (v[v.length - 1] < windowStart) ipHits.delete(k);
    }
  }
  return true;
}
