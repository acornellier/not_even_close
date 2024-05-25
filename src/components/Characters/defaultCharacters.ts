import type { Character } from '../../backend/characters.ts'
import type { ClassSpec } from '../../backend/classes.ts'
import { defaultAbilities } from '../../backend/classes.ts'

const defaultClassSpec: ClassSpec = { class: 'Monk', spec: 'Mistweaver' }

export const defaultCharacter: Character = {
  classSpec: defaultClassSpec,
  stats: {
    stamina: 65_000,
    versatilityRaw: 3_000,
    avoidanceRaw: 325,
    armor: 5_000,
    mainStat: 20_000,
  },
  abilities: defaultAbilities(defaultClassSpec),
  externals: [],
}

export const defaultCharacters = [defaultCharacter]
