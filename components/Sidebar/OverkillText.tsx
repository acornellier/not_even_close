import { roundTo } from '../../backend/utils'
import { CharacterResult } from '../../backend/sim'

interface Props {
  result: CharacterResult
  bold?: boolean
}

export function OverkillText({ result, bold }: Props) {
  return (
    <div className={bold ? 'font-bold' : ''}>
      {result.healthRemaining > 0 ? (
        <span>
          Health remaining: {result.healthRemaining.toLocaleString('en-US')} (
          {roundTo(
            (result.healthRemaining / result.startingHealth) * 100,
            2
          ).toLocaleString('en-US')}
          %)
        </span>
      ) : (
        `Overkill: ${(-result.healthRemaining).toLocaleString('en-US')}`
      )}
    </div>
  )
}
