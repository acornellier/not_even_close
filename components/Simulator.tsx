import { CharacterStatsInput } from '../backend/characterStats'
import { EnemyAbilityDetails, KeyDetails, Result, simulate } from '../backend/sim'
import { CharacterStatsForm } from './CharacterStatsForm'
import { ClassDropdown } from './ClassDropdown'
import { classSpecs, WowClassSpec } from '../backend/classes'
import { AbilitySelect } from './AbilitySelect'
import { Results } from './Results'
import { useEffect, useState } from 'react'
import { Ability } from '../backend/ability'
import { EnemyAbilities } from './EnemyAbilities'
import { GroupBuffs } from './GroupBuffs'
import { groupActives, groupBuffs, otherBuffs } from '../backend/groupBuffs'
import { Instructions } from './Instructions'
import { augmentAbilities } from '../backend/utils'
import useLocalStorage from './useLocalStorage'
import { CustomDrs } from './CustomDrs'
import { CustomAbsorbs } from './CustomAbsorbs'
import { KeyDetailsInput } from './KeyDetailsInput'
import { EnemyAbilityDetailsInput } from './EnemyAbilityDetailsInput'

const defaultCharacterStats: CharacterStatsInput = {
  stamina: 41_000,
  versatilityPercent: 5,
  avoidancePercent: 3,
}

const defaultClassSpec: WowClassSpec = { class: 'Monk', spec: 'Mistweaver' }
const defaultKeyDetails: KeyDetails = { keyLevel: 28, isTyran: true }

const defaultEnemyDetails: EnemyAbilityDetails = {
  baseDamage: 100_000,
  isAoe: false,
  isBossAbility: true,
}

export function Simulator() {
  const [characterStats, setCharacterStats] = useLocalStorage(
    'characterStats',
    defaultCharacterStats
  )
  const [classSpec, setClass] = useLocalStorage<WowClassSpec>(
    'wowClassSpec',
    defaultClassSpec
  )
  const [selectedSpecAbilities, setSelectedSpecAbilities] = useState<Ability[]>([])
  const [selectedGroupAbilities, setSelectedGroupAbilities] = useState<Ability[]>([])
  const [customDrs, setCustomDrs] = useState('')
  const [customAbsorbs, setCustomAbsorbs] = useState('')

  const [keyDetails, setKeyDetails] = useLocalStorage('keyDetails', defaultKeyDetails)
  const [enemyAbilityDetails, setEnemyAbilityDetails] = useLocalStorage(
    'enemyAbilityDetails',
    defaultEnemyDetails
  )

  const [result, setResult] = useState<Result | null>(null)

  const specAbilities = classSpecs[classSpec.class][classSpec.spec].abilities

  useEffect(() => {
    setSelectedSpecAbilities(specAbilities.filter(({ onByDefault }) => onByDefault))
  }, [classSpec, specAbilities])

  useEffect(() => {
    const augmentedSelectedAbilities = augmentAbilities(
      selectedSpecAbilities,
      selectedSpecAbilities
    )

    const augmentedSelectedGroupAbilities = augmentAbilities(
      selectedGroupAbilities,
      selectedGroupAbilities
    )

    const newResult = simulate({
      characterStats: {
        stamina: characterStats.stamina ?? 0,
        versatility: (characterStats.versatilityPercent ?? 0) / 100,
        avoidance: (characterStats.avoidancePercent ?? 0) / 100,
      },
      abilities: [...augmentedSelectedAbilities, ...augmentedSelectedGroupAbilities],
      customDrs: customDrs.split(',').map(Number).filter(Boolean),
      customAbsorbs: customAbsorbs.split(',').map(Number).filter(Boolean),
      keyDetails,
      enemyAbilityDetails,
    })
    setResult(newResult)
  }, [
    characterStats,
    customDrs,
    customAbsorbs,
    keyDetails,
    enemyAbilityDetails,
    selectedGroupAbilities,
    selectedSpecAbilities,
  ])

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col gap-4">
        <KeyDetailsInput keyDetails={keyDetails} setKeyDetails={setKeyDetails} />

        <EnemyAbilityDetailsInput
          enemyAbilityDetails={enemyAbilityDetails}
          setEnemyAbilityDetails={setEnemyAbilityDetails}
        />

        <div className="border-2 dark:border-gray-600" />

        <CharacterStatsForm
          characterStats={characterStats}
          onChange={setCharacterStats}
        />

        <div className="flex gap-4 items-start flex-col md:flex-row md:items-center">
          <ClassDropdown onChange={setClass} selectedClassSpec={classSpec} />
          <AbilitySelect
            allAbilities={specAbilities}
            selectedAbilities={selectedSpecAbilities}
            setSelectedAbilities={setSelectedSpecAbilities}
          />
        </div>

        <GroupBuffs
          label="Group buffs"
          allAbilities={groupBuffs}
          selectedGroupAbilities={selectedGroupAbilities}
          setSelectedGroupAbilities={setSelectedGroupAbilities}
        />

        <GroupBuffs
          label="Group actives"
          allAbilities={groupActives}
          selectedGroupAbilities={selectedGroupAbilities}
          setSelectedGroupAbilities={setSelectedGroupAbilities}
        />

        <GroupBuffs
          label="Externals"
          allAbilities={otherBuffs}
          selectedGroupAbilities={selectedGroupAbilities}
          setSelectedGroupAbilities={setSelectedGroupAbilities}
        />

        <CustomDrs customDrs={customDrs} setCustomDrs={setCustomDrs} />
        <CustomAbsorbs
          customAbsorbs={customAbsorbs}
          setCustomAbsorbs={setCustomAbsorbs}
        />

        <div className="border-2 dark:border-gray-600" />

        <EnemyAbilities
          onSelect={({ damage, isAoe, isTrashAbility }) => {
            setEnemyAbilityDetails({
              baseDamage: damage,
              isAoe,
              isBossAbility: !isTrashAbility,
            })
          }}
        />
      </div>

      <div className="border-2 mx-2 dark:border-gray-600" />

      <div className="basis-96">
        <Results result={result} />

        <div className="border-2 my-4 dark:border-gray-600" />

        <Instructions />
      </div>
    </div>
  )
}
