/**
 * Merges scraped candidates into src/backend/enemyAbilities/<season>/<dungeon>.ts.
 *
 * ADDITIVE: only spell ids not already in the file are appended, so hand-tuning survives a
 * re-run. Abilities already present are reported as a diff (e.g. "file says 5 ticks, logs show
 * 7") and left alone — the generator never overwrites a human's judgement.
 *
 * Usage:
 *   yarn write            # all dungeons
 *   yarn write murd       # one dungeon
 *   yarn write --dry      # report what would change, write nothing
 *   yarn write --prune    # also drop entries the scraper no longer rates lethal
 *   yarn write --refresh  # rewrite entries whose generated form has changed
 */
import { execFileSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getDamageMultiplier } from 'grimoire-wow'
import type { AbilityCandidate } from './guessAbilities.ts'
import type { Declaration } from './abilitySource.ts'
import { spellIdsInSource, suggestedDeclaration } from './abilitySource.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(__dirname, 'output')
const abilitiesDir = path.resolve(__dirname, '../src/backend/enemyAbilities/midnight_s2')

const allDungeonKeys = ['murd', 'nalo', 'vale', 'void', 'fang', 'rlp', 'tos', 'kr']

/** Only these classifications are written; `avoidable` and `chip` are report-only. */
const WRITTEN_CLASSIFICATIONS = new Set<AbilityCandidate['classification']>(['lethal'])

function exportName(dungeonKey: string) {
  return `${dungeonKey}Abilities`
}

function renderNewFile(
  dungeonKey: string,
  declarations: Array<{ varName: string; code: string }>,
  needsScalingHelper: boolean,
) {
  if (declarations.length === 0) {
    return `import type { EnemyAbility } from '../enemies'\n\nexport const ${exportName(dungeonKey)}: EnemyAbility[] = []\n`
  }

  const lines = [`import { bossSpell, trashSpell } from '../grimoire.ts'`]
  if (needsScalingHelper) {
    lines.push(`import { scalingTickingDamage } from '../grimoireConverter.ts'`)
  }
  lines.push('')

  for (const declaration of declarations) {
    lines.push(declaration.code)
    lines.push('')
  }

  lines.push(`export const ${exportName(dungeonKey)} = [`)
  for (const declaration of declarations) lines.push(`  ${declaration.varName},`)
  lines.push(']')
  lines.push('')

  return lines.join('\n')
}

/** Splice new declarations into an existing file without disturbing what's already there. */
function mergeIntoFile(
  source: string,
  dungeonKey: string,
  declarations: Array<{ varName: string; code: string }>,
  needsScalingHelper: boolean,
) {
  const arrayPattern = new RegExp(
    `export const ${exportName(dungeonKey)}(?::\\s*EnemyAbility\\[\\])?\\s*=\\s*\\[([\\s\\S]*?)\\]`,
  )
  const match = source.match(arrayPattern)
  if (!match) return null

  let merged = source

  // The empty stub imports a type it will no longer need once there are real abilities.
  if (/export const \w+: EnemyAbility\[\] = \[\]/.test(merged)) {
    merged = merged.replace(/import type \{ EnemyAbility \} from '\.\.\/enemies'\n\n?/, '')
    merged = `import { bossSpell, trashSpell } from '../grimoire.ts'\n\n${merged}`
  }

  if (needsScalingHelper && !merged.includes('scalingTickingDamage')) {
    merged = merged.replace(
      /(import \{ bossSpell, trashSpell \} from '\.\.\/grimoire\.ts'\n)/,
      `$1import { scalingTickingDamage } from '../grimoireConverter.ts'\n`,
    )
  }

  const refreshed = merged.match(arrayPattern)!
  const existingEntries = refreshed[1]!
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && line !== ',')

  const entries = [
    ...existingEntries,
    ...declarations.map((declaration) => `${declaration.varName},`),
  ]

  const block =
    `export const ${exportName(dungeonKey)} = [\n` +
    entries.map((entry) => `  ${entry.replace(/,?$/, ',')}`).join('\n') +
    `\n]`

  const newCode = declarations.map((declaration) => `${declaration.code}\n`).join('\n')
  return merged.replace(refreshed[0]!, `${newCode}\n${block}`)
}

/** Locate a declaration by spell id, returning its variable name and full source extent. */
function findDeclaration(source: string, spellId: number) {
  const pattern = new RegExp(
    `^const (\\w+) = (?:boss|trash)Spell\\(\\s*${spellId}\\b`,
    'm',
  )
  const match = source.match(pattern)
  if (!match || match.index === undefined) return null

  let depth = 0
  let cursor = source.indexOf('(', match.index)
  for (; cursor < source.length; ++cursor) {
    if (source[cursor] === '(') depth++
    else if (source[cursor] === ')' && --depth === 0) {
      cursor++
      break
    }
  }

  return { varName: match[1]!, start: match.index, end: cursor }
}

