import { DungeonAbilityResult } from '../../backend/sim/simTypes.ts'
import { WowSpellIcon } from '../Common/WowSpellIcon.tsx'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { EnemyAbility } from '../../backend/enemyAbilities/enemies.ts'

interface Props {
  bossAbilities: EnemyAbility[]
  trashAbilities: EnemyAbility[]
  results: DungeonAbilityResult[] | null
  selectedCombo: number
  characterIndex: number
}

export function DungeonAbilityTable({
  bossAbilities,
  trashAbilities,
  results,
  characterIndex,
}: Props) {
  if (results === null) return null

  const comboCount = results[0]?.characters[0]?.length
  if (!comboCount) {
    console.error(`No characters found in dungeon ability results`)
    return null
  }

  const enemyAbilities = [...bossAbilities, ...trashAbilities]

  return (
    <table className="dungeon-ability-table table-auto border-2 border-gray-400 rounded-md outline-1 overflow-hidden">
      <thead className="bg-teal-400">
        <tr>
          <th>Ability combos</th>
          {enemyAbilities.map((enemyAbility) => (
            <th key={enemyAbility.name}>
              <div className="flex justify-center">
                <WowSpellIcon ability={enemyAbility} />
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(comboCount)].map((_, comboIndex) => {
          const abilities = results[0]!.characters[characterIndex]![comboIndex]!.abilities
          console.log(abilities)
          return (
            <tr key={comboIndex}>
              <td className="flex items-center justify-center gap-1 bg-teal-500">
                {abilities.map((ability) => (
                  <WowSpellIcon key={ability.name} ability={ability} />
                ))}
              </td>
              {enemyAbilities.map((enemyAbility) => {
                const abilityResult = results.find(
                  (result) => result.enemyAbility.name === enemyAbility.name,
                )

                if (!abilityResult) {
                  console.error(`No ability result found for ${enemyAbility.name}`)
                  return null
                }

                const survival =
                  abilityResult.characters[characterIndex]![comboIndex]!.healthRemaining >
                  0

                return (
                  <td
                    key={abilityResult.enemyAbility.name}
                    className={`${survival ? 'bg-green-500' : 'bg-red-500'}`}
                  >
                    <div className="flex justify-center">
                      {survival ? <CheckIcon height={30} /> : <XMarkIcon height={30} />}
                    </div>
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
