import { RenderMode, ServerRoute } from '@angular/ssr';

const LANGS = ['en', 'ru', 'ro'];
const SERVICE_SLUGS = [
  'analytics-and-audit',
  '1c-automation',
  'website-development',
  'web-design',
  'mobile-development',
  'smm-promotion',
  'seo-optimization',
  'telegram-mini-app',
  'ai-solutions',
  'integrations-and-automation',
  'devops-and-infrastructure',
];

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return LANGS.map(lang => ({ lang }));
    },
  },
  {
    path: ':lang/services/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const params: Array<{ lang: string; slug: string }> = [];
      for (const lang of LANGS) {
        for (const slug of SERVICE_SLUGS) {
          params.push({ lang, slug });
        }
      }
      return params;
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
