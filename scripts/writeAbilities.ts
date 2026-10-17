/**
 * Generates src/backend/enemyAbilities/<season>/<dungeon>.json from the scraped candidates.
 *
 * The JSON is pure output: every run rebuilds it from the scrape, grimoire and
 * overrides/<dungeon>.ts, and overwrites the file. Review a run with `git diff`. Hand-made
 * calls belong in the overrides, never in the JSON.
 *
 * The scrape (scripts/output/) is committed, so a run is reproducible on any machine. An
 * `include` override for a spell the scrape never saw is built from grimoire alone and listed
 * after the scraped abilities.
 *
 * Each file records the grimoire-wow version it was resolved against, so `yarn check-abilities`
 * (run by `yarn build`) can fail when grimoire is bumped without re-running this.
 *
 * Usage:
 *   yarn write            # all dungeons
 *   yarn write murd       # one dungeon
 *   yarn write --dry      # print what would change, write nothing
 */
import { execFileSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getDamageMultiplier } from 'grimoire-wow'
import type { EnemyAbility } from '../src/backend/enemyAbilities/enemies.ts'
import type { AbilityCandidate } from './guessAbilities.ts'
import { describe, grimoireOnlySource, suggestedAbilities } from './abilitySource.ts'
import { dungeonOverrides, spellOverride } from './overrides/index.ts'
import {
  abilitiesPath,
  type DungeonAbilitiesFile,
  installedGrimoireVersion,
  readAbilitiesFile,
  seasonDungeonKeys,
} from './abilityFiles.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(__dirname, 'output')

/** Only these classifications are written; `avoidable` and `chip` are report-only. */
const WRITTEN_CLASSIFICATIONS = new Set<AbilityCandidate['classification']>(['lethal'])

function formatFiles(filePaths: string[]) {
  if (filePaths.length === 0) return

  const prettier = path.resolve(__dirname, '../node_modules/.bin/prettier')
  if (!fs.existsSync(prettier)) {
    console.log('\nprettier not found, leaving generated files unformatted')
    return
  }

  try {
    execFileSync(prettier, ['--write', ...filePaths], { stdio: 'pipe' })
    console.log(`Formatted ${filePaths.length} file(s) with prettier`)
  } catch (err) {
    // Formatting is cosmetic — a failure here shouldn't lose the generated output.
    console.log(`\nprettier failed, files written unformatted: ${(err as Error).message}`)
  }
}

/** What changed between two versions of a dungeon's abilities, one line per ability. */
function changes(before: EnemyAbility[], after: EnemyAbility[]) {
  const lines: string[] = []
  // A spell split into a hit and its DoT shares an id, so the name is part of the identity.
  const identity = (ability: EnemyAbility) => `${ability.id}:${ability.name}`
  const beforeById = new Map(before.map((ability) => [identity(ability), ability]))
  const afterIds = new Set(after.map(identity))

  for (const ability of after) {
    const old = beforeById.get(identity(ability))
    if (!old) {
      lines.push(`+ ${ability.name} (${ability.id})`)
      continue
    }
    const keys = new Set([
      ...Object.keys(old),
      ...Object.keys(ability),
    ] as (keyof EnemyAbility)[])
    const fields = [...keys]
      .filter((key) => JSON.stringify(old[key]) !== JSON.stringify(ability[key]))
      .map(
        (key) => `${key} ${JSON.stringify(old[key])} -> ${JSON.stringify(ability[key])}`,
      )
    if (fields.length > 0)
      lines.push(`~ ${ability.name} (${ability.id}): ${fields.join(', ')}`)
  }
  for (const ability of before) {
    if (!afterIds.has(identity(ability))) lines.push(`- ${ability.name} (${ability.id})`)
  }

  const order = (abilities: EnemyAbility[]) =>
    abilities
      .map(identity)
      .filter((id) => beforeById.has(id) && afterIds.has(id))
      .join(',')
  if (order(before) !== order(after)) lines.push('reordered to match dungeon route')

  return lines
}

function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry')
  const requested = args.find((arg) => !arg.startsWith('--'))
  const dungeonKeys = requested ? [requested] : seasonDungeonKeys

  // grimoire-wow publishes the season's damage multiplier, so there's nothing to derive.
  const multiplier = getDamageMultiplier()
  const grimoire = installedGrimoireVersion()
  console.log(`grimoire-wow ${grimoire}, season damage multiplier ${multiplier}\n`)

  const writtenPaths: string[] = []

  for (const dungeonKey of dungeonKeys) {
    const inputPath = path.join(outputDir, `${dungeonKey}_abilities.json`)
    if (!fs.existsSync(inputPath)) {
      console.log(
        `${dungeonKey}: no scraped data, skipping (run \`yarn guess ${dungeonKey}\`)\n`,
      )
      continue
    }

    // Candidates are already in route order — the order you meet them in the dungeon.
    const scraped = JSON.parse(fs.readFileSync(inputPath, 'utf-8')) as AbilityCandidate[]
    const candidates = scraped.filter((candidate) => {
      const override = spellOverride(dungeonKey, candidate.spellIds)
      if (override?.exclude) return false
      return WRITTEN_CLASSIFICATIONS.has(candidate.classification) || override?.include
    })

    // Added by hand: included, but never seen in the logs. These go after the route.
    const scrapedSpellIds = new Set(scraped.flatMap((candidate) => candidate.spellIds))
    const handAdded = Object.entries(dungeonOverrides(dungeonKey))
      .filter(
        ([spellId, override]) =>
          override.include && !scrapedSpellIds.has(Number(spellId)),
      )
      .map(([spellId]) => {
        const source = grimoireOnlySource(Number(spellId))
        if (!source) {
          throw new Error(
            `${dungeonKey}: ${spellId} is included but wasn't scraped, and grimoire has no damage to build it from`,
          )
        }
        return source
      })

    const suggested = [...candidates, ...handAdded].flatMap((candidate) =>
      suggestedAbilities(dungeonKey, candidate, multiplier),
    )
    const file: DungeonAbilitiesFile = {
      grimoire,
      abilities: suggested.map(({ ability }) => ability),
    }

    const existing = readAbilitiesFile(dungeonKey)
    const diff = existing
      ? changes(existing.abilities, file.abilities)
      : suggested.map((s) => `+ ${describe(s)}`)
    if (existing && existing.grimoire !== grimoire) {
      diff.unshift(`grimoire ${existing.grimoire} -> ${grimoire}`)
    }

    console.log(`${dungeonKey}: ${file.abilities.length} abilities`)
    // Silenced by an explicit `ignoresArmor: true | false` override once someone has checked.
    for (const candidate of candidates) {
      const override = spellOverride(dungeonKey, candidate.spellIds)
      if (candidate.possiblyIgnoresArmor && override?.ignoresArmor === undefined) {
        console.log(
          `    ${candidate.name}: armor sensitivity ${Math.round(candidate.armorSensitivity * 100)}pp — check ignoresArmor`,
        )
      }
    }

    if (diff.length === 0) {
      console.log(`    no changes\n`)
      continue
    }
    for (const line of diff) console.log(`    ${line}`)

    if (dryRun) {
      console.log(`    (dry run, not written)\n`)
      continue
    }

    const outPath = abilitiesPath(dungeonKey)
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, `${JSON.stringify(file, null, 2)}\n`)
    writtenPaths.push(outPath)
    console.log(`    -> ${path.relative(process.cwd(), outPath)}\n`)
  }

  formatFiles(writtenPaths)
}

main()
