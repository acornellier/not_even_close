import { DungeonKey, dungeonsByKey, EnemyAbility } from '../../backend/dungeons'
import { EnemyAbilityCard } from './EnemyAbilityCard'
import Image from 'next/image'
import { Button } from '../Common/Button'
import { AbilityResult } from '../../backend/sim/simTypes'
import { OnOffStateSelector } from '../Inputs/OnOffStateSelector'
import { useState } from 'react'
import useLocalStorage from '../Tools/useLocalStorage'

interface Props {
  selectedDungeon: DungeonKey
  selectedAbility: EnemyAbility | null
  onSelect: (bossAbility: EnemyAbility) => void
  deselectDungeon: () => void
  results: AbilityResult[] | null
}

export function DungeonAbilities({
  selectedDungeon,
  selectedAbility,
  onSelect,
  deselectDungeon,
  results,
}: Props) {
  const dungeon = dungeonsByKey[selectedDungeon]
  const [showAll, setShowAll] = useLocalStorage(`show-all-spells-${dungeon.key}`, false)
  const [abilityExtras, setAbilityExtras] = useState(new Set<string>())

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
        <div className="flex items-center gap-2">
          <Button short bigText onClick={deselectDungeon} className="gap-2 px-2">
            <Image
              className={`rounded border-2 border-gray-600`}
              height={32}
              width={32}
              src={`https://wow.zamimg.com/images/wow/icons/large/${dungeon.icon}.jpg`}
              alt={dungeon.name}
            />
            {dungeon.name}
          </Button>
          <OnOffStateSelector
            label1="One shots"
            label2="All spells"
            enabled={showAll}
            setIsEnabled={setShowAll}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            short
            className="hidden sm:block text-xl gap-2"
            onClick={shouldExpandAll ? expandAll : collapseAll}
          >
            {shouldExpandAll ? 'Expand all' : 'Collapse all'}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-x-2 gap-y-1 flex-wrap items-stretch">
        {dungeon.abilities
          .filter(({ notOneShot }) => showAll || !notOneShot)
          .map((ability) => {
            const abilityResult = results?.find(
              (result) => result.enemyAbilityDetails.name === ability.name
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
              />
            )
          })}
      </div>
    </div>
  )
}
