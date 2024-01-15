import { Character } from '../backend/characterStats'
import { CharacterStatsForm } from './CharacterStatsForm'
import { ClassDropdown } from './Abilities/ClassDropdown'
import { AbilitySelect } from './Abilities/AbilitySelect'
import { classSpecs, ClassSpec, defaultAbilities } from '../backend/classes'
import { GroupBuffs } from './Abilities/GroupBuffs'
import { externals } from '../backend/groupAbilities/externals'

interface Props {
  character: Character
  setCharacter: (value: Character) => void
  canRemove: boolean
  removeCharacter: () => void
}

export function CharacterComponent({
  character,
  setCharacter,
  canRemove,
  removeCharacter,
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
        {canRemove && (
          <div className="cursor-pointer text-teal-500" onClick={removeCharacter}>
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
          </div>
        )}
      </div>

      <div className="flex gap-4 items-start flex-col md:flex-row md:items-center">
        <ClassDropdown onChange={setSpec} selectedClassSpec={character.classSpec} />
        <AbilitySelect
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
