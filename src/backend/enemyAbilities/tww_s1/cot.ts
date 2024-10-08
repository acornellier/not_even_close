import { getEnemySpell } from '../grimoire.ts'

const vociferousIndoctrination = getEnemySpell(434832, (spell) => ({
  damage: 5 * spell.damage,
  periodic: true,
  cooldown: 30,
}))

const webBolt = getEnemySpell(443427, {
  trashAbility: true,
  avoidable: true,
})

const darkPulse = getEnemySpell(437533, (spell) => ({
  damage: 7 * spell.damage,
  periodic: true,
  cooldown: 70,
}))

const umbrealWeaveTrash = getEnemySpell(446718, {
  name: 'Umbral Weave (trash)',
  trashAbility: true,
})

const tremorSlam = getEnemySpell(437700, {
  effectIndex: 1,
  cooldown: [40, 60],
})

const umbralWeave = getEnemySpell(439324, {
  name: 'Umbral Weave (boss)',
  cooldown: [40, 60],
})

export const cotAbilities = [
  vociferousIndoctrination,
  webBolt,
  darkPulse,
  umbrealWeaveTrash,
  tremorSlam,
  umbralWeave,
]
