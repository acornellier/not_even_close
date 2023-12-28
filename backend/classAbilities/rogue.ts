import { Ability } from '../ability'

export const feint: Ability = {
  name: 'Feint',
  aoeDr: 0.4,
  spellId: 1966,
  wowheadLink: 'https://www.wowhead.com/spell=1966/feint',
  iconName: 'ability_rogue_feint',
}

export const elusiveness: Ability = {
  name: 'Feint (Elusiveness)',
  dr: 0.2,
  spellId: 79008,
  wowheadLink: 'https://www.wowhead.com/spell=79008/elusiveness',
  iconName: 'ability_rogue_turnthetables',
  notes: 'Do not select both this and Feint',
}

export const evasion: Ability = {
  name: 'Evasion (Elusiveness)',
  dr: 0.2,
  spellId: 5277,
  iconName: 'spell_shadow_shadowward',
}

export const fadeToNothing: Ability = {
  name: 'Fade to Nothing',
  dr: 0.1,
  spellId: 382514,
  iconName: 'ability_warlock_everlastingaffliction',
}

export const cloakedInShadows: Ability = {
  name: 'Cloaked in Shadows',
  healthIncrease: 0.3,
  spellId: 382515,
  iconName: 'inv_helm_cloth_shadowmoonclan_b_01',
}

export const precisionShot: Ability = {
  name: 'Precision Shot',
  dr: 0.05,
  spellId: 428377,
  iconName: 'inv_legendary_gun',
}

export const rogueAssAbilities = [feint, elusiveness, evasion]
export const rogueOutlawAbilities = [feint, elusiveness, evasion, precisionShot]
export const rogueSubAbilities = [
  feint,
  elusiveness,
  evasion,
  fadeToNothing,
  cloakedInShadows,
]
