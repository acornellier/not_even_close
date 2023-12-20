export type Ability = {
  name: string
  alwaysOn?: boolean
  dr: number
  healthIncrease?: number
  iconName: string
  spellId: number
}

export const demonicWards: Ability = {
  name: 'Demonic Wards',
  alwaysOn: true,
  dr: 0.15,
  iconName: 'inv_belt_leather_demonhunter_a_01',
  spellId: 320381,
}

export const blur: Ability = {
  name: 'Blur',
  dr: 0.2,
  iconName: 'ability_demonhunter_blur',
  spellId: 198589,
}

export const calmingPresence: Ability = {
  name: 'Calming Presence',
  alwaysOn: true,
  dr: 0.06,
  iconName: 'inv_misc_orb_01',
  spellId: 388664,
}

export const dampenHarm: Ability = {
  name: 'Dampen Harm',
  dr: 0.5,
  iconName: 'ability_monk_dampenharm',
  spellId: 122278,
}

export const diffuseMagic: Ability = {
  name: 'Diffuse Magic',
  dr: 0.6,
  iconName: 'spell_monk_diffusemagic',
  spellId: 122783,
}

export const fortBrew: Ability = {
  name: 'Fortifying Brew',
  dr: 0.2,
  healthIncrease: 0.2,
  iconName: 'ability_monk_fortifyingale_new',
  spellId: 388917,
}
