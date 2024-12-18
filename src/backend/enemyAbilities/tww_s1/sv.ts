import { getEnemySpell, trashSpell } from '../grimoire.ts'
import type { EnemyAbility } from '../enemies.ts'

const refractingBeam = getEnemySpell(424805)

const earthShaterer = getEnemySpell(424879)

const seismicSmash = getEnemySpell(424888, {
  tankOnly: true,
})

const metalSplinters = getEnemySpell(428535)

const groundPound = getEnemySpell(425974, {
  trashAbility: true,
})

const smashRock = getEnemySpell(428879, {
  trashAbility: true,
})

const entropicReckoning = getEnemySpell(427854)

const igneousHammer = getEnemySpell(428711, {
  tankOnly: true,
})

const shadowClaw = getEnemySpell(459210, {
  tankOnly: true,
  trashAbility: true,
})

const moltenMortar = trashSpell(449154)

const exhaustVents: EnemyAbility = {
  id: 443954,
  name: 'Exhaust Vents',
  icon: 'ability_evoker_firebreath',
  damage: 360391 * 7,
  aoe: false,
  schools: ['fire'],
  periodic: true,
}

export const svAbilities = [
  refractingBeam,
  earthShaterer,
  seismicSmash,
  igneousHammer,
  metalSplinters,
  exhaustVents,
  groundPound,
  moltenMortar,
  shadowClaw,
  smashRock,
  entropicReckoning,
]