/**
 * Rewrite declarations whose generated form has changed — e.g. an ability that was marked
 * periodic off a bad tick inference and no longer is.
 *
 * The existing variable name is kept so the export array still resolves. This overwrites hand
 * edits to the declarations it touches, which is why it needs an explicit flag.
 */
function refreshDeclarations(
  source: string,
  candidates: AbilityCandidate[],
  multiplier: number | null,
) {
  let result = source
  const changes: Array<{ before: string; after: string }> = []

  for (const candidate of candidates) {
    const found = findDeclaration(result, candidate.primarySpellId)
    if (!found) continue

    const before = result.slice(found.start, found.end)
    const generated = suggestedDeclaration(candidate, multiplier)
    // Keep whatever the declaration is already called; the array refers to it by that name.
    const after = generated.code.replace(
      /^const \w+ =/,
      `const ${found.varName} =`,
    )

    // Compare ignoring formatting: prettier reflows declarations across lines and adds
    // trailing commas, neither of which is a real change. Without stripping those, every
    // formatted file reports drift forever and --refresh fights the formatter.
    const normalize = (text: string) =>
      text
        .replace(/,(\s*[}\])])/g, '$1')
        .replace(/\s+/g, ' ')
        .trim()
    if (normalize(before) === normalize(after)) continue

    result = result.slice(0, found.start) + after + result.slice(found.end)
    changes.push({ before: normalize(before), after: normalize(after) })
  }

  return { result, changes }
}

/**
 * Drop `const x = ...Spell(<id>, ...)` declarations and their array entries.
 *
 * Declarations get prettier-formatted across several lines, so this scans forward from the
 * opening paren and balances parentheses to find the real end of the statement rather than
 * assuming one line.
 */
function removeSpellIds(source: string, spellIds: number[]) {
  let result = source

  for (const spellId of spellIds) {
    const declaration = new RegExp(
      `^const (\\w+) = (?:boss|trash)Spell\\(\\s*${spellId}\\b`,
      'm',
    )
    const match = result.match(declaration)
    if (!match || match.index === undefined) continue

    let depth = 0
    let cursor = result.indexOf('(', match.index)
    for (; cursor < result.length; ++cursor) {
      if (result[cursor] === '(') depth++
      else if (result[cursor] === ')' && --depth === 0) {
        cursor++
        break
      }
    }
    while (result[cursor] === '\n') cursor++

    result = result.slice(0, match.index) + result.slice(cursor)
    result = result.replace(new RegExp(`^\\s*${match[1]},\\n`, 'm'), '')
  }

  return result
}

/** Drop helper imports the file no longer uses — refreshing a line can strip its last caller. */
function pruneUnusedImports(source: string) {
  if (source.includes('scalingTickingDamage(')) return source

  return source.replace(
    /import \{ scalingTickingDamage \} from '\.\.\/grimoireConverter\.ts'\n/,
    '',
  )
}

/**
 * Format the files we just wrote, so generated declarations match the repo's style rather
 * than arriving as one long line each. Uses the local prettier and its .prettierrc.yaml.
 */
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

/**
 * Make variable names unique.
 *
 * Two spells can share a name while being distinct mechanics, and each gets its own
 * declaration — so the bare camel-cased name would collide. Colliding ones take the spell id
 * as a suffix; the first/most damaging keeps the clean name.
 */
