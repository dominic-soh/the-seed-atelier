import { describe, expect, it } from 'vitest'
import { routeFromContentFile } from '../server/utils/contentRoutes'

describe('contentRoutes', () => {
  it('maps a content file to its public route', () => {
    expect(routeFromContentFile('index.md')).toBe('/')
    expect(routeFromContentFile('about.md')).toBe('/about')
    expect(routeFromContentFile('services/index.md')).toBe('/services')
    expect(routeFromContentFile('services/private-ikebana.md')).toBe('/services/private-ikebana')
    expect(routeFromContentFile('journal/1.spring.md')).toBe('/journal/spring')
  })
})
