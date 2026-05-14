import { bossSpell, trashSpell } from '../grimoire.ts'
import { scalingTickingDamage } from './s1-mult.ts'

const holyBolt = trashSpell(1263892, {
  avoidable: true,
})

const eclipsingStep = bossSpell(1252875, (spell) => ({
  damage: spell.damage + scalingTickingDamage(8, 4),
}))

const brilliantDispersion = bossSpell(1255503, (spell) => ({
  damage: spell.damage + scalingTickingDamage(6, 4),
}))

const blisteringSmite = trashSpell(1281657, (spell) => ({
  damage: spell.damage + scalingTickingDamage(5, 5),
}))

const arcingMana = trashSpell(1249806, () => ({
  periodic: true,
  damage: scalingTickingDamage(14, 1.7), // approximation since it ramps
}))

const entropicLeech = trashSpell(1252062, () => ({
  damage: scalingTickingDamage(12, 5),
  notes:
    'Removing the healing absorb stops the damage. The value assumes full duration of the debuff.',
}))

export const xenasAbilities = [
  eclipsingStep,
  holyBolt,
  brilliantDispersion,
  blisteringSmite,
  arcingMana,
  entropicLeech,
]
