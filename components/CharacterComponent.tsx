import { Character, CharacterStatsInput } from '../backend/characterStats'
import { CharacterStatsForm } from './CharacterStatsForm'
import { ClassDropdown } from './Abilities/ClassDropdown'
import { AbilitySelect } from './Abilities/AbilitySelect'
import { classSpecs, ClassSpec, defaultAbilities } from '../backend/classes'
import { LabelledAbilitySelect } from './Abilities/LabelledAbilitySelect'
import { externals } from '../backend/groupAbilities/externals'
import { Tooltip } from 'react-tooltip'
import { useCallback } from 'react'
import { Ability } from '../backend/ability'
import dynamic from 'next/dynamic'

interface Props {
  idx: number
  character: Character
  setCharacter: (value: Character) => void
  canRemove: boolean
  removeCharacter: () => void
  handlePaste: (characterIdx: number) => void
}

const PasteButtonNoSsr = dynamic(
  () => import('./Inputs/PasteButton').then((mod) => mod.PasteButton),
  { ssr: false }
)

export function CharacterComponent({
  idx,
  character,
  setCharacter,
  canRemove,
  removeCharacter,
  handlePaste,
}: Props) {
  const setCharacterStats = useCallback(
    (stats: CharacterStatsInput) => setCharacter({ ...character, stats }),
    [character, setCharacter]
  )

  const setAbilities = useCallback(
    (abilities: Ability[]) => setCharacter({ ...character, abilities }),
    [character, setCharacter]
  )

  const setExternals = useCallback(
    (newExternals: Ability[]) => setCharacter({ ...character, externals: newExternals }),
    [character, setCharacter]
  )

  const setSpec = useCallback(
    (spec: ClassSpec) => {
      setCharacter({
        ...character,
        classSpec: spec,
        abilities: defaultAbilities(spec),
      })
    },
    [character, setCharacter]
  )

  const specAbilities =
    classSpecs[character.classSpec.class][character.classSpec.spec].abilities

  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <div className="flex justify-between w-full">
        <CharacterStatsForm
          characterStats={character.stats}
          onChange={setCharacterStats}
        />
        <div className="flex gap-2 h-fit">
          <PasteButtonNoSsr handlePaste={handlePaste} idx={idx} />

          {canRemove && (
            <div
              className="cursor-pointer text-teal-500"
              onClick={removeCharacter}
              data-tooltip-id={`delete-character-${idx}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <Tooltip
                id={`delete-character-${idx}`}
                className="z-10 max-w-sm"
                opacity={1}
                place="right"
              >
                Remove character
              </Tooltip>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 items-start flex-col md:flex-row md:items-center">
        <ClassDropdown onChange={setSpec} selectedClassSpec={character.classSpec} />
        <AbilitySelect
          character={character}
          availableAbilities={specAbilities}
          selectedAbilities={character.abilities}
          setSelectedAbilities={setAbilities}
        />
      </div>

      <LabelledAbilitySelect
        label="Externals"
        availableAbilities={externals}
        selectedAbilities={character.externals}
        setSelectedAbilities={setExternals}
      />
    </div>
  )
}
