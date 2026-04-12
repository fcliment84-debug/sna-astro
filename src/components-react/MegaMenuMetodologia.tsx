import { metodologiaData } from "../data/megamenu";
import { localePath } from "../data/navigation";

const texts = {
  es: { phases: "Fases" },
  en: { phases: "Phases" },
};

interface Props {
  lang: "es" | "en";
  onNavigate: () => void;
}

const MegaMenuMetodologia = ({ lang, onNavigate }: Props) => {
  const t = texts[lang];
  const { hero, cards, extraCard, pills } = metodologiaData;

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Col 1: Hero editorial */}
      <div className="col-span-4 relative overflow-hidden rounded-none">
        <img
          src={hero.image}
          alt={lang === "en" ? "SNA Methodology" : "Metodología SNA"}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 bg-gradient-to-t from-[hsl(0_0%_29%/0.9)] via-[hsl(0_0%_29%/0.5)] to-transparent p-6 flex flex-col justify-end min-h-[180px]">
          <p className="text-white/90 text-sm leading-relaxed mb-4">
            {lang === "en" ? hero.headlineEn || hero.headline : hero.headline}
          </p>
          <a
            href={localePath(hero.cta.href, lang)}
            onClick={onNavigate}
            className="group inline-flex items-center text-sna-accent text-sm font-medium hover:underline"
          >
            <span>{lang === "en" ? hero.cta.labelEn || hero.cta.label : hero.cta.label}</span>
            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>
      </div>

      {/* Col 2-3: Cards */}
      <div className="col-span-5 grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <a
            key={card.href}
            href={localePath(card.href, lang)}
            onClick={onNavigate}
            className="group block"
          >
            <div className="overflow-hidden mb-3">
              <img
                src={card.image}
                alt={lang === "en" ? card.titleEn || card.title : card.title}
                className="w-full h-20 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h4 className="text-sna-accent text-sm font-semibold mb-1 group-hover:underline">
              {lang === "en" ? card.titleEn || card.title : card.title}
            </h4>
            <p className="text-white/70 text-xs leading-relaxed">
              {lang === "en" ? card.descriptionEn || card.description : card.description}
            </p>
          </a>
        ))}
        <a
          href={localePath(extraCard.href, lang)}
          onClick={onNavigate}
          className="group block"
        >
          <div className="overflow-hidden mb-3">
            <img
              src={extraCard.image}
              alt={lang === "en" ? extraCard.titleEn || extraCard.title : extraCard.title}
              className="w-full h-20 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h4 className="text-sna-accent text-sm font-semibold mb-1 group-hover:underline">
            {lang === "en" ? extraCard.titleEn || extraCard.title : extraCard.title}
          </h4>
          <p className="text-white/70 text-xs leading-relaxed">
            {lang === "en" ? extraCard.descriptionEn || extraCard.description : extraCard.description}
          </p>
        </a>
      </div>

      {/* Col 4: Quick links */}
      <div className="col-span-3 flex flex-col gap-3 pt-2">
        <span className="text-white/50 text-xs uppercase tracking-widest mb-2">{t.phases}</span>
        {pills.map((pill) => (
          <a
            key={pill.href}
            href={localePath(pill.href, lang)}
            onClick={onNavigate}
            className="group inline-flex items-center justify-center border border-white/30 text-white text-sm px-4 py-2 hover:bg-sna-accent hover:text-sna-dark hover:border-sna-accent transition-all duration-200"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">
              {lang === "en" ? pill.labelEn || pill.label : pill.label}
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

export default MegaMenuMetodologia;
