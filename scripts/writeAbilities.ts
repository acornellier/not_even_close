import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(__dirname, 'output')
const abilitiesDir = path.resolve(__dirname, '../src/backend/enemyAbilities/midnight')

// Typical player HP at current gear level — adjust as needed
const PLAYER_HP = 500_000
const HP_THRESHOLD = 0.7
const TANK_HP_THRESHOLD = 1.5

const allDungeonKeys = ['magi', 'cavns', 'xenas', 'wind', 'aa', 'pit', 'seat', 'sky']

// hitsPerRun thresholds for classification
const AVOIDABLE_MAX_HITS_PER_RUN = 9
const PERIODIC_MIN_HITS_PER_RUN = 25
// If this fraction of an ability's unique targets are tanks, it's a tankbuster
const TANK_ONLY_MIN_TANK_FRACTION = 0.8

interface AbilityData {
  spellId: number
  spellName: string
  sourceName: string
  isBoss: boolean
  avgHit: number
  avgMitigated: number
  totalHits: number
  hitsPerRun: number
  avgTargetsPerRun: number
  tankTargetFraction: number | null
  runsSeenIn: number
  firstCastMs: number | null
}

function toVarName(spellName: string): string {
  return spellName
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .split(/\s+/)
    .map((word, i) =>
      i === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join('')
}

function classifyAbility(
  ability: AbilityData,
): 'tankOnly' | 'avoidable' | 'periodic' | null {
  if (
    ability.tankTargetFraction !== null &&
    ability.tankTargetFraction >= TANK_ONLY_MIN_TANK_FRACTION
  )
    return 'tankOnly'
  if (ability.hitsPerRun <= AVOIDABLE_MAX_HITS_PER_RUN) return 'avoidable'
  if (ability.hitsPerRun >= PERIODIC_MIN_HITS_PER_RUN) return 'periodic'
  return null
}

function generateFile(
  dungeonKey: string,
  abilities: AbilityData[],
): { content: string; skipped: string[] } {
  const damageThreshold = PLAYER_HP * HP_THRESHOLD

  // Find names that appear under multiple spell IDs — skip them entirely
  const nameToIds = new Map<string, number[]>()
  for (const a of abilities) {
    const ids = nameToIds.get(a.spellName) ?? []
    ids.push(a.spellId)
    nameToIds.set(a.spellName, ids)
  }
  const duplicateNames = new Set(
    [...nameToIds.entries()].filter(([, ids]) => ids.length > 1).map(([name]) => name),
  )

  const relevant = abilities
    .filter((a) => {
      if (a.spellId === 1) return false // Melee
      if (!a.sourceName) return false // No source NPC
      if (a.runsSeenIn < 2) return false // Not seen in multiple runs
      if (duplicateNames.has(a.spellName)) return false // Split-component ability
      const isTankAbility =
        a.tankTargetFraction !== null && a.tankTargetFraction >= TANK_ONLY_MIN_TANK_FRACTION
      const threshold = isTankAbility ? PLAYER_HP * TANK_HP_THRESHOLD : damageThreshold
      return a.avgHit >= threshold
    })
    .sort((a, b) => (a.firstCastMs ?? Infinity) - (b.firstCastMs ?? Infinity))

  const skipped = [...duplicateNames].filter((name) =>
    abilities.some(
      (a) =>
        a.spellName === name &&
        a.avgHit >= damageThreshold &&
        a.sourceName &&
        a.runsSeenIn >= 2,
    ),
  )

  let content: string
  if (relevant.length === 0) {
    content = `import type { EnemyAbility } from '../enemies'\n\nexport const ${dungeonKey}Abilities: EnemyAbility[] = []\n`
  } else {
    const lines: string[] = [`import { bossSpell, trashSpell } from '../grimoire.ts'`]
    lines.push('')

    const varNames: string[] = []

    for (const ability of relevant) {
      const varName = toVarName(ability.spellName)
      varNames.push(varName)
      const fn = ability.isBoss ? 'bossSpell' : 'trashSpell'
      const classification = classifyAbility(ability)

      if (classification) {
        lines.push(`const ${varName} = ${fn}(${ability.spellId}, {`)
        lines.push(`  ${classification}: true,`)
        lines.push(`})`)
      } else {
        lines.push(`const ${varName} = ${fn}(${ability.spellId})`)
      }
      lines.push('')
    }

    const exportName = `${dungeonKey}Abilities`
    lines.push(`export const ${exportName} = [`)
    for (const varName of varNames) {
      lines.push(`  ${varName},`)
    }
    lines.push(`]`)
    lines.push('')

    content = lines.join('\n')
  }

  return { content, skipped }
}

function main() {
  const dungeonKey = process.argv[2]
  const dungeonKeys = dungeonKey ? [dungeonKey] : allDungeonKeys
  const damageThreshold = PLAYER_HP * HP_THRESHOLD

  console.log(
    `Player HP: ${PLAYER_HP.toLocaleString()}, threshold: ${damageThreshold.toLocaleString()} (${HP_THRESHOLD * 100}%)`,
  )

  for (const key of dungeonKeys) {
    const inputPath = path.join(outputDir, `${key}_abilities.json`)
    if (!fs.existsSync(inputPath)) {
      console.log(`No data for ${key} (${inputPath} not found), skipping`)
      continue
    }

    const abilities = JSON.parse(fs.readFileSync(inputPath, 'utf-8')) as AbilityData[]
    const { content, skipped } = generateFile(key, abilities)
    const outPath = path.join(abilitiesDir, `${key}.ts`)
    fs.writeFileSync(outPath, content)

    const relevant = abilities.filter(
      (a) =>
        a.avgHit >= damageThreshold &&
        a.spellId !== 1 &&
        a.spellName !== 'Melee' &&
        a.sourceName &&
        a.runsSeenIn >= 2,
    )
    console.log(
      `${key}: ${relevant.length - skipped.length} abilities written to ${outPath}`,
    )
    for (const name of skipped) {
      console.log(`  Skipped duplicate-component ability: ${name}`)
    }
  }
}

main()
