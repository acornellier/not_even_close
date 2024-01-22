import { EnemyAbility } from '../dungeons'

export const shatteredEarth: EnemyAbility = {
  name: 'Shattered Earth',
  boss: 'Oakheart',
  dungeon: 'Darkheart Thicket',
  baseDamage: 115355,
  isAoe: true,
  iconName: 'ability_warstomp',
  wowheadLink: 'https://www.wowhead.com/spell=204666/shattered-earth',
}

export const crushingGrip: EnemyAbility = {
  name: 'Crushing Grip',
  boss: 'Oakheart',
  dungeon: 'Darkheart Thicket',
  baseDamage: 109862,
  isAoe: true,
  iconName: 'ability_warrior_titansgrip',
  wowheadLink: 'https://www.wowhead.com/spell=204611/crushing-grip',
}

export const earthshakingRoar: EnemyAbility = {
  name: 'Earthshaking Roar',
  boss: 'Dresaron',
  dungeon: 'Darkheart Thicket',
  baseDamage: 109862,
  isAoe: true,
  iconName: 'inv_misc_head_dragon_black_nightmare',
  wowheadLink: 'https://www.wowhead.com/spell=199389/earthshaking-roar',
}

export const apocalypticNightmare: EnemyAbility = {
  name: 'Apocalyptic Nightmare',
  boss: 'Xavius',
  dungeon: 'Darkheart Thicket',
  baseDamage: 137327,
  isAoe: true,
  iconName: 'sha_spell_fire_bluerainoffire_nightmare',
  wowheadLink: 'https://www.wowhead.com/spell=204502/apocalyptic-nightmare',
}

export const nightmareBolt: EnemyAbility = {
  name: 'Nightmare Bolt',
  boss: 'Xavius',
  dungeon: 'Darkheart Thicket',
  baseDamage: 90636,
  variance: 0.02,
  isAoe: false,
  iconName: 'sha_spell_fire_bluepyroblast_nightmare',
  wowheadLink: 'https://www.wowhead.com/spell=200185/nightmare-bolt',
}

export const dhtAbilities = [
  crushingGrip,
  shatteredEarth,
  earthshakingRoar,
  nightmareBolt,
  apocalypticNightmare,
]
