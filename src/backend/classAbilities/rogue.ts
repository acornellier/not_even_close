import { Ability } from '../ability'

const thiefsVersatility: Ability = {
  name: "Thief's Versatility",
  spellId: 381619,
  onByDefault: true,
  versIncrease: 0.04,
  iconName: 'ability_rogue_versatility',
}

const elusiveness: Ability = {
  name: 'Elusiveness',
  spellId: 79008,
  onByDefault: true,
  wowheadLink: 'https://www.wowhead.com/spell=79008/elusiveness',
  iconName: 'ability_rogue_turnthetables',
  abilityAugmentations: [
    {
      otherSpellId: 1966, // Feint
      field: 'dr',
      value: 0.2,
    },
    {
      otherSpellId: 5277, // Evasion
      field: 'dr',
      value: 0.2,
    },
  ],
}

const feint: Ability = {
  name: 'Feint',
  aoeDr: 0.4,
  spellId: 1966,
  wowheadLink: 'https://www.wowhead.com/spell=1966/feint',
  iconName: 'ability_rogue_feint',
}

const evasion: Ability = {
  name: 'Evasion',
  spellId: 5277,
  iconName: 'spell_shadow_shadowward',
}

const fadeToNothing: Ability = {
  name: 'Fade to Nothing',
  dr: 0.1,
  spellId: 382514,
  iconName: 'ability_warlock_everlastingaffliction',
}

const cloakedInShadows: Ability = {
  name: 'Cloaked in Shadows',
  spellId: 382515,
  absorb: {
    healthMultiplier: 0.3,
  },
  iconName: 'inv_helm_cloth_shadowmoonclan_b_01',
}

const precisionShot: Ability = {
  name: 'Precision Shot',
  dr: 0.05,
  spellId: 428377,
  iconName: 'inv_legendary_gun',
}

const exhilaratingExecution: Ability = {
  name: 'Exhilarating Execution',
  healthIncrease: 0.1,
  spellId: 428486,
  iconName: 'inv_weapon_hand_04',
}

export const rogueAssAbilities = [elusiveness, evasion, feint]

export const rogueOutlawAbilities = [
  thiefsVersatility,
  elusiveness,
  precisionShot,
  evasion,
  feint,
]

export const rogueSubAbilities = [
  elusiveness,
  fadeToNothing,
  exhilaratingExecution,
  cloakedInShadows,
  evasion,
  feint,
]
