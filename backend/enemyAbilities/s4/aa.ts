import { EnemyAbility } from '../enemies'
import { getEnemySpellS4 } from '../grimoire'

const burstForth = getEnemySpellS4(388923)

const manaBomb = getEnemySpellS4(386181, {
  baseDamage: 91188 * 4 + getEnemySpellS4(386202).baseDamage,
  timeBetweenCasts: 25,
  periodic: true,
})

const arcaneFissure = getEnemySpellS4(388537, {
  timeBetweenCasts: 45,
})

const surge = getEnemySpellS4(388862, {
  trashAbility: true,
  avoidable: true,
  timeBetweenCasts: 25,
  counterplay: {
    combatDrop: 'recast',
    spellReflect: true,
  },
})

const viciousAmbush = getEnemySpellS4(388940, {
  trashAbility: true,
  counterplay: {
    los: true,
  },
})

const expelIntruders = getEnemySpellS4(377912, {
  trashAbility: true,
  avoidable: true,
  timeBetweenCasts: 26,
  counterplay: {
    los: true,
    outrange: 30,
  },
})

const deafeningScreech = getEnemySpellS4(377009, {
  name: 'Screech',
  counterplay: {
    los: true,
  },
  timeBetweenCasts: 23,
})

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
