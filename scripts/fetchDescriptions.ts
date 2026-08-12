/**
 * Fetches spell descriptions from Wowhead. MANUAL STEP — deliberately not part of `yarn guess`.
 *
 * Wowhead is a courtesy, not an API. The hard rule here is that no spell is ever fetched
 * twice: every result, including "no such spell", is written to a tracked cache the moment it
 * arrives, and cached ids are skipped forever. The cache lives in the repo rather than under
 * scripts/.cache/ precisely so that clearing the WCL cache can't cause a re-scrape.
 *
 * Requests are serial with a delay between them. Do not parallelise this.
 *
 * Usage:
 *   yarn descriptions --dry          # how many would be fetched, fetch nothing
 *   yarn descriptions --limit 25     # fetch at most 25 new spells, then stop
 *   yarn descriptions                # fetch everything not already cached
 *   yarn descriptions --retry-errors # re-attempt only ids that failed with a network error
 *   yarn descriptions --branch ptr-2 # fetch against a different PTR branch
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(__dirname, 'output')
const cachePath = path.join(__dirname, 'spellDescriptions.json')

/**
 * PTR branch. `ptr` is the one carrying this season's data — `ptr-2` is a different branch and
 * returns "not found" for roughly 40% of these spells.
 */
const DEFAULT_BRANCH = 'ptr'

/** Wowhead's lightweight tooltip endpoint — ~700 bytes vs a full HTML page. */
const TOOLTIP_URL = (spellId: number, branch: string) =>
  `https://nether.wowhead.com/${branch}/tooltip/spell/${spellId}?locale=0`
const PAGE_URL = (spellId: number, branch: string) =>
  `https://www.wowhead.com/${branch}/spell=${spellId}`

/** Be a good citizen: identifiable, and slow. */
const USER_AGENT = 'not_even_close ability tooling (contact: ort@archon.gg)'
const DELAY_MS = 1500

export interface SpellDescription {
  id: number
  name: string
  /** The spell's tooltip body — the bit that says what the mechanic does. */
  description: string
  /** The aura tooltip, when the spell applies one. */
  auraDescription?: string
  status: 'ok' | 'notfound' | 'error'
  /** Present when status is 'error', to make a retry decision possible. */
  error?: string
  url: string
}

/** spellId -> branch -> result. Branch-keyed so a wrong-branch pass is never re-requested. */
type Cache = Record<string, Record<string, SpellDescription>>

function loadCache(): Cache {
  if (!fs.existsSync(cachePath)) return {}
  const raw = JSON.parse(fs.readFileSync(cachePath, 'utf-8')) as Record<string, unknown>

  // Migrate the original flat shape, which was all fetched against ptr-2.
  const migrated: Cache = {}
  for (const [spellId, value] of Object.entries(raw)) {
    migrated[spellId] =
      value && typeof value === 'object' && 'status' in (value as object)
        ? { 'ptr-2': value as SpellDescription }
        : (value as Record<string, SpellDescription>)
  }
  return migrated
}

