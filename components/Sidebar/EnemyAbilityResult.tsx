import Image from 'next/image'
import { EnemyAbility } from '../../backend/dungeons'

import { KeyDetails } from '../../backend/sim/simTypes'

interface Props {
  enemyAbility: EnemyAbility | null
  keyDetails: KeyDetails
}

export function EnemyAbilityResult({ enemyAbility, keyDetails }: Props) {
  return (
    enemyAbility && (
      <div className="flex gap-1 items-center whitespace-nowrap">
        <a key={enemyAbility.name}>
          <Image
            className="rounded border border-gray-500"
            height={24}
            width={24}
            src={`https://wow.zamimg.com/images/wow/icons/large/${enemyAbility.icon}.jpg`}
            alt={enemyAbility.name}
          />
        </a>
        <div className="text-white">
          {enemyAbility.name} | +{keyDetails.keyLevel}{' '}
          {keyDetails.isTyran ? 'Tyrannical' : 'Fortified'}
        </div>
      </div>
    )
  )
}
