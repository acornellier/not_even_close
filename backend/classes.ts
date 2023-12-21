import { havocAbilities } from './classAbilities/demonHunter'
import { Ability } from './ability'
import { evokerAbilities } from './classAbilities/evoker'
import { monkAbilities } from './classAbilities/monk'

export const classes = [
  // 'Death Knight',
  'Demon Hunter (Havoc)',
  // 'Druid',
  'Evoker',
  // 'Hunter',
  // 'Mage',
  'Monk (Mistweaver)',
  // 'Paladin',
  // 'Priest',
  // 'Rogue',
  // 'Shaman',
  // 'Warlock',
  // 'Warrior',
] as const

export type WowClass = typeof classes[number]

export const classAbilities: Record<WowClass, Ability[]> = {
  // 'Death Knight': [],
  'Demon Hunter (Havoc)': havocAbilities,
  // Druid: [],
  Evoker: evokerAbilities,
  // Hunter: [],
  // Mage: [],
  'Monk (Mistweaver)': monkAbilities,
  // Paladin: [],
  // Priest: [],
  // Rogue: [],
  // Shaman: [],
  // Warlock: [],
  // Warrior: [],
}
