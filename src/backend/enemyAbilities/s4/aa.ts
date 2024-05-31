import type { EnemyAbility } from '../enemies'
import { getEnemySpell } from '../grimoire'

const barkBreaker = getEnemySpell(388544, {
  tankOnly: true,
})

const burstForth = getEnemySpell(388923, {
  cooldown: 60,
})

const arcaneExpulsion = getEnemySpell(385958, {
  tankOnly: true,
})

const manaBomb = getEnemySpell(386181, {
  name: 'Mana Bomb (1 tick + hit)',
  damage: 91188 + getEnemySpell(386202).damage,
  aoe: true,
  aoeMultiplier: 0.714,
  cooldown: 25,
  notes:
    'The final hit is always preceded immediately by a tick of damage. The dot is ST but the final hit is AoE.',
})

const arcaneFissure = getEnemySpell(388537, {
  cooldown: 45,
})

const dartingSting = getEnemySpell(390944, {
  trashAbility: true,
})

const surge = getEnemySpell(388862, {
  trashAbility: true,
  avoidable: true,
  cooldown: 25,
  combatDrop: 'recast',
  spellReflect: true,
})

const viciousAmbush = getEnemySpell(388940, {
  trashAbility: true,
  los: true,
})

const expelIntruders = getEnemySpell(377912, {
  trashAbility: true,
  avoidable: true,
  cooldown: 26,
  los: true,
  outrange: 30,
})

const savagePeck = getEnemySpell(376997, {
  tankOnly: true,
  notes: 'Only the initial hit',
})

const deafeningScreech = getEnemySpell(377009, {
  name: 'Deafening Screech 1',
  los: true,
  cooldown: 23,
})

const deafeningScreech2: EnemyAbility = {
  ...deafeningScreech,
  name: 'Deafening Screech 2',
  damage: Math.round(deafeningScreech.damage * (1 + 1 * 0.5)),
}

const deafeningScreech3: EnemyAbility = {
  ...deafeningScreech,
  name: 'Deafening Screech 3',
  damage: Math.round(deafeningScreech.damage * (1 + 2 * 0.5)),
}

const deafeningScreech4: EnemyAbility = {
  ...deafeningScreech,
  name: 'Deafening Screech 4',
  damage: Math.round(deafeningScreech.damage * (1 + 3 * 0.5)),
}

const deafeningScreech5: EnemyAbility = {
  ...deafeningScreech,
  name: 'Deafening Screech 5',
  damage: Math.round(deafeningScreech.damage * (1 + 4 * 0.5)),
}

const deafeningScreech6: EnemyAbility = {
  ...deafeningScreech,
  name: 'Deafening Screech 6',
  damage: Math.round(deafeningScreech.damage * (1 + 5 * 0.5)),
}

export const aaAbilities = [
  dartingSting,
  barkBreaker,
  burstForth,
  arcaneExpulsion,
  manaBomb,
  arcaneFissure,
  surge,
  expelIntruders,
  viciousAmbush,
  savagePeck,
  deafeningScreech,
  deafeningScreech2,
  deafeningScreech3,
  deafeningScreech4,
  deafeningScreech5,
  deafeningScreech6,
]
