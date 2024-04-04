import { EnemyAbility } from '../dungeons'

export const agitatedWater: EnemyAbility = {
  name: 'Agitated Water',
  baseDamage: 82396,
  aoe: true,
  icon: 'spell_frost_frostbolt',
  wowheadLink: 'https://www.wowhead.com/spell=177734/agitated-water',
}

export const waterBolt: EnemyAbility = {
  name: 'Water Bolt',
  baseDamage: 54931,
  aoe: false,
  icon: 'inv_elemental_crystal_water',
  wowheadLink: 'https://www.wowhead.com/spell=168092/water-bolt',
}

export const cinderboltStorm: EnemyAbility = {
  name: 'Cinderbolt Storm (3 ticks)',
  baseDamage: 43945 * 3,
  aoe: false,
  icon: 'spell_fire_meteorstorm',
  wowheadLink: 'https://www.wowhead.com/spell=427223/cinderbolt-salvo',
}

export const colossalBlow: EnemyAbility = {
  name: 'Colossal Blow',
  baseDamage: 87889,
  aoe: true,
  icon: 'spell_shaman_earthquake',
  wowheadLink: 'https://www.wowhead.com/spell=169179/colossal-blow',
}

export const ebAbilities = [agitatedWater, waterBolt, cinderboltStorm, colossalBlow]
