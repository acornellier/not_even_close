import {
  demonicWards,
  blur,
  calmingPresence,
  dampenHarm,
  diffuseMagic,
  fortBrew,
} from './classAbilities'
import { Ability } from './ability'

export const classes = [
  // 'Death Knight',
  'Demon Hunter (Havoc)',
  // 'Druid',
  // 'Evoker',
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
  'Demon Hunter (Havoc)': [demonicWards, blur],
  // Druid: [],
  // Evoker: [],
  // Hunter: [],
  // Mage: [],
  'Monk (Mistweaver)': [calmingPresence, dampenHarm, diffuseMagic, fortBrew],
  // Paladin: [],
  // Priest: [],
  // Rogue: [],
  // Shaman: [],
  // Warlock: [],
  // Warrior: [],
}
