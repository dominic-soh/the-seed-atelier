import { readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

export function routeFromContentFile(relativePath: string) {
  const normalized = relativePath.replace(/\\/g, '/').replace(/\.md$/, '')
  const segments = normalized
    .split('/')
    .map(segment => segment.replace(/^\d+\./, ''))
    .filter(segment => segment.length > 0)

  if (segments.at(-1) === 'index') {
    segments.pop()
  }

  return `/${segments.join('/')}`
}

export function collectContentRoutes(contentDir: string) {
  return markdownFiles(contentDir).map(file => routeFromContentFile(relative(contentDir, file)))
}

function markdownFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry)
    if (statSync(fullPath).isDirectory()) {
      return markdownFiles(fullPath)
    }
    if (entry.endsWith('.md')) {
      return [fullPath]
    }
    return []
  })
}