function deduplicateNames(declarations: Declaration[], existingSource: string | null) {
  const taken = new Set<string>(
    existingSource
      ? [...existingSource.matchAll(/^const (\w+) =/gm)].map((m) => m[1]!)
      : [],
  )

  return declarations.map((declaration) => {
    if (!taken.has(declaration.varName)) {
      taken.add(declaration.varName)
      return declaration
    }

    const spellId = declaration.code.match(/Spell\(\s*(\d+)/)?.[1] ?? ''
    const unique = `${declaration.varName}${spellId}`
    taken.add(unique)
    return {
      ...declaration,
      varName: unique,
      code: declaration.code.replace(/^const \w+ =/, `const ${unique} =`),
    }
  })
}

function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry')
  const prune = args.includes('--prune')
  const refresh = args.includes('--refresh')
  const requested = args.find((arg) => !arg.startsWith('--'))
  const dungeonKeys = requested ? [requested] : allDungeonKeys

  // grimoire-wow publishes the season's damage multiplier, so there's nothing to derive.
  const multiplier = getDamageMultiplier()
  console.log(`Season damage multiplier: ${multiplier}\n`)

  const writtenPaths: string[] = []

  for (const dungeonKey of dungeonKeys) {
    const inputPath = path.join(outputDir, `${dungeonKey}_abilities.json`)
    if (!fs.existsSync(inputPath)) {
      console.log(`${dungeonKey}: no scraped data, skipping (run \`yarn guess ${dungeonKey}\`)`)
      continue
    }

    const candidates = (
      JSON.parse(fs.readFileSync(inputPath, 'utf-8')) as AbilityCandidate[]
    ).filter((candidate) => WRITTEN_CLASSIFICATIONS.has(candidate.classification))

    const outPath = path.join(abilitiesDir, `${dungeonKey}.ts`)
    const existingSource = fs.existsSync(outPath) ? fs.readFileSync(outPath, 'utf-8') : null
    const known = existingSource ? spellIdsInSource(existingSource) : new Set<number>()

    const fresh = candidates.filter(
      (candidate) => !candidate.spellIds.some((spellId) => known.has(spellId)),
    )
    const alreadyPresent = candidates.filter((candidate) =>
      candidate.spellIds.some((spellId) => known.has(spellId)),
    )

    const declarations = deduplicateNames(
      fresh.map((candidate) => suggestedDeclaration(candidate, multiplier)),
      existingSource,
    )

    // Entries written by an earlier run that the scraper no longer rates lethal — usually
    // because a metric got better, e.g. an ability turning out to be avoidable after all.
    const lethalIds = new Set(candidates.flatMap((candidate) => candidate.spellIds))
    const stale = existingSource
      ? [...spellIdsInSource(existingSource)].filter((spellId) => !lethalIds.has(spellId))
      : []
    const needsScalingHelper = declarations.some((d) => d.needsScalingHelper)

    console.log(
      `${dungeonKey}: ${fresh.length} new, ${alreadyPresent.length} already present, ${candidates.length} lethal total`,
    )

    // Entries whose generated form has drifted from what's on disk.
    const drift = existingSource
      ? refreshDeclarations(existingSource, alreadyPresent, multiplier).changes
      : []
    if (drift.length > 0) {
      const verb = refresh ? 'refreshing' : `stale (re-run with --refresh)`
      console.log(`    ${drift.length} ${verb}:`)
      for (const { before, after } of drift) {
        console.log(`      - ${before}`)
        console.log(`      + ${after}`)
      }
    }

    for (const candidate of alreadyPresent) {
      if (candidate.possiblyIgnoresArmor) {
        console.log(
          `    ${candidate.name}: armor sensitivity ${Math.round(candidate.armorSensitivity * 100)}pp — check ignoresArmor`,
        )
      }
    }

    if (stale.length > 0) {
      const verb = prune ? 'removing' : 'no longer lethal (re-run with --prune to remove)'
      console.log(`    ${verb}: ${stale.join(', ')}`)
    }

    if (
      fresh.length === 0 &&
      !(prune && stale.length > 0) &&
      !(refresh && drift.length > 0)
    ) {
      console.log(`    nothing to add\n`)
      continue
    }

    for (const declaration of declarations) {
      console.log(`    + ${declaration.code}`)
    }

    if (dryRun) {
      console.log(`    (dry run, not written)\n`)
      continue
    }

    let source = existingSource
    if (prune && stale.length > 0 && source) {
      source = removeSpellIds(source, stale)
    }
    if (refresh && drift.length > 0 && source) {
      source = refreshDeclarations(source, alreadyPresent, multiplier).result
    }

    let content: string | null
    if (source && known.size > 0) {
      content = mergeIntoFile(source, dungeonKey, declarations, needsScalingHelper)
      if (!content) {
        console.log(
          `    could not locate \`export const ${exportName(dungeonKey)}\` — leaving the file alone\n`,
        )
        continue
      }
    } else if (source) {
      content =
        mergeIntoFile(source, dungeonKey, declarations, needsScalingHelper) ??
        renderNewFile(dungeonKey, declarations, needsScalingHelper)
    } else {
      content = renderNewFile(dungeonKey, declarations, needsScalingHelper)
    }

    fs.mkdirSync(abilitiesDir, { recursive: true })
    fs.writeFileSync(outPath, pruneUnusedImports(content))
    writtenPaths.push(outPath)
    console.log(`    -> ${outPath}\n`)
  }

  formatFiles(writtenPaths)
}

main()
