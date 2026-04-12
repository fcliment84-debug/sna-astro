import { useState, useMemo } from "react";
import { projects, getProjectThumbnail, localizeProject } from "../data/projects";
import { localePath } from "../data/navigation";

interface Props {
  lang?: "es" | "en";
}

const sectorLabels: Record<string, Record<string, string>> = {
  es: { Todos: "Todos", Industrial: "Industrial", "Arquitectónico": "Arquitectónico", Medioambiental: "Medioambiental" },
  en: { Todos: "All", Industrial: "Industrial", "Arquitectónico": "Architectural", Medioambiental: "Environmental" },
};

const solutionLabels: Record<string, Record<string, string>> = {
  es: { Todas: "Todas", "Control de vibraciones": "Control de vibraciones", "Aislamiento acústico": "Aislamiento acústico", "Acondicionamiento acústico": "Acondicionamiento acústico", "Monitorización y diagnóstico": "Monitorización y diagnóstico", "Simulación y diseño FEM": "Simulación y diseño FEM", "Control acústico integral": "Control acústico integral" },
  en: { Todas: "All", "Control de vibraciones": "Vibration control", "Aislamiento acústico": "Sound insulation", "Acondicionamiento acústico": "Acoustic conditioning", "Monitorización y diagnóstico": "Monitoring & diagnosis", "Simulación y diseño FEM": "FEM simulation & design", "Control acústico integral": "Integral acoustic control" },
};

const sectors = ["Todos", "Industrial", "Arquitectónico", "Medioambiental"];
const solutionTypes = ["Todas", "Control de vibraciones", "Aislamiento acústico", "Acondicionamiento acústico", "Monitorización y diagnóstico", "Simulación y diseño FEM", "Control acústico integral"];

const filterTexts = {
  es: { toggle: "Filtros", sector: "Sector", solution: "Solución", clear: "Borrar filtros", noResults: "No hay proyectos que coincidan con estos filtros.", resetFilters: "Ver todos los proyectos →" },
  en: { toggle: "Filters", sector: "Sector", solution: "Solution", clear: "Clear filters", noResults: "No projects match these filters.", resetFilters: "View all projects →" },
};

const viewProject = { es: "Ver proyecto", en: "View project" };

const sectorColorMap: Record<string, string> = {
  Industrial: "text-primary",
  "Arquitectónico": "text-secondary",
  Medioambiental: "text-sna-green",
};

const boltClip = "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)";

export default function ProjectFilter({ lang = "es" }: Props) {
  const [activeSector, setActiveSector] = useState("Todos");
  const [activeSolution, setActiveSolution] = useState("Todas");
  const [open, setOpen] = useState(false);

  const ft = filterTexts[lang];

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (activeSector !== "Todos" && p.sector !== activeSector) return false;
      if (activeSolution !== "Todas" && p.solutionType !== activeSolution) return false;
      return true;
    });
  }, [activeSector, activeSolution]);

  const hasActiveFilters = activeSector !== "Todos" || activeSolution !== "Todas";

  const resetFilters = () => {
    setActiveSector("Todos");
    setActiveSolution("Todas");
  };

  return (
    <>
      {/* Filter bar */}
      <div className="sticky top-16 lg:top-20 z-40 bg-background border-b border-sna-gray-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border transition-all duration-150 rounded-none cursor-pointer ${
              open || hasActiveFilters
                ? "bg-primary border-primary text-primary-foreground"
                : "bg-transparent border-sna-gray-line text-foreground hover:bg-muted"
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {open ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="17" y1="16" x2="23" y2="16" /></>
              )}
            </svg>
            <span>{ft.toggle}</span>
          </button>
          {hasActiveFilters && !open && (
            <button onClick={resetFilters} className="text-xs font-medium text-primary hover:underline cursor-pointer">
              {ft.clear}
            </button>
          )}
        </div>
        {open && (
          <div className="overflow-hidden border-t border-sna-gray-line">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-sm font-medium text-secondary shrink-0 pt-2">{ft.sector}</span>
                <div role="group" className="flex items-center gap-2 overflow-x-auto">
                  {sectors.map((s) => (
                    <button
                      key={s}
                      role="radio"
                      aria-checked={activeSector === s}
                      onClick={() => setActiveSector(s)}
                      className={`shrink-0 px-4 py-2 text-sm font-medium border transition-all duration-150 rounded-none cursor-pointer ${
                        activeSector === s
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-transparent border-sna-gray-line text-foreground hover:bg-muted"
                      }`}
                    >
                      {sectorLabels[lang]?.[s] || s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-sm font-medium text-secondary shrink-0 pt-2">{ft.solution}</span>
                <div role="group" className="flex items-center gap-2 overflow-x-auto">
                  {solutionTypes.map((s) => (
                    <button
                      key={s}
                      role="radio"
                      aria-checked={activeSolution === s}
                      onClick={() => setActiveSolution(s)}
                      className={`shrink-0 px-4 py-2 text-sm font-medium border transition-all duration-150 rounded-none cursor-pointer ${
                        activeSolution === s
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-transparent border-sna-gray-line text-foreground hover:bg-muted"
                      }`}
                    >
                      {solutionLabels[lang]?.[s] || s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => {
                const t = localizeProject(project, lang);
                const thumbnail = getProjectThumbnail(project.slug);
                const colors = sectorColorMap[project.sector] || "text-primary";
                return (
                  <a
                    key={project.slug}
                    href={localePath(`/proyectos/${project.slug}`, lang)}
                    className="group relative block overflow-hidden bg-background transition-all duration-500 shadow-none border-b-2 border-transparent hover:shadow-xl hover:border-sna-accent"
                    style={{ clipPath: boltClip }}
                  >
                    <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[hsl(78_83%_60%/0.07)] shadow-[inset_0_0_30px_hsl(78_83%_60%/0.12)]"></div>
                    <div className="overflow-hidden">
                      <div className="aspect-[16/5] bg-muted flex items-center justify-center">
                        {thumbnail ? (
                          <img src={thumbnail} alt={t.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                        ) : (
                          <span className="text-xs text-muted-foreground select-none">[Imagen]</span>
                        )}
                      </div>
                    </div>
                    <div className="relative z-20 p-6">
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className={`text-[13px] font-medium uppercase tracking-widest transition-colors duration-500 group-hover:text-sna-accent ${colors}`}>{t.sector}</span>
                        <span className="text-muted-foreground text-[13px]">&middot;</span>
                        <span className="text-[13px] font-medium uppercase tracking-widest text-muted-foreground">{t.solutionType}</span>
                      </div>
                      <h3 className="text-lg font-medium mb-2 leading-snug">{t.title}</h3>
                      <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2 mb-4">{t.tagline}</p>
                      <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
                        <span>{viewProject[lang]}</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-base text-secondary mb-4">{ft.noResults}</p>
              <button onClick={resetFilters} className="text-sm font-medium text-primary hover:underline cursor-pointer">
                {ft.resetFilters}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
