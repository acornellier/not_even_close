import { EnemyAbility } from '../../backend/enemyAbilities/enemies'

import { KeyDetails } from '../../backend/sim/simTypes'
import { WowIcon } from '../Common/WowIcon'

interface Props {
  enemyAbility: EnemyAbility | null
  keyDetails: KeyDetails
}

export function EnemyAbilityResult({ enemyAbility, keyDetails }: Props) {
  return (
    enemyAbility && (
      <div className="flex gap-1 items-center whitespace-nowrap">
        <a key={enemyAbility.name}>
          <WowIcon icon={enemyAbility.icon} size={24} />
        </a>
        <div className="text-white">
          {enemyAbility.name} | +{keyDetails.keyLevel}{' '}
          {keyDetails.isTyran ? 'Tyrannical' : 'Fortified'}
        </div>
      </div>
    )
  )
}
