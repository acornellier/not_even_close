import { Ability } from './ability'

export const icyPreservation: Ability = {
  name: 'Icy Preservation',
  spellId: 191326,
  dr: 0.06,
  iconName: 'inv_10_alchemy_bottle_shape2_blue',
  wowheadLink: 'https://www.wowhead.com/item=191326/phial-of-icy-preservation',
}

export const fortitude: Ability = {
  name: 'Power Word: Fortitude',
  spellId: 21562,
  staminaIncrease: 0.05,
  iconName: 'spell_holy_wordfortitude',
  wowheadLink: 'https://www.wowhead.com/spell=21562/power-word-fortitude',
}

export const generousPour: Ability = {
  name: 'Generous Pour',
  spellId: 389575,
  avoidance: 0.04,
  iconName: 'inv_misc_food_legion_goocaramel_bottle',
  wowheadLink:
    'https://www.wowhead.com/spell=389575/generous-pour?def=106502&rank=2',
}

export const blackAttunement: Ability = {
  name: 'Black Attunement',
  spellId: 403264,
  healthIncrease: 0.04,
  iconName: 'ability_evoker_blackattunement',
  wowheadLink: 'https://www.wowhead.com/spell=403264/black-attunement',
}

export const aspectsFavor: Ability = {
  name: "Aspects' Favor",
  spellId: 407243,
  healthIncrease: 0.02,
  iconName: 'ability_evoker_aspectsfavor',
  wowheadLink: 'https://www.wowhead.com/spell=407243/aspects-favor?rank=2',
}

export const zephyr: Ability = {
  name: 'Zephyr',
  spellId: 374227,
  dr: 0.2,
  iconName: 'ability_evoker_hoverblack',
  wowheadLink: 'https://www.wowhead.com/spell=374227/zephyr',
}

export const chiCocoon: Ability = {
  name: 'Chi Cocoon',
  spellId: 406220,
  absorb: 160_000,
  iconName: 'inv_pet_crane',
  wowheadLink: 'https://www.wowhead.com/spell=406220/chi-cocoon',
  notes: "Assumes 160K absorb. In reality varies based on Monk's HP and vers.",
}

export const blessingOfSacrifice: Ability = {
  name: 'Blessing of Sacrifice',
  spellId: 6940,
  dr: 0.3,
  iconName: 'spell_holy_sealofsacrifice',
  wowheadLink: 'https://www.wowhead.com/spell=6940/blessing-of-sacrifice',
}

export const groupAbilities: Ability[] = [
  icyPreservation,
  fortitude,
  generousPour,
  blackAttunement,
  aspectsFavor,
  zephyr,
  chiCocoon,
  blessingOfSacrifice,
]
