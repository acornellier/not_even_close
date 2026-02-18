import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { fetchWcl } from './wcl.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(__dirname, 'output')

const dungeonEncounters: Record<string, number> = {
  magi: 62811,
  cavns: 62874,
  xenas: 62915,
  wind: 62805,
  aa: 162526,
  pit: 60658,
  seat: 411753,
  sky: 111209,
}

interface Ranking {
  report: { code: string; fightID: number }
  bracketData: number
  duration: number
}

interface RankingsQuery {
  worldData: {
    encounter: {
      characterRankings: {
        rankings: Ranking[]
      }
    }
  }
}

interface AbilityEntry {
  name: string
  guid: number
  type: number
  actorName: string
  actorType: string
  total: number
  totalReduced: number
  hitCount: number
  tickCount: number
  uses: number
  targets?: Array<{ name: string; total: number; type: string }>
}

interface TableDataQuery {
  reportData: {
    report: {
      table: {
        data: {
          entries: AbilityEntry[]
        }
      }
    }
  }
}

interface AbilityAgg {
  spellId: number
  spellName: string
  sourceName: string
  isBoss: boolean
  totalDamage: number
  totalMitigated: number
  totalHits: number
  totalTargetCount: number
  tankTargetCount: number
  runsSeenIn: number
  firstCastMs: number | null
}

async function fetchTopRankings(encounterId: number, count: number): Promise<Ranking[]> {
  const query = `
query {
  worldData {
    encounter(id: ${encounterId}) {
      characterRankings(page: 1, leaderboard: LogsOnly)
    }
  }
}`
  const data = await fetchWcl<RankingsQuery>(query)
  const allRankings = data.worldData.encounter.characterRankings.rankings
  if (!allRankings) {
    throw new Error(
      `No ranking data for encounter ${encounterId}. Response: ${JSON.stringify(data.worldData.encounter.characterRankings)}`,
    )
  }

  // Deduplicate by report code since multiple characters can be from the same run
  const seen = new Set<string>()
  const unique: Ranking[] = []
  for (const r of allRankings) {
    if (!seen.has(r.report.code)) {
      seen.add(r.report.code)
      unique.push(r)
    }
    if (unique.length >= count) break
  }
  return unique
}

async function fetchTankNames(code: string, fightID: number): Promise<Set<string>> {
  const query = `
query {
  reportData {
    report(code: "${code}") {
      playerDetails(fightIDs: [${fightID}])
    }
  }
}`
  const data = await fetchWcl<{
    reportData: {
      report: {
        playerDetails: { data: { playerDetails: { tanks: Array<{ name: string }> } } }
      }
    }
  }>(query)

  const tanks = data.reportData.report.playerDetails?.data?.playerDetails?.tanks ?? []
  return new Set(tanks.map((t) => t.name))
}

async function fetchFirstCastTimes(
  code: string,
  fightID: number,
): Promise<Map<number, number>> {
  const query = `
query {
  reportData {
    report(code: "${code}") {
      events(dataType: Casts, fightIDs: [${fightID}], hostilityType: Enemies, limit: 1000) {
        data
      }
    }
  }
}`
  const data = await fetchWcl<{
    reportData: {
      report: { events: { data: Array<{ abilityGameID: number; timestamp: number }> } }
    }
  }>(query)

  const firstCast = new Map<number, number>()
  for (const event of data.reportData.report.events.data) {
    if (!firstCast.has(event.abilityGameID)) {
      firstCast.set(event.abilityGameID, event.timestamp)
    }
  }
  return firstCast
}

async function fetchDamageDoneTable(
  code: string,
  fightID: number,
): Promise<AbilityEntry[]> {
  const query = `
query {
  reportData {
    report(code: "${code}") {
      table(dataType: DamageDone, fightIDs: [${fightID}], hostilityType: Enemies, viewBy: Ability)
    }
  }
}`
  const data = await fetchWcl<TableDataQuery>(query)
  return data.reportData.report.table.data.entries
}

