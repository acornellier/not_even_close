import { getEnemySpell } from '../grimoire.ts'

const iceSickles = getEnemySpell(440238)

const webBolt = getEnemySpell(443427, {
  trashAbility: true,
  avoidable: true,
})

const umbrealWeaveTrash = getEnemySpell(446718, {
  name: 'Umbral Weave (trash)',
  trashAbility: true,
})

const umbralWeave = getEnemySpell(439324, {
  name: 'Umbral Weave (boss)',
})

export const cotAbilities = [iceSickles, webBolt, umbrealWeaveTrash, umbralWeave]
