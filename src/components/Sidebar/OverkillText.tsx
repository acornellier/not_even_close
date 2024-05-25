﻿import { formatNumber, roundTo } from '../../backend/utils'

import type { CharacterResult } from '../../backend/sim/simTypes'

interface Props {
  result: CharacterResult
  bold?: boolean
}

export function OverkillText({ result, bold }: Props) {
  return (
    <div className={bold ? 'font-bold' : ''}>
      {result.healthRemaining > 0 ? (
        <span>
          Health remaining: {formatNumber(result.healthRemaining)} (
          {formatNumber(
            roundTo((result.healthRemaining / result.startingHealth) * 100, 2),
          )}
          %)
        </span>
      ) : (
        `Overkill: ${formatNumber(-result.healthRemaining)}`
      )}
    </div>
  )
}
