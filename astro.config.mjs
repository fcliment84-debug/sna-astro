// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://snaconsultoriaacustica.com',
  output: 'static',
  adapter: vercel(),
  // 301 redirects from legacy WordPress URLs are configured in vercel.json
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/en/'),
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
