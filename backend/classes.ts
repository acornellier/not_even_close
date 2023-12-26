import { havocAbilities } from './classAbilities/demonHunter'
import { Ability } from './ability'
import {
  evokerDevAbilities,
  evokerAugPresAbilities,
} from './classAbilities/evoker'
import {
  monkMistweaverAbilities,
  monkWindwalkerAbilities,
} from './classAbilities/monk'
import { mageAbilities } from './classAbilities/mage'
import {
  shamanEnhAbilities,
  shamanEleRestoAbilities,
} from './classAbilities/shaman'
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
import { warlockAbilities } from './classAbilities/warlock'

export const classes = [
  'Death Knight',
  'Demon Hunter',
  'Druid',
  'Evoker (Aug/Pres)',
  'Evoker (Devastation)',
  'Hunter',
  'Mage',
  'Monk (Mistweaver)',
  'Monk (Windwalker)',
  'Paladin (Holy)',
  'Paladin (Retribution)',
  'Priest',
  'Rogue',
  'Shaman (Enhancement)',
  'Shaman (Ele/Resto)',
  'Warlock',
  'Warrior',
] as const

export type WowClass = typeof classes[number]

export let classAbilities: Record<WowClass, Ability[]>
classAbilities = {
  'Death Knight': deathKnightAbilities,
  'Demon Hunter': havocAbilities,
  Druid: druidAbilities,
  'Evoker (Aug/Pres)': evokerAugPresAbilities,
  'Evoker (Devastation)': evokerDevAbilities,
  Hunter: hunterAbilities,
  Mage: mageAbilities,
  'Monk (Mistweaver)': monkMistweaverAbilities,
  'Monk (Windwalker)': monkWindwalkerAbilities,
  'Paladin (Holy)': paladinHolyAbilities,
  'Paladin (Retribution)': paladinRetAbilities,
  Priest: priestAbilities,
  Rogue: rogueAbilities,
  'Shaman (Enhancement)': shamanEnhAbilities,
  'Shaman (Ele/Resto)': shamanEleRestoAbilities,
  Warlock: warlockAbilities,
  Warrior: warriorAbilities,
}
