import { enemyAbilitiesByDungeon, EnemyAbility } from '../../backend/enemyAbilities'
import Image from 'next/image'
import { EnemyAbilityLink } from './EnemyAbilityLink'

interface Props {
  onSelect: (bossAbility: EnemyAbility) => void
}

export function EnemyAbilities({ onSelect }: Props) {
  return (
    <div className="flex flex-col items-start gap-2">
      {enemyAbilitiesByDungeon.map(({ dungeon, abilities }) => (
        <div key={dungeon}>
          <span className="text-l font-bold">{dungeon}</span>
          <div className="flex flex-row items-start gap-x-2 gap-y-1 flex-wrap">
            {abilities.map((ability) => (
              <EnemyAbilityLink
                key={ability.name}
                ability={ability}
                onSelect={() => onSelect(ability)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
