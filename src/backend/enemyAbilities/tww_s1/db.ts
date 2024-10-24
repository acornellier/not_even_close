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

const terrifyingSlamTrash = getEnemySpell(451115, (spell) => ({
  name: `${spell.name} (trash)`,
  tankOnly: true,
}))

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

const terrifyingSlamBoss = getEnemySpell(427007, (spell) => ({
  name: `${spell.name} (boss)`,
  tankOnly: true,
}))

const erosiveSpray = getEnemySpell(448888, {
  cooldown: 30,
  notes: 'Only the initial hit',
})

const spinneretsStrands = getEnemySpell(434093, {
  cooldown: 30,
})

export const dbAbilities = [
  burstingCocoon,
  obsidianBeam,
  shadowyDecayTrash,
  terrifyingSlamTrash,
  darkOrbBoss,
  shadowyDecayBoss,
  terrifyingSlamBoss,
  erosiveSpray,
  spinneretsStrands,
]
