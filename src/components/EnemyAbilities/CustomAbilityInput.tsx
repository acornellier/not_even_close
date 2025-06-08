import { NumericInput } from '../Inputs/NumericInput'
import { OnOffStateSelector } from '../Inputs/OnOffStateSelector'
import type { EnemyAbilityDetails } from '../../backend/sim/simTypes'
import { useState } from 'react'
import { Input } from '../Inputs/Input'
import { Button } from '../Common/Button.tsx'
import { spellByIdApi } from '../../api/spellByIdApi.ts'
import { grimoireToEnemyAbility } from '../../backend/enemyAbilities/grimoireConverter.ts'
import { useToasts } from '../Common/Toasts/useToasts.ts'
import type { EnemyAbility } from '../../backend/enemyAbilities/enemies.ts'

interface Props {
  enemyAbilityDetails: EnemyAbilityDetails
  setEnemyAbilityDetails: (value: EnemyAbilityDetails) => void
  setEnemyAbility: (enemyAbility: EnemyAbility) => void
}

export function CustomAbilityInput({
  enemyAbilityDetails,
  setEnemyAbilityDetails,
  setEnemyAbility,
}: Props) {
  const setField =
    <T extends keyof EnemyAbilityDetails>(field: T) =>
    (value: EnemyAbilityDetails[T]) =>
      setEnemyAbilityDetails({ ...enemyAbilityDetails, [field]: value })

  const setBaseDamage = setField('damage')

  const { addToast } = useToasts()
  const [spellId, setSpellId] = useState<number | undefined>(undefined)
  const [customSpellIdTrash, setCustomSpellIdTrash] = useState<boolean>(false)

  const useSpellId = async () => {
    if (!spellId) return
    try {
      const grimoireSpell = await spellByIdApi(Number(spellId))
      const enemyAbility = grimoireToEnemyAbility(grimoireSpell, 0)
      setEnemyAbility({
        ...enemyAbility,
        trashAbility: customSpellIdTrash,
      })
      addToast({
        message: `Imported ability details for ${enemyAbility.name} (id ${spellId})`,
        type: 'success',
      })
    } catch (error) {
      addToast({ message: 'Failed to import ability details', type: 'error' })
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="border w-full border-gray-600 mx-1" />

      <div className="flex gap-3 flex-wrap items-end">
        <NumericInput
          label="Base damage"
          step={1000}
          onChange={(value) => setBaseDamage(value ?? 0)}
          value={enemyAbilityDetails.damage}
        />
        <OnOffStateSelector
          label="Ability source"
          label1="Trash"
          label2="Boss"
          enabled={!enemyAbilityDetails.trashAbility}
          setIsEnabled={(val) => setField('trashAbility')(!val)}
        />
        <OnOffStateSelector
          label="Ability type"
          label1="Single"
          label2="AoE"
          enabled={enemyAbilityDetails.aoe}
          setIsEnabled={setField('aoe')}
        />
        <OnOffStateSelector
          label="Damage type"
          label1="Magic"
          label2="Physical"
          enabled={!!enemyAbilityDetails.physical}
          setIsEnabled={setField('physical')}
        />
      </div>

      <div className="border w-full border-gray-600 mx-1" />

      <div className="flex gap-3 items-end">
        <Input
          label="Spell ID"
          onChange={(value) => setSpellId(value ? Number(value) : undefined)}
          value={spellId}
        />
        <OnOffStateSelector
          label="Ability source"
          label1="Trash"
          label2="Boss"
          enabled={!customSpellIdTrash}
          setIsEnabled={(val) => setCustomSpellIdTrash(!val)}
        />
        <Button onClick={useSpellId} className="whitespace-nowrap">
          Use spell ID
        </Button>
      </div>
    </div>
  )
}
