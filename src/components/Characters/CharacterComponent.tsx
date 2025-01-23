import type {
  Character,
  CharacterStatsInput,
  Profile,
  UpdateCharacter,
} from '../../backend/characters'
import { CharacterStatsForm } from './CharacterStatsForm'
import { ClassDropdown } from '../Abilities/ClassDropdown'
import { AbilitySelect } from '../Abilities/AbilitySelect'
import type { ClassSpec } from '../../backend/classes'
import { classSpecs } from '../../backend/classes'
import { LabelledAbilitySelect } from '../Abilities/LabelledAbilitySelect'
import { useCallback, useMemo } from 'react'
import type { AbilityReplacement, SelectedAbilityId } from '../../backend/ability'
import { abilitiesById } from '../../backend/ability'
import { CreateProfile } from './CreateProfile'
import { LoadProfile } from './LoadProfile'
import { TooltipStyled } from '../Common/TooltipStyled'
import { PasteButton } from './PasteButton.tsx'
import { Label } from '../Common/Label.tsx'
import { useLocalStorage } from '../../util/useLocalStorage.ts'

import { useAbilitiesThatExist } from './useAbilitiesThatExist.ts'
import { externals } from '../../backend/groupAbilities/externals.ts'
import { useSimContext } from '../../util/useSimContext.ts'

interface Props {
  idx: number
  character: Character
  profiles: Profile[]
  updateCharacter: UpdateCharacter
  canRemove: boolean
  removeCharacter: () => void
  handlePaste: (text: string) => void
  saveProfile: (name: string) => void
  loadProfile: (profile: Profile | null) => void
  deleteProfile: (profileId: string) => void
}

export function CharacterComponent({
  idx,
  character,
  profiles,
  updateCharacter,
  canRemove,
  removeCharacter,
  handlePaste,
  saveProfile,
  loadProfile,
  deleteProfile,
}: Props) {
  const { dungeon } = useSimContext()

  const [replacements, setReplacements] = useLocalStorage<Record<number, number>>(
    'replacements',
    {},
  )

  const setCharacterStats = useCallback(
    (stats: CharacterStatsInput) => updateCharacter({ stats }),
    [updateCharacter],
  )

  const setAbilities = useCallback(
    (abilities: SelectedAbilityId[]) => updateCharacter({ abilities }),
    [updateCharacter],
  )

  useAbilitiesThatExist(character.abilities, setAbilities)

  const setExternals = useCallback(
    (newExternals: SelectedAbilityId[]) => updateCharacter({ externals: newExternals }),
    [updateCharacter],
  )

  useAbilitiesThatExist(character.externals, setExternals)

  const setSpec = useCallback(
    (spec: ClassSpec) => updateCharacter({ classSpec: spec }),
    [updateCharacter],
  )

  const replaceAbility = useCallback(
    ({ sourceId, targetId }: AbilityReplacement) => {
      setReplacements((oldReplacements) => {
        const newReplacements = { ...oldReplacements }
        delete newReplacements[targetId]
        newReplacements[sourceId] = targetId
        return newReplacements
      })
    },
    [setReplacements],
  )

  const availableExternals = useMemo(() => {
    const res = [...externals]
    return res
  }, [dungeon])

  const specDetails = classSpecs[character.classSpec.class][character.classSpec.spec]!
  const specAbilities = specDetails.abilities

  const availableAbilities = useMemo(() => {
    return specAbilities.map((ability) => {
      const replacement = replacements[ability.id]
      return !replacement ? ability : abilitiesById[replacement] ?? ability
    })
  }, [replacements, specAbilities])

  const loadedProfile = profiles.find(
    (profile) => profile.id === character.loadedProfileId,
  )

  return (
    <div className="flex flex-col items-start gap-3 w-full">
      {specDetails.isTank && (
        <div className="flex gap-2 flex-wrap">
          <Label className="[&]:bg-red-700">
            WARNING: Tanks are complex and may produce invalid results
          </Label>
          {character.classSpec.spec === 'Guardian' && (
            <Label className="[&]:bg-orange-600">Input your stats in bear form</Label>
          )}
        </div>
      )}
      <div className="flex justify-between w-full gap-2">
        <CharacterStatsForm
          idx={idx}
          classSpec={character.classSpec}
          characterStats={character.stats}
          onChange={setCharacterStats}
          specAbilities={specAbilities}
        />
        <div className="flex flex-col gap-2 items-end">
          <div className="flex gap-2 h-fit">
            <CreateProfile idx={idx} createProfile={saveProfile} />
            <LoadProfile
              idx={idx}
              profiles={profiles}
              loadedProfileId={character.loadedProfileId}
              loadProfile={loadProfile}
              deleteProfile={deleteProfile}
            />
            <PasteButton handlePaste={handlePaste} idx={idx} />

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
                <TooltipStyled id={`delete-character-${idx}`}>
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
          characterIdx={idx}
          availableAbilities={availableAbilities}
          selectedAbilities={character.abilities}
          setSelectedAbilities={setAbilities}
          replaceAbility={replaceAbility}
        />
      </div>

      <LabelledAbilitySelect
        label="Externals"
        characterIdx={idx}
        availableAbilities={availableExternals}
        selectedAbilities={character.externals}
        setSelectedAbilities={setExternals}
      />
    </div>
  )
}
