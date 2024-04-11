import { EnemyAbility } from '../enemies'

export const grievousRip: EnemyAbility = {
  name: 'Grievous Rip',
  damage: 85143,
  aoe: false,
  trashAbility: true,
  physical: true,
  icon: 'spell_frost_iceclaw',
  wowheadLink: 'https://www.wowhead.com/spell=225484/grievous-rip',
}

export const shatteredEarth: EnemyAbility = {
  name: 'Shattered Earth',
  damage: 115355,
  aoe: true,
  icon: 'ability_warstomp',
  wowheadLink: 'https://www.wowhead.com/spell=204666/shattered-earth',
}

export const crushingGrip: EnemyAbility = {
  name: 'Crushing Grip',
  damage: 109862,
  aoe: true,
  icon: 'ability_warrior_titansgrip',
  wowheadLink: 'https://www.wowhead.com/spell=204611/crushing-grip',
}

export const earthshakingRoar: EnemyAbility = {
  name: 'Earthshaking Roar',
  damage: 109862,
  aoe: true,
  icon: 'inv_misc_head_dragon_black_nightmare',
  wowheadLink: 'https://www.wowhead.com/spell=199389/earthshaking-roar',
}

export const apocalypticNightmare: EnemyAbility = {
  name: 'Apocalyptic Nightmare',
  damage: 137327,
  aoe: true,
  icon: 'sha_spell_fire_bluerainoffire_nightmare',
  wowheadLink: 'https://www.wowhead.com/spell=204502/apocalyptic-nightmare',
}

export const nightmareBolt: EnemyAbility = {
  name: 'Nightmare Bolt',
  damage: 90636,
  variance: 0.02,
  aoe: false,
  icon: 'sha_spell_fire_bluepyroblast_nightmare',
  wowheadLink: 'https://www.wowhead.com/spell=200185/nightmare-bolt',
}

export const dhtAbilities = [
  grievousRip,
  crushingGrip,
  shatteredEarth,
  earthshakingRoar,
  nightmareBolt,
  apocalypticNightmare,
]
