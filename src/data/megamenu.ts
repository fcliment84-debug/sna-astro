export interface MegaMenuCard {
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  image: string;
  href: string;
}

export interface MegaMenuPill {
  label: string;
  labelEn?: string;
  href: string;
}

export const metodologiaData = {
  hero: {
    image: "/images/metodologia-hero-bg.webp",
    headline: "Nuestra metodología garantiza resultados técnicos predecibles.",
    headlineEn: "Our methodology ensures predictable technical results.",
    cta: {
      label: "Ver metodología",
      labelEn: "View methodology",
      href: "/metodologia",
    },
  },
  cards: [
    {
      title: "Diagnóstico avanzado",
      titleEn: "Advanced diagnosis",
      description: "Medición de campo, análisis modal y mapeo acústico 3D.",
      descriptionEn: "Field measurement, modal analysis and 3D acoustic mapping.",
      image: "/images/camara-acustica-sna.webp",
      href: "/metodologia/diagnostico",
    },
    {
      title: "Innovación aplicada",
      titleEn: "Applied innovation",
      description: "Simulación FEM/BEM, prototipado y validación experimental.",
      descriptionEn: "FEM/BEM simulation, prototyping and experimental validation.",
      image: "/images/innovacion-aplicada.webp",
      href: "/metodologia/diseno",
    },
  ] as MegaMenuCard[],
  extraCard: {
    title: "Capacidad técnica",
    titleEn: "Technical capability",
    description: "Fabricación propia y ejecución con responsabilidad técnica completa.",
    descriptionEn: "In-house manufacturing and execution with full technical responsibility.",
    image: "/images/capacidad-tecnica.webp",
    href: "/metodologia/ejecucion",
  } as MegaMenuCard,
  pills: [
    { label: "Diagnóstico", labelEn: "Diagnosis", href: "/metodologia/diagnostico" },
    { label: "Diseño", labelEn: "Design", href: "/metodologia/diseno" },
    { label: "Ejecución", labelEn: "Execution", href: "/metodologia/ejecucion" },
  ] as MegaMenuPill[],
};

export const proyectosData = {
  hero: {
    image: "/images/pilares-hero.webp",
    headline: "Más de 25 años resolviendo problemas acústicos complejos.",
    headlineEn: "Over 25 years solving complex acoustic problems.",
    cta: {
      label: "Ver proyectos",
      labelEn: "View projects",
      href: "/proyectos",
    },
  },
  featuredSlugs: [
    "complejo-hidroelectrico-alto-tamega",
    "central-termica-castejon",
    "cubierta-edificio-exclusivo-madrid",
    "conservatorio-musica-edificio-historico",
  ],
  filters: [
    { label: "Acústica industrial", labelEn: "Industrial acoustics", href: "/proyectos/acustica-industrial" },
    { label: "Acústica arquitectónica", labelEn: "Architectural acoustics", href: "/proyectos/acustica-arquitectonica" },
    { label: "Acústica medioambiental", labelEn: "Environmental acoustics", href: "/proyectos/acustica-medioambiental" },
    { label: "Ver todos", labelEn: "View all", href: "/proyectos" },
  ] as MegaMenuPill[],
};
