import { Ability } from '../ability'

const calmingPresenceMistweaver: Ability = {
  name: 'Calming Presence',
  id: 388664,
  onByDefault: true,
  dr: 0.06,
  icon: 'inv_misc_orb_01',
  wowheadLink:
    'https://www.wowhead.com/spell=388664/calming-presence?spellModifier=428200',
}

const calmingPresenceWindwalker: Ability = {
  ...calmingPresenceMistweaver,
  dr: 0.03,
}

const ancientTeachings: Ability = {
  name: 'Ancient Teachings',
  id: 388023,
  staminaIncrease: 0.05,
  icon: 'inv_misc_book_07',
}

const secretInfusion: Ability = {
  name: 'Secret Infusion (1 point)',
  talentPoints: 1,
  id: 388491,
  onByDefault: true,
  icon: 'ability_monk_chibrew',
  abilityAugmentations: [
    {
      otherSpellId: 322101,
      field: 'versIncrease',
      value: 0.08,
    },
  ],
}

const expelHarm: Ability = {
  name: 'TFT + Expel Harm',
  id: 322101,
  absorb: {
    healthMultiplier: 0.16,
    versAffected: true,
  },
  icon: 'ability_monk_expelharm',
}

const yulonsGraceMistweaver: Ability = {
  name: "Yulon's Grace",
  id: 414131,
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
  id: 122278,
  icon: 'ability_monk_dampenharm',
  wowheadLink: 'https://www.wowhead.com/spell=122278/dampen-harm',
  notes: '20-50% DR based on damage taken',
}

const diffuseMagic: Ability = {
  name: 'Diffuse Magic',
  id: 122783,
  dr: 0.6,
  drType: 'magic',
  icon: 'spell_monk_diffusemagic',
  wowheadLink: 'https://www.wowhead.com/spell=122783/diffuse-magic',
}

const fortBrew: Ability = {
  name: 'Fortifying Brew',
  id: 388917,
  dr: 0.2,
  healthIncrease: 0.2,
  icon: 'ability_monk_fortifyingale_new',
  wowheadLink: 'https://www.wowhead.com/spell=388917/fortifying-brew',
}

const touchOfKarma: Ability = {
  name: 'Touch of Karma',
  id: 122470,
  absorb: {
    healthMultiplier: 0.5,
  },
  icon: 'ability_monk_touchofkarma',
}

export const monkMistweaverAbilities = [
  calmingPresenceMistweaver,
  secretInfusion,
  ancientTeachings,
  expelHarm,
  yulonsGraceMistweaver,
  dampenHarm,
  diffuseMagic,
  fortBrew,
]

export const monkWindwalkerAbilities = [
  calmingPresenceWindwalker,
  yulonsGraceWindwalker,
  dampenHarm,
  diffuseMagic,
  fortBrew,
  touchOfKarma,
]
