import { useState } from "react";
import TurnstileWidget from "./TurnstileWidget";

interface Props {
  lang?: "es" | "en";
}

const texts = {
  es: {
    name: "Nombre",
    surname: "Apellidos",
    company: "Empresa",
    email: "Email",
    phone: "Teléfono",
    phoneOpt: "(opcional)",
    projectType: "Tipo de proyecto",
    selectPh: "Seleccionar...",
    industrial: "Acústica industrial",
    architectural: "Acústica arquitectónica",
    environmental: "Acústica medioambiental",
    basslock: "Basslock® / distribución",
    other: "Otro",
    message: "Describe brevemente el problema",
    submit: "Enviar consulta técnica",
    sending: "Enviando...",
    privacy: "He leído y acepto la",
    privacyLink: "Política de Privacidad",
    privacyUrl: "/politica-de-privacidad",
    successTitle: "Consulta enviada correctamente",
    successMsg: "Nos pondremos en contacto contigo en un plazo máximo de 48 horas hábiles.",
    errorMsg: "Ha ocurrido un error al enviar la consulta. Inténtalo de nuevo o escríbenos a info@snaconsultoriaacustica.com",
    newQuery: "Enviar otra consulta",
  },
  en: {
    name: "Name",
    surname: "Surname",
    company: "Company",
    email: "Email",
    phone: "Phone",
    phoneOpt: "(optional)",
    projectType: "Project type",
    selectPh: "Select...",
    industrial: "Industrial acoustics",
    architectural: "Architectural acoustics",
    environmental: "Environmental acoustics",
    basslock: "Basslock® / distribution",
    other: "Other",
    message: "Briefly describe the problem",
    submit: "Submit technical enquiry",
    sending: "Sending...",
    privacy: "I have read and accept the",
    privacyLink: "Privacy Policy",
    privacyUrl: "/en/privacy-policy",
    successTitle: "Enquiry sent successfully",
    successMsg: "We will get back to you within 48 business hours.",
    errorMsg: "An error occurred while sending the enquiry. Please try again or email us at info@snaconsultoriaacustica.com",
    newQuery: "Send another enquiry",
  },
};

const inputClass =
  "w-full border border-sna-gray-line bg-background px-4 py-3 text-base text-foreground rounded-none focus:border-primary focus:outline-none transition-colors duration-150";

export default function ContactForm({ lang = "es" }: Props) {
  const t = texts[lang];
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    empresa: "",
    email: "",
    telefono: "",
    tipoProyecto: "",
    mensaje: "",
  });
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [honeypot, setHoneypot] = useState(""); // bots fill this

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptPrivacy) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          website_url: honeypot,
          turnstileToken,
        }),
      });
      if (res.ok) {
        window.location.href = lang === "en" ? "/en/form-sent" : "/formulario-enviado";
        return;
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from humans, bots fill it, backend rejects */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-5000px", top: "-5000px" }}>
        <label htmlFor="cf-website-url">Website URL</label>
        <input
          id="cf-website-url"
          type="text"
          name="website_url"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-nombre" className="block text-sm font-medium mb-1.5">{t.name}</label>
          <input id="cf-nombre" name="nombre" type="text" required value={formData.nombre} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="cf-apellidos" className="block text-sm font-medium mb-1.5">{t.surname}</label>
          <input id="cf-apellidos" name="apellidos" type="text" required value={formData.apellidos} onChange={handleChange} className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-empresa" className="block text-sm font-medium mb-1.5">{t.company}</label>
        <input id="cf-empresa" name="empresa" type="text" required value={formData.empresa} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cf-email" className="block text-sm font-medium mb-1.5">{t.email}</label>
        <input id="cf-email" name="email" type="email" required value={formData.email} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cf-telefono" className="block text-sm font-medium mb-1.5">
          {t.phone} <span className="text-secondary text-xs">{t.phoneOpt}</span>
        </label>
        <input id="cf-telefono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cf-tipoProyecto" className="block text-sm font-medium mb-1.5">{t.projectType}</label>
        <select id="cf-tipoProyecto" name="tipoProyecto" value={formData.tipoProyecto} onChange={handleChange} className={inputClass}>
          <option value="">{t.selectPh}</option>
          <option value="industrial">{t.industrial}</option>
          <option value="arquitectonica">{t.architectural}</option>
          <option value="medioambiental">{t.environmental}</option>
          <option value="basslock">{t.basslock}</option>
          <option value="otro">{t.other}</option>
        </select>
      </div>
      <div>
        <label htmlFor="cf-mensaje" className="block text-sm font-medium mb-1.5">{t.message}</label>
        <textarea id="cf-mensaje" name="mensaje" rows={4} required value={formData.mensaje} onChange={handleChange} className={inputClass} />
      </div>

      {/* RGPD checkbox */}
      <div className="flex items-start gap-3">
        <input
          id="cf-privacy"
          type="checkbox"
          checked={acceptPrivacy}
          onChange={(e) => setAcceptPrivacy(e.target.checked)}
          className="mt-1 h-4 w-4 border border-sna-gray-line rounded-none accent-primary cursor-pointer"
          required
        />
        <label htmlFor="cf-privacy" className="text-sm text-foreground/80 leading-relaxed cursor-pointer">
          {t.privacy}{" "}
          <a href={t.privacyUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline transition-colors">
            {t.privacyLink}
          </a>
        </label>
      </div>

      {/* Cloudflare Turnstile — anti-bot verification */}
      <TurnstileWidget onVerify={setTurnstileToken} lang={lang} />

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-3">{t.errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 text-base font-medium rounded-none hover:bg-sna-accent hover:text-sna-dark transition-all duration-200 w-full lg:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span className="transition-transform duration-200 group-hover:-translate-x-1">
          {status === "sending" ? t.sending : t.submit}
        </span>
        <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 transition-all duration-200 ml-0 group-hover:ml-2">&rarr;</span>
      </button>
    </form>
  );
}
