import { getEnemySpell } from '../grimoire.ts'

const burstingCocoon = getEnemySpell(451104, (spell) => ({
  name: 'Bursting Cocoon',
  damage: (4 / 10) * spell.damage + spell.damage,
  aoeMultiplier: 0.714,
  trashAbility: true,
  cooldown: 20,
  notes:
    '1 tick + last hit. The final hit is always preceded immediately by a tick of damage. The dot is ST but the final hit is AoE.',
}))

const obsidianBeam = getEnemySpell(453310, {
  tankOnly: true,
  cooldown: 30,
})

const shadowyDecayTrash = getEnemySpell(451101, (spell) => ({
  name: `${spell.name} (trash)`,
  damage: 4 * spell.damage,
  trashAbility: true,
  periodic: true,
  cooldown: 25,
}))

const terrifyingSlamTrashShadow = getEnemySpell(451115, {
  name: `Slam (trash magic)`,
  tankOnly: true,
})

const terrifyingSlamTrashPhys = getEnemySpell(451116, {
  name: `Slam (trash phys)`,
  tankOnly: true,
})

const darkOrbBoss = getEnemySpell(426826, (spell) => ({
  name: `${spell.name} (boss)`,
  damage: spell.damage * 0.3,
  notes: 'Estimated at 30% of base damage',
}))

const shadowyDecayBoss = getEnemySpell(426793, (spell) => ({
  name: `${spell.name} (boss)`,
  damage: 6 * spell.damage,
  periodic: true,
  cooldown: 35,
}))

const terrifyingSlamBossShadow = getEnemySpell(427007, {
  name: `Slam (boss magic)`,
  tankOnly: true,
  notes:
    'This is only the magic damage part of the spell, you will need to check this and its pair separately',
})

const terrifyingSlamBossPhys = getEnemySpell(427002, {
  name: `Slam (boss phys)`,
  tankOnly: true,
  notes:
    'This is only the physical damage part of the spell, you will need to check this and its pair separately',
})

const erosiveSpray = getEnemySpell(448888, {
  cooldown: 30,
  notes: 'Only the initial hit',
})

const spinneretsStrands = getEnemySpell(434093, {
  cooldown: 30,
})

const darkFloes = getEnemySpell(431305, (spell) => ({
  damage: spell.damage * 10,
  trashAbility: true,
}))

export const dbAbilities = [
  burstingCocoon,
  obsidianBeam,
  darkFloes,
  shadowyDecayTrash,
  terrifyingSlamTrashShadow,
  terrifyingSlamTrashPhys,
  darkOrbBoss,
  shadowyDecayBoss,
  terrifyingSlamBossShadow,
  terrifyingSlamBossPhys,
  erosiveSpray,
  spinneretsStrands,
]
