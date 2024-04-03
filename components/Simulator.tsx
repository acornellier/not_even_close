import { simulate } from '../backend/sim/sim'
import { useCallback, useEffect, useState } from 'react'
import { Ability } from '../backend/ability'
import { DungeonAbilities } from './EnemyAbilities/DungeonAbilities'
import { LabelledAbilitySelect } from './Abilities/LabelledAbilitySelect'
import { groupBuffs } from '../backend/groupAbilities/groupBuffs'
import useLocalStorage from './Tools/useLocalStorage'
import { CustomDrs } from './Abilities/CustomDrs'
import { CustomAbsorbs } from './Abilities/CustomAbsorbs'
import { KeyDetailsInput } from './Inputs/KeyDetailsInput'
import { EnemyAbilityDetailsInput } from './EnemyAbilities/EnemyAbilityDetailsInput'
import { MoreLess } from './Abilities/MoreLess'
import { DungeonKey, dungeonKeys, EnemyAbility } from '../backend/dungeons'
import { Sidebar } from './Sidebar/Sidebar'
import { SimContextProvider } from './Tools/SimContext'
import { groupActives } from '../backend/groupAbilities/groupActives'
import { DungeonSelect } from './EnemyAbilities/DungeonSelect'
import { enemyAbilityToDetails } from '../backend/utils'
import { Characters, defaultCharacter, defaultCharacters } from './Characters/Characters'
import { Button } from './Common/Button'
import { EnemyAbilityDetails, KeyDetails, Result } from '../backend/sim/simTypes'
import { useKeyHeld } from './Tools/useKeyHeld'

const defaultGroupBuffs: Ability[] = []
const defaultGroupActives: Ability[] = []

const defaultKeyDetails: KeyDetails = { keyLevel: 28, isTyran: true }

const defaultEnemyDetails: EnemyAbilityDetails = {
  damage: 100_000,
  isAoe: false,
  isTrashAbility: false,
  isPhysical: false,
  ignoresArmor: false,
}

export function Simulator() {
  const [characters, setCharacters] = useLocalStorage('characters', defaultCharacters)
  const [selectedGroupBuffs, setGroupBuffs] = useLocalStorage<Ability[]>(
    'groupBuffs',
    defaultGroupBuffs
  )
  const [selectedGroupActives, setGroupActives] = useLocalStorage<Ability[]>(
    'groupActives',
    defaultGroupActives
  )

  const [keyDetails, setKeyDetails] = useLocalStorage('keyDetails', defaultKeyDetails)
  let [selectedDungeon, setSelectedDungeon] = useLocalStorage<DungeonKey | null>(
    'selectedDungeon',
    null
  )

  if (selectedDungeon && !dungeonKeys.includes(selectedDungeon)) {
    setSelectedDungeon(null)
    selectedDungeon = null
  }

  const [enemyAbility, setEnemyAbility] = useLocalStorage<EnemyAbility | null>(
    'selectedAbility',
    null
  )
  const [enemyAbilityDetails, setEnemyAbilityDetails] = useLocalStorage(
    'enemyAbilityDetails',
    defaultEnemyDetails
  )

  const [moreShown, setMoreShown] = useLocalStorage('moreShown', false)
  const [customDrs, setCustomDrs] = useLocalStorage('customDrs', '')
  const [customAbsorbs, setCustomAbsorbs] = useLocalStorage('customAbsorbs', '')

  const setMoreShownWithEffect = useCallback(
    (value: boolean) => {
      setMoreShown(value)
      if (!value) {
        setCustomDrs('')
        setCustomAbsorbs('')
      }
    },
    [setCustomAbsorbs, setCustomDrs, setMoreShown]
  )

  const [isBeta, setIsBeta] = useLocalStorage('s4Beta', false)
  const isAltHeld = useKeyHeld('Alt')
  const isShiftHeld = useKeyHeld('Shift')

  const simulateResult = useCallback(
    () =>
      simulate({
        characters,
        groupAbilities: [...selectedGroupBuffs, ...selectedGroupActives],
        customDrs: customDrs.split(',').map(Number).filter(Boolean),
        customAbsorbs: customAbsorbs.split(',').map(Number).filter(Boolean),
        keyDetails,
        dungeon: selectedDungeon,
        enemyAbilityDetails,
        isBeta,
      }),
    [
      characters,
      customDrs,
      customAbsorbs,
      keyDetails,
      enemyAbilityDetails,
      selectedGroupBuffs,
      selectedGroupActives,
      selectedDungeon,
      isBeta,
    ]
  )

  const [result, setResult] = useState<Result>(simulateResult())

  useEffect(() => {
    setResult(simulateResult())
  }, [simulateResult])

  return (
    <SimContextProvider result={result}>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="flex flex-col gap-3 grow">
          {(isBeta || (isAltHeld && isShiftHeld)) && (
            <Button className="gap-2 text-lg" onClick={() => setIsBeta(!isBeta)}>
              {isBeta ? 'Back to Season 3' : 'View Season 4 (WIP)'}
            </Button>
          )}

          <KeyDetailsInput keyDetails={keyDetails} setKeyDetails={setKeyDetails} />

          <EnemyAbilityDetailsInput
            enemyAbilityDetails={enemyAbilityDetails}
            setEnemyAbilityDetails={(details) => {
              setEnemyAbility(null)
              setEnemyAbilityDetails(details)
            }}
          />

          <div className="border-2 w-full border-gray-600" />

          <Characters
            characters={characters}
            setCharacters={setCharacters}
            selectedGroupBuffs={selectedGroupBuffs}
            setGroupBuffs={setGroupBuffs}
          />

          <LabelledAbilitySelect
            label="Group buffs"
            availableAbilities={groupBuffs}
            selectedAbilities={selectedGroupBuffs}
            setSelectedAbilities={setGroupBuffs}
          />

          <LabelledAbilitySelect
            label="Group actives"
            availableAbilities={groupActives}
            selectedAbilities={selectedGroupActives}
            setSelectedAbilities={setGroupActives}
          />

          {moreShown && (
            <>
              <CustomDrs customDrs={customDrs} setCustomDrs={setCustomDrs} />
              <CustomAbsorbs
                customAbsorbs={customAbsorbs}
                setCustomAbsorbs={setCustomAbsorbs}
              />
            </>
          )}

          <div className="flex gap-4">
            <MoreLess moreShown={moreShown} setMoreShown={setMoreShownWithEffect} />
            <Button
              short
              onClick={() => setCharacters([...characters, defaultCharacter])}
            >
              Add character
            </Button>
          </div>

          <div className="border-2 w-full border-gray-600" />

          {!selectedDungeon ? (
            <DungeonSelect isBeta={isBeta} setSelectedDungeon={setSelectedDungeon} />
          ) : (
            <DungeonAbilities
              selectedDungeon={selectedDungeon}
              selectedAbility={enemyAbility}
              deselectDungeon={() => setSelectedDungeon(null)}
              onSelect={(enemyAbility) => {
                setEnemyAbility(enemyAbility)
                setEnemyAbilityDetails(enemyAbilityToDetails(enemyAbility))
              }}
              results={result?.dungeon ?? null}
            />
          )}
        </div>

        <div className="border-2 mx-2 border-gray-600" />

        <div className="basis-[360px] relative">
          <Sidebar result={result} enemyAbility={enemyAbility} keyDetails={keyDetails} />
        </div>
      </div>
    </SimContextProvider>
  )
}
