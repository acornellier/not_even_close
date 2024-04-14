import { useLocalStorage } from '../../util/useLocalStorage.ts'
import { Ability, AbilityCombo } from '../../backend/ability.ts'
import { ClassSpec, defaultAbilities } from '../../backend/classes.ts'
import { Character } from '../../backend/characters.ts'
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'

const defaultClassSpec: ClassSpec = { class: 'Monk', spec: 'Mistweaver' }
export const defaultCharacter: Character = {
  classSpec: defaultClassSpec,
  stats: {
    stamina: 41_000,
    versatilityRaw: 1_000,
    avoidanceRaw: 325,
    armor: 20_000,
    mainStat: 10_000,
  },
  abilityCombos: [
    {
      abilities: defaultAbilities(defaultClassSpec),
      externals: [],
    },
    {
      abilities: defaultAbilities(defaultClassSpec),
      externals: [],
    },
    {
      abilities: defaultAbilities(defaultClassSpec),
      externals: [],
    },
    {
      abilities: defaultAbilities(defaultClassSpec),
      externals: [],
    },
    {
      abilities: defaultAbilities(defaultClassSpec),
      externals: [],
    },
  ],
}

export const defaultCharacters = [defaultCharacter]

const defaultGroupBuffs: AbilityCombo[] = [[], [], [], [], []]
const defaultGroupActives: AbilityCombo[] = [[], [], [], [], []]

export function useAbilities() {
  const [characters, setCharacters] = useLocalStorage('characters2', defaultCharacters)

  const [selectedCombo, setSelectedCombo] = useLocalStorage('selectedAbilityCombo', 0)

  const [selectedGroupBuffs, setGroupBuffs] = useLocalStorage<AbilityCombo[]>(
    'groupBuffs2',
    defaultGroupBuffs,
  )

  const [selectedGroupActives, setGroupActives] = useLocalStorage<AbilityCombo[]>(
    'groupActives2',
    defaultGroupActives,
  )

  const setBuffsCurrentCombo = useCallback(
    (setter: Dispatch<SetStateAction<AbilityCombo[]>>) => (abilities: Ability[]) => {
      setter((prevAbilities) => {
        const newAbilities = [...prevAbilities]
        newAbilities[selectedCombo] = abilities
        return newAbilities
      })
    },
    [selectedCombo],
  )

  const setGroupBuffsCurrentCombo = useMemo(
    () => setBuffsCurrentCombo(setGroupBuffs),
    [setBuffsCurrentCombo, setGroupBuffs],
  )

  const setGroupActivesCurrentCombo = useMemo(
    () => setBuffsCurrentCombo(setGroupActives),
    [setBuffsCurrentCombo, setGroupActives],
  )

  return {
    characters,
    setCharacters,
    selectedGroupBuffs,
    setGroupBuffs: setGroupBuffsCurrentCombo,
    selectedGroupActives,
    setGroupActives: setGroupActivesCurrentCombo,
    selectedCombo,
    setSelectedCombo,
  }
}
