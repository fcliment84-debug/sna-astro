export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const TO_ADDRESSES = [
  "snaconsultoriaacustica@gmail.com",
  "info@snaconsultoriaacustica.com",
];

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      company,
      website,
      contact_name,
      email,
      phone,
      region,
      activity,       // string[] — checkboxes
      sectors,        // string[] — checkboxes
      technical_capacity,
      volume,
      products,       // string[] — checkboxes
      has_project,
      project_description,
      source,
    } = body;

    if (!company || !contact_name || !email || !phone || !region) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Helper: format array as comma-separated or "—"
    const list = (arr: string[] | undefined) =>
      arr && arr.length > 0 ? arr.join(", ") : "—";

    // ── Internal notification email ──────────────────────────────
    const { error } = await resend.emails.send({
      from: "SNA Web <web@snaconsultoriaacustica.com>",
      to: TO_ADDRESSES,
      replyTo: email,
      subject: `Nueva solicitud distribución Basslock® — ${company} (${contact_name})`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #4A4A4A;">
          <div style="background-color: #364E6B; padding: 24px 32px;">
            <h1 style="color: #ffffff; font-size: 18px; margin: 0;">Nueva solicitud — Programa de distribución Basslock®</h1>
          </div>
          <div style="padding: 32px; background-color: #F4F5F6;">

            <p style="font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #8FA8AE; margin: 0 0 12px;">Datos de la empresa</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 6px 0; font-weight: 600; width: 160px; vertical-align: top;">Empresa</td>
                <td style="padding: 6px 0;">${company}</td>
              </tr>
              ${website ? `<tr><td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Web</td><td style="padding: 6px 0;"><a href="${website}" style="color: #4F7E87;">${website}</a></td></tr>` : ""}
              <tr>
                <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Persona de contacto</td>
                <td style="padding: 6px 0;">${contact_name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Email</td>
                <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #4F7E87;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Teléfono</td>
                <td style="padding: 6px 0;"><a href="tel:${phone}" style="color: #4F7E87;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Comunidad / Región</td>
                <td style="padding: 6px 0;">${region}</td>
              </tr>
            </table>

            <p style="font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #8FA8AE; margin: 0 0 12px;">Perfil técnico y comercial</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 6px 0; font-weight: 600; width: 160px; vertical-align: top;">Actividad</td>
                <td style="padding: 6px 0;">${list(activity)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Sectores</td>
                <td style="padding: 6px 0;">${list(sectors)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Capacidad técnica</td>
                <td style="padding: 6px 0;">${technical_capacity || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Proyectos/año</td>
                <td style="padding: 6px 0;">${volume || "—"}</td>
              </tr>
            </table>

            <p style="font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #8FA8AE; margin: 0 0 12px;">Interés en Basslock®</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-weight: 600; width: 160px; vertical-align: top;">Productos</td>
                <td style="padding: 6px 0;">${list(products)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Proyecto concreto</td>
                <td style="padding: 6px 0;">${has_project || "—"}</td>
              </tr>
              ${project_description ? `<tr><td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Descripción</td><td style="padding: 6px 0; white-space: pre-wrap; line-height: 1.5;">${project_description}</td></tr>` : ""}
              <tr>
                <td style="padding: 6px 0; font-weight: 600; vertical-align: top;">Fuente</td>
                <td style="padding: 6px 0;">${source || "—"}</td>
              </tr>
            </table>

          </div>
          <div style="padding: 16px 32px; background-color: #364E6B; text-align: center;">
            <p style="color: #8FA8AE; font-size: 12px; margin: 0;">Formulario de distribuidores — snaconsultoriaacustica.com</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(
        JSON.stringify({ error: "Error al enviar el email" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // ── Confirmation email to the applicant (fire-and-forget) ────
    const firstName = contact_name.split(" ")[0];

    resend.emails.send({
      from: "SNA Consultoría Acústica <web@snaconsultoriaacustica.com>",
      to: email,
      replyTo: "info@snaconsultoriaacustica.com",
      subject: "Solicitud recibida — Programa de distribución Basslock®",
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #4A4A4A;">
          <div style="background-color: #364E6B; padding: 24px 32px;">
            <h1 style="color: #ffffff; font-size: 18px; margin: 0;">Solicitud recibida correctamente</h1>
          </div>
          <div style="padding: 32px; background-color: #F4F5F6;">
            <p style="margin: 0 0 16px; line-height: 1.6;">Hola ${firstName},</p>
            <p style="margin: 0 0 16px; line-height: 1.6;">Hemos recibido su solicitud de información sobre el programa de distribución de <strong>Basslock®</strong>. Nuestro equipo revisará el perfil de su empresa y se pondrá en contacto en los <strong>próximos días laborables</strong> para analizar las posibilidades de colaboración.</p>

            <div style="background-color: #ffffff; border-left: 3px solid #364E6B; padding: 16px 20px; margin: 24px 0;">
              <p style="margin: 0 0 4px; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #8FA8AE;">Resumen de su solicitud</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
                <tr>
                  <td style="padding: 4px 0; font-weight: 600; width: 120px; vertical-align: top; font-size: 14px;">Empresa</td>
                  <td style="padding: 4px 0; font-size: 14px;">${company}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: 600; vertical-align: top; font-size: 14px;">Productos</td>
                  <td style="padding: 4px 0; font-size: 14px;">${list(products)}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: 600; vertical-align: top; font-size: 14px;">Región</td>
                  <td style="padding: 4px 0; font-size: 14px;">${region}</td>
                </tr>
              </table>
            </div>

            <p style="margin: 24px 0 16px; line-height: 1.6;">Si necesita comunicarnos algo adicional, puede escribirnos a <a href="mailto:info@snaconsultoriaacustica.com" style="color: #4F7E87; font-weight: 600;">info@snaconsultoriaacustica.com</a>, llamarnos al <a href="tel:+34918387866" style="color: #4F7E87; font-weight: 600;">91 838 78 66</a> o contactarnos por <a href="https://wa.me/34669307211" style="color: #25D366; font-weight: 600;">WhatsApp</a>.</p>
            <p style="margin: 0; line-height: 1.6;">Un saludo,<br/><strong>El equipo técnico de SNA</strong></p>
          </div>
          <div style="padding: 16px 32px; background-color: #364E6B; text-align: center;">
            <p style="color: #8FA8AE; font-size: 12px; margin: 0 0 4px;">SNA Consultoría Acústica</p>
            <p style="color: #8FA8AE; font-size: 11px; margin: 0;">Torre Europa, Paseo de la Castellana 95, planta 29 — 28046 Madrid</p>
          </div>
        </div>
      `,
    }).catch((err) => console.error("Distributor confirmation email error:", err));

    return new Response(
      JSON.stringify({ success: true }),
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
