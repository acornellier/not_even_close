import { Character } from '../backend/characterStats'
import { EnemyAbilityDetails, KeyDetails, Result, simulate } from '../backend/sim'
import { Results } from './Results'
import { Fragment, useEffect, useState } from 'react'
import { Ability } from '../backend/ability'
import { EnemyAbilities } from './EnemyAbilities/EnemyAbilities'
import { GroupBuffs } from './Abilities/GroupBuffs'
import { groupActives, groupBuffs } from '../backend/groupBuffs'
import { Instructions } from './Instructions'
import { augmentAbilities } from '../backend/utils'
import useLocalStorage from './Tools/useLocalStorage'
import { CustomDrs } from './Abilities/CustomDrs'
import { CustomAbsorbs } from './Abilities/CustomAbsorbs'
import { KeyDetailsInput } from './Inputs/KeyDetailsInput'
import { EnemyAbilityDetailsInput } from './EnemyAbilities/EnemyAbilityDetailsInput'
import { MoreLess } from './Abilities/MoreLess'
import { EnemyAbility } from '../backend/enemyAbilities'
import { Label } from './Inputs/Label'
import { CharacterComponent } from './CharacterComponent'
import { ClassSpec, defaultAbilities } from '../backend/classes'

const defaultClassSpec: ClassSpec = { class: 'Monk', spec: 'Mistweaver' }
const defaultCharacter: Character = {
  classSpec: defaultClassSpec,
  stats: { stamina: 41_000, versatilityPercent: 5, avoidancePercent: 3 },
  abilities: defaultAbilities(defaultClassSpec),
  externals: [],
}

const defaultCharacters = [defaultCharacter]

const defaultKeyDetails: KeyDetails = { keyLevel: 28, isTyran: true }

const defaultEnemyDetails: EnemyAbilityDetails = {
  baseDamage: 100_000,
  isAoe: false,
  isBossAbility: true,
}

export function Simulator() {
  const [selectedGroupAbilities, setSelectedGroupAbilities] = useState<Ability[]>([])

  const [characters, setCharacters] = useLocalStorage('characters', defaultCharacters)

  const setCharacterIdx = (index: number) => (newCharacter: Character) =>
    setCharacters(
      characters.map((character, index2) => (index2 === index ? newCharacter : character))
    )

  const removeCharacterIdx = (index: number) => () =>
    setCharacters(characters.filter((_, index2) => index2 !== index))

  const [moreShown, setMoreShown] = useLocalStorage('moreShown', false)
  const [customDrs, setCustomDrs] = useState('')
  const [customAbsorbs, setCustomAbsorbs] = useState('')

  const [keyDetails, setKeyDetails] = useLocalStorage('keyDetails', defaultKeyDetails)
  const [enemyAbility, setEnemyAbility] = useState<EnemyAbility | null>(null)
  const [enemyAbilityDetails, setEnemyAbilityDetails] = useLocalStorage(
    'enemyAbilityDetails',
    defaultEnemyDetails
  )

  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    if (!moreShown) {
      setCustomDrs('')
      setCustomAbsorbs('')
    }
  }, [moreShown])

  useEffect(() => {
    const augmentedSelectedGroupAbilities = augmentAbilities(
      selectedGroupAbilities,
      selectedGroupAbilities
    )

    const results = characters.map((character) => {
      const augmentedSelectedAbilities = augmentAbilities(
        character.abilities,
        character.abilities
      )

      return simulate({
        spec: character.classSpec,
        characterStats: {
          stamina: character.stats.stamina ?? 0,
          versatility: (character.stats.versatilityPercent ?? 0) / 100,
          avoidance: (character.stats.avoidancePercent ?? 0) / 100,
        },
        abilities: [
          ...augmentedSelectedAbilities,
          ...character.externals,
          ...augmentedSelectedGroupAbilities,
        ],
        customDrs: customDrs.split(',').map(Number).filter(Boolean),
        customAbsorbs: customAbsorbs.split(',').map(Number).filter(Boolean),
        keyDetails,
        enemyAbilityDetails,
      })
    })
    setResults(results)
  }, [
    characters,
    customDrs,
    customAbsorbs,
    keyDetails,
    enemyAbilityDetails,
    selectedGroupAbilities,
  ])

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col items-start gap-4">
        <KeyDetailsInput keyDetails={keyDetails} setKeyDetails={setKeyDetails} />

        <EnemyAbilityDetailsInput
          enemyAbilityDetails={enemyAbilityDetails}
          setEnemyAbilityDetails={setEnemyAbilityDetails}
        />

        <div className="border-2 w-full dark:border-gray-600" />

        {characters.map((character, idx) => (
          <Fragment key={idx}>
            <CharacterComponent
              character={character}
              setCharacter={setCharacterIdx(idx)}
              canRemove={characters.length > 1}
              removeCharacter={removeCharacterIdx(idx)}
            />
            {characters.length > 1 && (
              <div className="border-2 w-full dark:border-gray-600" />
            )}
          </Fragment>
        ))}

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
          <MoreLess moreShown={moreShown} setMoreShown={setMoreShown} />
          <Label
            short
            className="gap-2 cursor-pointer"
            onClick={() => setCharacters([...characters, defaultCharacter])}
          >
            Add a player
          </Label>
        </div>

        <div className="border-2 w-full dark:border-gray-600" />

        <EnemyAbilities
          onSelect={(enemyAbility) => {
            setEnemyAbility(enemyAbility)
            setEnemyAbilityDetails({
              name: enemyAbility.name,
              baseDamage: enemyAbility.damage,
              isAoe: enemyAbility.isAoe,
              isBossAbility: !enemyAbility.isTrashAbility,
              isPhysical: enemyAbility.isPhysical,
            })
          }}
        />
      </div>

      <div className="border-2 mx-2 dark:border-gray-600" />

      <div className="basis-96 relative">
        <div className="sm:sticky sm:top-10">
          <Results
            results={results}
            enemyAbility={enemyAbility}
            enemyAbilityDetails={enemyAbilityDetails}
          />

          <div className="border-2 my-4 dark:border-gray-600" />

          <Instructions />
        </div>
      </div>
    </div>
  )
}
