import type { Ability } from '../ability'

const scarsOfSuffering: Ability = {
  name: 'Scars of Suffering',
  spellId: 428232,
  onByDefault: true,
  versIncrease: 0.04,
  icon: 'spell_fire_felimmolation',
}

const demonicWards: Ability = {
  name: 'Demonic Wards',
  spellId: 203513,
  onByDefault: true,
  dr: 0.1,
  drType: 'magic',
  icon: 'inv_belt_leather_demonhunter_a_01',
}

const demonicWardsVdh: Ability = {
  ...demonicWards,
  drType: undefined,
}

const illidariKnowledge: Ability = {
  name: 'Illidari Knowledge',
  spellId: 389696,
  onByDefault: true,
  dr: 0.05,
  drType: 'magic',
  icon: 'spell_mage_overpowered',
}

const willOfTheIllidari: Ability = {
  name: 'Will of the Illidari',
  spellId: 389695,
  onByDefault: true,
  healthIncrease: 0.05,
  icon: 'ability_demonhunter_spectank',
}

const blur: Ability = {
  name: 'Blur',
  spellId: 198589,
  dr: 0.2,
  icon: 'ability_demonhunter_blur',
}

const deflectingDance: Ability = {
  name: 'Deflecting Dance',
  spellId: 427776,
  absorb: {
    healthMultiplier: 0.15,
  },
  icon: 'ability_ironmaidens_bladerush',
}

const demonMuzzle: Ability = {
  name: 'Demon Muzzle',
  spellId: 388111,
  damageDealtReduction: 0.08,
  drType: 'magic',
  icon: 'spell_fire_fireballgreen',
}

const demonHide: Ability = {
  name: 'Demon Hide',
  spellId: 428241,
  onByDefault: true,
  dr: 0.05,
  drType: 'physical',
  icon: 'misc_legionfall_demonhunter',
}

const immolationAura: Ability = {
  name: 'Immolation Aura',
  spellId: 258920,
  drType: 'magic',
  icon: 'ability_demonhunter_immolation',
}

const infernalArmor: Ability = {
  name: 'Infernal Armor',
  spellId: 320331,
  onByDefault: true,
  icon: 'ability_demonhunter_immolation',
  abilityAugmentations: [
    {
      field: 'armorIncrease',
      otherSpellId: immolationAura.spellId,
      value: 0.2,
    },
  ],
}

const felFlameFortification: Ability = {
  name: 'Fel Flame Fortification',
  spellId: 389705,
  onByDefault: true,
  drType: 'magic',
  icon: 'spell_fire_felfire',
  abilityAugmentations: [
    {
      field: 'dr',
      otherSpellId: immolationAura.spellId,
      value: 0.1,
    },
  ],
}

const metamorphosis: Ability = {
  name: 'Metamorphosis',
  spellId: 191427,
  healthIncrease: 0.5,
  armorIncrease: 2,
  icon: 'ability_demonhunter_metamorphasistank',
}

const fieryBrand: Ability = {
  name: 'Fiery Brand',
  spellId: 204021,
  damageDealtReduction: 0.4,
  icon: 'ability_demonhunter_fierybrand',
}

const soulmonger: Ability = {
  name: 'Soulmonger',
  spellId: 389711,
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
  spellId: 389720,
  dr: 0.01,
  icon: 'ability_demonhunter_demonspikes',
  stacks: {
    type: 'stacks',
    max: 12,
    default: 6,
  },
}

const voidReaver: Ability = {
  name: 'Void Reaver (Frailty)',
  spellId: 268175,
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
  spellId: 207387,
  dr: 0.02,
  icon: 'artifactability_vengeancedemonhunter_painbringer',
  stacks: {
    type: 'stacks',
    max: 20,
    default: 5,
  },
}

const fieryResolve: Ability = {
  name: 'Fiery Resolve (2pc)',
  spellId: 425653,
  staminaIncrease: 0.02,
  icon: 'spell_fire_moltenblood',
  stacks: {
    type: 'stacks',
    max: 5,
  },
}

export const havocAbilities = [
  infernalArmor,
  scarsOfSuffering,
  demonicWards,
  illidariKnowledge,
  demonHide,
  willOfTheIllidari,
  demonMuzzle,
  metamorphosis,
  immolationAura,
  deflectingDance,
  blur,
]

export const vengeanceAbilities = [
  infernalArmor,
  felFlameFortification,
  demonicWardsVdh,
  illidariKnowledge,
  willOfTheIllidari,
  fieryResolve,
  soulmonger,
  calcifiedSpikes,
  painbringer,
  immolationAura,
  metamorphosis,
  voidReaver,
  demonMuzzle,
  fieryBrand,
]
