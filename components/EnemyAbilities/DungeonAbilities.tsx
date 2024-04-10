import { Dungeon, EnemyAbility, isSeason4 } from '../../backend/enemyAbilities/enemies'
import { EnemyAbilityCard } from './EnemyAbilityCard'
import { Button } from '../Common/Button'
import { AbilityResult } from '../../backend/sim/simTypes'
import { useState } from 'react'
import useLocalStorage from '../Tools/useLocalStorage'
import { Toggle } from '../Inputs/Toggle'
import { WowIcon } from '../Common/WowIcon'

interface Props {
  dungeon: Dungeon
  selectedAbility: EnemyAbility | null
  onSelect: (bossAbility: EnemyAbility) => void
  deselectDungeon: () => void
  results: AbilityResult[] | null
}

export function DungeonAbilities({
  dungeon,
  selectedAbility,
  onSelect,
  deselectDungeon,
  results,
}: Props) {
  const [showPeriodic, setShowPeriodic] = useLocalStorage(
    `show-periodic-${dungeon.key}`,
    false,
  )
  const [showAvoidable, setShowAvoidable] = useLocalStorage(
    `show-avoidable-${dungeon.key}`,
    false,
  )
  const [abilityExtras, setAbilityExtras] = useState(new Set<string>())

  const abilities = dungeon.abilities
    .filter(({ periodic }) => showPeriodic || !periodic)
    .filter(({ avoidable }) => showAvoidable || !avoidable)
  const bossAbilities = abilities.filter(({ trashAbility }) => !trashAbility)
  const trashAbilities = abilities.filter(({ trashAbility }) => trashAbility)

  const shouldExpandAll = abilityExtras.size < dungeon.abilities.length

  const expandAll = () => {
    setAbilityExtras(new Set(dungeon.abilities.map(({ name }) => name)))
  }

  const collapseAll = () => {
    setAbilityExtras(new Set([]))
  }

  const toggleAbilityExtras = (ability: EnemyAbility) => () => {
    const newSet = new Set([...abilityExtras])
    newSet.has(ability.name) ? newSet.delete(ability.name) : newSet.add(ability.name)
    setAbilityExtras(newSet)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Button short bigText onClick={deselectDungeon} className="gap-2 px-2">
            <WowIcon icon={dungeon.icon} size={32} />
            <div className="hidden sm:block">{dungeon.name}</div>
          </Button>
          {isSeason4(dungeon.key) && (
            <Toggle
              label="Avoidable"
              checked={showAvoidable}
              onChange={setShowAvoidable}
            />
          )}
          {isSeason4(dungeon.key) && (
            <Toggle label="Periodic" checked={showPeriodic} onChange={setShowPeriodic} />
          )}
        </div>
        {isSeason4(dungeon.key) && (
          <div className="flex items-center gap-2">
            <Button
              short
              className="hidden sm:block text-xl gap-2"
              onClick={shouldExpandAll ? expandAll : collapseAll}
            >
              {shouldExpandAll ? 'Expand all' : 'Collapse all'}
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-2 flex-wrap items-stretch">
        {[bossAbilities, trashAbilities].map((abilities) => {
          if (!abilities.length) return
          const isTrash = abilities[0].trashAbility
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
    </div>
  )
}
