import { getEnemySpell } from '../grimoire.ts'

const quickShot = getEnemySpell(460602)

const deflagration = getEnemySpell(460814)

const wallop = getEnemySpell(459799, {
  tankOnly: true,
})

const sludgeClawsPhys = getEnemySpell(469479, (spell) => ({
  name: `${spell.name} phys`,
  tankOnly: true,
  notes:
    'This is only the physical damage part of the spell, you will need to check this and its pair separately',
}))

const sludgeClawsMagic = getEnemySpell(469480, (spell) => ({
  name: `${spell.name} magic`,
  tankOnly: true,
  notes:
    'This is only the magic damage part of the spell, you will need to check this and its pair separately',
}))

const gigazap = getEnemySpell(468815)

const thunderPunch = getEnemySpell(466189, {
  tankOnly: true,
})

export const ofAbilities = [
  quickShot,
  deflagration,
  wallop,
  sludgeClawsPhys,
  sludgeClawsMagic,
  gigazap,
  thunderPunch,
]
