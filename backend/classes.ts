import { havocAbilities } from './classAbilities/demonHunter'
import { Ability } from './ability'
import {
  evokerDevAbilities,
  evokerAugAbilities,
  evokerPresAbilities,
} from './classAbilities/evoker'
import { monkMistweaverAbilities, monkWindwalkerAbilities } from './classAbilities/monk'
import {
  mageArcaneAbilities,
  mageFireAbilities,
  mageFrostAbilities,
} from './classAbilities/mage'
import {
  shamanEnhAbilities,
  shamanEleAbilities,
  shamanRestoAbilities,
} from './classAbilities/shaman'
import {
  priestDiscAbilities,
  priestHolyAbilities,
  priestShadowAbilities,
} from './classAbilities/priest'
import { hunterAbilities } from './classAbilities/hunter'
import { deathKnightAbilities } from './classAbilities/deathKnight'
import { warriorArmsAbilities, warriorFuryAbilities } from './classAbilities/warrior'
import { paladinHolyAbilities, paladinRetAbilities } from './classAbilities/paladin'
import { warlockAbilities } from './classAbilities/warlock'
import {
  druidBalanceAbilities,
  druidFeralAbilities,
  druidRestoAbilities,
} from './classAbilities/druid'
import {
  rogueAssAbilities,
  rogueOutlawAbilities,
  rogueSubAbilities,
} from './classAbilities/rogue'

export const classes = [
  'Death Knight',
  'Demon Hunter',
  'Druid (Balance)',
  'Druid (Feral)',
  'Druid (Restoration)',
  'Evoker (Augmentation)',
  'Evoker (Devastation)',
  'Evoker (Preservation)',
  'Hunter',
  'Mage (Arcane)',
  'Mage (Fire)',
  'Mage (Frost)',
  'Monk (Mistweaver)',
  'Monk (Windwalker)',
  'Paladin (Holy)',
  'Paladin (Retribution)',
  'Priest (Disc)',
  'Priest (Holy)',
  'Priest (Shadow)',
  'Rogue (Assassination)',
  'Rogue (Outlaw)',
  'Rogue (Subtlety)',
  'Shaman (Enhancement)',
  'Shaman (Elemental)',
  'Shaman (Restoration)',
  'Warlock',
  'Warrior (Arms)',
  'Warrior (Fury)',
] as const

export type WowClass = typeof classes[number]

export const classAbilities: Record<WowClass, Ability[]> = {
  'Death Knight': deathKnightAbilities,
  'Demon Hunter': havocAbilities,
  'Druid (Balance)': druidBalanceAbilities,
  'Druid (Feral)': druidFeralAbilities,
  'Druid (Restoration)': druidRestoAbilities,
  'Evoker (Augmentation)': evokerAugAbilities,
  'Evoker (Devastation)': evokerDevAbilities,
  'Evoker (Preservation)': evokerPresAbilities,
  Hunter: hunterAbilities,
  'Mage (Arcane)': mageArcaneAbilities,
  'Mage (Fire)': mageFireAbilities,
  'Mage (Frost)': mageFrostAbilities,
  'Monk (Mistweaver)': monkMistweaverAbilities,
  'Monk (Windwalker)': monkWindwalkerAbilities,
  'Paladin (Holy)': paladinHolyAbilities,
  'Paladin (Retribution)': paladinRetAbilities,
  'Priest (Disc)': priestDiscAbilities,
  'Priest (Holy)': priestHolyAbilities,
  'Priest (Shadow)': priestShadowAbilities,
  'Rogue (Assassination)': rogueAssAbilities,
  'Rogue (Outlaw)': rogueOutlawAbilities,
  'Rogue (Subtlety)': rogueSubAbilities,
  'Shaman (Enhancement)': shamanEnhAbilities,
  'Shaman (Elemental)': shamanEleAbilities,
  'Shaman (Restoration)': shamanRestoAbilities,
  Warlock: warlockAbilities,
  'Warrior (Arms)': warriorArmsAbilities,
  'Warrior (Fury)': warriorFuryAbilities,
}
