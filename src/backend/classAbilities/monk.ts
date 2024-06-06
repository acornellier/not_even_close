import type { Ability } from '../ability'

const calmingPresenceMistweaver: Ability = {
  name: 'Calming Presence',
  spellId: 388664,
  onByDefault: true,
  dr: 0.06,
  icon: 'inv_misc_orb_01',
}

const calmingPresenceWindwalker: Ability = {
  ...calmingPresenceMistweaver,
  dr: 0.03,
}

const ancientTeachings: Ability = {
  name: 'Ancient Teachings',
  spellId: 388023,
  staminaIncrease: 0.05,
  icon: 'inv_misc_book_07',
}

const secretInfusion: Ability = {
  name: 'Secret Infusion',
  spellId: 388491,
  onByDefault: true,
  icon: 'ability_monk_chibrew',
  abilityAugmentations: [
    {
      otherSpellId: 322101,
      field: 'versIncrease',
      value: 0.08,
    },
  ],
  stacks: {
    type: 'talent',
    max: 2,
    default: 1,
    values: [0.08, 0.15],
  },
}

const expelHarm: Ability = {
  name: 'TFT + Expel Harm',
  spellId: 322101,
  absorb: {
    healthMultiplier: 0.16,
    versAffected: true,
  },
  icon: 'ability_monk_expelharm',
}

const yulonsGraceMistweaver: Ability = {
  name: "Yulon's Grace",
  spellId: 414131,
  absorb: {
    healthMultiplier: 0.15,
    absorbType: 'magic',
  },
  icon: 'ability_monk_dragonkick',
}

const yulonsGraceWindwalker: Ability = {
  ...yulonsGraceMistweaver,
  absorb: {
    ...yulonsGraceMistweaver.absorb,
    healthMultiplier: 0.1,
  },
}

export const dampenHarm: Ability = {
  name: 'Dampen Harm',
  spellId: 122278,
  icon: 'ability_monk_dampenharm',
  notes: '20-50% DR based on damage taken',
}

const diffuseMagic: Ability = {
  name: 'Diffuse Magic',
  spellId: 122783,
  dr: 0.6,
  drType: 'magic',
  icon: 'spell_monk_diffusemagic',
}

const fortBrew: Ability = {
  name: 'Fortifying Brew',
  spellId: 388917,
  dr: 0.2,
  healthIncrease: 0.2,
  icon: 'ability_monk_fortifyingale_new',
}

const touchOfKarma: Ability = {
  name: 'Touch of Karma',
  spellId: 122470,
  absorb: {
    healthMultiplier: 0.5,
  },
  icon: 'ability_monk_touchofkarma',
}

const martialInstincts: Ability = {
  name: 'Martial Instincts',
  spellId: 450427,
  icon: 'ability_monk_palmstrike',
  aoeDr: 0.02,
  stacks: {
    type: 'talent',
    max: 2,
  },
}

const ironshellBrew: Ability = {
  name: 'Ironshell Brew',
  spellId: 388814,
  icon: 'ability_monk_fortifyingale_new',
  abilityAugmentations: [
    {
      otherSpellId: fortBrew.spellId,
      field: 'healthIncrease',
      value: 0.1,
    },
    {
      otherSpellId: fortBrew.spellId,
      field: 'dr',
      value: 0.1,
    },
  ],
}

export const monkMistweaverAbilities = [
  ironshellBrew,
  calmingPresenceMistweaver,
  martialInstincts,
  secretInfusion,
  ancientTeachings,
  expelHarm,
  yulonsGraceMistweaver,
  diffuseMagic,
  fortBrew,
]

export const monkWindwalkerAbilities = [
  ironshellBrew,
  calmingPresenceWindwalker,
  martialInstincts,
  yulonsGraceWindwalker,
  diffuseMagic,
  fortBrew,
  touchOfKarma,
]
