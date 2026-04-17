const HTML_ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function escapeHtml(input) {
  if (input === null || input === void 0) return "";
  return String(input).replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);
}
function escapeHtmlList(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return "—";
  return arr.map((v) => escapeHtml(v)).join(", ");
}
const ALLOWED_ORIGIN_EXACT = /* @__PURE__ */ new Set([
  "https://snaconsultoriaacustica.com",
  "https://www.snaconsultoriaacustica.com"
]);
function isAllowedOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  if (ALLOWED_ORIGIN_EXACT.has(origin)) return true;
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return true;
  return false;
}
async function verifyTurnstile(token, remoteIp) {
  {
    console.warn("TURNSTILE_SECRET_KEY not set — skipping verification");
    return true;
  }
}
const WINDOW_MS = 5 * 60 * 1e3;
const MAX_REQUESTS = 3;
const ipHits = /* @__PURE__ */ new Map();
function getClientIp(request) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip") || "unknown";
}
function rateLimitOk(ip) {
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
  if (ipHits.size > 1e3) {
    for (const [k, v] of ipHits) {
      if (v[v.length - 1] < windowStart) ipHits.delete(k);
    }
  }
  return true;
}

export { escapeHtmlList as a, escapeHtml as e, getClientIp as g, isAllowedOrigin as i, rateLimitOk as r, verifyTurnstile as v };
