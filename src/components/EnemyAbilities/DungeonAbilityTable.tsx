import { DungeonAbilityResult } from '../../backend/sim/simTypes.ts'
import { WowSpellIcon } from '../Common/WowSpellIcon.tsx'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface Props {
  results: DungeonAbilityResult[] | null
  selectedCombo: number
  characterIndex: number
}

export function DungeonAbilityTable({ results, characterIndex }: Props) {
  if (results === null) return null

  const comboCount = results[0]?.characters[0]?.length
  if (!comboCount) {
    console.error(`No characters found in dungeon ability results`)
    return null
  }

  console.log(results)

  return (
    <table className="table-auto border border-gray-400 rounded-md outline-1 overflow-hidden">
      <thead className="bg-teal-400">
        <tr>
          <th>Ability combos</th>
          {results.map(({ enemyAbility }) => (
            <th key={enemyAbility.name} className="p-1">
              <WowSpellIcon ability={enemyAbility} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(comboCount)].map((_, comboIndex) => {
          const abilities = results[0]!.characters[characterIndex]![comboIndex]!.abilities
          return (
            <tr key={comboIndex}>
              <td className="flex items-center justify-center p-1 gap-1 bg-teal-500">
                {abilities.map((ability) => (
                  <WowSpellIcon key={ability.name} ability={ability} />
                ))}
              </td>
              {results.map((abilityResult) => {
                return (
                  <td key={abilityResult.enemyAbility.name} className="p-1 bg-teal-500">
                    {abilityResult.characters[characterIndex]![comboIndex]!
                      .healthRemaining > 0 ? (
                      <CheckCircleIcon height={30} color="green" />
                    ) : (
                      <XMarkIcon height={30} color="red" />
                    )}
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
