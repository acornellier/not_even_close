import { EnemyAbility } from '../../dungeons'

const surge: EnemyAbility = {
  name: 'Surge',
  baseDamage: 218851,
  iconName: 'spell_arcane_arcane04',
  isAoe: false,
  wowheadLink: 'https://www.wowhead.com/spell=388862/surge',
}

const burstForth: EnemyAbility = {
  name: 'Burst Forth',
  baseDamage: 364751,
  isAoe: true,
  iconName: 'spell_nature_earthquake',
  wowheadLink: 'https://www.wowhead.com/spell=388923/burst-forth',
}

const deafeningScreech: EnemyAbility = {
  name: 'Deafening Screech',
  baseDamage: 218851,
  isAoe: true,
  iconName: 'ability_vehicle_sonicshockwave',
  wowheadLink: 'https://www.wowhead.com/spell=377004/deafening-screech',
}

const arcaneFissure: EnemyAbility = {
  name: 'Arcane Fissure',
  baseDamage: 237088,
  isAoe: true,
  iconName: 'spell_arcane_invocation',
  wowheadLink: 'https://www.wowhead.com/spell=388537/arcane-fissure',
}

export const aaAbilities = [surge, burstForth, deafeningScreech, arcaneFissure]