function aggregateAbilities(
  allRunEntries: AbilityEntry[][],
  firstCastTimes: Map<number, number>,
  tankNames: Set<string>,
): AbilityAgg[] {
  const agg = new Map<number, AbilityAgg>()
  const seenPerRun = new Map<number, Set<number>>()

  for (let runIdx = 0; runIdx < allRunEntries.length; runIdx++) {
    const entries = allRunEntries[runIdx]!
    for (const ability of entries) {
      const hits = ability.hitCount + ability.tickCount
      const existing = agg.get(ability.guid)

      const targetCount = ability.targets?.length ?? 0
      const tankTargetCount =
        ability.targets?.filter((t) => tankNames.has(t.name)).length ?? 0

      if (existing) {
        existing.totalDamage += ability.total
        existing.totalMitigated += ability.totalReduced
        existing.totalHits += hits
        existing.totalTargetCount += targetCount
        existing.tankTargetCount += tankTargetCount
      } else {
        agg.set(ability.guid, {
          spellId: ability.guid,
          spellName: ability.name,
          sourceName: ability.actorName,
          isBoss: ability.actorType === 'Boss',
          totalDamage: ability.total,
          totalMitigated: ability.totalReduced,
          totalHits: hits,
          totalTargetCount: targetCount,
          tankTargetCount,
          runsSeenIn: 0,
          firstCastMs: firstCastTimes.get(ability.guid) ?? null,
        })
      }

      if (!seenPerRun.has(ability.guid)) {
        seenPerRun.set(ability.guid, new Set())
      }
      seenPerRun.get(ability.guid)!.add(runIdx)
    }
  }

  for (const [spellId, runSet] of seenPerRun) {
    agg.get(spellId)!.runsSeenIn = runSet.size
  }

  return Array.from(agg.values())
}

function formatOutput(abilities: AbilityAgg[], numRuns: number) {
  return abilities
    .map((a) => ({
      spellId: a.spellId,
      spellName: a.spellName,
      sourceName: a.sourceName,
      isBoss: a.isBoss,
      avgHit: Math.round(a.totalHits > 0 ? a.totalDamage / a.totalHits : 0),
      avgMitigated: Math.round(a.totalHits > 0 ? a.totalMitigated / a.totalHits : 0),
      totalHits: a.totalHits,
      hitsPerRun: Math.round((a.totalHits / numRuns) * 10) / 10,
      avgTargetsPerRun: Math.round((a.totalTargetCount / numRuns) * 10) / 10,
      tankTargetFraction:
        a.totalTargetCount > 0
          ? Math.round((a.tankTargetCount / a.totalTargetCount) * 100) / 100
          : null,
      runsSeenIn: a.runsSeenIn,
      firstCastMs: a.firstCastMs,
    }))
    .sort((a, b) => b.avgHit - a.avgHit)
}

async function main() {
  const dungeonKey = process.argv[2]
  let dungeonKeys: string[] = []

  if (dungeonKey) {
    dungeonKeys.push(dungeonKey)
  } else if (!dungeonKey) {
    dungeonKeys = Object.keys(dungeonEncounters)
  }

  for (const key of dungeonKeys) {
    const encounterId = dungeonEncounters[key]
    if (!encounterId) {
      console.error(`Unknown dungeon key: ${key}`)
      console.log(`Available: ${Object.keys(dungeonEncounters).join(', ')}`)
      process.exit(1)
    }

    console.log(`Fetching top rankings for ${key} (encounter ${encounterId})...`)
    const rankings = await fetchTopRankings(encounterId, 5)

    if (rankings.length === 0) {
      console.log(`No rankings found for ${key}, skipping`)
      continue
    }

    const allRunEntries: AbilityEntry[][] = []
    let firstCastTimes = new Map<number, number>()
    const tankNames = new Set<string>()
    for (const ranking of rankings) {
      const { code, fightID } = ranking.report
      console.log(`Fetching damage-done table for ${code} fight ${fightID}...`)
      try {
        const entries = await fetchDamageDoneTable(code, fightID)
        allRunEntries.push(entries)
        if (firstCastTimes.size === 0) {
          firstCastTimes = await fetchFirstCastTimes(code, fightID)
        }
        const runTanks = await fetchTankNames(code, fightID)
        for (const name of runTanks) tankNames.add(name)
      } catch (err) {
        console.log(`  Skipping ${code}: ${(err as Error).message}`)
      }
    }

    const aggregated = aggregateAbilities(allRunEntries, firstCastTimes, tankNames)
    const output = formatOutput(aggregated, allRunEntries.length)

    fs.mkdirSync(outputDir, { recursive: true })
    const outPath = path.join(outputDir, `${key}_abilities.json`)
    fs.writeFileSync(outPath, JSON.stringify(output, null, 2))
    console.log(`Wrote ${output.length} abilities to ${outPath}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
