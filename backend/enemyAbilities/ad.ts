import { EnemyAbility } from '../dungeons'

export const wrackingPain: EnemyAbility = {
  name: 'Wracking Pain',
  baseDamage: 82369,
  aoe: false,
  icon: 'ability_warlock_improvedsoulleech',
  wowheadLink: 'https://www.wowhead.com/spell=250096/wracking-pain',
}

export const soulrend: EnemyAbility = {
  name: 'Soulrend',
  baseDamage: 100304,
  variance: 0.02,
  aoe: false,
  icon: 'ability_demonhunter_soulcleave2',
  wowheadLink: 'https://www.wowhead.com/spell=259190/soulrend',
}

export const adAbilities = [wrackingPain, soulrend]
