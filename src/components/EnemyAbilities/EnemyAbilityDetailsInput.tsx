import { NumericInput } from '../Inputs/NumericInput'
import { OnOffStateSelector } from '../Inputs/OnOffStateSelector'

import type { EnemyAbilityDetails } from '../../backend/sim/simTypes'

interface Props {
  enemyAbilityDetails: EnemyAbilityDetails
  setEnemyAbilityDetails: (value: EnemyAbilityDetails) => void
}

export function EnemyAbilityDetailsInput({
  enemyAbilityDetails,
  setEnemyAbilityDetails,
}: Props) {
  const setField =
    <T extends keyof EnemyAbilityDetails>(field: T) =>
    (value: EnemyAbilityDetails[T]) =>
      setEnemyAbilityDetails({ ...enemyAbilityDetails, [field]: value })

  const setBaseDamage = setField('damage')

  return (
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
      {enemyAbilityDetails.physical && (
        <OnOffStateSelector
          label="Ignores armor"
          label1="No"
          label2="Yes"
          enabled={!!enemyAbilityDetails.ignoresArmor}
          setIsEnabled={setField('ignoresArmor')}
        />
      )}
    </div>
  )
}
