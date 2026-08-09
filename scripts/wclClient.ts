/**
 * Caching / retrying / concurrency-bounded wrapper around the raw WCL fetch.
 *
 * Every response is cached on disk keyed by query hash, so re-running the analysis after a
 * threshold change costs zero API points. WCL bills per query against an hourly budget, and a
 * full 8-dungeon sweep at ~20 reports each is thousands of queries.
 */
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { fetchWcl } from './wcl.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const cacheDir = path.join(__dirname, '.cache', 'wcl')

const MAX_CONCURRENT = 4
const MAX_ATTEMPTS = 4
const BASE_BACKOFF_MS = 1000

/** Errors worth retrying: transient network/server faults and rate limiting. */
const RETRYABLE = /rate limit|too many requests|timeout|socket|network|fetch failed|ECONN|502|503|504/i

export interface RateLimitData {
  rateLimitData: {
    limitPerHour: number
    pointsSpentThisHour: number
    pointsResetIn: number
  }
}

let inFlight = 0
const queue: Array<() => void> = []

async function withConcurrencyLimit<T>(task: () => Promise<T>): Promise<T> {
  if (inFlight >= MAX_CONCURRENT) {
    await new Promise<void>((resolve) => queue.push(resolve))
  }
  inFlight++

  try {
    return await task()
  } finally {
    inFlight--
    queue.shift()?.()
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function cachePathFor(query: string) {
  const hash = crypto.createHash('sha256').update(query).digest('hex').slice(0, 32)
  return path.join(cacheDir, `${hash}.json`)
}

export interface FetchOptions {
  /** Bypass the cache and refetch. The fresh response still replaces the cache entry. */
  refresh?: boolean
  /** Label used in progress/error output. */
  label?: string
}

export const cacheStats = { hits: 0, misses: 0, retries: 0 }

export async function fetchWclCached<T>(
  query: string,
  { refresh = false, label }: FetchOptions = {},
): Promise<T> {
  const cacheFile = cachePathFor(query)

  if (!refresh && fs.existsSync(cacheFile)) {
    cacheStats.hits++
    return JSON.parse(fs.readFileSync(cacheFile, 'utf-8')) as T
  }

  cacheStats.misses++

  const data = await withConcurrencyLimit(async () => {
    let lastError: Error | undefined

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; ++attempt) {
      try {
        return await fetchWcl<T>(query)
      } catch (err) {
        lastError = err as Error
        if (!RETRYABLE.test(lastError.message) || attempt === MAX_ATTEMPTS) throw lastError

        cacheStats.retries++
        const backoff = BASE_BACKOFF_MS * 2 ** (attempt - 1)
        console.log(
          `  retry ${attempt}/${MAX_ATTEMPTS - 1} in ${backoff}ms${label ? ` (${label})` : ''}: ${lastError.message}`,
        )
        await sleep(backoff)
      }
    }

    throw lastError
  })

  fs.mkdirSync(cacheDir, { recursive: true })
  fs.writeFileSync(cacheFile, JSON.stringify(data))
  return data
}

/** Remaining hourly point budget. Worth checking before a full sweep. */
export async function getRateLimit(): Promise<RateLimitData['rateLimitData']> {
  const data = await fetchWcl<RateLimitData>(`
query {
  rateLimitData {
    limitPerHour
    pointsSpentThisHour
    pointsResetIn
  }
}`)
  return data.rateLimitData
}

export function clearCache() {
  fs.rmSync(cacheDir, { recursive: true, force: true })
}

export function summarizeCacheUsage() {
  const { hits, misses, retries } = cacheStats
  return `WCL: ${misses} fetched, ${hits} cached${retries > 0 ? `, ${retries} retried` : ''}`
}
