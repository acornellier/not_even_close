import { bossSpell, getEnemySpell, trashSpell } from '../grimoire.ts'
import { scaledDamage, scalingTickingDamage } from './s1-mult.ts'

const burstForth = bossSpell(388923)

const expelIntruders = trashSpell(377912, {
  avoidable: true,
})

const ragingScreech = trashSpell(1276632, {
  ignoresArmor: true,
})

const deafeningScreech = bossSpell(377009)

const surge = trashSpell(388862, {
  avoidable: true,
})

const arcaneFissure = bossSpell(388537)

const arcaneBolt = trashSpell(1279627, {
  avoidable: true,
})

const arcaneSmash = trashSpell(1270356)

const manaBomb = getEnemySpell(386181, {
  name: 'Mana Bomb (1 tick + hit)',
  damage: 91188 + getEnemySpell(386202).damage,
  aoeMultiplier: 0.714,
  cooldown: 25,
  notes:
    'The final hit is always preceded immediately by a tick of damage. The dot is ST but the final hit is AoE.',
})

const viciousAmbush = trashSpell(388940, () => ({
  aoe: true,
  periodic: true,
  damage: scaledDamage(12) + scalingTickingDamage(8, 5),
}))

const manaVoid = trashSpell(388866, () => ({
  name: 'Mana Void (1 tick + hit)',
  periodic: true,
  damage: scaledDamage(10) + scaledDamage(4),
  notes:
    'The final hit is always preceded immediately by a tick of damage. The dot is ST but the final hit is AoE.',
  aoeMultiplier: 1, // just so it shows up as mixed
}))

export const aaAbilities = [
  burstForth,
  expelIntruders,
  ragingScreech,
  deafeningScreech,
  surge,
  arcaneFissure,
  arcaneBolt,
  arcaneSmash,
  manaBomb,
  viciousAmbush,
  manaVoid,
]
