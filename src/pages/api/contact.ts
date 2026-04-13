export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const TO_ADDRESSES = [
  "snaconsultoriaacustica@gmail.com",
  "info@snaconsultoriaacustica.com",
];

const projectTypeLabels: Record<string, string> = {
  industrial: "Acústica industrial",
  arquitectonica: "Acústica arquitectónica",
  medioambiental: "Acústica medioambiental",
  basslock: "Basslock® / distribución",
  otro: "Otro",
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { nombre, empresa, email, telefono, tipoProyecto, mensaje } = body;

    if (!nombre || !empresa || !email || !mensaje) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const tipoLabel = projectTypeLabels[tipoProyecto] || tipoProyecto || "No especificado";

    const { error } = await resend.emails.send({
      from: "SNA Web <web@snaconsultoriaacustica.com>",
      to: TO_ADDRESSES,
      replyTo: email,
      subject: `Nueva consulta web — ${nombre} (${empresa})`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #4A4A4A;">
          <div style="background-color: #4F7E87; padding: 24px 32px;">
            <h1 style="color: #ffffff; font-size: 18px; margin: 0;">Nueva consulta desde la web</h1>
          </div>
          <div style="padding: 32px; background-color: #F4F5F6;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; width: 140px; vertical-align: top;">Nombre</td>
                <td style="padding: 8px 0;">${nombre}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Empresa</td>
                <td style="padding: 8px 0;">${empresa}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #4F7E87;">${email}</a></td>
              </tr>
              ${telefono ? `<tr>
                <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Teléfono</td>
                <td style="padding: 8px 0;"><a href="tel:${telefono}" style="color: #4F7E87;">${telefono}</a></td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Tipo de proyecto</td>
                <td style="padding: 8px 0;">${tipoLabel}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #D9DDE0;">
              <p style="font-weight: 600; margin: 0 0 8px;">Mensaje</p>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${mensaje}</p>
            </div>
          </div>
          <div style="padding: 16px 32px; background-color: #4A4A4A; text-align: center;">
            <p style="color: #8FA8AE; font-size: 12px; margin: 0;">Formulario enviado desde snaconsultoriaacustica.com</p>
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
