import type { Ability } from '../ability'

const scarsOfSuffering: Ability = {
  name: 'Scars of Suffering',
  id: 428232,
  passive: true,
  onByDefault: true,
  versIncrease: 0.04,
  icon: 'spell_fire_felimmolation',
}

const demonicWards: Ability = {
  name: 'Demonic Wards',
  id: 203513,
  onByDefault: true,
  drType: 'magic',
  icon: 'inv_belt_leather_demonhunter_a_01',
}

const demonicWardsVdh: Ability = {
  ...demonicWards,
  id: demonicWards.id + 1,
  spellId: demonicWards.id,
  passive: true,
  dr: 0.08,
  drType: undefined,
}

const illidariKnowledge: Ability = {
  name: 'Illidari Knowledge',
  id: 389696,
  passive: true,
  onByDefault: true,
  dr: 0.03,
  drType: 'magic',
  icon: 'spell_mage_overpowered',
  stacks: {
    type: 'talent',
    max: 2,
  },
}

const willOfTheIllidari: Ability = {
  name: 'Will of the Illidari',
  id: 389695,
  passive: true,
  onByDefault: true,
  healthIncrease: 0.03,
  icon: 'ability_demonhunter_spectank',
  stacks: {
    type: 'talent',
    max: 2,
  },
}

const blur: Ability = {
  name: 'Blur',
  id: 198589,
  dr: 0.2,
  icon: 'ability_demonhunter_blur',
}

export const desperateInstincts: Ability = {
  name: 'Desperate Instincts',
  id: 205411,
  passive: true,
  icon: 'spell_shadow_manafeed',
  abilityAugmentations: [
    {
      otherAbilityId: blur.id,
      field: 'dr',
      value: 0.1,
    },
  ],
  notes: 'Damage below 30% Health is reduced by 10%',
}

const deflectingDance: Ability = {
  name: 'Deflecting Dance',
  id: 427776,
  absorb: {
    healthMultiplier: 0.15,
  },
  icon: 'ability_ironmaidens_bladerush',
}

export const setFireToThePain: Ability = {
  name: 'Set Fire to the Pain',
  id: 452406,
  passive: true,
  icon: 'ability_demonhunter_empowerwards',
  notes: '5% non-Fire DR, 10% Fire DR',
}

const demonMuzzle: Ability = {
  name: 'Demon Muzzle',
  id: 388111,
  damageDealtReduction: 0.08,
  drType: 'magic',
  icon: 'spell_fire_fireballgreen',
}

const demonHide: Ability = {
  name: 'Demon Hide',
  id: 428241,
  passive: true,
  onByDefault: true,
  dr: 0.05,
  drType: 'physical',
  icon: 'misc_legionfall_demonhunter',
}

const immolationAura: Ability = {
  name: 'Immolation Aura',
  id: 258920,
  drType: 'magic',
  icon: 'ability_demonhunter_immolation',
}

const infernalArmor: Ability = {
  name: 'Infernal Armor',
  id: 320331,
  passive: true,
  onByDefault: true,
  icon: 'ability_demonhunter_immolation',
  abilityAugmentations: [
    {
      field: 'armorIncrease',
      otherAbilityId: immolationAura.id,
      value: 0.2,
    },
  ],
}

const felFlameFortification: Ability = {
  name: 'Fel Flame Fortification',
  id: 389705,
  passive: true,
  onByDefault: true,
  drType: 'magic',
  icon: 'spell_fire_felfire',
  abilityAugmentations: [
    {
      field: 'dr',
      otherAbilityId: immolationAura.id,
      value: 0.1,
    },
  ],
}

const metamorphosis: Ability = {
  name: 'Metamorphosis',
  id: 191427,
  healthIncrease: 0.5,
  armorIncrease: 2,
  icon: 'ability_demonhunter_metamorphasistank',
}

const metamorphosisVdh: Ability = {
  ...metamorphosis,
  id: metamorphosis.id + 1,
}

const fieryBrand: Ability = {
  name: 'Fiery Brand',
  id: 204021,
  damageDealtReduction: 0.4,
  icon: 'ability_demonhunter_fierybrand',
}

const soulmonger: Ability = {
  name: 'Soulmonger',
  id: 389711,
  icon: 'ability_demonhunter_shatteredsouls',
  absorb: {
    healthMultiplier: 0.01,
  },
  stacks: {
    type: 'stacks',
    max: 10,
    default: 5,
  },
}

const calcifiedSpikes: Ability = {
  name: 'Calcified Spikes',
  id: 389720,
  dr: 0.05,
  icon: 'ability_demonhunter_demonspikes',
}

const voidReaver: Ability = {
  name: 'Void Reaver (Frailty)',
  id: 268175,
  damageDealtReduction: 0.04,
  icon: 'spell_shadow_demonicempathy',
  stacks: {
    type: 'stacks',
    max: 10,
    default: 1,
  },
}

const painbringer: Ability = {
  name: 'Painbringer',
  id: 207387,
  dr: 0.03,
  icon: 'artifactability_vengeancedemonhunter_painbringer',
  stacks: {
    type: 'stacks',
    max: 2,
  },
}

const armyUntoOneself: Ability = {
  name: 'Army Unto Oneself',
  id: 442714,
  icon: 'ability_warlock_avoidance',
  heroTree: 'Aldrachi Reaver',
  dr: 0.1,
}

export const havocAbilities = [
  infernalArmor,
  scarsOfSuffering,
  demonicWards,
  illidariKnowledge,
  demonHide,
  willOfTheIllidari,
  setFireToThePain,
  demonMuzzle,
  immolationAura,
  armyUntoOneself,
  deflectingDance,
  blur,
  desperateInstincts,
]

export const vengeanceAbilities = [
  infernalArmor,
  felFlameFortification,
  demonicWardsVdh,
  illidariKnowledge,
  willOfTheIllidari,
  setFireToThePain,
  soulmonger,
  calcifiedSpikes,
  painbringer,
  immolationAura,
  metamorphosisVdh,
  voidReaver,
  demonMuzzle,
  fieryBrand,
]
