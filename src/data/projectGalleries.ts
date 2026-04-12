export interface GalleryImage {
  src: string;
  alt: string;
  /** "1x1" = normal cell, "2x1" = spans 2 columns (wide), "1x2" = spans 2 rows (tall) */
  layout: "1x1" | "2x1" | "1x2";
  /** If true, this specific image uses object-contain instead of object-cover */
  contain?: boolean;
}

export const projectGalleries: Record<string, GalleryImage[]> = {
  "central-termica-castejon": [
    { src: "/images/proyectos/gallery/castejon-panoramica.jpg", alt: "Vista panorámica del cerramiento acústico de la central térmica", layout: "2x1" },
    { src: "/images/proyectos/gallery/castejon-paneles-frontal.jpg", alt: "Paneles acústicos vista frontal", layout: "1x1" },
    { src: "/images/proyectos/gallery/castejon-paneles-lateral.jpg", alt: "Cerramiento acústico vista lateral", layout: "1x2" },
    { src: "/images/proyectos/gallery/castejon-silenciador.jpg", alt: "Silenciador y conductos en cubierta", layout: "1x1" },
  ],
  "monitorizacion-acustica-central-industrial": [
    { src: "/images/proyectos/gallery/monitorizacion-sensor-cerca.jpg", alt: "Sensor de monitorización acústica en planta industrial", layout: "1x1" },
    { src: "/images/proyectos/gallery/monitorizacion-vista-general.jpg", alt: "Vista general del sistema de monitorización", layout: "1x2" },
    { src: "/images/proyectos/gallery/monitorizacion-sensor-lejos.jpg", alt: "Punto de medición con sonómetro en la central", layout: "1x1" },
  ],
  "cabinas-acusticas-fabrica-vidrio": [
    { src: "/images/proyectos/gallery/cabinas-exterior.jpg", alt: "Cabina acústica Verallia vista exterior", layout: "2x1" },
    { src: "/images/proyectos/gallery/cabinas-interior.jpg", alt: "Interior de la cabina acústica", layout: "1x1" },
    { src: "/images/proyectos/gallery/cabinas-exterior-2.jpg", alt: "Cabina acústica en línea de producción", layout: "1x1" },
  ],
  "cubierta-edificio-exclusivo-madrid": [
    { src: "/images/proyectos/gallery/cubierta-terraza.jpg", alt: "Terraza del edificio con pantalla acústica al fondo", layout: "2x1" },
    { src: "/images/proyectos/gallery/cubierta-conductos.jpg", alt: "Conductos de ventilación y pantalla acústica", layout: "1x1" },
    { src: "/images/proyectos/gallery/cubierta-detalle-conductos.jpg", alt: "Detalle interior de conductos y pantalla", layout: "1x2" },
    { src: "/images/proyectos/gallery/cubierta-pantalla-acustica.jpg", alt: "Pantalla acústica y conductos en cubierta", layout: "1x1" },
    { src: "/images/proyectos/gallery/cubierta-vista-general.jpg", alt: "Vista general de la cubierta técnica", layout: "1x1" },
    { src: "/images/proyectos/gallery/cubierta-equipos-clima.jpg", alt: "Equipos de climatización en cubierta", layout: "1x1" },
  ],
  "conservatorio-musica-edificio-historico": [
    { src: "/images/proyectos/gallery/conservatorio-sala-render.jpg", alt: "Render 3D de la sala de conciertos del conservatorio", layout: "2x1" },
    { src: "/images/proyectos/gallery/conservatorio-modelo-3d.jpg", alt: "Modelo acústico 3D del edificio del conservatorio", layout: "1x2" },
    { src: "/images/proyectos/gallery/conservatorio-odeon-rayos.jpg", alt: "Simulación de rayos acústicos en sala del conservatorio", layout: "1x1" },
    { src: "/images/proyectos/gallery/conservatorio-odeon-industrial.jpg", alt: "Simulación acústica de propagación sonora", layout: "1x1" },
  ],
  "silenciador-fem-soplantes-depuradora": [
    { src: "/images/proyectos/gallery/fem-simulacion-presion.jpg", alt: "Simulación FEM de presión sonora en silenciador (COMSOL)", layout: "2x1" },
    { src: "/images/proyectos/gallery/fem-modos-vibracion.jpg", alt: "Modos de vibración del silenciador mediante FEM", layout: "1x1" },
    { src: "/images/proyectos/gallery/fem-deformacion.jpg", alt: "Análisis de deformación estructural del silenciador", layout: "1x1" },
    { src: "/images/proyectos/gallery/fem-perdidas-transmision.jpg", alt: "Gráfica de pérdidas de transmisión (TL) del silenciador", layout: "2x1" },
  ],
  "ruido-estructural-data-center-comsol": [
    { src: "/images/proyectos/gallery/simulador-modos-vibracion.jpg", alt: "Modos de vibración del cerramiento mediante simulación FEM", layout: "1x1" },
    { src: "/images/proyectos/gallery/simulador-deformacion.jpg", alt: "Análisis de deformación estructural del cerramiento", layout: "1x1" },
  ],
  "sala-calderas-colindante-dormitorio": [
    { src: "/images/proyectos/gallery/calderas-conductos-aislados.jpg", alt: "Conductos aislados acústicamente en sala de calderas", layout: "2x1" },
    { src: "/images/proyectos/gallery/calderas-tuberias.jpg", alt: "Sistema de tuberías con soportes antivibratorios", layout: "1x1" },
    { src: "/images/proyectos/gallery/calderas-soporte-tuberia.jpg", alt: "Soporte elástico de tubería en techo", layout: "1x2" },
    { src: "/images/proyectos/gallery/calderas-bancada.jpg", alt: "Bancada antivibrante para equipos de calderas", layout: "1x1" },
    { src: "/images/proyectos/gallery/calderas-antivibratorios.jpg", alt: "Antivibratorios instalados en base de equipo", layout: "1x1" },
    { src: "/images/proyectos/gallery/calderas-detalle-silentblock.jpg", alt: "Detalle de silentblock en apoyo de maquinaria", layout: "1x1" },
  ],
  "local-emblematico-asturias": [
    { src: "/images/proyectos/gallery/local-asturiano-interior.jpg", alt: "Interior del local emblemático con tratamiento acústico integrado", layout: "2x1" },
    { src: "/images/proyectos/gallery/local-asturiano-barra.jpg", alt: "Barra del local con paneles absorbentes ocultos en techo", layout: "2x1" },
  ],
  "edificios-residenciales-vibraciones-ferrocarril": [
    { src: "/images/proyectos/gallery/ferrocarril-cimentacion-3.jpg", alt: "Vista panorámica de la cimentación con amortiguación antivibrante", layout: "2x1" },
    { src: "/images/proyectos/gallery/ferrocarril-cimentacion-1.jpg", alt: "Excavación y armado de zapata con sistema antivibratorio", layout: "1x1" },
    { src: "/images/proyectos/gallery/ferrocarril-cimentacion-2.jpg", alt: "Detalle de la excavación y encofrado del sistema de aislamiento", layout: "1x2" },
  ],
  "platos-television-parlamento-europeo": [
    { src: "/images/proyectos/gallery/parlamento-panel-1.jpg", alt: "Panel absorbente acústico a medida en fase de fabricación", layout: "1x1" },
    { src: "/images/proyectos/gallery/parlamento-ficha-tecnica.jpg", alt: "Ficha técnica del panel absorbente GWS-BF 25 con curva de absorción", layout: "1x2" },
    { src: "/images/proyectos/gallery/parlamento-panel-2.jpg", alt: "Panel acústico ondulado azul montado en estructura del plató", layout: "1x1" },
  ],
  "fabricas-incumplimientos-acusticos": [
    { src: "/images/proyectos/gallery/fabricas-camara-acustica-1.jpg", alt: "Simulación acústica 3D con cámara holográfica - vista frontal de fábrica", layout: "2x1" },
    { src: "/images/proyectos/gallery/fabricas-camara-acustica-2.jpg", alt: "Simulación acústica 3D con cámara holográfica - vista lateral", layout: "2x1" },
    { src: "/images/proyectos/gallery/fabricas-camara-acustica-3.jpg", alt: "Simulación acústica 3D con cámara holográfica - propagación sonora", layout: "2x1" },
  ],
  "chimeneas-hosteleria-centro-comercial": [
    { src: "/images/proyectos/gallery/chimeneas-instalacion.jpg", alt: "Instalación de silenciadores en chimeneas de hostelería", layout: "2x1" },
    { src: "/images/proyectos/gallery/chimeneas-conductos.jpg", alt: "Conductos aislados en galería subterránea del centro comercial", layout: "1x1" },
    { src: "/images/proyectos/gallery/chimeneas-interior.jpg", alt: "Interior del patinillo con conductos de extracción", layout: "1x2" },
  ],
  "elevador-coches-entorno-residencial": [
    { src: "/images/proyectos/gallery/elevador-coches.jpg", alt: "Elevador hidráulico de vehículos en garaje residencial", layout: "2x1" },
  ],
  "campo-eolico-mantenimiento-predictivo": [
    { src: "/images/proyectos/gallery/eolico-analisis-1.jpg", alt: "Análisis espectral y beamforming de aerogenerador con mapa de calor acústico", layout: "2x1" },
    { src: "/images/proyectos/gallery/eolico-analisis-2.jpg", alt: "Beamforming acústico del buje del aerogenerador con espectro de frecuencia", layout: "2x1" },
    { src: "/images/proyectos/gallery/eolico-medicion.jpg", alt: "Técnico realizando medición acústica en campo eólico con array de micrófonos", layout: "1x2" },
  ],
  "mapa-acustico-3d-planta-industrial": [
    { src: "/images/proyectos/gallery/mapa3d-vista-1.jpg", alt: "Mapa acústico 3D de planta industrial con nube de puntos y mapa de calor", layout: "2x1" },
    { src: "/images/proyectos/gallery/mapa3d-vista-2.jpg", alt: "Vista alternativa del mapa acústico 3D con identificación de fuentes", layout: "2x1" },
  ],
  "medicion-ruido-larga-distancia": [
    { src: "/images/proyectos/gallery/larga-distancia-medicion.jpg", alt: "Técnico realizando medición acústica a larga distancia con array de micrófonos", layout: "2x1" },
    { src: "/images/proyectos/gallery/larga-distancia-beamforming.jpg", alt: "Análisis beamforming con identificación de fuente sonora a larga distancia", layout: "2x1" },
  ],
  "data-center-centro-madrid": [
    { src: "/images/proyectos/gallery/datacenter-silenciador.jpg", alt: "Silenciador acústico instalado en cubierta del data center", layout: "2x1" },
    { src: "/images/proyectos/gallery/datacenter-cubierta.jpg", alt: "Vista de la cubierta acústica del data center en el centro de Madrid", layout: "1x1" },
    { src: "/images/proyectos/gallery/datacenter-estructura.jpg", alt: "Estructura y cerramiento acústico en cubierta del data center", layout: "1x1" },
  ],
  "analisis-3d-ruido-carretera-zona-residencial": [
    { src: "/images/proyectos/gallery/carretera-analisis-1.jpg", alt: "Análisis 3D de ruido de carretera con nube de puntos y mapa de calor acústico", layout: "2x1" },
    { src: "/images/proyectos/gallery/carretera-analisis-2.jpg", alt: "Visualización 3D de propagación sonora desde carretera hacia zona residencial", layout: "2x1" },
  ],
};
