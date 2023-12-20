import {
  Ability,
  demonicWards,
  blur,
  calmingPresence,
  dampenHarm,
  diffuseMagic,
  fortBrew,
} from './abilities'

export const classes = [
  // 'Death Knight',
  'Demon Hunter',
  // 'Druid',
  // 'Evoker',
  // 'Hunter',
  // 'Mage',
  'Monk',
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
  'Demon Hunter': [demonicWards, blur],
  // Druid: [],
  // Evoker: [],
  // Hunter: [],
  // Mage: [],
  Monk: [calmingPresence, dampenHarm, diffuseMagic, fortBrew],
  // Paladin: [],
  // Priest: [],
  // Rogue: [],
  // Shaman: [],
  // Warlock: [],
  // Warrior: [],
}
