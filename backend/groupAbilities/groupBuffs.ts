import { Ability } from '../ability'

export const fortitude: Ability = {
  name: 'Power Word: Fortitude',
  spellId: 21562,
  staminaIncrease: 0.05,
  associatedClass: 'Priest',
  iconName: 'spell_holy_wordfortitude',
  wowheadLink: 'https://www.wowhead.com/spell=21562/power-word-fortitude',
}

export const generousPour: Ability = {
  name: 'Generous Pour',
  spellId: 389575,
  aoeDr: 0.04,
  associatedClass: 'Monk',
  iconName: 'inv_misc_food_legion_goocaramel_bottle',
  wowheadLink: 'https://www.wowhead.com/spell=389575/generous-pour?def=106502&rank=2',
}

export const blackAttunement: Ability = {
  name: 'Black Attunement',
  spellId: 403264,
  healthIncrease: 0.04,
  associatedSpec: { class: 'Evoker', spec: 'Augmentation' },
  iconName: 'ability_evoker_blackattunement',
  wowheadLink: 'https://www.wowhead.com/spell=403264/black-attunement',
}

export const devotionAura: Ability = {
  name: 'Devotion Aura',
  spellId: 465,
  dr: 0.03,
  associatedClass: 'Paladin',
  iconName: 'spell_holy_devotionaura',
  wowheadLink: 'https://www.wowhead.com/spell=465/devotion-aura',
}

export const aspectsFavor: Ability = {
  name: "Aspects' Favor",
  spellId: 407243,
  associatedSpec: { class: 'Evoker', spec: 'Augmentation' },
  iconName: 'ability_evoker_aspectsfavor',
  wowheadLink: 'https://www.wowhead.com/spell=407243/aspects-favor?rank=2',
  abilityAugmentations: [
    {
      otherSpellId: blackAttunement.spellId,
      field: 'healthIncrease',
      value: 0.04,
    },
  ],
}

export const markOfTheWild: Ability = {
  name: 'Mark of the Wild',
  spellId: 1126,
  versIncrease: 0.03,
  associatedClass: 'Druid',
  iconName: 'spell_nature_regeneration',
  wowheadLink: 'https://www.wowhead.com/spell=1126/mark-of-the-wild',
}

export const atrophicPoison: Ability = {
  name: 'Atrophic Poison',
  dr: 0.03,
  spellId: 381637,
  associatedClass: 'Rogue',
  wowheadLink: 'https://www.wowhead.com/spell=381637/atrophic-poison',
  iconName: 'ability_rogue_nervesofsteel',
  notes: 'Does not necessarily work on all abilities',
}

export const masterPoisoner: Ability = {
  name: 'Master Poisoner',
  spellId: 196864,
  onByDefault: true,
  associatedClass: 'Rogue',
  iconName: 'ability_creature_poison_06',
  abilityAugmentations: [
    {
      otherSpellId: 381637, // Atrophic Poison
      field: 'dr',
      value: 0.006,
    },
  ],
}

export const lenience: Ability = {
  name: 'Lenience',
  spellId: 238063,
  dr: 0.03,
  associatedSpec: { class: 'Priest', spec: 'Discipline' },
  iconName: 'ability_priest_atonement',
}

export const groupBuffs: Ability[] = [
  aspectsFavor,
  masterPoisoner,
  atrophicPoison,
  blackAttunement,
  devotionAura,
  generousPour,
  markOfTheWild,
  fortitude,
  lenience,
]
