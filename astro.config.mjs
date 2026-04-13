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
  redirects: {
    '/nosotros': '/sobre-nosotros',
    '/privacidad': '/politica-de-privacidad',
    '/portfolio/sunflower': '/proyectos',
    '/the-field': '/proyectos',
    '/video-post': '/',
    '/tag/wordpress': '/',
    '/portfolio/servicios': '/proyectos',
    '/portfolio/dark-water': '/proyectos',
    '/velit-feugiat-porttito': '/proyectos',
    '/ink-in-water': '/proyectos',
    '/acustica-medio-ambiente': '/proyectos/acustica-medioambiental',
    '/colabora-con-nosotros': '/contacto',
    '/project-attributes/illustration': '/proyectos',
    '/ownage-in-the-mountains': '/proyectos',
    '/magna-fringilla-quis-condimentum': '/proyectos',
    '/mauris-pharetra-interdum-lorem-2': '/proyectos',
    '/porttitor-porttitor-mollis-vitae-placerat': '/proyectos',
  },
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
