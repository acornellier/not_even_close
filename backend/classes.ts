import { havocAbilities } from './classAbilities/demonHunter'
import { Ability } from './ability'
import { evokerAbilities } from './classAbilities/evoker'
import { monkAbilities } from './classAbilities/monk'
import { mageAbilities } from './classAbilities/mage'
import { shamanAbilities } from './classAbilities/shaman'
import { rogueAbilities } from './classAbilities/rogue'
import { priestAbilities } from './classAbilities/priest'

export const classes = [
  // 'Death Knight',
  'Demon Hunter (Havoc)',
  // 'Druid',
  'Evoker',
  // 'Hunter',
  'Mage',
  'Monk (Mistweaver)',
  // 'Paladin',
  'Priest',
  'Rogue',
  'Shaman (Enh)',
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
  Mage: mageAbilities,
  'Monk (Mistweaver)': monkAbilities,
  // Paladin: [],
  Priest: priestAbilities,
  Rogue: rogueAbilities,
  'Shaman (Enh)': shamanAbilities,
  // Warlock: [],
  // Warrior: [],
}
