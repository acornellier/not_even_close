import { bossSpell } from '../grimoire.ts'

const orebreaker = bossSpell(1261546, {
  tankOnly: true,
})

const plagueExpulsion = bossSpell(1264336)

export const pitAbilities = [orebreaker, plagueExpulsion]
