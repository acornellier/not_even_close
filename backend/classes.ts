import { havocAbilities } from './classAbilities/demonHunter'
import { Ability } from './ability'
import { evokerAbilities } from './classAbilities/evoker'
import { monkAbilities } from './classAbilities/monk'
import { mageAbilities } from './classAbilities/mage'
import { shamanAbilities } from './classAbilities/shaman'
import { rogueAbilities } from './classAbilities/rogue'
import { priestAbilities } from './classAbilities/priest'
import { hunterAbilities } from './classAbilities/hunter'
import { deathKnightAbilities } from './classAbilities/deathKnight'
import { druidAbilities } from './classAbilities/druid'
import { warriorAbilities } from './classAbilities/warrior'
import {
  paladinHolyAbilities,
  paladinRetAbilities,
} from './classAbilities/paladin'

export const classes = [
  'Death Knight',
  'Demon Hunter (Havoc)',
  'Druid',
  'Evoker',
  'Hunter',
  'Mage',
  'Monk (Mistweaver)',
  'Paladin (Holy)',
  'Paladin (Ret)',
  'Priest',
  'Rogue',
  'Shaman (Enh)',
  // 'Warlock',
  'Warrior',
] as const

export type WowClass = typeof classes[number]

export const classAbilities: Record<WowClass, Ability[]> = {
  'Death Knight': deathKnightAbilities,
  'Demon Hunter (Havoc)': havocAbilities,
  Druid: druidAbilities,
  Evoker: evokerAbilities,
  Hunter: hunterAbilities,
  Mage: mageAbilities,
  'Monk (Mistweaver)': monkAbilities,
  'Paladin (Holy)': paladinHolyAbilities,
  'Paladin (Ret)': paladinRetAbilities,
  Priest: priestAbilities,
  Rogue: rogueAbilities,
  'Shaman (Enh)': shamanAbilities,
  // Warlock: [],
  Warrior: warriorAbilities,
}
