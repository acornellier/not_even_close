import { bossSpell, trashSpell } from '../grimoire.ts'

const throwChair = trashSpell(434758)

const tenderize = trashSpell(463206, {
  ignoresArmor: true,
})

const recklessDelivery = trashSpell(448935, {
  ignoresArmor: true,
})

const spoutingStout = bossSpell(439645, (spell) => ({
  damage: spell.damage * 5,
  periodic: true,
}))

const swarmingSurprise = trashSpell(442995)

const letItHail = bossSpell(442484, (spell) => ({
  damage: spell.damage * 6,
  periodic: true,
}))

const flutteringWing = bossSpell(439586, {
  damage: 589_513 * 5,
  aoe: false,
  periodic: true,
})

export const cmAbilities = [
  throwChair,
  tenderize,
  recklessDelivery,
  spoutingStout,
  swarmingSurprise,
  flutteringWing,
  letItHail,
]
