import { useState } from "react";

interface Props {
  lang?: "es" | "en";
}

const texts = {
  es: {
    heading: "¿Tienes un problema acústico que requiere un enfoque técnico riguroso?",
    sub: "Plantéanos el caso. Analizamos el problema y te indicamos cómo podemos abordarlo.",
    note: "Respondemos en un plazo máximo de 48 horas hábiles. La primera consulta no tiene coste.",
    name: "Nombre",
    surname: "Apellidos",
    company: "Empresa",
    email: "Email",
    phone: "Teléfono",
    phoneOpt: "(opcional)",
    projectType: "Tipo de proyecto",
    selectPlaceholder: "Seleccionar...",
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
    heading: "Do you have an acoustic problem that requires a rigorous technical approach?",
    sub: "Tell us about your case. We'll analyse the problem and explain how we can address it.",
    note: "We respond within a maximum of 48 business hours. The first consultation is free of charge.",
    name: "Name",
    surname: "Surname",
    company: "Company",
    email: "Email",
    phone: "Phone",
    phoneOpt: "(optional)",
    projectType: "Project type",
    selectPlaceholder: "Select...",
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

export default function CTASection({ lang = "es" }: Props) {
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
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const successBlock = (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sna-accent/20 mb-6">
        <svg className="w-8 h-8 text-sna-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">{t.successTitle}</h3>
      <p className="text-foreground/80 mb-8">{t.successMsg}</p>
      <button
        onClick={() => {
          setStatus("idle");
          setFormData({ nombre: "", apellidos: "", empresa: "", email: "", telefono: "", tipoProyecto: "", mensaje: "" });
          setAcceptPrivacy(false);
        }}
        className="text-sm text-primary hover:text-primary/80 underline transition-colors"
      >
        {t.newQuery}
      </button>
    </div>
  );

  const formBlock = (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cta-nombre" className="block text-sm font-medium mb-1.5">{t.name}</label>
          <input id="cta-nombre" name="nombre" type="text" required value={formData.nombre} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="cta-apellidos" className="block text-sm font-medium mb-1.5">{t.surname}</label>
          <input id="cta-apellidos" name="apellidos" type="text" required value={formData.apellidos} onChange={handleChange} className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="cta-empresa" className="block text-sm font-medium mb-1.5">{t.company}</label>
        <input id="cta-empresa" name="empresa" type="text" required value={formData.empresa} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cta-email" className="block text-sm font-medium mb-1.5">{t.email}</label>
        <input id="cta-email" name="email" type="email" required value={formData.email} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cta-telefono" className="block text-sm font-medium mb-1.5">
          {t.phone} <span className="text-secondary text-xs">{t.phoneOpt}</span>
        </label>
        <input id="cta-telefono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cta-tipoProyecto" className="block text-sm font-medium mb-1.5">{t.projectType}</label>
        <select id="cta-tipoProyecto" name="tipoProyecto" value={formData.tipoProyecto} onChange={handleChange} className={inputClass}>
          <option value="">{t.selectPlaceholder}</option>
          <option value="industrial">{t.industrial}</option>
          <option value="arquitectonica">{t.architectural}</option>
          <option value="medioambiental">{t.environmental}</option>
          <option value="basslock">{t.basslock}</option>
          <option value="otro">{t.other}</option>
        </select>
      </div>
      <div>
        <label htmlFor="cta-mensaje" className="block text-sm font-medium mb-1.5">{t.message}</label>
        <textarea id="cta-mensaje" name="mensaje" rows={3} required value={formData.mensaje} onChange={handleChange} className={inputClass} />
      </div>

      {/* RGPD checkbox */}
      <div className="flex items-start gap-3">
        <input
          id="cta-privacy"
          type="checkbox"
          checked={acceptPrivacy}
          onChange={(e) => setAcceptPrivacy(e.target.checked)}
          className="mt-1 h-4 w-4 border border-sna-gray-line rounded-none accent-primary cursor-pointer"
          required
        />
        <label htmlFor="cta-privacy" className="text-sm text-foreground/80 leading-relaxed cursor-pointer">
          {t.privacy}{" "}
          <a href={t.privacyUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline transition-colors">
            {t.privacyLink}
          </a>
        </label>
      </div>

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

  return (
    <section className="py-24 lg:py-32" aria-labelledby="cta-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <h2 id="cta-heading" className="text-3xl lg:text-4xl font-semibold mb-6">
              {t.heading}
            </h2>
            <p className="text-base lg:text-lg text-foreground/80 leading-relaxed mb-4">
              {t.sub}
            </p>
            <p className="text-sm text-secondary">{t.note}</p>
          </div>
          {status === "success" ? successBlock : formBlock}
        </div>
      </div>
    </section>
  );
}
