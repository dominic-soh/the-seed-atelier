import { join } from 'node:path'
import { collectContentRoutes } from '../utils/contentRoutes'
import { siteOrigin, sitemapXml } from '../../shared/utils/crawl'

export default defineEventHandler((event) => {
  const contentDir = join(process.cwd(), 'content')
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return sitemapXml(siteOrigin(useRuntimeConfig().public.siteUrl), collectContentRoutes(contentDir))
})
