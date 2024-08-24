import { getEnemySpell } from '../grimoire.ts'

const spiritBolt = getEnemySpell(322767, {
  avoidable: true,
  trashAbility: true,
})

const furiousTrashing = getEnemySpell(324922, (spell) => ({
  damage: spell.damage * 7,
  trashAbility: true,
  periodic: true,
}))

const mistveilBite = getEnemySpell(324987, {
  trashAbility: true,
  cooldown: 15,
})

const dodgeBall = getEnemySpell(321834, {
  avoidable: true,
})

const acidNova = getEnemySpell(460092, {
  trashAbility: true,
  cooldown: 22,
})

export const motAbilities = [
  spiritBolt,
  furiousTrashing,
  mistveilBite,
  dodgeBall,
  acidNova,
]
