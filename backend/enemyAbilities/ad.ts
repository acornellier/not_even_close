import { EnemyAbility } from '../dungeons'

export const wrackingPain: EnemyAbility = {
  name: 'Wracking Pain',
  boss: 'Yazma',
  baseDamage: 82369,
  isAoe: false,
  iconName: 'ability_warlock_improvedsoulleech',
  wowheadLink: 'https://www.wowhead.com/spell=250096/wracking-pain',
}

export const soulrend: EnemyAbility = {
  name: 'Soulrend',
  boss: 'Yazma',
  baseDamage: 100304,
  variance: 0.02,
  isAoe: false,
  iconName: 'ability_demonhunter_soulcleave2',
  wowheadLink: 'https://www.wowhead.com/spell=259190/soulrend',
}

export const adAbilities = [wrackingPain, soulrend]
