import type { Character } from '../../backend/characters.ts'
import type { ClassSpec } from '../../backend/classes.ts'
import { defaultAbilities } from '../../backend/classes.ts'

const defaultClassSpec: ClassSpec = { class: 'Monk', spec: 'Mistweaver' }

export const defaultCharacter: Character = {
  classSpec: defaultClassSpec,
  stats: {
    stamina: 200_000,
    versatilityRaw: 2_000,
    avoidanceRaw: 1635,
    armor: 10_000,
    mainStat: 50_000,
  },
  abilities: defaultAbilities(defaultClassSpec),
  externals: [],
}

export const defaultCharacters = [defaultCharacter]
