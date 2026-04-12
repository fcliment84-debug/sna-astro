/**
 * JSON-LD Schema generators for SNA Consultoría Acústica
 * Used in BaseLayout's jsonLd prop on each page.
 */

const SITE = "https://snaconsultoriaacustica.com";
const ORG_NAME = "SNA Consultoría Acústica";
const LOGO = `${SITE}/images/logo_SNA_negativo.webp`;

/* ─── Organization (global, included on Home) ─── */
export const organizationSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: ORG_NAME,
  alternateName: "SNA",
  url: SITE,
  logo: LOGO,
  description:
    "Consultora de ingeniería acústica especializada en diagnóstico avanzado, diseño de soluciones a medida y fabricación propia. Más de 25 años de experiencia en acústica industrial, arquitectónica y medioambiental.",
  areaServed: { "@type": "Country", name: "España" },
  knowsAbout: [
    "Acústica industrial",
    "Acústica arquitectónica",
    "Acústica medioambiental",
    "Aislamiento acústico",
    "Control de vibraciones",
    "Diagnóstico acústico",
    "Modelización acústica FEM/BEM",
    "Pantallas acústicas",
    "Normativa acústica española",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "PYME Innovadora",
      recognizedBy: {
        "@type": "Organization",
        name: "Ministerio de Ciencia e Innovación",
      },
    },
  ],
  brand: {
    "@type": "Brand",
    name: "Basslock",
    description:
      "Sistema de aislamiento acústico patentado para bajas frecuencias con paso de aire",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Consulta técnica",
    telephone: "+34 91 838 78 66",
    email: "info@snaconsultoriaacustica.com",
    url: `${SITE}/contacto`,
    availableLanguage: ["es", "en"],
  },
};

/* ─── BreadcrumbList ─── */
export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function breadcrumbSchema(
  items: BreadcrumbItem[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: `${SITE}${item.url}` } : {}),
    })),
  };
}

/* ─── Service ─── */
export interface ServiceSchemaOpts {
  name: string;
  description: string;
  url: string;
  capabilities?: string[];
}

export function serviceSchema(opts: ServiceSchemaOpts): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${SITE}${opts.url}`,
    provider: {
      "@type": "Organization",
      name: ORG_NAME,
      url: SITE,
    },
    areaServed: { "@type": "Country", name: "España" },
    serviceType: "Consultoría de ingeniería acústica",
  };

  if (opts.capabilities && opts.capabilities.length > 0) {
    schema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: `Capacidades técnicas — ${opts.name}`,
      itemListElement: opts.capabilities.map((cap) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: cap },
      })),
    };
  }

  return schema;
}

/* ─── Product (Basslock) ─── */
export const basslockProductSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Basslock",
  description:
    "Sistema de aislamiento acústico patentado por SNA para bajas frecuencias con paso de aire. Clasificación B3 UNE-EN 1793-2.",
  brand: { "@type": "Brand", name: "Basslock" },
  manufacturer: {
    "@type": "Organization",
    name: ORG_NAME,
    url: SITE,
  },
  url: `${SITE}/basslock`,
  category: "Aislamiento acústico industrial",
  award: "Patente registrada",
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Clasificación acústica",
      value: "B3 UNE-EN 1793-2",
    },
    {
      "@type": "PropertyValue",
      name: "Verificación",
      value: "Ensayos en cámara acústica",
    },
  ],
};

/* ─── ProfessionalService (Contacto) ─── */
export const professionalServiceSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: ORG_NAME,
  url: SITE,
  logo: LOGO,
  telephone: "+34 91 838 78 66",
  email: "info@snaconsultoriaacustica.com",
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Madrid",
      addressCountry: "ES",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Asturias",
      addressCountry: "ES",
    },
  ],
  areaServed: { "@type": "Country", name: "España" },
  priceRange: "Consultar",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
};
