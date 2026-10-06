import { defineCollection, defineContentConfig, property } from '@nuxt/content'
import { z } from 'zod'

function photograph() {
  return property(z.string()).editor({ input: 'media', label: 'Photograph' }).optional()
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
        })),
        nav: z.array(z.object({
          label: z.string(),
          to: z.string()
        }))
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: [
        { include: '*.md' },
        { include: 'services/index.md' },
        { include: 'work/index.md' }
      ],
      schema: z.object({
        description: z.string(),
        kicker: z.string().optional(),
        image: photograph(),
        imageAlt: z.string().optional(),
        gallery: z.array(z.object({
          src: z.string(),
          alt: z.string()
        })).optional()
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
        imageAlt: z.string().optional(),
        priceLabel: z.string().optional(),
        asksForGuests: z.boolean().default(false),
        order: z.number().default(0)
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
        focusAreas: z.array(z.string()),
        aesthetic: z.string().optional(),
        image: photograph(),
        imageAlt: z.string().optional(),
        order: z.number().default(0)
      })
    })
  }
})
