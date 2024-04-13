import { EnemyAbility } from '../../backend/enemyAbilities/enemies.ts'
import { AbilityResult } from '../../backend/sim/simTypes.ts'
import { WowSpellIcon } from '../Common/WowSpellIcon.tsx'

interface Props {
  bossAbilities: EnemyAbility[]
  trashAbilities: EnemyAbility[]
  results: AbilityResult[] | null
}

export function DungeonAbilityTable({ bossAbilities, trashAbilities }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th />
          {[...bossAbilities, ...trashAbilities].map((ability) => (
            <th key={ability.name}>
              <WowSpellIcon ability={ability} />
            </th>
          ))}
        </tr>
      </thead>
    </table>
  )
}
