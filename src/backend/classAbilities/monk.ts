import type { Ability } from '../ability'

const calmingPresenceMistweaver: Ability = {
  name: 'Calming Presence',
  id: 388664,
  passive: true,
  onByDefault: true,
  dr: 0.06,
  icon: 'inv_misc_orb_01',
}

const calmingPresenceWindwalker: Ability = {
  ...calmingPresenceMistweaver,
  id: calmingPresenceMistweaver.id + 1,
  spellId: calmingPresenceMistweaver.id,
  dr: 0.03,
}

const jadefireTeachings: Ability = {
  name: 'Jadefire Teachings',
  id: 467293,
  staminaIncrease: 0.08,
  icon: 'inv_misc_book_07',
  passive: true,
  onByDefault: true,
}

const secretInfusion: Ability = {
  name: 'Secret Infusion',
  id: 388491,
  onByDefault: true,
  icon: 'ability_monk_chibrew',
  versIncrease: 0.04,
  stacks: {
    type: 'talent',
    max: 2,
  },
}

const yulonsGraceMistweaver: Ability = {
  name: "Yulon's Grace",
  id: 414131,
  icon: 'ability_monk_dragonkick',
  absorb: {
    healthMultiplier: 0.01,
    absorbType: 'magic',
  },
  stacks: {
    type: 'stacks',
    max: 10,
  },
}

const yulonsGraceWindwalker: Ability = {
  ...yulonsGraceMistweaver,
  id: yulonsGraceMistweaver.id + 1,
  absorb: {
    ...yulonsGraceMistweaver.absorb,
    healthMultiplier: 0.006,
  },
}

const fortBrew: Ability = {
  name: 'Fortifying Brew',
  id: 388917,
  dr: 0.2,
  healthIncrease: 0.2,
  icon: 'ability_monk_fortifyingale_new',
}

const touchOfKarma: Ability = {
  name: 'Touch of Karma',
  id: 122470,
  absorb: {
    healthMultiplier: 0.5,
  },
  icon: 'ability_monk_touchofkarma',
}

const martialInstincts: Ability = {
  name: 'Martial Instincts',
  id: 450427,
  passive: true,
  icon: 'ability_monk_palmstrike',
  aoeDr: 0.02,
  onByDefault: true,
  stacks: {
    type: 'talent',
    max: 2,
  },
}

const ironshellBrew: Ability = {
  name: 'Ironshell Brew',
  id: 388814,
  passive: true,
  icon: 'ability_monk_fortifyingale_new',
  abilityAugmentations: [
    {
      otherAbilityId: fortBrew.id,
      field: 'healthIncrease',
      value: 0.1,
    },
    {
      otherAbilityId: fortBrew.id,
      field: 'dr',
      value: 0.1,
    },
  ],
}

const niuzaosProtection: Ability = {
  name: "Niuazo's Proection",
  id: 442747,
  passive: true,
  icon: 'ability_monk_chargingoxwave',
  heroTree: 'Conduit of the Celestials',
  abilityAugmentations: [
    {
      otherAbilityId: fortBrew.id,
      field: 'absorb',
      absorbField: 'healthMultiplier',
      value: 0.25,
    },
  ],
}

const jadeSanctuary: Ability = {
  name: 'Jade Sanctuary',
  id: 443059,
  icon: 'ability_monk_jadeserpentbreath',
  heroTree: 'Conduit of the Celestials',
  dr: 0.15,
}

export const monkMistweaverAbilities = [
  ironshellBrew,
  niuzaosProtection,
  calmingPresenceMistweaver,
  martialInstincts,
  secretInfusion,
  jadefireTeachings,
  yulonsGraceMistweaver,
  jadeSanctuary,
  fortBrew,
]

export const monkWindwalkerAbilities = [
  ironshellBrew,
  niuzaosProtection,
  calmingPresenceWindwalker,
  martialInstincts,
  yulonsGraceWindwalker,
  jadeSanctuary,
  fortBrew,
  touchOfKarma,
]
