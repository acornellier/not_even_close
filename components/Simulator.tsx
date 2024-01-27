import { EnemyAbilityDetails, KeyDetails, Result, simulate } from '../backend/sim'
import { ResultsFull } from './Results/ResultsFull'
import { useCallback, useEffect, useState } from 'react'
import { Ability } from '../backend/ability'
import { EnemyAbilities } from './EnemyAbilities/EnemyAbilities'
import { LabelledAbilitySelect } from './Abilities/LabelledAbilitySelect'
import { groupBuffs } from '../backend/groupAbilities/groupBuffs'
import { Instructions } from './Results/Instructions'
import useLocalStorage from './Tools/useLocalStorage'
import { CustomDrs } from './Abilities/CustomDrs'
import { CustomAbsorbs } from './Abilities/CustomAbsorbs'
import { KeyDetailsInput } from './Inputs/KeyDetailsInput'
import { EnemyAbilityDetailsInput } from './EnemyAbilities/EnemyAbilityDetailsInput'
import { MoreLess } from './Abilities/MoreLess'
import { Dungeon, EnemyAbility } from '../backend/dungeons'
import { Label } from './Inputs/Label'
import { ResultsMini } from './Results/ResultsMini'
import { SimContextProvider } from './Tools/SimContext'
import { groupActives } from '../backend/groupAbilities/groupActives'
import { DungeonSelect } from './EnemyAbilities/DungeonSelect'
import { enemyAbilityToDetails } from '../backend/utils'
import { Characters, defaultCharacter, defaultCharacters } from './Characters/Characters'

const defaultGroupBuffs: Ability[] = []
const defaultGroupActives: Ability[] = []

const defaultKeyDetails: KeyDetails = { keyLevel: 28, isTyran: true }

const defaultEnemyDetails: EnemyAbilityDetails = {
  damage: 100_000,
  isAoe: false,
  isTrashAbility: false,
  isPhysical: false,
  isReducedByArmor: false,
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
  const [selectedDungeon, setSelectedDungeon] = useLocalStorage<Dungeon | null>(
    'selectedDungeon',
    null
  )
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

  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    const result = simulate({
      characters,
      groupAbilities: [...selectedGroupBuffs, ...selectedGroupActives],
      customDrs: customDrs.split(',').map(Number).filter(Boolean),
      customAbsorbs: customAbsorbs.split(',').map(Number).filter(Boolean),
      keyDetails,
      dungeon: selectedDungeon,
      enemyAbilityDetails,
    })
    setResult(result)
  }, [
    characters,
    customDrs,
    customAbsorbs,
    keyDetails,
    enemyAbilityDetails,
    selectedGroupBuffs,
    selectedGroupActives,
    selectedDungeon,
  ])

  return (
    <SimContextProvider result={result}>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col gap-4 grow">
          <KeyDetailsInput keyDetails={keyDetails} setKeyDetails={setKeyDetails} />

          <EnemyAbilityDetailsInput
            enemyAbilityDetails={enemyAbilityDetails}
            setEnemyAbilityDetails={(details) => {
              setEnemyAbility(null)
              setEnemyAbilityDetails(details)
            }}
          />

          <div className="border-2 w-full dark:border-gray-600" />

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
            <Label
              short
              button
              className="gap-2"
              onClick={() => setCharacters([...characters, defaultCharacter])}
            >
              Add character
            </Label>
          </div>

          <div className="border-2 w-full dark:border-gray-600" />

          {!selectedDungeon ? (
            <DungeonSelect setSelectedDungeon={setSelectedDungeon} />
          ) : (
            <EnemyAbilities
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

        <div className="border-2 mx-2 dark:border-gray-600" />

        <div className="basis-[400px] relative">
          <div className="sm:sticky sm:top-10">
            {result === null ? null : result.main.characters.length === 1 ? (
              <ResultsFull result={result.main} />
            ) : (
              <ResultsMini result={result.main} />
            )}

            <div className="border-2 my-4 dark:border-gray-600" />

            <Instructions />
          </div>
        </div>
      </div>
    </SimContextProvider>
  )
}
