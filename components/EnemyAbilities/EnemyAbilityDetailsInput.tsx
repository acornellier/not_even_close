import { NumericInput } from '../Inputs/NumericInput'
import { OnOffStateSelector } from '../Inputs/OnOffStateSelector'

import { EnemyAbilityDetails } from '../../backend/sim/simTypes'

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
    <div className="flex gap-4 flex-wrap items-end">
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
        enabled={!enemyAbilityDetails.isTrashAbility}
        setIsEnabled={(val) => setField('isTrashAbility')(!val)}
      />
      <OnOffStateSelector
        label="Damage type"
        label1="Magic"
        label2="Physical"
        enabled={!!enemyAbilityDetails.isPhysical}
        setIsEnabled={setField('isPhysical')}
      />
      <OnOffStateSelector
        label="Ability type"
        label1="Single"
        label2="AoE"
        enabled={enemyAbilityDetails.isAoe}
        setIsEnabled={setField('isAoe')}
      />
    </div>
  )
}
