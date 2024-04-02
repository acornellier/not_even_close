import { EnemyAbility } from '../dungeons'

export const grievousRip: EnemyAbility = {
  name: 'Grievous Rip',
  baseDamage: 85143,
  isAoe: false,
  isTrashAbility: true,
  isPhysical: true,
  iconName: 'spell_frost_iceclaw',
  wowheadLink: 'https://www.wowhead.com/spell=225484/grievous-rip',
}

export const shatteredEarth: EnemyAbility = {
  name: 'Shattered Earth',
  boss: 'Oakheart',
  baseDamage: 115355,
  isAoe: true,
  iconName: 'ability_warstomp',
  wowheadLink: 'https://www.wowhead.com/spell=204666/shattered-earth',
}

export const crushingGrip: EnemyAbility = {
  name: 'Crushing Grip',
  boss: 'Oakheart',
  baseDamage: 109862,
  isAoe: true,
  iconName: 'ability_warrior_titansgrip',
  wowheadLink: 'https://www.wowhead.com/spell=204611/crushing-grip',
}

export const earthshakingRoar: EnemyAbility = {
  name: 'Earthshaking Roar',
  boss: 'Dresaron',
  baseDamage: 109862,
  isAoe: true,
  iconName: 'inv_misc_head_dragon_black_nightmare',
  wowheadLink: 'https://www.wowhead.com/spell=199389/earthshaking-roar',
}

export const apocalypticNightmare: EnemyAbility = {
  name: 'Apocalyptic Nightmare',
  boss: 'Xavius',
  baseDamage: 137327,
  isAoe: true,
  iconName: 'sha_spell_fire_bluerainoffire_nightmare',
  wowheadLink: 'https://www.wowhead.com/spell=204502/apocalyptic-nightmare',
}

export const nightmareBolt: EnemyAbility = {
  name: 'Nightmare Bolt',
  boss: 'Xavius',
  baseDamage: 90636,
  variance: 0.02,
  isAoe: false,
  iconName: 'sha_spell_fire_bluepyroblast_nightmare',
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
