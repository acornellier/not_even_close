import { WowIcon } from './WowIcon.tsx'
import { EnemyAbility } from '../../backend/enemyAbilities/enemies.ts'

interface Props {
  ability: EnemyAbility
}

export function WowSpellIcon({ ability }: Props) {
  return (
    <a
      className="min-w-[30px]"
      href={
        ability.id ? `https://www.wowhead.com/spell=${ability.id}/` : ability.wowheadLink
      }
      target="_blank"
      rel="noreferrer"
    >
      <WowIcon icon={ability.icon} size={30} />
    </a>
  )
}
