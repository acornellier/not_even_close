import { EnemyAbility } from '../dungeons'

export const agitatedWater: EnemyAbility = {
  name: 'Agitated Water',
  dungeon: 'Everbloom',
  baseDamage: 82396,
  isAoe: true,
  iconName: 'spell_frost_frostbolt',
  wowheadLink: 'https://www.wowhead.com/spell=177734/agitated-water',
}

export const waterBolt: EnemyAbility = {
  name: 'Water Bolt',
  dungeon: 'Everbloom',
  baseDamage: 54931,
  isAoe: false,
  iconName: 'inv_elemental_crystal_water',
  wowheadLink: 'https://www.wowhead.com/spell=168092/water-bolt',
}

export const cinderboltSalvo: EnemyAbility = {
  name: 'Cinderbolt Salvo (3 ticks)',
  dungeon: 'Everbloom',
  baseDamage: 32958 * 3,
  isAoe: false,
  iconName: 'spell_fire_meteorstorm',
  wowheadLink: 'https://www.wowhead.com/spell=427223/cinderbolt-salvo',
}

export const colossalBlow: EnemyAbility = {
  name: 'Colossal Blow',
  boss: 'Yalnu',
  dungeon: 'Everbloom',
  baseDamage: 87889,
  isAoe: true,
  iconName: 'spell_shaman_earthquake',
  wowheadLink: 'https://www.wowhead.com/spell=169179/colossal-blow',
}

export const ebAbilities = [agitatedWater, waterBolt, cinderboltSalvo, colossalBlow]
