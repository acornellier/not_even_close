import { EnemyAbility } from '../../dungeons'

const surge: EnemyAbility = {
  name: 'Surge',
  spellId: 388862,
  iconName: 'spell_arcane_arcane04',
  baseDamage: 218851,
  isAoe: false,
  isTrashAbility: true,
  timeBetweenCasts: 25,
}

const burstForth: EnemyAbility = {
  name: 'Burst Forth',
  spellId: 388923,
  iconName: 'spell_nature_earthquake',
  baseDamage: 364751,
  isAoe: true,
  timeBetweenCasts: 60,
}

const expelIntruders: EnemyAbility = {
  name: 'Expel Intruders',
  spellId: 377912,
  iconName: 'ability_druid_galewinds',
  baseDamage: 547127,
  isAoe: true,
  isTrashAbility: true,
  timeBetweenCasts: 26,
}

const deafeningScreech: EnemyAbility = {
  name: 'Screech',
  spellId: 377004,
  iconName: 'ability_vehicle_sonicshockwave',
  baseDamage: 218851,
  isAoe: true,
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
  spellId: 386181,
  baseDamage: 91188 * 4 + 182376,
  isAoe: false,
  iconName: 'spell_mage_flameorb_blue',
  timeBetweenCasts: 25,
  notOneShot: true,
}

const viciousAmbush: EnemyAbility = {
  name: 'Vicious Ambush',
  spellId: 388940,
  iconName: 'ability_ambush',
  baseDamage: 197855,
  isAoe: true,
}

const arcaneFissure: EnemyAbility = {
  name: 'Arcane Fissure',
  spellId: 388942,
  baseDamage: 237088,
  isAoe: true,
  iconName: 'spell_arcane_invocation',
  timeBetweenCasts: 45,
  notOneShot: true,
}

export const aaAbilities = [
  burstForth,
  deafeningScreech3,
  deafeningScreech4,
  deafeningScreech5,
  manaBomb,
  arcaneFissure,
  surge,
  viciousAmbush,
  expelIntruders,
]
