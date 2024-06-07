import type { Ability } from '../ability'

export const fortitude: Ability = {
  name: 'Power Word: Fortitude',
  id: 21562,
  staminaIncrease: 0.05,
  associatedClass: 'Priest',
  icon: 'spell_holy_wordfortitude',
}

export const blackAttunement: Ability = {
  name: 'Black Attunement',
  id: 403264,
  healthIncrease: 0.04,
  associatedSpec: { class: 'Evoker', spec: 'Augmentation' },
  icon: 'ability_evoker_blackattunement',
}

export const devotionAura: Ability = {
  name: 'Devotion Aura',
  id: 465,
  dr: 0.03,
  associatedClass: 'Paladin',
  icon: 'spell_holy_devotionaura',
}

export const aspectsFavor: Ability = {
  name: "Aspects' Favor",
  id: 407243,
  associatedSpec: { class: 'Evoker', spec: 'Augmentation' },
  icon: 'ability_evoker_aspectsfavor',
  abilityAugmentations: [
    {
      otherAbilityId: blackAttunement.id,
      field: 'healthIncrease',
      value: 0.02,
    },
  ],
  stacks: {
    type: 'talent',
    max: 2,
  },
}

export const markOfTheWild: Ability = {
  name: 'Mark of the Wild',
  id: 1126,
  versIncrease: 0.03,
  associatedClass: 'Druid',
  icon: 'spell_nature_regeneration',
}

export const atrophicPoison: Ability = {
  name: 'Atrophic Poison',
  damageDealtReduction: 0.03,
  id: 381637,
  associatedClass: 'Rogue',
  icon: 'ability_rogue_nervesofsteel',
  notes: 'Does not necessarily work on all abilities',
}

export const masterPoisoner: Ability = {
  name: 'Master Poisoner',
  id: 196864,
  onByDefault: true,
  associatedClass: 'Rogue',
  icon: 'ability_creature_poison_06',
  abilityAugmentations: [
    {
      otherAbilityId: 381637, // Atrophic Poison
      field: 'damageDealtReduction',
      value: 0.006,
    },
  ],
}

export const lenience: Ability = {
  name: 'Lenience',
  id: 238063,
  dr: 0.03,
  associatedSpec: { class: 'Priest', spec: 'Discipline' },
  icon: 'ability_priest_atonement',
}

export const groupBuffs: Ability[] = [
  aspectsFavor,
  masterPoisoner,
  atrophicPoison,
  blackAttunement,
  devotionAura,
  markOfTheWild,
  fortitude,
  lenience,
]
