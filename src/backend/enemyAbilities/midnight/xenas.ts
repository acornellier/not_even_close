import { bossSpell, trashSpell } from '../grimoire.ts'

const erraticZap = trashSpell(1257105, {
  avoidable: true,
})

const leylineArray = bossSpell(1251626, {
  avoidable: true,
})

export const xenasAbilities = [
  erraticZap,
  leylineArray,
]
