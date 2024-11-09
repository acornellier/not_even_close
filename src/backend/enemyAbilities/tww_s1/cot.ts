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

const subjugateShadow = getEnemySpell(434722, (spell) => ({
  name: `${spell.name} shadow`,
  tankOnly: true,
  notes:
    'This is only the shadow damage part of the spell, you will need to check this and its pair separately',
}))

const subjugatePhys = getEnemySpell(434723, (spell) => ({
  name: `${spell.name} physical`,
  tankOnly: true,
  notes:
    'This is only the physical damage part of the spell, you will need to check this and its pair separately',
}))

const visciousDarkness = getEnemySpell(443150)

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

const oozingSmash = getEnemySpell(461842, {
  tankOnly: true,
})

export const cotAbilities = [
  vociferousIndoctrination,
  webBolt,
  subjugateShadow,
  subjugatePhys,
  oozingSmash,
  visciousDarkness,
  darkPulse,
  umbrealWeaveTrash,
  tremorSlam,
  umbralWeave,
]
