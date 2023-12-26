import { Ability } from '../ability'

export const arcaneWarding: Ability = {
  name: 'Arcane Warding',
  dr: 0.04,
  onByDefault: true,
  spellId: 383092,
  wowheadLink: 'https://www.wowhead.com/spell=383092/arcane-warding',
  iconName: 'spell_arcane_arcaneresilience',
}

export const barrier: Ability = {
  name: 'Barrier',
  absorbHealthMultiplier: 0.2,
  spellId: 382791,
  wowheadLink: 'https://www.wowhead.com/spell=382791/molten-barrier',
  iconName: 'ability_mage_moltenarmor',
}

export const iceCold: Ability = {
  name: 'Ice Cold',
  dr: 0.7,
  spellId: 414658,
  wowheadLink: 'https://www.wowhead.com/spell=414658/ice-cold',
  iconName: 'spell_fire_bluefire',
}

export const mirrorImage: Ability = {
  name: 'Mirror Image',
  dr: 0.2,
  spellId: 55342,
  wowheadLink: 'https://www.wowhead.com/spell=55342/mirror-image',
  iconName: 'spell_magic_lesserinvisibilty',
}

export const greaterInvisibility: Ability = {
  name: 'Greater Invisibility',
  dr: 0.6,
  spellId: 110959,
  wowheadLink: 'https://www.wowhead.com/spell=110959/greater-invisibility',
  iconName: 'ability_mage_greaterinvisibility',
}

export const mageAbilities = [
  arcaneWarding,
  barrier,
  mirrorImage,
  greaterInvisibility,
  iceCold,
]
