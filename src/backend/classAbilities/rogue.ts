import type { Ability } from '../ability'

const thiefsVersatility: Ability = {
  name: "Thief's Versatility",
  id: 381619,
  onByDefault: true,
  versIncrease: 0.03,
  icon: 'ability_rogue_versatility',
}

const elusiveness: Ability = {
  name: 'Elusiveness',
  id: 79008,
  onByDefault: true,
  icon: 'ability_rogue_turnthetables',
  abilityAugmentations: [
    {
      otherAbilityId: 1966, // Feint
      field: 'dr',
      value: 0.2,
    },
    {
      otherAbilityId: 5277, // Evasion
      field: 'dr',
      value: 0.2,
    },
  ],
}

const feint: Ability = {
  name: 'Feint',
  aoeDr: 0.4,
  id: 1966,
  icon: 'ability_rogue_feint',
}

const evasion: Ability = {
  name: 'Evasion',
  id: 5277,
  icon: 'spell_shadow_shadowward',
}

const fadeToNothing: Ability = {
  name: 'Fade to Nothing',
  dr: 0.1,
  id: 382514,
  icon: 'ability_warlock_everlastingaffliction',
}

const cloakedInShadows: Ability = {
  name: 'Cloaked in Shadows',
  id: 382515,
  absorb: {
    healthMultiplier: 0.3,
  },
  icon: 'inv_helm_cloth_shadowmoonclan_b_01',
}

const precisionShot: Ability = {
  name: 'Precision Shot',
  damageDealtReduction: 0.05,
  id: 428377,
  icon: 'inv_legendary_gun',
}

const exhilaratingExecution: Ability = {
  name: 'Exhilarating Execution',
  healthIncrease: 0.1,
  id: 428486,
  icon: 'inv_weapon_hand_04',
}

const cloakOfShadows: Ability = {
  name: 'Cloak of Shadows',
  id: 31224,
  icon: 'spell_shadow_nethercloak',
  notes: 'Only the DR from Bait and Switch, does not calculate immunities',
  drType: 'physical',
}

const baitAndSwitch: Ability = {
  name: 'Bait and Switch',
  id: 457034,
  icon: 'ability_druid_earthandsky',
  heroTree: 'Deathstalker',
  notes: 'WARNING: disable this for physical damage hits',
  abilityAugmentations: [
    {
      otherAbilityId: evasion.id,
      field: 'dr',
      value: 0.2,
    },
    {
      otherAbilityId: cloakOfShadows.id,
      field: 'dr',
      value: 0.2,
    },
  ],
}

const smoke: Ability = {
  name: 'Smoke',
  id: 441247,
  icon: 'rogue_dirtytricks',
  heroTree: 'Trickster',
  damageDealtReduction: 0.05,
}

const mirrors: Ability = {
  name: 'Mirrors',
  id: 441250,
  icon: 'trade_archaeology_highbornesoulmirror',
  heroTree: 'Trickster',
  abilityAugmentations: [
    {
      otherAbilityId: feint.id,
      field: 'dr',
      value: 0.1,
    },
    {
      otherAbilityId: feint.id,
      field: 'aoeDr',
      value: 0.1,
    },
  ],
}

export const rogueAssAbilities = [
  elusiveness,
  cloakOfShadows,
  baitAndSwitch,
  evasion,
  feint,
]

export const rogueOutlawAbilities = [
  thiefsVersatility,
  elusiveness,
  mirrors,
  smoke,
  precisionShot,
  evasion,
  feint,
]

export const rogueSubAbilities = [
  elusiveness,
  mirrors,
  smoke,
  cloakOfShadows,
  baitAndSwitch,
  fadeToNothing,
  exhilaratingExecution,
  cloakedInShadows,
  evasion,
  feint,
]
