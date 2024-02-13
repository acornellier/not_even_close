import {
  Dungeon,
  dungeonIcons,
  dungeonAbilities,
  EnemyAbility,
} from '../../backend/dungeons'
import { EnemyAbilityCard } from './EnemyAbilityCard'
import Image from 'next/image'
import { AbilityResult } from '../../backend/sim'
import { Button } from '../Common/Button'

interface Props {
  selectedDungeon: Dungeon
  selectedAbility: EnemyAbility | null
  onSelect: (bossAbility: EnemyAbility) => void
  deselectDungeon: () => void
  results: AbilityResult[] | null
}

export function EnemyAbilities({
  selectedDungeon,
  selectedAbility,
  onSelect,
  deselectDungeon,
  results,
}: Props) {
  const abilities = dungeonAbilities[selectedDungeon]

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <Button short bigText onClick={deselectDungeon} className="text-xl gap-2 px-2">
          <Image
            className={`rounded border-2 border-gray-600`}
            height={32}
            width={32}
            src={`https://wow.zamimg.com/images/wow/icons/large/${dungeonIcons[selectedDungeon]}.jpg`}
            alt={selectedDungeon}
          />
          {selectedDungeon}
        </Button>
      </div>
      <div className="flex flex-col gap-x-2 gap-y-1 flex-wrap items-stretch">
        {abilities.map((ability) => {
          const abilityResult = results?.find(
            (result) => result.enemyAbilityDetails.name === ability.name
          )

          return (
            <EnemyAbilityCard
              key={ability.name}
              ability={ability}
              onSelect={() => onSelect(ability)}
              selected={selectedAbility !== null && selectedAbility.name === ability.name}
              result={abilityResult}
            />
          )
        })}
      </div>
    </div>
  )
}
