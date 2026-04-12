import { useState, useRef, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { localePath, switchPath } from "../data/navigation";
import BasslockBrand from "./BasslockBrand";
import MegaMenuPanel from "./MegaMenuPanel";
import MegaMenuMetodologia from "./MegaMenuMetodologia";
import MegaMenuProyectos from "./MegaMenuProyectos";
import MegaMobileMenu from "./MegaMobileMenu";

type PanelKey = "metodologia" | "proyectos" | null;

let globalSuppressHover = false;

const texts = {
  es: {
    methodology: "Metodología",
    projects: "Proyectos",
    about: "Sobre SNA",
    contact: "Contacto",
    cta: "Plantear caso técnico",
    openMenu: "Abrir menú",
    mainNav: "Navegación principal",
  },
  en: {
    methodology: "Methodology",
    projects: "Projects",
    about: "About SNA",
    contact: "Contact",
    cta: "Submit a technical case",
    openMenu: "Open menu",
    mainNav: "Main navigation",
  },
};

interface Props {
  lang?: "es" | "en";
  currentPath?: string;
}

const MegaMenuHeader = ({ lang = "es", currentPath = "/" }: Props) => {
  const t = texts[lang];

  const directLinks = [
    { label: "Basslock", href: "/basslock", custom: true },
    { label: t.about, href: "/sobre-nosotros" },
    { label: t.contact, href: "/contacto" },
  ];

  const [activePanel, setActivePanel] = useState<PanelKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openPanel = useCallback((panel: PanelKey) => {
    if (globalSuppressHover) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActivePanel(panel);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActivePanel(null), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const closePanel = useCallback(() => {
    globalSuppressHover = true;
    setActivePanel(null);
  }, []);

  const resetSuppress = useCallback(() => {
    globalSuppressHover = false;
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePanel(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-sna-gray-line"
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20"
        aria-label={t.mainNav}
      >
        {/* Logo */}
        <a href={localePath("/", lang)} className="flex items-center">
          <img
            src="/images/logo_SNA_positivo.webp"
            alt="SNA Consultoría Acústica"
            className="h-12 lg:h-14 w-auto"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8" onMouseLeave={resetSuppress}>
          {/* Metodología */}
          <a
            href={localePath("/metodologia", lang)}
            onMouseEnter={() => openPanel("metodologia")}
            onMouseLeave={scheduleClose}
            onClick={closePanel}
            className={`text-sm font-medium tracking-wider transition-colors duration-200 hover:text-sna-accent flex items-center gap-1 ${
              activePanel === "metodologia" ? "text-sna-accent" : "text-foreground"
            }`}
            aria-haspopup="true"
            aria-expanded={activePanel === "metodologia"}
          >
            {t.methodology}
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${activePanel === "metodologia" ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>

          {/* Proyectos */}
          <a
            href={localePath("/proyectos", lang)}
            onMouseEnter={() => openPanel("proyectos")}
            onMouseLeave={scheduleClose}
            onClick={closePanel}
            className={`text-sm font-medium tracking-wider transition-colors duration-200 hover:text-sna-accent flex items-center gap-1 ${
              activePanel === "proyectos" ? "text-sna-accent" : "text-foreground"
            }`}
            aria-haspopup="true"
            aria-expanded={activePanel === "proyectos"}
          >
            {t.projects}
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${activePanel === "proyectos" ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>

          {/* Direct links */}
          {directLinks.map((link) => (
            <a
              key={link.href}
              href={localePath(link.href, lang)}
              onMouseEnter={() => openPanel(null)}
              className="text-sm font-medium tracking-wider text-foreground transition-colors duration-200 hover:text-sna-accent"
            >
              {link.custom ? <BasslockBrand /> : link.label}
            </a>
          ))}

          {/* Language switcher */}
          <a
            href={switchPath(currentPath)}
            className="text-sm font-medium tracking-wider text-foreground/50 hover:text-sna-accent transition-colors duration-200 uppercase"
          >
            {lang === "es" ? "EN" : "ES"}
          </a>

          {/* CTA */}
          <a
            href={localePath("/contacto", lang)}
            className="group inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium rounded-none hover:bg-sna-accent hover:text-sna-dark transition-all duration-200"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">
              {t.cta}
            </span>
            <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 transition-all duration-200 ml-0 group-hover:ml-2">
              &rarr;
            </span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(true)}
          aria-label={t.openMenu}
        >
          {/* Menu icon */}
          <svg className="w-6 h-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Desktop Panels */}
      <AnimatePresence>
        {activePanel === "metodologia" && (
          <MegaMenuPanel onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
            <MegaMenuMetodologia lang={lang} onNavigate={closePanel} />
          </MegaMenuPanel>
        )}
        {activePanel === "proyectos" && (
          <MegaMenuPanel onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
            <MegaMenuProyectos lang={lang} onNavigate={closePanel} />
          </MegaMenuPanel>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <MegaMobileMenu
            lang={lang}
            currentPath={currentPath}
            onClose={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default MegaMenuHeader;
