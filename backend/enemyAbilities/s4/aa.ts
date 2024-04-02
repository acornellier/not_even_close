import { EnemyAbility } from '../../dungeons'

const surge: EnemyAbility = {
  name: 'Surge',
  baseDamage: 218851,
  iconName: 'spell_arcane_arcane04',
  isAoe: false,
  isTrashAbility: true,
  wowheadLink: 'https://www.wowhead.com/spell=388862/surge',
  timeBetweenCasts: 25,
}

const burstForth: EnemyAbility = {
  name: 'Burst Forth',
  baseDamage: 364751,
  isAoe: true,
  iconName: 'spell_nature_earthquake',
  wowheadLink: 'https://www.wowhead.com/spell=388923/burst-forth',
  timeBetweenCasts: 60,
}

const expelIntruders: EnemyAbility = {
  name: 'Expel Intruders',
  baseDamage: 547127,
  isAoe: true,
  isTrashAbility: true,
  iconName: 'ability_druid_galewinds',
  wowheadLink: 'https://www.wowhead.com/spell=377912/expel-intruders',
  timeBetweenCasts: 26,
}

const deafeningScreech: EnemyAbility = {
  name: 'Screech',
  baseDamage: 218851,
  isAoe: true,
  iconName: 'ability_vehicle_sonicshockwave',
  wowheadLink: 'https://www.wowhead.com/spell=377004/deafening-screech',
  timeBetweenCasts: 23,
}

const deafeningScreech3: EnemyAbility = {
  ...deafeningScreech,
  name: deafeningScreech.name + ' @ 2 stacks',
  baseDamage: Math.round(deafeningScreech.baseDamage * (1 + 2 * 0.5)),
}

const deafeningScreech4: EnemyAbility = {
  ...deafeningScreech,
  name: deafeningScreech.name + ' @ 3 stacks',
  baseDamage: Math.round(deafeningScreech.baseDamage * (1 + 3 * 0.5)),
}

const deafeningScreech5: EnemyAbility = {
  ...deafeningScreech,
  name: deafeningScreech.name + ' @ 4 stacks',
  baseDamage: Math.round(deafeningScreech.baseDamage * (1 + 4 * 0.5)),
}

const manaBomb: EnemyAbility = {
  name: 'Mana Bomb',
  baseDamage: 91188 * 4 + 182376,
  isAoe: false,
  iconName: 'spell_mage_flameorb_blue',
  wowheadLink: 'https://www.wowhead.com/spell=386181/mana-bomb',
  timeBetweenCasts: 25,
  notOneShot: true,
}

const arcaneFissure: EnemyAbility = {
  name: 'Arcane Fissure',
  baseDamage: 237088,
  isAoe: true,
  iconName: 'spell_arcane_invocation',
  wowheadLink: 'https://www.wowhead.com/spell=388537/arcane-fissure',
  timeBetweenCasts: 45,
  notOneShot: true,
}

export const aaAbilities = [
  surge,
  burstForth,
  expelIntruders,
  deafeningScreech3,
  deafeningScreech4,
  deafeningScreech5,
  manaBomb,
  arcaneFissure,
]
