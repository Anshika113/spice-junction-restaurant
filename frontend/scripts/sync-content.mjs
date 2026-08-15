// Copies the backend's content.json into the frontend so the static build and
// the API serve identical data. Runs automatically before dev and build.
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const src = resolve(here, '../../backend/app/data/content.json')
const dest = resolve(here, '../src/content/content.json')

if (!existsSync(src)) {
  console.warn('[sync] backend/app/data/content.json not found — keeping existing copy')
  process.exit(0)
}
mkdirSync(dirname(dest), { recursive: true })
copyFileSync(src, dest)
console.log('[sync] content.json -> src/content/content.json')
