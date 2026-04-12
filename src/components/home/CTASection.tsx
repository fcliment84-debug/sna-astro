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
  },
  en: {
    heading: "Do you have an acoustic problem that requires a rigorous technical approach?",
    sub: "Tell us about your case. We'll analyse the problem and explain how we can address it.",
    note: "We respond within a maximum of 48 business hours. The first consultation is free of charge.",
    name: "Name",
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
  },
};

const inputClass =
  "w-full border border-sna-gray-line bg-background px-4 py-3 text-base text-foreground rounded-none focus:border-primary focus:outline-none transition-colors duration-150";

export default function CTASection({ lang = "es" }: Props) {
  const t = texts[lang];
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    tipoProyecto: "",
    mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

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
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium mb-1.5">
                {t.name}
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                value={formData.nombre}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="empresa" className="block text-sm font-medium mb-1.5">
                {t.company}
              </label>
              <input
                id="empresa"
                name="empresa"
                type="text"
                required
                value={formData.empresa}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                {t.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium mb-1.5">
                {t.phone}{" "}
                <span className="text-secondary text-xs">{t.phoneOpt}</span>
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="tipoProyecto" className="block text-sm font-medium mb-1.5">
                {t.projectType}
              </label>
              <select
                id="tipoProyecto"
                name="tipoProyecto"
                value={formData.tipoProyecto}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">{t.selectPlaceholder}</option>
                <option value="industrial">{t.industrial}</option>
                <option value="arquitectonica">{t.architectural}</option>
                <option value="medioambiental">{t.environmental}</option>
                <option value="basslock">{t.basslock}</option>
                <option value="otro">{t.other}</option>
              </select>
            </div>
            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium mb-1.5">
                {t.message}
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={3}
                value={formData.mensaje}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              className="group inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 text-base font-medium rounded-none hover:bg-sna-accent hover:text-sna-dark transition-all duration-200 w-full lg:w-auto"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1">
                {t.submit}
              </span>
              <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 transition-all duration-200 ml-0 group-hover:ml-2">
                &rarr;
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
