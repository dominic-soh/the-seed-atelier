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

  // Public HTML is prerendered by the hook below. A catch-all prerender rule also
  // makes the browser reuse those build-time payloads, which hides Studio drafts.
  routeRules: {
    '/_studio': { prerender: false, ssr: true, headers: { 'X-Robots-Tag': 'noindex' } },
    '/__nuxt_studio/**': { prerender: false, ssr: true, headers: { 'X-Robots-Tag': 'noindex' } },
    '/api/**': { prerender: false, headers: { 'X-Robots-Tag': 'noindex' } }
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: true
    }
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        module: 'ESNext'
      }
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
      owner: process.env.STUDIO_GITHUB_OWNER || 'dominic-soh',
      repo: process.env.STUDIO_GITHUB_REPO || 'the-seed-atelier',
      branch: process.env.STUDIO_GITHUB_BRANCH || 'main'
    }
  }
})
