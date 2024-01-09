import { enemyAbilitiesByDungeon, EnemyAbility } from '../../backend/enemyAbilities'
import Image from 'next/image'

interface Props {
  ability: EnemyAbility
  onSelect?: () => void
}

export function EnemyAbilityLink({ ability, onSelect }: Props) {
  return (
    <a
      key={ability.name}
      href={ability.wowheadLink}
      onClick={(e) => {
        e.preventDefault()
        onSelect?.()
      }}
    >
      <div className="flex items-center gap-1">
        <Image
          className="rounded border border-gray-500"
          height={24}
          width={24}
          src={`https://wow.zamimg.com/images/wow/icons/large/${ability.iconName}.jpg`}
          alt={ability.name}
        />
        {ability.name}
      </div>
    </a>
  )
}
