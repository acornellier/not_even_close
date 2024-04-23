import { simulate } from '../backend/sim/sim'
import { useCallback, useEffect, useState } from 'react'
import type { Ability } from '../backend/ability'
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
import { defaultCharacter, defaultCharacters } from './Characters/defaultCharacters.ts'
import { Modal } from './Common/Modal.tsx'
import { Label } from './Common/Label.tsx'

const defaultGroupBuffs: Ability[] = []
const defaultGroupActives: Ability[] = []

const defaultKeyDetails: KeyDetails = { keyLevel: 15, isTyran: true }

interface Props {
  defaultEnemyAbility?: EnemyAbility
}

export function Simulator({ defaultEnemyAbility }: Props) {
  const [characters, setCharacters] = useLocalStorage('characters', defaultCharacters)
  const [selectedGroupBuffs, setGroupBuffs] = useLocalStorage<Ability[]>(
    'groupBuffs',
    defaultGroupBuffs,
  )
  const [selectedGroupActives, setGroupActives] = useLocalStorage<Ability[]>(
    'groupActives',
    defaultGroupActives,
  )

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

  const [modalAck, setModalAck] = useLocalStorage('s4-damage-warning-modal-ack', false)

  return (
    <SimContextProvider result={result}>
      {!modalAck && (
        <Modal
          title="Season 4 is live but slightly INNACURATE!"
          onConfirm={() => setModalAck(true)}
          onClose={() => setModalAck(true)}
          contents={
            <div>
              Due to the major changes in key scaling, the damage is expected to be
              slightly different than what is currently shown. Beta results seem
              unreliable. When the patch goes live, I will verify the in-game numbers and
              update the simulator accordingly.
            </div>
          }
          buttons={
            <>
              <Button onClick={() => setModalAck(true)}>Got it!</Button>
            </>
          }
        />
      )}
      <div className="flex flex-col lg:flex-row gap-2 mb-24">
        <div className="flex flex-col gap-3 grow">
          <Label className="gap-2 text-lg [&]:bg-red-600">
            WARNING: values may be slightly inaccurate. They are based on PTR values.
          </Label>

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
