import { bossSpell, trashSpell } from '../grimoire.ts'

const quickShot = bossSpell(460602)

const kineticExplosiveGel = bossSpell(473719, {
  notes: "Damage taken on dispel"
})

const deflagration = bossSpell(460814)

const wallop = bossSpell(459799, {
  tankOnly: true,
})

const sludgeClawsPhys = bossSpell(469479, (spell) => ({
  name: `${spell.name} phys`,
  tankOnly: true,
  notes:
    'This is only the physical damage part of the spell, you will need to check this and its pair separately',
}))

const sludgeClawsMagic = bossSpell(469480, (spell) => ({
  name: `${spell.name} magic`,
  tankOnly: true,
  notes:
    'This is only the magic damage part of the spell, you will need to check this and its pair separately',
}))

const discharge = trashSpell(1216611)

const gigazap = bossSpell(468815)

const thunderPunch = bossSpell(466189, {
  tankOnly: true,
})

const electroCrush = bossSpell(473351, {
  tankOnly: true,
})

export const ofAbilities = [
  electroCrush,
  quickShot,
  kineticExplosiveGel,
  deflagration,
  wallop,
  sludgeClawsPhys,
  sludgeClawsMagic,
  discharge,
  gigazap,
  thunderPunch,
]
