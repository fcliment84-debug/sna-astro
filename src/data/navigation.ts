export interface NavLink {
  label: string;
  labelEn?: string;
  href: string;
  children?: NavLink[];
  custom?: boolean;
}

export const mainNav: NavLink[] = [
  {
    label: "Metodología",
    labelEn: "Methodology",
    href: "/metodologia",
    children: [
      { label: "Diagnóstico", labelEn: "Diagnosis", href: "/metodologia/diagnostico" },
      { label: "Diseño", labelEn: "Design", href: "/metodologia/diseno" },
      { label: "Ejecución", labelEn: "Execution", href: "/metodologia/ejecucion" },
    ],
  },
  {
    label: "Proyectos",
    labelEn: "Projects",
    href: "/proyectos",
    children: [
      { label: "Acústica industrial", labelEn: "Industrial acoustics", href: "/proyectos/acustica-industrial" },
      { label: "Acústica arquitectónica", labelEn: "Architectural acoustics", href: "/proyectos/acustica-arquitectonica" },
      { label: "Acústica medioambiental", labelEn: "Environmental acoustics", href: "/proyectos/acustica-medioambiental" },
    ],
  },
  { label: "Basslock", href: "/basslock", custom: true },
  { label: "Sobre SNA", labelEn: "About SNA", href: "/sobre-nosotros" },
  { label: "Contacto", labelEn: "Contact", href: "/contacto" },
];

/** Route mapping ES → EN */
export const routeMap: Record<string, string> = {
  "/": "/en",
  "/metodologia": "/en/methodology",
  "/metodologia/diagnostico": "/en/methodology/diagnosis",
  "/metodologia/diseno": "/en/methodology/design",
  "/metodologia/ejecucion": "/en/methodology/execution",
  "/proyectos": "/en/projects",
  "/proyectos/acustica-industrial": "/en/projects/industrial-acoustics",
  "/proyectos/acustica-arquitectonica": "/en/projects/architectural-acoustics",
  "/proyectos/acustica-medioambiental": "/en/projects/environmental-acoustics",
  "/basslock": "/en/basslock",
  "/sobre-nosotros": "/en/about-us",
  "/contacto": "/en/contact",
  "/aviso-legal": "/en/legal-notice",
  "/politica-de-privacidad": "/en/privacy-policy",
  "/politica-de-cookies": "/en/cookie-policy",
};

/** Dynamic prefix mapping for routes not in the static routeMap */
const prefixMap: [string, string][] = [
  ["/proyectos/", "/en/projects/"],
];

/** Strip trailing slash for consistent matching (but keep "/" as is) */
function normalize(path: string): string {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

export function localePath(esPath: string, lang: "es" | "en"): string {
  if (lang === "es") return esPath;
  const clean = normalize(esPath);
  // Check static map first
  if (routeMap[clean]) return routeMap[clean];
  // Check dynamic prefix map
  for (const [esPrefix, enPrefix] of prefixMap) {
    if (clean.startsWith(esPrefix)) {
      return enPrefix + clean.slice(esPrefix.length);
    }
  }
  return `/en${clean}`;
}

export function switchPath(currentPath: string): string {
  const clean = normalize(currentPath);
  const isEn = clean.startsWith("/en");
  if (isEn) {
    // Check static map (reversed)
    const enToEs = Object.fromEntries(
      Object.entries(routeMap).map(([es, en]) => [en, es])
    );
    if (enToEs[clean]) return enToEs[clean];
    // Check dynamic prefix map (reversed)
    for (const [esPrefix, enPrefix] of prefixMap) {
      if (clean.startsWith(enPrefix)) {
        return esPrefix + clean.slice(enPrefix.length);
      }
    }
    return clean.replace(/^\/en/, "") || "/";
  }
  return localePath(clean, "en");
}
