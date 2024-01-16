import { Character } from '../backend/characterStats'
import { CharacterStatsForm } from './CharacterStatsForm'
import { ClassDropdown } from './Abilities/ClassDropdown'
import { AbilitySelect } from './Abilities/AbilitySelect'
import { classSpecs, ClassSpec, defaultAbilities } from '../backend/classes'
import { GroupBuffs } from './Abilities/GroupBuffs'
import { externals } from '../backend/groupAbilities/externals'
import { Tooltip } from 'react-tooltip'

interface Props {
  idx: number
  character: Character
  setCharacter: (value: Character) => void
  canRemove: boolean
  removeCharacter: () => void
  handlePaste: (characterIdx: number) => void
}

export function CharacterComponent({
  idx,
  character,
  setCharacter,
  canRemove,
  removeCharacter,
  handlePaste,
}: Props) {
  function setField<T>(field: keyof Character) {
    return (value: T) => setCharacter({ ...character, [field]: value })
  }

  const setCharacterStats = setField('stats')
  const setAbilities = setField('abilities')
  const setExternals = setField('externals')

  const setSpec = (spec: ClassSpec) => {
    setCharacter({
      ...character,
      classSpec: spec,
      abilities: defaultAbilities(spec),
    })
  }

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
          <div
            className="cursor-pointer text-teal-500 select-none"
            onClick={() => handlePaste(idx)}
          >
            <svg
              data-tooltip-id={`paste-character-${idx}`}
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
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
            <Tooltip
              id={`paste-character-${idx}`}
              className="z-10 max-w-sm"
              opacity={1}
              place="right"
            >
              Paste from addon
            </Tooltip>
          </div>
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
          allAbilities={specAbilities}
          selectedAbilities={character.abilities}
          setSelectedAbilities={setAbilities}
        />
      </div>

      <GroupBuffs
        label="Externals"
        allAbilities={externals}
        selectedGroupAbilities={character.externals}
        setSelectedGroupAbilities={setExternals}
      />
    </div>
  )
}
