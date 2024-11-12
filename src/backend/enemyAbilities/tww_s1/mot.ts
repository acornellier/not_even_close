import { getEnemySpell, trashSpell } from '../grimoire.ts'

const spiritBolt = trashSpell(322767, {
  avoidable: true,
})

const furiousTrashing = trashSpell(324922, (spell) => ({
  damage: spell.damage * 7,
  periodic: true,
}))

const mistveilBite = trashSpell(324987, {
  cooldown: 15,
})

const dodgeBall = getEnemySpell(321834, {
  avoidable: true,
})

const acidNova = trashSpell(460092, {
  cooldown: 22,
})

const expel = trashSpell(463247)

export const motAbilities = [
  spiritBolt,
  furiousTrashing,
  mistveilBite,
  expel,
  dodgeBall,
  acidNova,
]
