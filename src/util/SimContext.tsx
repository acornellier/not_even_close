import type { ReactNode} from 'react';
import { createContext, useMemo } from 'react'

import type { Result } from '../backend/sim/simTypes.ts'

export interface SimContext {
  result: Result | null
}

export const SimContext = createContext<SimContext>({
  result: null,
})

interface Props extends SimContext {
  children: ReactNode
}

export function SimContextProvider({ result, children }: Props) {
  const simContext = useMemo(() => {
    return {
      result,
    }
  }, [result])

  return <SimContext.Provider value={simContext}>{children}</SimContext.Provider>
}
