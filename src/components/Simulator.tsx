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
import { useAbilities } from './Characters/useAbilities.ts'
import { Label } from './Common/Label.tsx'
import {
  ArrowTopRightOnSquareIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

const defaultKeyDetails: KeyDetails = { keyLevel: 15, isTyran: true }

interface Props {
  defaultEnemyAbility?: EnemyAbility
}

export function Simulator({ defaultEnemyAbility }: Props) {
  const {
    characters,
    setCharacters,
    selectedGroupBuffs,
    setGroupBuffs,
    selectedGroupActives,
    setGroupActives,
  } = useAbilities()

  const [keyDetails, setKeyDetails] = useLocalStorage('keyDetails', defaultKeyDetails)

  const {
    selectedDungeon,
    setSelectedDungeonKey,
    enemyAbility,
    enemyAbilityDetails,
    setEnemyAbility,
    setEnemyAbilityDetails,
  } = useEnemyAbility({ defaultEnemyAbility })

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
      customDrs,
      customAbsorbs,
      keyDetails,
      enemyAbilityDetails,
      selectedGroupBuffs,
      selectedGroupActives,
      selectedDungeon,
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
          <div className="flex gap-2">
            <Label className="[&]:bg-red-700">
              <ExclamationTriangleIcon height={20} className="mr-1" />
              Not Even Close has NOT been updated for prepatch.
              <ExclamationTriangleIcon height={20} className="ml-1" />
            </Label>
            <a
              href="https://not-even-close-tww.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              <Button>
                <ArrowTopRightOnSquareIcon height={20} className="mr-1" />
                View TWW version (WIP!)
              </Button>
            </a>
          </div>
          <KeyDetailsInput keyDetails={keyDetails} setKeyDetails={setKeyDetails} />

          <EnemyAbilityDetailsInput
            enemyAbilityDetails={enemyAbilityDetails}
            setEnemyAbilityDetails={setEnemyAbilityDetails}
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
