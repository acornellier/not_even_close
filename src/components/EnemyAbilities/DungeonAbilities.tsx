import { Dungeon, EnemyAbility, isSeason4 } from '../../backend/enemyAbilities/enemies'
import { Button } from '../Common/Button'
import { DungeonAbilityResult } from '../../backend/sim/simTypes'
import { useLocalStorage } from '../../util/useLocalStorage'
import { Toggle } from '../Inputs/Toggle'
import { WowIcon } from '../Common/WowIcon'
import { OnOffStateSelector } from '../Inputs/OnOffStateSelector.tsx'
import { DungeonAbilityList } from './DungeonAbilityList.tsx'
import { DungeonAbilityTable } from './DungeonAbilityTable.tsx'

interface Props {
  dungeon: Dungeon
  selectedAbility: EnemyAbility | null
  onSelect: (bossAbility: EnemyAbility) => void
  deselectDungeon: () => void
  results: DungeonAbilityResult[] | null
  selectedCombo: number
}

export function DungeonAbilities({
  dungeon,
  selectedAbility,
  onSelect,
  deselectDungeon,
  results,
  selectedCombo,
}: Props) {
  const [showPeriodic, setShowPeriodic] = useLocalStorage(
    `show-periodic-${dungeon.key}`,
    false,
  )
  const [showAvoidable, setShowAvoidable] = useLocalStorage(
    `show-avoidable-${dungeon.key}`,
    false,
  )
  const [isTableView, setIsTableView] = useLocalStorage('dungeon-table-view', true)

  const abilities = dungeon.abilities
    .filter(({ periodic }) => showPeriodic || !periodic)
    .filter(({ avoidable }) => showAvoidable || !avoidable)
  const bossAbilities = abilities.filter(({ trashAbility }) => !trashAbility)
  const trashAbilities = abilities.filter(({ trashAbility }) => trashAbility)

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
            <OnOffStateSelector
              label1="List"
              label2="Grid"
              enabled={isTableView}
              setIsEnabled={setIsTableView}
            />
          </div>
        )}
      </div>
      {isTableView ? (
        <DungeonAbilityTable
          results={results}
          selectedCombo={selectedCombo}
          characterIndex={0}
        />
      ) : (
        <DungeonAbilityList
          bossAbilities={bossAbilities}
          trashAbilities={trashAbilities}
          dungeon={dungeon}
          selectedAbility={selectedAbility}
          onSelect={onSelect}
          results={results}
          selectedCombo={selectedCombo}
        />
      )}
    </div>
  )
}
