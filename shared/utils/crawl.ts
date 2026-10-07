export const fallbackSiteUrl = 'https://the-seed-atelier.vercel.app'

const privatePaths = ['/_studio', '/__nuxt_studio', '/__nuxt_content', '/api/']

export function siteOrigin(configured: string | undefined) {
  const trimmed = (configured || '').trim().replace(/\/$/, '')
  if (trimmed) {
    return trimmed
  }
  return fallbackSiteUrl
}

export function robotsTxt(origin: string) {
  const lines = [
    'User-agent: *',
    'Allow: /',
    ...privatePaths.map(path => `Disallow: ${path}`),
    '',
    `Sitemap: ${origin}/sitemap.xml`,
    ''
  ]
  return lines.join('\n')
}

export function sitemapXml(origin: string, routes: string[]) {
  const urls = [...new Set(routes)].sort().map((route) => {
    return `  <url><loc>${escapeXml(`${origin}${route}`)}</loc></url>`
  })
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    ''
  ].join('\n')
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}
