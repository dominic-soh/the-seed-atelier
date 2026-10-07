import { defineCollection, defineContentConfig, property } from '@nuxt/content'
import { z } from 'zod'

function blankText() {
  return z.string().default('')
}

function photograph() {
  return property(blankText()).editor({ input: 'media', label: 'Photograph' })
}

function navigation() {
  return z.union([
    z.boolean(),
    z.object({
      title: property(z.string()).editor({ label: 'Navigation title' }).optional(),
      description: property(z.string()).editor({ hidden: true }).optional(),
      icon: property(z.string()).editor({ hidden: true }).optional()
    })
  ]).optional()
}

function hiddenNavigation() {
  return property(navigation()).editor({ hidden: true })
}

function hiddenSeo() {
  return property(z.object({
    title: z.string().optional(),
    description: z.string().optional()
  })).editor({ hidden: true }).optional()
}

export default defineContentConfig({
  collections: {
    settings: defineCollection({
      type: 'data',
      source: 'site.yml',
      schema: z.object({
        name: z.string(),
        tagline: z.string(),
        enquiryEmail: z.email(),
        confirmationSubject: z.string(),
        confirmationBody: property(z.string()).editor({ input: 'textarea', label: 'Confirmation email' }),
        socials: z.array(z.object({
          label: z.string(),
          href: z.string()
        }))
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: [
        {
          include: '**/*.md',
          exclude: ['services/*.md', 'work/*.md']
        },
        { include: 'services/index.md' },
        { include: 'work/index.md' }
      ],
      schema: z.object({
        navigation: navigation(),
        navOrder: property(z.number()).editor({ label: 'Navigation order' }).optional(),
        seo: hiddenSeo()
      })
    }),
    services: defineCollection({
      type: 'page',
      source: {
        include: 'services/*.md',
        exclude: ['services/index.md']
      },
      schema: z.object({
        summary: z.string(),
        slug: z.string(),
        image: photograph(),
        imageAlt: blankText(),
        priceLabel: blankText(),
        asksForGuests: z.boolean().default(false),
        order: z.number().default(0),
        navigation: hiddenNavigation(),
        seo: hiddenSeo()
      })
    }),
    work: defineCollection({
      type: 'page',
      source: {
        include: 'work/*.md',
        exclude: ['work/index.md']
      },
      schema: z.object({
        client: z.string(),
        slug: z.string(),
        category: z.string(),
        role: z.string(),
        aesthetic: blankText(),
        image: photograph(),
        imageAlt: blankText(),
        order: z.number().default(0),
        navigation: hiddenNavigation(),
        seo: hiddenSeo()
      })
    })
  }
})
