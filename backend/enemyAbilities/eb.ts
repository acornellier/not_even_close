import { EnemyAbility } from '../dungeons'

export const agitatedWater: EnemyAbility = {
  name: 'Agitated Water',
  dungeon: 'Everbloom',
  baseDamage: 82396,
  isAoe: true,
  iconName: 'spell_frost_frostbolt',
  wowheadLink: 'https://www.wowhead.com/spell=177734/agitated-water',
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

export const ebAbilities = [agitatedWater, colossalBlow]
