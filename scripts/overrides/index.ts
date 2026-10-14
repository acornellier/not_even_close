import { murdOverrides } from './murd.ts'
import { naloOverrides } from './nalo.ts'
import { valeOverrides } from './vale.ts'
import { voidOverrides } from './void.ts'
import { fangOverrides } from './fang.ts'
import { rlpOverrides } from './rlp.ts'
import { tosOverrides } from './tos.ts'
import { krOverrides } from './kr.ts'

/**
 * Hand-made calls that the logs and spell data can't produce, one file per dungeon, keyed by
 * spell id.
 *
 * `yarn write` applies these on every run when it generates the dungeon's JSON. The JSON is
 * pure output and is overwritten wholesale — any call you want to keep belongs here.
 *
 * The avoidable flags below are a first pass made by reading Wowhead tooltips (see
 * `yarn descriptions`). The rules applied were:
 *   - ground you can walk out of  ("players standing within", "players within it")
 *   - impacts at a targeted spot  ("at players' locations", "within N yards of the impact")
 *   - frontal cones and paths     ("in front of", "caught in its path")
 *   - Bolts, which are single-target interruptible casts
 *
 * Deliberately NOT marked: anything hitting "all players", tank melee and busters, and DoTs
 * applied directly to a player — none of those are dodged by moving.
 */

export interface SpellOverride {
  avoidable?: boolean
  /** Leave the spell out of the dungeon's abilities entirely. */
  exclude?: boolean
  /** Use only the direct hit, dropping the DoT that follows it. */
  initialHitOnly?: boolean
  /** Write the spell even when the scraper doesn't rate it lethal. */
  include?: boolean
  /** Tick count, for DoTs grimoire has no periodic data for. */
  ticks?: number
  /** Damage is shared between this many players; the ability takes one player's share. */
  splitBetween?: number
  ignoresArmor?: boolean
  notes?: string
  /** Why this call was made. Kept so the next person can disagree with it. */
  reason: string
}

export type SpellOverrides = Record<number, SpellOverride>

const overridesByDungeon: Record<string, SpellOverrides> = {
  murd: murdOverrides,
  nalo: naloOverrides,
  vale: valeOverrides,
  void: voidOverrides,
  fang: fangOverrides,
  rlp: rlpOverrides,
  tos: tosOverrides,
  kr: krOverrides,
}

/** The override for any of a candidate's spell ids, if one was made. */
export function spellOverride(dungeonKey: string, spellIds: number[]) {
  const overrides = overridesByDungeon[dungeonKey] ?? {}
  return spellIds.map((spellId) => overrides[spellId]).find(Boolean)
}
