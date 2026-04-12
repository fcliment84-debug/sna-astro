import { useMemo } from "react";
import { projects, getProjectThumbnail, localizeProject } from "../data/projects";
import { proyectosData } from "../data/megamenu";
import { localePath } from "../data/navigation";

const texts = {
  es: {
    heroDesc: "Más de 25 años resolviendo los problemas acústicos más complejos.",
    viewAll: "Ver todos los proyectos",
    sectors: "Sectores",
  },
  en: {
    heroDesc: "Over 25 years solving the most complex acoustic problems.",
    viewAll: "View all projects",
    sectors: "Sectors",
  },
};

interface Props {
  lang: "es" | "en";
  onNavigate: () => void;
}

const MegaMenuProyectos = ({ lang, onNavigate }: Props) => {
  const t = texts[lang];
  const { filters } = proyectosData;

  const featured = useMemo(() => {
    const shuffled = [...projects].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Col 1: Hero editorial */}
      <div className="col-span-4 relative overflow-hidden rounded-none">
        <img
          src={proyectosData.hero.image}
          alt={lang === "en" ? "SNA Projects" : "Proyectos SNA"}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 bg-gradient-to-t from-[hsl(0_0%_29%/0.9)] via-[hsl(0_0%_29%/0.5)] to-transparent p-6 flex flex-col justify-end min-h-[180px]">
          <p className="text-white/90 text-sm leading-relaxed mb-4">
            {t.heroDesc}
          </p>
          <a
            href={localePath("/proyectos", lang)}
            onClick={onNavigate}
            className="group inline-flex items-center text-sna-accent text-sm font-medium hover:underline"
          >
            <span>{t.viewAll}</span>
            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>
      </div>

      {/* Col 2: 2x2 grid of random projects */}
      <div className="col-span-5 grid grid-cols-2 gap-4">
        {featured.map((project) => {
          const thumb = getProjectThumbnail(project.slug);
          const loc = localizeProject(project, lang);
          return (
            <a
              key={project.slug}
              href={localePath(`/proyectos/${project.slug}`, lang)}
              onClick={onNavigate}
              className="group block"
            >
              <div className="overflow-hidden mb-3">
                {thumb ? (
                  <img
                    src={thumb}
                    alt={loc.title}
                    className="w-full h-20 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-20 bg-white/10" />
                )}
              </div>
              <span className="text-[11px] uppercase tracking-widest text-sna-accent font-medium">
                {loc.sector}
              </span>
              <h4 className="text-white text-sm font-medium mt-1 leading-snug group-hover:underline line-clamp-2">
                {loc.title}
              </h4>
            </a>
          );
        })}
      </div>

      {/* Col 3: Quick filters */}
      <div className="col-span-3 flex flex-col gap-3 pt-2">
        <span className="text-white/50 text-xs uppercase tracking-widest mb-2">{t.sectors}</span>
        {filters.map((filter) => (
          <a
            key={filter.href}
            href={localePath(filter.href, lang)}
            onClick={onNavigate}
            className="group inline-flex items-center justify-center border border-white/30 text-white text-sm px-4 py-2 hover:bg-sna-accent hover:text-sna-dark hover:border-sna-accent transition-all duration-200"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">
              {lang === "en" ? filter.labelEn || filter.label : filter.label}
            </span>
            <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 transition-all duration-200 ml-0 group-hover:ml-2">
              &rarr;
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MegaMenuProyectos;
