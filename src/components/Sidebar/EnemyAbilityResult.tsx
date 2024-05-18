import type { EnemyAbility } from '../../backend/enemyAbilities/enemies'

import type { KeyDetails } from '../../backend/sim/simTypes'
import { AbilityIcon } from '../Common/AbilityIcon.tsx'

interface Props {
  ability: EnemyAbility | null
  keyDetails: KeyDetails
}

export function EnemyAbilityResult({ ability, keyDetails }: Props) {
  return (
    ability && (
      <div className="flex gap-1 items-center whitespace-nowrap">
        <a key={ability.name} href={`https://www.wowhead.com/spell=${ability.id}/`}>
          <AbilityIcon icon={ability.icon} size={24} />
        </a>
        <div className="text-white">
          {ability.name} | +{keyDetails.keyLevel}{' '}
          {keyDetails.isTyran ? 'Tyrannical' : 'Fortified'}
        </div>
      </div>
    )
  )
}
