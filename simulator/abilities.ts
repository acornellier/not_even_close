export type Ability = {
  name: string
  alwaysOn?: boolean
  dr: number
  healthIncrease?: number
  iconName: string
}

export const demonicWards: Ability = {
  name: 'Demonic Wards',
  alwaysOn: true,
  dr: 0.15,
  iconName: 'inv_belt_leather_demonhunter_a_01',
}

export const blur: Ability = {
  name: 'Blur',
  dr: 0.2,
  iconName: 'ability_demonhunter_blur',
}

export const calmingPresence: Ability = {
  name: 'Calming Presence',
  alwaysOn: true,
  dr: 0.06,
  iconName: 'inv_misc_orb_01',
}

export const dampenHarm: Ability = {
  name: 'Dampen Harm',
  dr: 0.5,
  iconName: 'ability_monk_dampenharm',
}

export const diffuseMagic: Ability = {
  name: 'Diffuse Magic',
  dr: 0.6,
  iconName: 'spell_monk_diffusemagic',
}

export const fortBrew: Ability = {
  name: 'Fortifying Brew',
  dr: 0.2,
  healthIncrease: 0.2,
  iconName: 'ability_monk_fortifyingale_new',
}
