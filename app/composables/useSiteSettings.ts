export function useSiteSettings() {
  return useAsyncData('site-settings', () => queryCollection('settings').first(), {
    getCachedData: contentCachedData
  })
}
