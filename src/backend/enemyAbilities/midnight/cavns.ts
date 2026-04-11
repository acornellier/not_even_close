import { bossSpell, trashSpell } from '../grimoire.ts'

const deafeningRoar = trashSpell(1256047)

const flankingSpear = bossSpell(1266485, {
  tankOnly: true,
})

const frostNova = trashSpell(1271623)

const lingeringDread = bossSpell(1251813, (spell) => ({
  name: `${spell.name} x2`,
  damage: spell.damage * 2,
  notes: 'Damage taken when 2 ghosts collide',
}))

export const cavnsAbilities = [deafeningRoar, flankingSpear, frostNova, lingeringDread]
