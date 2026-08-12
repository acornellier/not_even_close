import type { Character } from '../../backend/characters.ts'
import type { ClassSpec } from '../../backend/classes.ts'
import { defaultAbilities } from '../../backend/classes.ts'

const defaultClassSpec: ClassSpec = { class: 'Monk', spec: 'Mistweaver' }

export const defaultCharacter: Character = {
  classSpec: defaultClassSpec,
  stats: {
    stamina: 25_000,
    versatilityRaw: 0,
    avoidanceRaw: 0,
    armor: 1_000,
    mainStat: 3_000,
  },
  abilities: defaultAbilities(defaultClassSpec),
  externals: [],
}

export const defaultCharacters = [defaultCharacter]
