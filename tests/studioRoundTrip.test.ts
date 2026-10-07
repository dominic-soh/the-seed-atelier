import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

// Studio marks a file "Updated" when its own parse of the markdown does not match
// the document built into the content database. nuxt-studio hardcodes remark-mdc
// `autoUnwrap: true`, so nuxt.config has to set the same option for the build or
// every ::block with body text reports a phantom change. Needs a build first.
// `nuxt prepare` creates this file empty, so presence alone means nothing.
const dumpPath = '.nuxt/content/sql_dump.txt'
const dump = existsSync(dumpPath)
  ? readFileSync(dumpPath, 'utf8').split('\n').filter(line => line.startsWith('INSERT INTO'))
  : []

describe.skipIf(dump.length === 0)('studio round-trip', () => {
  const files = readdirSync('content', { recursive: true })
    .filter((file): file is string => typeof file === 'string' && file.endsWith('.md'))

  it.for(files)('%s parses identically in Studio and the build', async (file) => {
    // Deep paths, not package specifiers: nuxt-studio's exports field hides these.
    const { generateDocumentFromContent } = await import('../node_modules/nuxt-studio/dist/module/runtime/utils/document/generate.js' as string)
    const { removeLastStylesFromTree } = await import('../node_modules/nuxt-studio/dist/module/runtime/utils/document/tree.js' as string)
    const { stringify } = await import('minimark/stringify')

    const row = dump.find(line => line.includes(`'pages/${file}'`) || line.includes(`/${file}'`))
    expect(row, `no content row for ${file}`).toBeDefined()

    const id = row!.match(/VALUES \('([^']+)'/)![1]
    const builtBody = JSON.parse(row!.match(/'(\{"type":"minimark".*?\})', '/s)![1].replaceAll('\'\'', '\''))
    const studio = await generateDocumentFromContent(id, readFileSync(`content/${file}`, 'utf8'), {
      compress: true,
      preserveLinkAttributes: true
    })

    const normalize = (tree: unknown) => stringify(removeLastStylesFromTree(tree)).replace(/\n/g, '')
    expect(normalize(studio.body)).toBe(normalize(builtBody))
  })
})
