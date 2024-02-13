import { EnemyAbilityDetails, KeyDetails, Result, simulate } from '../backend/sim'
import { useCallback, useEffect, useState } from 'react'
import { Ability } from '../backend/ability'
import { EnemyAbilities } from './EnemyAbilities/EnemyAbilities'
import { LabelledAbilitySelect } from './Abilities/LabelledAbilitySelect'
import { groupBuffs } from '../backend/groupAbilities/groupBuffs'
import useLocalStorage from './Tools/useLocalStorage'
import { CustomDrs } from './Abilities/CustomDrs'
import { CustomAbsorbs } from './Abilities/CustomAbsorbs'
import { KeyDetailsInput } from './Inputs/KeyDetailsInput'
import { EnemyAbilityDetailsInput } from './EnemyAbilities/EnemyAbilityDetailsInput'
import { MoreLess } from './Abilities/MoreLess'
import { Dungeon, EnemyAbility } from '../backend/dungeons'
import { Sidebar } from './Sidebar'
import { SimContextProvider } from './Tools/SimContext'
import { groupActives } from '../backend/groupAbilities/groupActives'
import { DungeonSelect } from './EnemyAbilities/DungeonSelect'
import { enemyAbilityToDetails } from '../backend/utils'
import { Characters, defaultCharacter, defaultCharacters } from './Characters/Characters'
import { VersModal } from './Common/VersModal'
import { Button } from './Common/Button'

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
    ]
  )

  const [result, setResult] = useState<Result>(simulateResult())

  useEffect(() => {
    setResult(simulateResult())
  }, [simulateResult])

  const [versModalOpen, setVersModalOpen] = useState(false)
  const [versModalAck, setVersModalAck] = useLocalStorage('versModalAck', false)

  useEffect(() => {
    if (characters[0]?.stats.versatilityRaw === undefined) setVersModalOpen(true)
  }, [characters])

  const onHideModal = useCallback(() => {
    setVersModalOpen(false)
    setVersModalAck(true)
  }, [setVersModalAck])

  return (
    <SimContextProvider result={result}>
      <VersModal open={versModalOpen && !versModalAck} hide={onHideModal} />
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
            <Button
              short
              onClick={() => setCharacters([...characters, defaultCharacter])}
            >
              Add character
            </Button>
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
          <Sidebar result={result} enemyAbility={enemyAbility} keyDetails={keyDetails} />
        </div>
      </div>
    </SimContextProvider>
  )
}
