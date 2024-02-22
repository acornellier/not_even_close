import { Ability } from '../ability'

export const calmingPresenceMistweaver: Ability = {
  name: 'Calming Presence',
  spellId: 388664,
  onByDefault: true,
  dr: 0.06,
  iconName: 'inv_misc_orb_01',
  wowheadLink:
    'https://www.wowhead.com/spell=388664/calming-presence?spellModifier=428200',
}

export const calmingPresenceWindwalker: Ability = {
  ...calmingPresenceMistweaver,
  dr: 0.03,
}

export const ancientTeachings: Ability = {
  name: 'Ancient Teachings',
  spellId: 388023,
  staminaIncrease: 0.05,
  iconName: 'inv_misc_book_07',
}

export const secretInfusion: Ability = {
  name: 'Secret Infusion (1 point)',
  talentPoints: 1,
  spellId: 388491,
  onByDefault: true,
  iconName: 'ability_monk_chibrew',
  abilityAugmentations: [
    {
      otherSpellId: 322101,
      field: 'versIncrease',
      value: 0.08,
    },
  ],
}

export const expelHarm: Ability = {
  name: 'TFT + Expel Harm',
  spellId: 322101,
  absorbHealthMultiplier: 0.16,
  absorbVersAffected: true,
  iconName: 'ability_monk_expelharm',
}

export const yulonsGraceMistweaver: Ability = {
  name: "Yulon's Grace",
  spellId: 414131,
  absorbHealthMultiplier: 0.15,
  absorbType: 'magic',
  iconName: 'ability_monk_dragonkick',
}

export const yulonsGraceWindwalker: Ability = {
  ...yulonsGraceMistweaver,
  absorbHealthMultiplier: 0.1,
}

export const dampenHarm: Ability = {
  name: 'Dampen Harm',
  spellId: 122278,
  iconName: 'ability_monk_dampenharm',
  wowheadLink: 'https://www.wowhead.com/spell=122278/dampen-harm',
  notes: '20-50% DR based on damage taken',
}

export const diffuseMagic: Ability = {
  name: 'Diffuse Magic',
  spellId: 122783,
  dr: 0.6,
  drType: 'magic',
  iconName: 'spell_monk_diffusemagic',
  wowheadLink: 'https://www.wowhead.com/spell=122783/diffuse-magic',
}

export const fortBrew: Ability = {
  name: 'Fortifying Brew',
  spellId: 388917,
  dr: 0.2,
  healthIncrease: 0.2,
  iconName: 'ability_monk_fortifyingale_new',
  wowheadLink: 'https://www.wowhead.com/spell=388917/fortifying-brew',
}

export const touchOfKarma: Ability = {
  name: 'Touch of Karma',
  spellId: 122470,
  absorbHealthMultiplier: 0.5,
  iconName: 'ability_monk_touchofkarma',
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
