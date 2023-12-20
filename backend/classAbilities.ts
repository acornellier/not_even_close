import { Ability } from './ability'

export const demonicWards: Ability = {
  name: 'Demonic Wards',
  spellId: 203513,
  alwaysOn: true,
  dr: 0.15,
  iconName: 'inv_belt_leather_demonhunter_a_01',
  wowheadLink: 'https://www.wowhead.com/spell=320381/demonic-wards',
}

export const blur: Ability = {
  name: 'Blur',
  spellId: 198589,
  dr: 0.2,
  iconName: 'ability_demonhunter_blur',
  wowheadLink: 'https://www.wowhead.com/spell=212800/blur',
}

export const deflectingDance: Ability = {
  name: 'Deflecting Dance',
  spellId: 427776,
  healthIncrease: 0.15,
  iconName: 'ability_ironmaidens_bladerush',
  wowheadLink: 'https://www.wowhead.com/spell=427776/deflecting-dance',
}

export const calmingPresence: Ability = {
  name: 'Calming Presence',
  spellId: 388664,
  alwaysOn: true,
  dr: 0.06,
  iconName: 'inv_misc_orb_01',
  wowheadLink:
    'https://www.wowhead.com/spell=388664/calming-presence?spellModifier=428200',
}

export const dampenHarm: Ability = {
  name: 'Dampen Harm',
  spellId: 122278,
  dr: 0.4,
  iconName: 'ability_monk_dampenharm',
  wowheadLink: 'https://www.wowhead.com/spell=122278/dampen-harm',
  notes: 'Assumes always 40% DR, but in reality varies from 20-50%',
}

export const diffuseMagic: Ability = {
  name: 'Diffuse Magic',
  spellId: 122783,
  dr: 0.6,
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
