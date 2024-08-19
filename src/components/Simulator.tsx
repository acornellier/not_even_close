import { simulate } from '../backend/sim/sim'
import { useCallback, useEffect, useState } from 'react'
import { DungeonAbilities } from './EnemyAbilities/DungeonAbilities'
import { LabelledAbilitySelect } from './Abilities/LabelledAbilitySelect'
import { groupBuffs } from '../backend/groupAbilities/groupBuffs'
import { useLocalStorage } from '../util/useLocalStorage'
import { CustomDrs } from './Abilities/CustomDrs'
import { CustomAbsorbs } from './Abilities/CustomAbsorbs'
import { KeyDetailsInput } from './Inputs/KeyDetailsInput'
import { EnemyAbilityDetailsInput } from './EnemyAbilities/EnemyAbilityDetailsInput'
import { MoreLess } from './Abilities/MoreLess'
import type { EnemyAbility } from '../backend/enemyAbilities/enemies'
import { Sidebar } from './Sidebar/Sidebar'
import { SimContextProvider } from '../util/SimContext'
import { groupActives } from '../backend/groupAbilities/groupActives'
import { DungeonSelect } from './EnemyAbilities/DungeonSelect'
import { Characters } from './Characters/Characters'
import { Button } from './Common/Button'
import type { KeyDetails, Result } from '../backend/sim/simTypes'
import { useEnemyAbility } from './EnemyAbilities/useEnemyAbility'
import { dungeons } from '../backend/enemyAbilities/dungeons.ts'
import { defaultCharacter } from './Characters/defaultCharacters.ts'
import { useCharacters } from './Characters/useCharacters.ts'
import { useTwwCacheWipe } from '../util/UseTwwCacheWipe.tsx'
import { Label } from './Common/Label.tsx'

const defaultKeyDetails: KeyDetails = { keyLevel: 15, isTyran: true }

interface Props {
  defaultEnemyAbility?: EnemyAbility
}

export function Simulator({ defaultEnemyAbility }: Props) {
  useTwwCacheWipe()

  const {
    characters,
    setCharacters,
    selectedGroupBuffs,
    setGroupBuffs,
    selectedGroupActives,
    setGroupActives,
  } = useCharacters()

  const [keyDetails, setKeyDetails] = useLocalStorage('keyDetails', defaultKeyDetails)

  const {
    selectedDungeon,
    setSelectedDungeonKey,
    enemyAbility,
    enemyAbilityDetails,
    setEnemyAbility,
    setEnemyAbilityDetails,
  } = useEnemyAbility({ defaultEnemyAbility })

  const [customDetailsShown, setCustomDetailsShown] = useLocalStorage('moreKey', false)

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
    [setCustomAbsorbs, setCustomDrs, setMoreShown],
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
      selectedGroupBuffs,
      selectedGroupActives,
      customDrs,
      customAbsorbs,
      keyDetails,
      selectedDungeon,
      enemyAbilityDetails,
    ],
  )

  const [result, setResult] = useState<Result>(simulateResult())

  useEffect(() => {
    setResult(simulateResult())
  }, [simulateResult])

  return (
    <SimContextProvider dungeon={selectedDungeon} result={result}>
      <div className="flex flex-col lg:flex-row gap-2 mb-24">
        <div className="flex flex-col gap-3 grow">
          <Label className="[&]:bg-green-700">
            Not Even Close has been updated for level 80 TWW characters.
          </Label>

          <div className="flex justify-between">
            <KeyDetailsInput keyDetails={keyDetails} setKeyDetails={setKeyDetails} />

            <div className="self-end">
              <MoreLess
                moreShown={customDetailsShown}
                setMoreShown={setCustomDetailsShown}
              />
            </div>
          </div>

          {customDetailsShown && (
            <EnemyAbilityDetailsInput
              enemyAbilityDetails={enemyAbilityDetails}
              setEnemyAbilityDetails={setEnemyAbilityDetails}
            />
          )}

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
            <DungeonSelect
              dungeons={dungeons}
              setSelectedDungeon={setSelectedDungeonKey}
            />
          ) : (
            <DungeonAbilities
              dungeon={selectedDungeon}
              selectedAbility={enemyAbility}
              deselectDungeon={() => setSelectedDungeonKey(null)}
              onSelect={setEnemyAbility}
              results={result?.dungeon ?? null}
              characters={characters}
              keyDetails={keyDetails}
            />
          )}
        </div>

        <div className="border-2 mx-2 border-gray-600" />

        <div className="w-[320px] relative">
          <Sidebar result={result} enemyAbility={enemyAbility} keyDetails={keyDetails} />
        </div>
      </div>
    </SimContextProvider>
  )
}
