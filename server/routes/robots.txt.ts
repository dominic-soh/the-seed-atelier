import { robotsTxt, siteOrigin } from '../../shared/utils/crawl'

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return robotsTxt(siteOrigin(useRuntimeConfig().public.siteUrl))
})