/** Written after every single fetch, so an interrupted run never loses a request. */
function saveCache(cache: Cache) {
  const ordered = Object.fromEntries(
    Object.entries(cache).sort(([a], [b]) => Number(a) - Number(b)),
  )
  fs.writeFileSync(cachePath, `${JSON.stringify(ordered, null, 2)}\n`)
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function stripHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

/** The description sits in the tooltip's quality-coloured div; there may be several. */
function extractDescription(tooltip: string) {
  const parts = [...tooltip.matchAll(/<div class="q\d?">([\s\S]*?)<\/div>/g)].map((m) =>
    stripHtml(m[1]!),
  )
  return parts.filter(Boolean).join(' ')
}

interface TooltipResponse {
  name?: string
  tooltip?: string
  buff?: string
  error?: string
}

async function fetchOne(spellId: number, branch: string): Promise<SpellDescription> {
  const url = TOOLTIP_URL(spellId, branch)

  let response: Response
  try {
    response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
  } catch (err) {
    return {
      id: spellId,
      name: '',
      description: '',
      status: 'error',
      error: (err as Error).message,
      url: PAGE_URL(spellId, branch),
    }
  }

  if (response.status === 404) {
    return {
      id: spellId,
      name: '',
      description: '',
      status: 'notfound',
      url: PAGE_URL(spellId, branch),
    }
  }

  if (!response.ok) {
    return {
      id: spellId,
      name: '',
      description: '',
      status: 'error',
      error: `HTTP ${response.status}`,
      url: PAGE_URL(spellId, branch),
    }
  }

  const json = (await response.json()) as TooltipResponse
  if (!json.name) {
    return {
      id: spellId,
      name: '',
      description: '',
      status: 'notfound',
      url: PAGE_URL(spellId, branch),
    }
  }

  const auraDescription = json.buff ? extractDescription(json.buff) : ''
  return {
    id: spellId,
    name: json.name,
    description: extractDescription(json.tooltip ?? ''),
    ...(auraDescription ? { auraDescription } : {}),
    status: 'ok',
    url: PAGE_URL(spellId, branch),
  }
}

/** Every spell id the scraper has seen, so a later threshold change needs no new fetches. */
function spellIdsFromOutput(): number[] {
  if (!fs.existsSync(outputDir)) return []

  const ids = new Set<number>()
  for (const file of fs.readdirSync(outputDir).filter((f) => f.endsWith('_abilities.json'))) {
    const candidates = JSON.parse(
      fs.readFileSync(path.join(outputDir, file), 'utf-8'),
    ) as Array<{ spellIds: number[] }>
    for (const candidate of candidates) {
      for (const spellId of candidate.spellIds) if (spellId > 0) ids.add(spellId)
    }
  }
  return [...ids].sort((a, b) => a - b)
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry')
  const retryErrors = args.includes('--retry-errors')
  const limitArg = args.indexOf('--limit')
  const limit = limitArg !== -1 ? Number(args[limitArg + 1]) : Infinity
  const branchArg = args.indexOf('--branch')
  const branch = branchArg !== -1 ? args[branchArg + 1]! : DEFAULT_BRANCH

  const cache = loadCache()
  const allIds = spellIdsFromOutput()
  if (allIds.length === 0) {
    console.error(`No scraped data in ${outputDir}. Run \`yarn guess\` first.`)
    process.exit(1)
  }

  const pending = allIds.filter((id) => {
    const cached = cache[String(id)]?.[branch]
    if (!cached) return true
    // 'ok' and 'notfound' are final. An error may have been transient.
    return retryErrors && cached.status === 'error'
  })

  const cachedCount = allIds.length - pending.length
  console.log(
    `branch ${branch}: ${allIds.length} spells seen, ${cachedCount} already cached, ${pending.length} to fetch`,
  )

  if (dryRun) {
    console.log('(dry run, fetching nothing)')
    return
  }

  const toFetch = pending.slice(0, limit)
  if (toFetch.length < pending.length) {
    console.log(`fetching ${toFetch.length} this run (--limit)`)
  }

  let ok = 0
  let missing = 0
  let failed = 0

  for (const [index, spellId] of toFetch.entries()) {
    const result = await fetchOne(spellId, branch)
    // Persist immediately — an interrupted run must never re-request what it already got.
    cache[String(spellId)] = { ...cache[String(spellId)], [branch]: result }
    saveCache(cache)

    if (result.status === 'ok') ok++
    else if (result.status === 'notfound') missing++
    else failed++

    const label =
      result.status === 'ok'
        ? result.description.slice(0, 70)
        : `[${result.status}${result.error ? `: ${result.error}` : ''}]`
    console.log(`  ${index + 1}/${toFetch.length}  ${spellId}  ${result.name}  ${label}`)

    if (index < toFetch.length - 1) await sleep(DELAY_MS)
  }

  console.log(`\ndone: ${ok} ok, ${missing} not found, ${failed} errored`)
  console.log(`cache: ${cachePath}`)
  if (failed > 0) console.log('re-run with --retry-errors to re-attempt the failures')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
