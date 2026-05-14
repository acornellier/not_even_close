import { bossSpell, trashSpell } from '../grimoire.ts'
import { scalingTickingDamage } from './s1-mult.ts'

const brutalChop = trashSpell(1277799, {
  tankOnly: true,
})

const flameNova = trashSpell(1270618)

const rallyingBellow = bossSpell(468221)

const splatteringSpew = bossSpell(472758, (spell) => ({
  damage: spell.damage + scalingTickingDamage(5, 3),
  periodic: true,
  notes: 'Initial hit + 5 ticks',
}))

const sporeDispersal = trashSpell(1216963, () => ({
  aoe: true,
  damage: scalingTickingDamage(10, 5),
  periodic: true,
}))

const fetidSpew = trashSpell(473786, (spell) => ({
  damage: spell.damage * 9,
}))

const boltGale = bossSpell(472672, (spell) => ({
  damage: spell.damage * 12,
}))

export const windAbilities = [
  brutalChop,
  flameNova,
  rallyingBellow,
  splatteringSpew,
  sporeDispersal,
  fetidSpew,
  boltGale,
]
