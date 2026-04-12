# CLAUDE.md — SNA Consultoría Acústica: Migración a Astro

## Qué es este proyecto

Recodificación de la web de **SNA Consultoría Acústica** (https://snaconsultoriaacustica.com/) desde una React SPA (construida en Lovable) a **Astro 5.x con SSG**. El objetivo es mantener diseño, comportamiento y funcionalidad idénticos al 100%, ganando rendimiento y SEO técnico.

SNA es una consultoría de ingeniería acústica española con +25 años. Tono: técnico, sobrio, riguroso. No es una startup ni una agencia creativa.

## Regla de oro

**El diseño visual, los contenidos y el comportamiento de la web NO cambian.** Solo cambia el framework. Cualquier decisión técnica debe preservar la experiencia actual del usuario.

---

## Jerarquía de fuentes de verdad

⚠️ **CRÍTICO: El código del repo de Lovable es la fuente de verdad ABSOLUTA — tanto para diseño como para contenidos.**

Los documentos de `proyecto-web/` (diseño, contenidos, arquitectura) fueron el input inicial para construir la web en Lovable, pero después se hicieron muchas ediciones directas en Lovable — tanto de diseño como de textos — que no están reflejadas en esos docs. El resultado final (diseño, contenidos, comportamiento, estructura) es lo que está en el repositorio de GitHub y publicado en producción. **Eso es lo que hay que replicar.**

### Prioridad de fuentes (de mayor a menor):

| Prioridad | Fuente | Qué aporta | Cómo usarla |
|-----------|--------|-----------|-------------|
| **1. MÁXIMA** | **Repo Lovable** (`lovable-ref/`) | **TODO:** diseño, contenidos (ES y EN), componentes, layouts, estilos, comportamiento, imágenes, datos | **Replicar exactamente** lo que hay en el repo: estructura HTML, clases Tailwind, textos, lógica de interacción, responsive. Si algo está en el repo, se replica tal cual. |
| **2. ALTA** | **`03-seo/`** | Keywords, schema JSON-LD, specs técnicas SEO/GEO, meta titles, meta descriptions | Implementar íntegramente. Es la **mejora SEO** que justifica la migración. Esto NO está en el repo y se añade como capa nueva. |
| **3. SOLO META TAGS** | **`02-contenidos-por-pagina/`** | Meta titles y meta descriptions optimizados para SEO | Usar **exclusivamente para meta tags** (`<title>`, `<meta description>`). Los textos visibles de las páginas se sacan del repo, NO de estos docs. |
| **4. CONTEXTO** | **`05-lovable/`**, **`04-diseno-ux/`**, **`01-arquitectura/`** | Intención original de diseño, estrategia, user personas | Solo como contexto de fondo para entender decisiones. **NO replicar estos docs — replicar el repo.** |

### Flujo de trabajo por componente:

```
1. Abrir el componente equivalente en lovable-ref/src/
2. Leer su estructura, props, clases Tailwind, lógica
3. Convertirlo a componente .astro (estático) o .tsx (si es island)
4. Aplicar mejoras SEO (semántica HTML, alt texts, schema)
5. Verificar que el resultado visual es idéntico al original
```

---

## Documentación complementaria (en `proyecto-web/`)

### ★ Migración (leer primero junto con el repo)
- `06-migracion-astro/03-mapa-repo-lovable.md` → **MAPA COMPLETO DEL REPO.** Qué archivo leer para cada página, componentes, datos, assets, diferencias repo vs docs.
- `06-migracion-astro/01-spec-astro.md` → Especificación técnica de Astro: estructura de archivos, config, islands, fases de implementación.
- `06-migracion-astro/02-guia-flujo-trabajo.md` → Instrucciones paso a paso + checklist pre-lanzamiento.

### SEO (implementar como capa NUEVA sobre el repo)
- `03-seo/keyword-mapping-por-seccion.md` → 171 keywords mapeadas por página. Meta titles y descriptions optimizados por página.
- `03-seo/especificaciones-tecnicas-seo-geo.md` → Schema JSON-LD, HTML semántico, Core Web Vitals, GEO.
- `02-contenidos-por-pagina/*.md` → **Solo usar para extraer meta titles y meta descriptions.** Los textos visibles se sacan del repo.

### Contexto estratégico (solo cuando haya ambigüedad)
- `01-arquitectura/ARQUITECTURA-CONTENIDOS-MASTER.md` → User personas, decisiones estratégicas, tono.
- `05-lovable/sistema-diseno-global.md` → Intención de diseño original (superada por el repo).
- `00-fundamentos/tono-comunicacion.md` → Principios de voz de la marca.

---

## Decisiones técnicas fijadas

### Stack
- **Astro 5.x** con `output: 'static'` (SSG puro)
- **Tailwind CSS 4.x** via `@astrojs/tailwind`
- **React 18** via `@astrojs/react` — SOLO para islands interactivos
- **@astrojs/sitemap** para sitemap automático
- **TypeScript** strict

### URL del sitio
```
site: 'https://snaconsultoriaacustica.com'
```
> ✅ Dominio definitivo confirmado: `snaconsultoriaacustica.com`. Usar en canonical, schema, OG y todas las referencias.

### Rutas (EXACTAS — no cambiar)
```
/                                    → Home
/metodologia                         → Metodología (landing)
/metodologia/diagnostico             → Diagnóstico
/metodologia/diseno                  → Diseño
/metodologia/ejecucion               → Ejecución
/proyectos                           → Proyectos (landing con filtro)
/proyectos/acustica-industrial       → Acústica Industrial
/proyectos/acustica-arquitectonica   → Acústica Arquitectónica
/proyectos/acustica-medioambiental   → Acústica Medioambiental
/sobre-nosotros                      → Sobre SNA
/equipo                              → Equipo
/basslock                            → Basslock (producto patentado)
/contacto                            → Contacto
/aviso-legal                         → Aviso legal
/politica-de-privacidad              → Política de privacidad
```

### Idiomas
- Español es el idioma por defecto (sin prefijo `/es/`)
- Inglés (`/en/`) SÍ se migra — replicar estructura completa bajo `/en/`
- `prefixDefaultLocale: false`
- Los contenidos en inglés se toman del código fuente de Lovable (repo GitHub)
- Implementar `hreflang` entre versiones ES ↔ EN

### React Islands (componentes que NECESITAN JavaScript del cliente)

Basado en el análisis del repo, estos componentes requieren interactividad:

1. **MegaMenuHeader** — Mega menú con paneles desplegables + transición scroll + mobile menu. `client:load` (necesita cargar inmediato). Es el componente más complejo. Fuente: `lovable-ref/src/components/megamenu/`
2. **ContactForm** — Formulario con validación (react-hook-form + zod). `client:visible`. Fuente: dentro de `lovable-ref/src/pages/Contacto.tsx`
3. **ProjectFilter (FilterBar)** — Filtros del grid de proyectos. `client:idle`. Fuente: `lovable-ref/src/components/proyectos/FilterBar.tsx`
4. **ProjectGallery** — Galería de imágenes con lightbox/carousel. `client:visible`. Fuente: `lovable-ref/src/components/proyectos/ProjectGallery.tsx`
5. **WhatsAppButton** — Botón flotante. `client:idle`. Fuente: `lovable-ref/src/components/WhatsAppButton.tsx`
6. **LogosSection** — Carousel de logos con animación CSS (puede ser solo CSS, verificar). Fuente: `lovable-ref/src/components/home/LogosSection.tsx`

**Todo lo demás se convierte a .astro (HTML estático, 0 JS).** Muchos componentes usan Framer Motion en el repo pero la mayoría son fade-in al scroll — estos se replican con CSS `@keyframes` + `IntersectionObserver` ligero, o con la directiva `transition:animate` de Astro.

---

## Tokens de diseño REALES (extraídos de `lovable-ref/src/index.css`)

### Colores SNA (HSL — copiar tal cual al proyecto Astro)
```css
--sna-teal: 190 27% 42%;          /* ≈ #4F7E87 — Botón primario, acentos */
--sna-teal-light: 192 16% 62%;    /* ≈ #8FA8AE — Fondos secundarios */
--sna-text: 0 0% 29%;             /* ≈ #4A4A4A — Texto principal */
--sna-gray-bg: 210 9% 96%;        /* ≈ #F4F5F6 — Fondos alternos */
--sna-gray-ui: 207 5% 74%;        /* ≈ #B7BCC0 — Separadores */
--sna-gray-line: 206 9% 86%;      /* ≈ #D9DDE0 — Bordes tarjetas */
--sna-gray-hover: 210 20% 98%;    /* ≈ #F9FAFB — Hover tarjetas */
--sna-dark: 0 0% 29%;             /* ≈ #4A4A4A — Footer background */
--sna-accent: 78 83% 60%;         /* ★ VERDE LIMA — hover de CTAs, acentos activos */
--sna-green: 135 15% 49%;         /* Verde secundario */
```

### Colores Basslock (página /basslock usa su propia paleta)
```css
--bl-blue: 215 43% 30%;
--bl-lime: 73 83% 60%;
--bl-neutral: 240 100% 99%;
--bl-cyan: 178 100% 67%;
--bl-blue-light: 215 35% 40%;
```

### Tipografía REAL
```css
font-family: 'Inter', sans-serif;           /* Principal */
font-family: 'JetBrains Mono', monospace;   /* Secundaria — usada en elementos técnicos */
--radius: 0px;                               /* rounded-none global */

/* Paragraphs */
p { text-align: justify; line-height: 1.7; }
/* Heroes mantienen text-align: left */
```

### Componentes clave del repo

**Header:** El repo usa DOS headers diferentes:
- `MegaMenuHeader.tsx` → Header principal con mega menú desplegable (usado en Home y la mayoría de páginas)
- `SiteHeader.tsx` → Header simple con transición scroll

**Footer:** `SiteFooter.tsx` — 4 columnas con datos de contacto reales (ver `03-mapa-repo-lovable.md`)

**CTA hover:** Los botones primarios cambian a `sna-accent` (verde lima) al hover, con flecha animada `→`:
```tsx
className="hover:bg-sna-accent hover:text-sna-dark"
// + flecha que aparece con transición
```

**WhatsApp:** Botón flotante `WhatsAppButton.tsx` — incluir en el layout

**Basslock brand:** `BasslockBrand.tsx` — renderizado especial del nombre en la navegación

**Framer Motion:** El repo usa `framer-motion` para animaciones. En Astro, replicar con CSS transitions o mantener como React island donde sea necesario.

---

## SEO — Checklist por página

Para CADA página .astro:

1. ✅ `<title>` único (de `02-contenidos-por-pagina/`)
2. ✅ `<meta name="description">` único
3. ✅ `<link rel="canonical">` con URL completa
4. ✅ Open Graph: title, description, image, url, type
5. ✅ Twitter Card: summary_large_image
6. ✅ Un solo `<h1>` por página
7. ✅ Jerarquía H2→H3 sin saltos
8. ✅ HTML semántico: `<header>`, `<main>`, `<article>`, `<section>`, `<footer>`
9. ✅ `aria-label` en `<nav>` y `<section>`
10. ✅ Schema JSON-LD en `<head>`: Organization + BreadcrumbList + tipo específico
11. ✅ Alt text descriptivo en español en TODAS las imágenes
12. ✅ `lang="es"` en `<html>`

---

## Animaciones permitidas (SOLO estas)

- Fade-in al scroll: opacity 0→1 + translateY 20px→0, 200ms
- Hover zoom imágenes: scale 1→1.05, 300ms
- Hover tarjetas: border-color change, 200ms
- Flecha que se desplaza: translateX 4px al hover
- Header transparente→sólido: 200ms ease

**PROHIBIDO:** parallax, bounce, slide completo, scroll-hijacking, efectos decorativos, transiciones > 300ms.

---

## Repo de Lovable — FUENTE DE VERDAD VISUAL (SOLO LECTURA)

```
https://github.com/fcliment84-debug/sna-consultoria-acustica
```

**⚠️ NO modificar este repo. NO hacer commits, push ni PRs.**

Este repo contiene la web tal como está en producción. Es la **referencia visual definitiva** para la migración. Usarlo para:

1. **Replicar el diseño exacto** — leer cada componente React, sus clases Tailwind, su estructura HTML, su lógica de interacción, y traducirlo a Astro
2. **Extraer imágenes** — copiarlas al proyecto Astro en `src/assets/`
3. **Extraer textos en inglés** — los contenidos de las rutas `/en/` para la versión bilingüe
4. **Verificar comportamiento** — animaciones, hover states, responsive, transiciones

### Setup inicial:
```bash
git clone https://github.com/fcliment84-debug/sna-consultoria-acustica.git lovable-ref
```

### Estructura del repo (verificada):
```
lovable-ref/src/
├── pages/              → 16 páginas React (1 archivo = 1 ruta)
├── components/
│   ├── home/           → 8 módulos de la Home
│   ├── megamenu/       → 5 componentes del mega menú
│   ├── interior/       → 3 componentes compartidos de interiores
│   ├── sector/         → 3 componentes de páginas de sector
│   ├── proyectos/      → 5 componentes del sistema de proyectos
│   ├── ui/             → 56 componentes shadcn/ui
│   └── (globales)      → SiteHeader, SiteFooter, WhatsAppButton, BasslockBrand, etc.
├── data/               → projects.ts (20 proyectos), projectGalleries.ts, megamenu.ts
├── i18n/               → LanguageContext.tsx + routes.ts (sistema ES/EN custom)
├── hooks/              → useParallax, use-mobile, use-toast
├── assets/             → 154 imágenes (100MB): logos, proyectos, galerías, basslock
└── index.css           → ★ Variables CSS reales (colores HSL, tipografía, reset)
```
```
lovable-ref/public/
├── videos/hero.mp4     → Video del hero de la Home
├── images/             → trayectoria_sna.png
└── favicon.ico + apple-touch-icon.png
```

**Mapa completo archivo por archivo:** ver `proyecto-web/06-migracion-astro/03-mapa-repo-lovable.md`

**Al implementar cada página en Astro:** abrir la página equivalente en `lovable-ref/src/pages/`, leer el componente completo y sus dependencias, y traducirlo a `.astro` preservando toda la estructura visual.

Trabajar exclusivamente en la carpeta del proyecto Astro (`sna-astro/`). Nunca modificar `lovable-ref/`.

---

## Cómo trabajar

1. **Leer el componente original en `lovable-ref/` ANTES de escribir cada componente Astro.** El repo es la referencia para TODO: diseño, textos, estructura, comportamiento. Replica exactamente lo que hay en el código: estructura HTML, clases Tailwind, textos, layouts, responsive y animaciones.
2. **Los textos visibles se copian del repo, no de los docs.** Los contenidos fueron editados directamente en Lovable y pueden diferir de `02-contenidos-por-pagina/`.
3. **Aplicar las mejoras SEO como capa nueva.** Meta titles y descriptions (de `02-contenidos-por-pagina/` y `03-seo/`), schema JSON-LD (de `03-seo/`), HTML semántico (`<main>`, `<article>`, `<section>`), alt texts, canonical, hreflang. Esto es lo ÚNICO que se toma de los docs, no del repo.
4. **No añadir dependencias innecesarias.** El proyecto debe ser ligero. Si algo se puede hacer con CSS o HTML nativo, no usar JS.
5. **Convertir componentes React a .astro siempre que sea posible.** Solo mantener como React island los componentes interactivos listados arriba.
6. **Preservar los legacy redirects.** El repo tiene ~20 redirects de URLs antiguas (ver `App.tsx`). Implementar como redirects en `astro.config.mjs` o como páginas que hacen redirect 301.
7. **Seguir el orden de implementación** definido en `06-migracion-astro/01-spec-astro.md` sección 8.
