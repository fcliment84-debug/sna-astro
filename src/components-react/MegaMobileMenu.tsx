import { useState } from "react";
import { motion } from "framer-motion";
import { metodologiaData, proyectosData } from "../data/megamenu";
import { projects, getProjectThumbnail } from "../data/projects";
import { localePath, switchPath } from "../data/navigation";
import BasslockBrand from "./BasslockBrand";

const texts = {
  es: {
    closeMenu: "Cerrar menú",
    methodology: "Metodología",
    viewMethodology: "Ver metodología →",
    projects: "Proyectos",
    viewAllProjects: "Ver todos los proyectos →",
    about: "Sobre SNA",
    contact: "Contacto",
    cta: "Plantear caso técnico",
  },
  en: {
    closeMenu: "Close menu",
    methodology: "Methodology",
    viewMethodology: "View methodology →",
    projects: "Projects",
    viewAllProjects: "View all projects →",
    about: "About SNA",
    contact: "Contact",
    cta: "Submit a technical case",
  },
};

interface Props {
  lang: "es" | "en";
  currentPath: string;
  onClose: () => void;
}

const MegaMobileMenu = ({ lang, currentPath, onClose }: Props) => {
  const t = texts[lang];
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (section: string) =>
    setOpenSection((prev) => (prev === section ? null : section));

  const featured = proyectosData.featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean)
    .slice(0, 2) as typeof projects;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 bg-sna-dark z-50 overflow-y-auto"
    >
      <div className="p-6">
        <button
          onClick={onClose}
          className="ml-auto block p-2 mb-6"
          aria-label={t.closeMenu}
        >
          {/* X icon */}
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col gap-1">
          {/* Metodología accordion */}
          <button
            onClick={() => toggle("metodologia")}
            className="flex items-center justify-between py-4 border-b border-white/10 text-white text-lg font-medium w-full text-left"
            aria-expanded={openSection === "metodologia"}
          >
            <span>{t.methodology}</span>
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                openSection === "metodologia" ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openSection === "metodologia" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="flex flex-col gap-3 py-4 pl-4"
            >
              {metodologiaData.pills.map((pill) => (
                <a
                  key={pill.href}
                  href={localePath(pill.href, lang)}
                  onClick={onClose}
                  className="text-white/80 text-base hover:text-sna-accent transition-colors"
                >
                  {lang === "en" ? pill.labelEn || pill.label : pill.label}
                </a>
              ))}
              <a
                href={localePath("/metodologia", lang)}
                onClick={onClose}
                className="text-sna-accent text-sm font-medium mt-2"
              >
                {t.viewMethodology}
              </a>
            </motion.div>
          )}

          {/* Proyectos accordion */}
          <button
            onClick={() => toggle("proyectos")}
            className="flex items-center justify-between py-4 border-b border-white/10 text-white text-lg font-medium w-full text-left"
            aria-expanded={openSection === "proyectos"}
          >
            <span>{t.projects}</span>
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                openSection === "proyectos" ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openSection === "proyectos" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="flex flex-col gap-4 py-4 pl-4"
            >
              {featured.map((project) => {
                const thumb = getProjectThumbnail(project.slug);
                return (
                  <a
                    key={project.slug}
                    href={localePath(`/proyectos/${project.slug}`, lang)}
                    onClick={onClose}
                    className="flex items-center gap-3"
                  >
                    {thumb && (
                      <img src={thumb} alt={project.title} className="w-16 h-12 object-cover" />
                    )}
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-sna-accent">
                        {project.sector}
                      </span>
                      <p className="text-white text-sm leading-snug line-clamp-1">{project.title}</p>
                    </div>
                  </a>
                );
              })}
              <a
                href={localePath("/proyectos", lang)}
                onClick={onClose}
                className="text-sna-accent text-sm font-medium mt-1"
              >
                {t.viewAllProjects}
              </a>
            </motion.div>
          )}

          {/* Direct links */}
          <a
            href={localePath("/basslock", lang)}
            onClick={onClose}
            className="py-4 border-b border-white/10 text-white text-lg font-medium block"
          >
            <BasslockBrand />
          </a>
          <a
            href={localePath("/sobre-nosotros", lang)}
            onClick={onClose}
            className="py-4 border-b border-white/10 text-white text-lg font-medium block"
          >
            {t.about}
          </a>
          <a
            href={localePath("/contacto", lang)}
            onClick={onClose}
            className="py-4 border-b border-white/10 text-white text-lg font-medium block"
          >
            {t.contact}
          </a>

          {/* Language switcher */}
          <a
            href={switchPath(currentPath)}
            onClick={onClose}
            className="py-4 border-b border-white/10 text-white/60 text-lg font-medium uppercase tracking-wider block"
          >
            {lang === "es" ? "English" : "Español"}
          </a>

          {/* CTA */}
          <a
            href={localePath("/contacto", lang)}
            onClick={onClose}
            className="group inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-4 text-center font-medium rounded-none hover:bg-sna-accent hover:text-sna-dark transition-all duration-200 mt-8"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">
              {t.cta}
            </span>
            <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 transition-all duration-200 ml-0 group-hover:ml-2">
              &rarr;
            </span>
          </a>
        </nav>
      </div>
    </motion.div>
  );
};

export default MegaMobileMenu;
