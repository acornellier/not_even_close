import { Result } from '../backend/sim'
import { roundTo } from '../backend/utils'
import Image from 'next/image'

interface Props {
  result: Result
}

export function ResultMini({ result }: Props) {
  const ability = result.hit.bossAbility

  return (
    <div>
      <div className="flex gap-1">
        {ability && (
          <a key={ability.name} href={ability.wowheadLink}>
            <div className="flex items-center gap-1">
              <Image
                className="rounded border border-gray-500"
                height={24}
                width={24}
                src={`https://wow.zamimg.com/images/wow/icons/large/${ability.iconName}.jpg`}
                alt={ability.name}
              />
              {ability.name}:
            </div>
          </a>
        )}
        <div className="font-bold mb-2">
          {result.survival ? (
            <span className="text-green-500">You live</span>
          ) : (
            <span className="text-red-500">You die</span>
          )}
        </div>
      </div>
      {result.survival ? (
        <div>
          Health remaining: {result.healthRemaining.toLocaleString('en-US')} (
          {roundTo(
            (result.healthRemaining / result.startingHealth) * 100,
            2
          ).toLocaleString('en-US')}
          %)
        </div>
      ) : (
        <div>Overkill: {(-result.healthRemaining).toLocaleString('en-US')}</div>
      )}
    </div>
  )
}
