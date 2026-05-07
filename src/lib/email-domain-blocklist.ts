/**
 * Block list of free-mail and disposable email domains.
 *
 * Used by /api/basslock-dossier to enforce the "professional email"
 * requirement on the dossier download form. The list is intentionally
 * conservative — we only block domains that are unambiguously personal
 * or throwaway. New disposable providers appear constantly; we accept
 * that some leakage is unavoidable without a third-party service.
 */

const BLOCKED_DOMAINS: ReadonlySet<string> = new Set([
  // ── Free-mail providers (global) ────────────────────────────────
  "gmail.com",
  "googlemail.com",
  "hotmail.com",
  "hotmail.es",
  "hotmail.fr",
  "hotmail.co.uk",
  "hotmail.it",
  "hotmail.de",
  "outlook.com",
  "outlook.es",
  "outlook.fr",
  "outlook.de",
  "outlook.com.br",
  "live.com",
  "live.es",
  "live.fr",
  "live.co.uk",
  "live.com.mx",
  "msn.com",
  "yahoo.com",
  "yahoo.es",
  "yahoo.fr",
  "yahoo.it",
  "yahoo.co.uk",
  "yahoo.com.mx",
  "yahoo.com.br",
  "ymail.com",
  "rocketmail.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "aim.com",
  "protonmail.com",
  "proton.me",
  "pm.me",
  "gmx.com",
  "gmx.es",
  "gmx.de",
  "gmx.net",
  "gmx.fr",
  "mail.com",
  "mail.ru",
  "email.com",
  "zoho.com",
  "zohomail.com",
  "yandex.com",
  "yandex.ru",
  "tutanota.com",
  "tutanota.de",
  "tuta.io",
  "fastmail.com",
  "qq.com",
  "163.com",
  "126.com",
  "web.de",
  "t-online.de",
  "libero.it",
  "virgilio.it",
  "tiscali.it",
  "alice.it",
  "orange.fr",
  "free.fr",
  "laposte.net",
  "sfr.fr",
  "wanadoo.fr",
  "neuf.fr",

  // ── Spanish legacy ISPs ─────────────────────────────────────────
  "terra.es",
  "telefonica.net",
  "ya.com",
  "ono.com",
  "movistar.es",
  "jazztel.es",

  // ── Disposable / throwaway ─────────────────────────────────────
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "throwaway.email",
  "yopmail.com",
  "sharklasers.com",
  "dispostable.com",
  "fakeinbox.com",
  "getnada.com",
  "trashmail.com",
  "maildrop.cc",
  "mintemail.com",
  "mohmal.com",
  "temp-mail.org",
]);

/**
 * Returns true if the email's domain is on the blocklist (case-insensitive).
 * Returns false for malformed input — caller is responsible for basic email
 * shape validation upstream.
 */
export function isBlockedEmailDomain(email: string): boolean {
  if (typeof email !== "string") return false;
  const at = email.lastIndexOf("@");
  if (at < 0 || at === email.length - 1) return false;
  const domain = email.slice(at + 1).trim().toLowerCase();
  return BLOCKED_DOMAINS.has(domain);
}
