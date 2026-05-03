// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://snaconsultoriaacustica.com',
  output: 'static',
  trailingSlash: 'never',
  adapter: vercel(),
  // 301 redirects from legacy WordPress URLs are configured in vercel.json
  integrations: [
    react(),
    sitemap({
      // Exclude "thank you" pages that are noindex; everything else (ES + EN) is indexable
      filter: (page) =>
        !/\/(formulario-enviado|basslock-solicitud-enviada|form-sent|basslock-application-sent)\/?$/.test(
          page,
        ),
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-ES', en: 'en-GB' },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  image: {
    domains: [],
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
  },
});
