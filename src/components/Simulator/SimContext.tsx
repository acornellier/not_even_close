import { createContext, ReactNode, useMemo } from 'react'

import { Result } from '../../backend/sim/simTypes.ts'

export interface SimContext {
  result: Result | null
  selectedCombo: number
}

export const SimContext = createContext<SimContext>({
  result: null,
  selectedCombo: 0,
})

interface Props extends SimContext {
  children: ReactNode
}

export function SimContextProvider({ result, selectedCombo, children }: Props) {
  const simContext = useMemo(() => {
    return {
      result,
      selectedCombo,
    }
  }, [result, selectedCombo])

  return <SimContext.Provider value={simContext}>{children}</SimContext.Provider>
}
