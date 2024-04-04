import { EnemyAbility } from '../../dungeons'

const burstForth: EnemyAbility = {
  name: 'Burst Forth',
  id: 388923,
  icon: 'spell_nature_earthquake',
  baseDamage: 364751,
  isAoe: true,
  timeBetweenCasts: 60,
}

const manaBomb: EnemyAbility = {
  name: 'Mana Bomb',
  id: 386181,
  baseDamage: 91188 * 4 + 182376,
  isAoe: false,
  icon: 'spell_mage_flameorb_blue',
  timeBetweenCasts: 25,
  periodic: true,
}

const arcaneFissure: EnemyAbility = {
  name: 'Arcane Fissure',
  id: 388537,
  baseDamage: 237088,
  isAoe: true,
  icon: 'spell_arcane_invocation',
  timeBetweenCasts: 45,
}

const surge: EnemyAbility = {
  name: 'Surge',
  id: 388862,
  icon: 'spell_arcane_arcane04',
  baseDamage: 218851,
  isAoe: false,
  isTrashAbility: true,
  avoidable: true,
  timeBetweenCasts: 25,
  counterplay: {
    combatDrop: 'recast',
    spellReflect: true,
  },
}

const viciousAmbush: EnemyAbility = {
  name: 'Vicious Ambush',
  id: 388940,
  icon: 'ability_ambush',
  baseDamage: 197855,
  isAoe: true,
  isTrashAbility: true,
  counterplay: {
    los: true,
  },
}

const expelIntruders: EnemyAbility = {
  name: 'Expel Intruders',
  id: 377912,
  icon: 'ability_druid_galewinds',
  baseDamage: 547127,
  isAoe: true,
  isTrashAbility: true,
  avoidable: true,
  timeBetweenCasts: 26,
  counterplay: {
    los: true,
    outrange: 30,
  },
}

const deafeningScreech: EnemyAbility = {
  name: 'Screech',
  id: 377004,
  icon: 'ability_vehicle_sonicshockwave',
  baseDamage: 218851,
  isAoe: true,
  timeBetweenCasts: 23,
}

const deafeningScreech2: EnemyAbility = {
  ...deafeningScreech,
  name: deafeningScreech.name + ' @ 1 stack',
  baseDamage: Math.round(deafeningScreech.baseDamage * (1 + 1 * 0.5)),
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

const deafeningScreech6: EnemyAbility = {
  ...deafeningScreech,
  name: deafeningScreech.name + ' @ 5 stacks',
  baseDamage: Math.round(deafeningScreech.baseDamage * (1 + 5 * 0.5)),
}

export const aaAbilities = [
  burstForth,
  manaBomb,
  arcaneFissure,
  surge,
  expelIntruders,
  viciousAmbush,
  deafeningScreech,
  deafeningScreech2,
  deafeningScreech3,
  deafeningScreech4,
  deafeningScreech5,
  deafeningScreech6,
]
