/**
 * Typed WCL v2 queries. Field sets here were verified empirically against a live report —
 * notably, v2 damage events carry no hitPoints/maxHitPoints, so player health comes from
 * combatantInfo stamina instead.
 */
import { fetchWclCached } from './wclClient.ts'

/** WCL ability `type` is a school bitmask, returned as a string. */
export const SCHOOL_BY_BIT: Record<number, string> = {
  1: 'physical',
  2: 'holy',
  4: 'fire',
  8: 'nature',
  16: 'frost',
  32: 'shadow',
  64: 'arcane',
}

export function schoolsFromBitmask(bitmask: number): string[] {
  const schools = Object.entries(SCHOOL_BY_BIT)
    .filter(([bit]) => (bitmask & Number(bit)) !== 0)
    .map(([, school]) => school)

  return schools.length > 0 ? schools : ['physical']
}

export interface Ranking {
  report: { code: string; fightID: number }
  /** Keystone level for M+ encounters. */
  bracketData: number
  duration: number
  affixes: number[]
}

export interface Fight {
  id: number
  encounterID: number
  name: string
  keystoneLevel: number | null
  keystoneAffixes: number[] | null
  startTime: number
  endTime: number
  friendlyPlayers: number[]
}

export interface Actor {
  id: number
  name: string
  type: string
  subType: string
  gameID: number
}

export interface MasterAbility {
  gameID: number
  name: string
  /** School bitmask, as a string. */
  type: string
}

/** Verified event shape: no hitPoints/maxHitPoints in v2. */
export interface DamageEvent {
  timestamp: number
  type: string
  sourceID: number
  sourceInstance?: number
  targetID: number
  abilityGameID: number
  hitType: number
  amount: number
  /** Present only when something was absorbed or mitigated. */
  unmitigatedAmount?: number
  absorbed?: number
  /** Armor / DR mitigation. Absent (not 0) when nothing was mitigated. */
  mitigated?: number
  /** Present only on a killing blow — and legitimately 0 on one, so test key presence. */
  overkill?: number
  isAoE?: boolean
  tick?: boolean
  /** Dot-separated aura spell ids active on the target, e.g. "108446.61336." */
  buffs?: string
}

export interface CastEvent {
  timestamp: number
  sourceID: number
  sourceInstance?: number
  abilityGameID: number
  type: string
}

export interface DeathEvent {
  timestamp: number
  targetID: number
  killerID?: number
  killingAbilityGameID?: number
}

export interface PlayerDetail {
  id: number
  name: string
  type: string
  combatantInfo?: { stats?: Record<string, { min: number; max: number }> }
}

/**
 * True unmitigated damage.
 *
 * WCL omits these keys rather than sending zeros, and `amount` is fully net — post-mitigation,
 * post-absorb AND post-overkill. The identity is
 *   unmitigatedAmount === amount + overkill + absorbed + mitigated
 * so the fallback has to add overkill back too, or killing blows get under-counted by exactly
 * the amount that made them lethal.
 */
export function unmitigatedDamage(event: DamageEvent) {
  return (
    event.unmitigatedAmount ??
    event.amount + (event.overkill ?? 0) + (event.absorbed ?? 0) + (event.mitigated ?? 0)
  )
}

export async function fetchRankings(encounterId: number, page = 1): Promise<Ranking[]> {
  const data = await fetchWclCached<{
    worldData: { encounter: { characterRankings: { rankings: Ranking[] } } }
  }>(
    `query {
  worldData {
    encounter(id: ${encounterId}) {
      characterRankings(page: ${page}, leaderboard: LogsOnly)
    }
  }
}`,
    { label: `rankings ${encounterId} p${page}` },
  )

  return data.worldData.encounter.characterRankings?.rankings ?? []
}

export async function fetchFight(code: string, fightID: number): Promise<Fight | null> {
  const data = await fetchWclCached<{
    reportData: { report: { fights: Fight[] } }
  }>(
    `query {
  reportData {
    report(code: "${code}") {
      fights(fightIDs: [${fightID}]) {
        id encounterID name keystoneLevel keystoneAffixes startTime endTime friendlyPlayers
      }
    }
  }
}`,
    { label: `fight ${code}#${fightID}` },
  )

  return data.reportData.report.fights[0] ?? null
}

export async function fetchMasterData(code: string) {
  const data = await fetchWclCached<{
    reportData: {
      report: { masterData: { actors: Actor[]; abilities: MasterAbility[] } }
    }
  }>(
    `query {
  reportData {
    report(code: "${code}") {
      masterData { actors { id name type subType gameID } abilities { gameID name type } }
    }
  }
}`,
    { label: `masterData ${code}` },
  )

  return data.reportData.report.masterData
}

export async function fetchPlayerDetails(
  code: string,
  fightID: number,
): Promise<Record<string, PlayerDetail[]>> {
  const data = await fetchWclCached<{
    reportData: {
      report: { playerDetails: { data: { playerDetails: Record<string, PlayerDetail[]> } } }
    }
  }>(
    `query {
  reportData {
    report(code: "${code}") {
      playerDetails(fightIDs: [${fightID}], includeCombatantInfo: true)
    }
  }
}`,
    { label: `playerDetails ${code}#${fightID}` },
  )

  return data.reportData.report.playerDetails?.data?.playerDetails ?? {}
}

const EVENTS_PAGE_LIMIT = 10000

/** Pages through an events query until WCL stops handing back a nextPageTimestamp. */
async function fetchAllEvents<T>(
  code: string,
  fightID: number,
  dataType: string,
  hostilityType: string,
  startTime: number,
  endTime: number,
): Promise<T[]> {
  const events: T[] = []
  let pageStart = startTime

  for (;;) {
    const data = await fetchWclCached<{
      reportData: {
        report: { events: { data: T[]; nextPageTimestamp: number | null } }
      }
    }>(
      `query {
  reportData {
    report(code: "${code}") {
      events(
        dataType: ${dataType}
        hostilityType: ${hostilityType}
        fightIDs: [${fightID}]
        startTime: ${pageStart}
        endTime: ${endTime}
        limit: ${EVENTS_PAGE_LIMIT}
      ) { data nextPageTimestamp }
    }
  }
}`,
      { label: `${dataType} ${code}#${fightID} @${pageStart}` },
    )

    const page = data.reportData.report.events
    events.push(...page.data)

    if (!page.nextPageTimestamp || page.nextPageTimestamp <= pageStart) break
    pageStart = page.nextPageTimestamp
  }

  return events
}

export const fetchEnemyDamage = (
  code: string,
  fightID: number,
  startTime: number,
  endTime: number,
) =>
  fetchAllEvents<DamageEvent>(
    code,
    fightID,
    'DamageDone',
    'Enemies',
    startTime,
    endTime,
  )

export const fetchEnemyCasts = (
  code: string,
  fightID: number,
  startTime: number,
  endTime: number,
) => fetchAllEvents<CastEvent>(code, fightID, 'Casts', 'Enemies', startTime, endTime)

export const fetchDeaths = (
  code: string,
  fightID: number,
  startTime: number,
  endTime: number,
) => fetchAllEvents<DeathEvent>(code, fightID, 'Deaths', 'Friendlies', startTime, endTime)
