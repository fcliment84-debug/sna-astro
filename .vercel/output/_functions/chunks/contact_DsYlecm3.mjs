import { Resend } from 'resend';
import { i as isAllowedOrigin, g as getClientIp, r as rateLimitOk, v as verifyTurnstile, e as escapeHtml } from './api-security_Cw--SZG9.mjs';

const prerender = false;
const resend = new Resend("re_VAMp6h6V_GQ9gG19etSn7Hg5KweCKCcBd");
const TO_ADDRESSES = [
  "snaconsultoriacustica@gmail.com",
  "info@snaconsultoriaacustica.com"
];
const projectTypeLabels = {
  industrial: "Acústica industrial",
  arquitectonica: "Acústica arquitectónica",
  medioambiental: "Acústica medioambiental",
  basslock: "Basslock® / distribución",
  otro: "Otro"
};
const POST = async ({ request }) => {
  try {
    if (!isAllowedOrigin(request)) {
      return new Response(JSON.stringify({ error: "forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" }
      });
    }
    const ip = getClientIp(request);
    if (!rateLimitOk(ip)) {
      return new Response(JSON.stringify({ error: "too many requests" }), {
        status: 429,
        headers: { "Content-Type": "application/json" }
      });
    }
    const body = await request.json();
    const {
      nombre,
      apellidos,
      empresa,
      email,
      telefono,
      tipoProyecto,
      mensaje,
      website_url,
      // honeypot
      turnstileToken
    } = body;
    if (website_url) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const turnstileOk = await verifyTurnstile(turnstileToken, ip);
    if (!turnstileOk) {
      return new Response(JSON.stringify({ error: "verification failed" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!nombre || !apellidos || !empresa || !email || !mensaje) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const tipoLabel = projectTypeLabels[tipoProyecto] || tipoProyecto || "No especificado";
    const eNombre = escapeHtml(nombre);
    const eApellidos = escapeHtml(apellidos);
    const eEmpresa = escapeHtml(empresa);
    const eEmail = escapeHtml(email);
    const eTelefono = escapeHtml(telefono);
    const eTipoLabel = escapeHtml(tipoLabel);
    const eMensaje = escapeHtml(mensaje);
    const nombreCompleto = `${eNombre} ${eApellidos}`;
    const subjectName = `${nombre} ${apellidos}`.trim();
    const internalEmailPromise = resend.emails.send({
      from: "SNA Web <web@snaconsultoriaacustica.com>",
      to: TO_ADDRESSES,
      replyTo: email,
      subject: `Nueva consulta web — ${subjectName} (${empresa})`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #4A4A4A;">
          <div style="background-color: #4F7E87; padding: 24px 32px;">
            <h1 style="color: #ffffff; font-size: 18px; margin: 0;">Nueva consulta desde la web</h1>
          </div>
          <div style="padding: 32px; background-color: #F4F5F6;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; width: 140px; vertical-align: top;">Nombre</td>
                <td style="padding: 8px 0;">${eNombre}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Apellidos</td>
                <td style="padding: 8px 0;">${eApellidos}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Empresa</td>
                <td style="padding: 8px 0;">${eEmpresa}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${eEmail}" style="color: #4F7E87;">${eEmail}</a></td>
              </tr>
              ${telefono ? `<tr>
                <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Teléfono</td>
                <td style="padding: 8px 0;"><a href="tel:${eTelefono}" style="color: #4F7E87;">${eTelefono}</a></td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Tipo de proyecto</td>
                <td style="padding: 8px 0;">${eTipoLabel}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #D9DDE0;">
              <p style="font-weight: 600; margin: 0 0 8px;">Mensaje</p>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${eMensaje}</p>
            </div>
          </div>
          <div style="padding: 16px 32px; background-color: #4A4A4A; text-align: center;">
            <p style="color: #8FA8AE; font-size: 12px; margin: 0;">Formulario enviado desde snaconsultoriaacustica.com</p>
          </div>
        </div>
      `
    });
    const confirmationEmailPromise = resend.emails.send({
      from: "SNA Consultoría Acústica <web@snaconsultoriaacustica.com>",
      to: email,
      replyTo: "info@snaconsultoriaacustica.com",
      subject: "Hemos recibido tu consulta — SNA Consultoría Acústica",
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #4A4A4A;">
          <div style="background-color: #4F7E87; padding: 24px 32px;">
            <h1 style="color: #ffffff; font-size: 18px; margin: 0;">Consulta recibida correctamente</h1>
          </div>
          <div style="padding: 32px; background-color: #F4F5F6;">
            <p style="margin: 0 0 16px; line-height: 1.6;">Hola ${eNombre},</p>
            <p style="margin: 0 0 16px; line-height: 1.6;">Hemos recibido tu consulta y nuestro equipo técnico la está revisando. Nos pondremos en contacto contigo en un <strong>plazo máximo de 48 horas hábiles</strong>.</p>
            <div style="background-color: #ffffff; border-left: 3px solid #4F7E87; padding: 16px 20px; margin: 24px 0;">
              <p style="margin: 0 0 4px; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #8FA8AE;">Resumen de tu consulta</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
                <tr>
                  <td style="padding: 4px 0; font-weight: 600; width: 120px; vertical-align: top; font-size: 14px;">Empresa</td>
                  <td style="padding: 4px 0; font-size: 14px;">${eEmpresa}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: 600; vertical-align: top; font-size: 14px;">Tipo</td>
                  <td style="padding: 4px 0; font-size: 14px;">${eTipoLabel}</td>
                </tr>
              </table>
              <p style="margin: 12px 0 0; font-size: 14px; font-style: italic; color: #666; white-space: pre-wrap; line-height: 1.5;">"${eMensaje}"</p>
            </div>
            <p style="margin: 24px 0 16px; line-height: 1.6;">Si necesitas comunicarnos algo adicional antes de nuestra respuesta, puedes escribirnos directamente a <a href="mailto:info@snaconsultoriaacustica.com" style="color: #4F7E87; font-weight: 600;">info@snaconsultoriaacustica.com</a>, llamarnos al <a href="tel:+34918387866" style="color: #4F7E87; font-weight: 600;">91 838 78 66</a> o contactarnos por <a href="https://wa.me/34669307211" style="color: #25D366; font-weight: 600;">WhatsApp</a>.</p>
            <p style="margin: 0; line-height: 1.6;">Un saludo,<br/><strong>El equipo técnico de SNA</strong></p>
          </div>
          <div style="padding: 16px 32px; background-color: #4A4A4A; text-align: center;">
            <p style="color: #8FA8AE; font-size: 12px; margin: 0 0 4px;">SNA Consultoría Acústica</p>
            <p style="color: #8FA8AE; font-size: 11px; margin: 0;">Torre Europa, Paseo de la Castellana 95, planta 29 — 28046 Madrid</p>
          </div>
        </div>
      `
    });
    const [internalResult, confirmationResult] = await Promise.allSettled([
      internalEmailPromise,
      confirmationEmailPromise
    ]);
    if (internalResult.status === "rejected" || internalResult.value.error) {
      console.error("Internal email failed:", internalResult);
      return new Response(
        JSON.stringify({ error: "Error al enviar el email" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    if (confirmationResult.status === "rejected" || confirmationResult.value.error) {
      console.error("Confirmation email failed:", confirmationResult);
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
