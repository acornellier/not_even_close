import { createContext, ReactNode, useContext, useMemo } from 'react'
import { Ability } from '../../backend/ability'
import { Character } from '../../backend/characterStats'
import { Result } from '../../backend/sim'

export interface SimContext {
  characters: Character[]
  selectedGroupAbilities: Ability[]
  result: Result | null
}

export const SimContext = createContext<SimContext>({
  characters: [],
  selectedGroupAbilities: [],
  result: null,
})

interface Props extends SimContext {
  children: ReactNode
}

export function SimContextProvider({
  characters,
  selectedGroupAbilities,
  result,
  children,
}: Props) {
  const simContext = useMemo(() => {
    return {
      selectedGroupAbilities,
      characters,
      result,
    }
  }, [selectedGroupAbilities, characters, result])

  return <SimContext.Provider value={simContext}>{children}</SimContext.Provider>
}

export const useSimContext = () => useContext(SimContext)
