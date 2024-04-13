import {
  Character,
  CharacterStatsInput,
  Profile,
  UpdateCharacter,
} from '../../backend/characters'
import { CharacterStatsForm } from './CharacterStatsForm'
import { ClassDropdown } from '../Abilities/ClassDropdown'
import { AbilitySelect } from '../Abilities/AbilitySelect'
import { ClassSpec, classSpecs } from '../../backend/classes'
import { LabelledAbilitySelect } from '../Abilities/LabelledAbilitySelect'
import { externals } from '../../backend/groupAbilities/externals'
import { useCallback } from 'react'
import { Ability } from '../../backend/ability'
import { CreateProfile } from './CreateProfile'
import { LoadProfile } from './LoadProfile'
import { TooltipStyled } from '../Common/TooltipStyled'
import { PasteButton } from './PasteButton.tsx'

interface Props {
  charIndex: number
  character: Character
  profiles: Profile[]
  selectedCombo: number
  updateCharacter: UpdateCharacter
  canRemove: boolean
  removeCharacter: (charIndex: number) => void
  handlePaste: (charIndex: number, text: string) => void
  createProfile: (charIndex: number, name: string) => void
  loadProfile: (charIndex: number, profile: Profile | null) => void
  deleteProfile: (profileId: string) => void
}

export function CharacterComponent({
  charIndex,
  character,
  profiles,
  selectedCombo,
  updateCharacter,
  canRemove,
  removeCharacter,
  handlePaste,
  createProfile,
  loadProfile,
  deleteProfile,
}: Props) {
  const setCharacterStats = useCallback(
    (stats: CharacterStatsInput) =>
      updateCharacter({ charIndex, charChanges: { stats } }),
    [charIndex, updateCharacter],
  )

  const setAbilities = useCallback(
    (abilities: Ability[]) => updateCharacter({ charIndex, comboChanges: { abilities } }),
    [charIndex, updateCharacter],
  )

  const setExternals = useCallback(
    (newExternals: Ability[]) =>
      updateCharacter({ charIndex, comboChanges: { externals: newExternals } }),
    [charIndex, updateCharacter],
  )

  const setSpec = useCallback(
    (spec: ClassSpec) => updateCharacter({ charIndex, charChanges: { classSpec: spec } }),
    [charIndex, updateCharacter],
  )

  const specAbilities =
    classSpecs[character.classSpec.class][character.classSpec.spec]!.abilities

  const loadedProfile = profiles.find(
    (profile) => profile.id === character.loadedProfileId,
  )

  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <div className="flex justify-between w-full gap-2">
        <CharacterStatsForm
          characterStats={character.stats}
          onChange={setCharacterStats}
          specAbilities={specAbilities}
        />
        <div className="flex flex-col gap-2 items-end">
          <div className="flex gap-2 h-fit">
            <CreateProfile idx={charIndex} createProfile={createProfile} />
            <LoadProfile
              charIndex={charIndex}
              profiles={profiles}
              loadedProfileId={character.loadedProfileId}
              loadProfile={loadProfile}
              deleteProfile={deleteProfile}
            />
            <PasteButton handlePaste={handlePaste} charIndex={charIndex} />

            {canRemove && (
              <div
                className="cursor-pointer text-teal-500"
                onClick={() => removeCharacter(charIndex)}
                data-tooltip-id={`delete-character-${charIndex}`}
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
                <TooltipStyled id={`delete-character-${charIndex}`}>
                  Remove character
                </TooltipStyled>
              </div>
            )}
          </div>
          {loadedProfile && (
            <div className="flex gap-1">
              <div>Editing:</div>
              <div>{loadedProfile.name}</div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 items-start flex-col md:flex-row md:items-center">
        <ClassDropdown onChange={setSpec} selectedClassSpec={character.classSpec} />
        <AbilitySelect
          characterIdx={charIndex}
          availableAbilities={specAbilities}
          selectedAbilities={character.abilityCombos[selectedCombo]!.abilities}
          setSelectedAbilities={setAbilities}
        />
      </div>

      <LabelledAbilitySelect
        label="Externals"
        availableAbilities={externals}
        selectedAbilities={character.abilityCombos[selectedCombo]!.externals}
        setSelectedAbilities={setExternals}
      />
    </div>
  )
}
