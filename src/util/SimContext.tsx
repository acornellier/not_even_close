import type { ReactNode } from 'react'
import { createContext, useMemo } from 'react'
import type { Result } from '../backend/sim/simTypes.ts'
import type { Dungeon } from '../backend/enemyAbilities/enemies.ts'

export interface SimContext {
  dungeon: Dungeon | null
  result: Result | null
}

export const SimContext = createContext<SimContext>({
  dungeon: null,
  result: null,
})

interface Props extends SimContext {
  children: ReactNode
}

export function SimContextProvider({ dungeon, result, children }: Props) {
  const simContext = useMemo(() => {
    return {
      dungeon,
      result,
    }
  }, [result])

  return <SimContext.Provider value={simContext}>{children}</SimContext.Provider>
}
