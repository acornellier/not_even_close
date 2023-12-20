import { Ability } from './ability'

export const demonicWards: Ability = {
  name: 'Demonic Wards',
  alwaysOn: true,
  dr: 0.15,
  iconName: 'inv_belt_leather_demonhunter_a_01',
  wowheadLink: 'https://www.wowhead.com/spell=320381/demonic-wards',
}

export const blur: Ability = {
  name: 'Blur',
  dr: 0.2,
  iconName: 'ability_demonhunter_blur',
  wowheadLink: 'https://www.wowhead.com/spell=212800/blur',
}

export const calmingPresence: Ability = {
  name: 'Calming Presence',
  alwaysOn: true,
  dr: 0.06,
  iconName: 'inv_misc_orb_01',
  wowheadLink:
    'https://www.wowhead.com/spell=388664/calming-presence?spellModifier=428200',
}

export const dampenHarm: Ability = {
  name: 'Dampen Harm',
  dr: 0.5,
  iconName: 'ability_monk_dampenharm',
  wowheadLink: 'https://www.wowhead.com/spell=122278/dampen-harm',
}

export const diffuseMagic: Ability = {
  name: 'Diffuse Magic',
  dr: 0.6,
  iconName: 'spell_monk_diffusemagic',
  wowheadLink: 'https://www.wowhead.com/spell=122783/diffuse-magic',
}

export const fortBrew: Ability = {
  name: 'Fortifying Brew',
  dr: 0.2,
  healthIncrease: 0.2,
  iconName: 'ability_monk_fortifyingale_new',
  wowheadLink: 'https://www.wowhead.com/spell=388917/fortifying-brew',
}
