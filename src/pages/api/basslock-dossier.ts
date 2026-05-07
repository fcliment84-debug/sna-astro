export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";
import {
  escapeHtml,
  isAllowedOrigin,
  getClientIp,
  rateLimitOk,
  verifyTurnstile,
} from "../../lib/api-security";
import { isBlockedEmailDomain } from "../../lib/email-domain-blocklist";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const TO_ADDRESSES = [
  "snaconsultoriacustica@gmail.com",
  "info@snaconsultoriaacustica.com",
];

const DOSSIER_URL = "/downloads/basslock-dossier-es.pdf";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!isAllowedOrigin(request)) {
      return new Response(JSON.stringify({ error: "forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ip = getClientIp(request);
    if (!rateLimitOk(ip)) {
      return new Response(JSON.stringify({ error: "too many requests" }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await request.json();
    const {
      first_name,
      last_name,
      email,
      lang,            // "es" | "en"
      website_url,     // honeypot
      turnstileToken,
    } = body;

    if (website_url) {
      return new Response(JSON.stringify({ success: true, downloadUrl: DOSSIER_URL }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const turnstileOk = await verifyTurnstile(turnstileToken, ip);
    if (!turnstileOk) {
      return new Response(JSON.stringify({ error: "verification failed", code: "turnstile_failed" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (
      typeof first_name !== "string" || !first_name.trim() ||
      typeof last_name !== "string" || !last_name.trim() ||
      typeof email !== "string" || !email.trim()
    ) {
      return new Response(
        JSON.stringify({ error: "missing_fields", code: "missing_fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const emailTrim = email.trim();
    if (!EMAIL_RE.test(emailTrim)) {
      return new Response(
        JSON.stringify({ error: "invalid_email", code: "invalid_email" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (isBlockedEmailDomain(emailTrim)) {
      return new Response(
        JSON.stringify({ error: "invalid_email_domain", code: "invalid_email_domain" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const eFirst = escapeHtml(first_name.trim());
    const eLast = escapeHtml(last_name.trim());
    const eEmail = escapeHtml(emailTrim);
    const eLang = lang === "en" ? "EN" : "ES";
    const eIp = escapeHtml(ip);
    const downloadedAt = new Date().toLocaleString("es-ES", {
      timeZone: "Europe/Madrid",
      dateStyle: "full",
      timeStyle: "short",
    });
    const eDate = escapeHtml(downloadedAt);

    const internalEmail = await resend.emails.send({
      from: "SNA Web <web@snaconsultoriaacustica.com>",
      to: TO_ADDRESSES,
      replyTo: emailTrim,
      subject: `Descarga del dossier Basslock® — ${first_name.trim()} ${last_name.trim()} (${emailTrim})`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #4A4A4A;">
          <div style="background-color: #364E6B; padding: 24px 32px;">
            <h1 style="color: #ffffff; font-size: 18px; margin: 0;">Nueva descarga del dossier Basslock®</h1>
          </div>
          <div style="padding: 32px; background-color: #F4F5F6;">

            <p style="margin: 0 0 16px; line-height: 1.6;">Una persona ha completado el formulario y descargado el dossier técnico de <strong>Basslock®</strong>.</p>

            <p style="font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #8FA8AE; margin: 16px 0 12px;">Datos del lead</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
              <tr>
                <td style="padding: 6px 0; font-weight: 600; width: 160px; vertical-align: top;">Nombre</td>
                <td style="padding: 6px 0;">${eFirst}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Apellidos</td>
                <td style="padding: 6px 0;">${eLast}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Email</td>
                <td style="padding: 6px 0;"><a href="mailto:${eEmail}" style="color: #4F7E87;">${eEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Idioma</td>
                <td style="padding: 6px 0;">${eLang}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Fecha y hora</td>
                <td style="padding: 6px 0;">${eDate}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">IP</td>
                <td style="padding: 6px 0; font-family: monospace; font-size: 12px;">${eIp}</td>
              </tr>
            </table>

          </div>
          <div style="padding: 16px 32px; background-color: #364E6B; text-align: center;">
            <p style="color: #8FA8AE; font-size: 12px; margin: 0;">Descarga de dossier Basslock® — snaconsultoriaacustica.com</p>
          </div>
        </div>
      `,
    });

    if (internalEmail.error) {
      console.error("Dossier internal email failed:", internalEmail.error);
      return new Response(
        JSON.stringify({ error: "Error al enviar el email" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, downloadUrl: DOSSIER_URL }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("API error:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
