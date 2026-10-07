import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { collectContentRoutes } from '../server/utils/contentRoutes'
import { fallbackSiteUrl, robotsTxt, siteOrigin, sitemapXml } from '../shared/utils/crawl'

describe('crawl', () => {
  it('uses the configured origin and falls back to the public site', () => {
    expect(siteOrigin('https://theseedatelier.sg/')).toBe('https://theseedatelier.sg')
    expect(siteOrigin('')).toBe(fallbackSiteUrl)
    expect(siteOrigin(undefined)).toBe(fallbackSiteUrl)
  })

  it('allows the public site and keeps Studio and the enquiry API out', () => {
    const text = robotsTxt(fallbackSiteUrl)
    expect(text).toContain('User-agent: *')
    expect(text).toContain('Allow: /')
    expect(text).toContain('Disallow: /_studio')
    expect(text).toContain('Disallow: /__nuxt_studio')
    expect(text).toContain('Disallow: /__nuxt_content')
    expect(text).toContain('Disallow: /api/')
    expect(text).toContain(`Sitemap: ${fallbackSiteUrl}/sitemap.xml`)
  })

  it('lists every content page as an absolute URL', () => {
    const contentDir = fileURLToPath(new URL('../content', import.meta.url))
    const xml = sitemapXml(fallbackSiteUrl, collectContentRoutes(contentDir))
    expect(xml).toContain(`<loc>${fallbackSiteUrl}/</loc>`)
    expect(xml).toContain(`<loc>${fallbackSiteUrl}/about</loc>`)
    expect(xml).toContain(`<loc>${fallbackSiteUrl}/services/private-ikebana</loc>`)
    expect(xml).toContain(`<loc>${fallbackSiteUrl}/work/m-hotel-singapore</loc>`)
    expect(xml).not.toContain('site.yml')
  })
})
