import { Dungeon, EnemyAbility, isSeason4 } from '../../backend/enemyAbilities/enemies.ts'
import { EnemyAbilityCard } from './EnemyAbilityCard.tsx'
import { AbilityResult } from '../../backend/sim/simTypes.ts'
import { useState } from 'react'

interface Props {
  bossAbilities: EnemyAbility[]
  trashAbilities: EnemyAbility[]
  dungeon: Dungeon
  selectedAbility: EnemyAbility | null
  onSelect: (bossAbility: EnemyAbility) => void
  results: AbilityResult[] | null
}

export function DungeonAbilityList({
  bossAbilities,
  trashAbilities,
  dungeon,
  selectedAbility,
  onSelect,
  results,
}: Props) {
  const [abilityExtras, setAbilityExtras] = useState(new Set<string>())

  const toggleAbilityExtras = (ability: EnemyAbility) => () => {
    const newSet = new Set([...abilityExtras])
    newSet.has(ability.name) ? newSet.delete(ability.name) : newSet.add(ability.name)
    setAbilityExtras(newSet)
  }

  return (
    <div className="flex flex-col gap-y-2 flex-wrap items-stretch">
      {[bossAbilities, trashAbilities].map((abilities) => {
        if (!abilities.length) return
        const isTrash = abilities[0]!.trashAbility
        return (
          <div
            key={String(isTrash)}
            className="flex flex-col gap-x-2 gap-y-1 flex-wrap items-stretch"
          >
            {isTrash && (
              <div className="bg-teal-700 w-fit px-2 ml-1 -mb-1 rounded-t-md">
                Trash abiltiies
              </div>
            )}
            {abilities.map((ability) => {
              const abilityResult = results?.find(
                (result) => result.enemyAbilityDetails.name === ability.name,
              )

              return (
                <EnemyAbilityCard
                  key={ability.name}
                  ability={ability}
                  onSelect={() => onSelect(ability)}
                  selected={
                    selectedAbility !== null && selectedAbility.name === ability.name
                  }
                  result={abilityResult}
                  showExtras={abilityExtras.has(ability.name)}
                  toggleExtras={toggleAbilityExtras(ability)}
                  isSeason4={isSeason4(dungeon.key)}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
