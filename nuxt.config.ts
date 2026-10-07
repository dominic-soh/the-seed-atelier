import { fileURLToPath } from 'node:url'
import { collectContentRoutes } from './server/utils/contentRoutes'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-studio'
  ],

  components: [
    {
      path: '~/components/content',
      pathPrefix: false,
      global: true
    },
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:SOFT,WONK,opsz,wght@0,0,9..144,100..900&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&display=swap'
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    gmailUser: '',
    gmailAppPassword: '',
    public: {
      siteUrl: ''
    }
  },

  // Public HTML is prerendered by the hook below. Never add a catch-all prerender
  // rule: it makes the browser reuse build-time payloads, which hides Studio drafts.
  routeRules: {
    '/_studio': { headers: { 'X-Robots-Tag': 'noindex' } },
    '/__nuxt_studio/**': { headers: { 'X-Robots-Tag': 'noindex' } },
    '/api/**': { headers: { 'X-Robots-Tag': 'noindex' } }
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    prerender: {
      failOnError: true
    }
  },

  hooks: {
    'prerender:routes'(ctx) {
      const contentDir = fileURLToPath(new URL('./content', import.meta.url))
      for (const route of collectContentRoutes(contentDir)) {
        ctx.routes.add(route)
      }
      ctx.routes.add('/robots.txt')
      ctx.routes.add('/sitemap.xml')
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  studio: {
    route: '/_studio',
    repository: {
      provider: 'github',
      owner: 'dominic-soh',
      repo: 'the-seed-atelier',
      branch: 'main'
    }
  }
})
