type ContentCacheApp<T> = {
  isHydrating?: boolean
  payload: { data: Record<string, T> }
  static: { data: Record<string, T> }
}

type CacheContext = {
  cause?: string
}

export function contentCachedData<T>(key: string, nuxtApp: ContentCacheApp<T>, context?: CacheContext) {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key]
  }

  if (context?.cause === 'refresh:hook' || context?.cause === 'refresh:manual') {
    return
  }

  if (studioSessionOpen()) {
    return
  }

  return nuxtApp.static.data[key]
}

function studioSessionOpen() {
  return readCookie('studio-session-check') === 'true'
}

function readCookie(name: string) {
  if (typeof document === 'undefined') {
    return
  }

  const cookies = document.cookie ? document.cookie.split('; ') : []
  const match = cookies.find(cookie => cookie.startsWith(`${name}=`))

  if (!match) {
    return
  }

  return match.slice(name.length + 1)
}
