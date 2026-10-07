import { afterEach, describe, expect, it } from 'vitest'
import { contentCachedData } from '../app/utils/contentCache'

const nuxtApp = {
  isHydrating: false,
  payload: { data: { list: ['hydrated'] } },
  static: { data: { list: ['built'] } }
}

describe('contentCachedData', () => {
  afterEach(() => {
    Reflect.deleteProperty(globalThis, 'document')
  })

  it('keeps the prerendered payload while the page is hydrating', () => {
    expect(contentCachedData('list', { ...nuxtApp, isHydrating: true })).toEqual(['hydrated'])
  })

  it('reuses the build payload for visitors', () => {
    expect(contentCachedData('list', nuxtApp, { cause: 'initial' })).toEqual(['built'])
  })

  it('ignores the build payload during a Studio session', () => {
    viDocument('studio-session-check=true')

    expect(contentCachedData('list', nuxtApp, { cause: 'initial' })).toBeUndefined()
  })

  it('refetches when the page is asked to update', () => {
    expect(contentCachedData('list', nuxtApp, { cause: 'refresh:hook' })).toBeUndefined()
  })
})

function viDocument(cookie: string) {
  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    value: { cookie }
  })
}
