import { Ability } from './ability'

export const fortitude: Ability = {
  staminaIncrease: 0.05,
  iconName: 'spell_holy_wordfortitude',
  name: 'Power Word: Fortitude',
  wowheadLink: 'https://www.wowhead.com/spell=21562/power-word-fortitude',
}

export const generousPour: Ability = {
  dr: 0.04,
  iconName: 'inv_misc_food_legion_goocaramel_bottle',
  name: 'Generous Pour',
  wowheadLink:
    'https://www.wowhead.com/spell=389575/generous-pour?def=106502&rank=2',
}

export const blackAttunement: Ability = {
  healthIncrease: 0.04,
  iconName: 'ability_evoker_blackattunement',
  name: 'Black Attunement',
  wowheadLink: 'https://www.wowhead.com/spell=403264/black-attunement',
}

export const aspectsFavor: Ability = {
  healthIncrease: 0.02,
  iconName: 'ability_evoker_aspectsfavor',
  name: "Aspects' Favor",
  wowheadLink: 'https://www.wowhead.com/spell=407243/aspects-favor?rank=2',
}

export const zephyr: Ability = {
  dr: 0.2,
  iconName: 'ability_evoker_hoverblack',
  name: 'Zephyr',
  wowheadLink: 'https://www.wowhead.com/spell=374227/zephyr',
}

export const chiCocoon: Ability = {
  absorb: 160_000,
  iconName: 'inv_pet_crane',
  name: 'Chi Cocoon',
  wowheadLink: 'https://www.wowhead.com/spell=406220/chi-cocoon',
  notes: "Assumes ~160K absorb. In reality varies based on Monk's HP and vers.",
}

export const groupAbilities: Ability[] = [
  fortitude,
  generousPour,
  blackAttunement,
  aspectsFavor,
  zephyr,
  chiCocoon,
]
