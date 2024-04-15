import { NumericInput } from './NumericInput'
import { OnOffStateSelector } from './OnOffStateSelector'

import type { KeyDetails } from '../../backend/sim/simTypes'

interface Props {
  keyDetails: KeyDetails
  setKeyDetails: (keyDetails: KeyDetails) => void
}

export function KeyDetailsInput({ keyDetails, setKeyDetails }: Props) {
  const setKeyLevel = (keyLevel: number) => setKeyDetails({ ...keyDetails, keyLevel })
  const setIsTyran = (isTyran: boolean) => setKeyDetails({ ...keyDetails, isTyran })

  return (
    <div className="flex gap-4 flex-wrap items-end">
      <NumericInput
        label="Key level"
        min={2}
        onChange={(val) => setKeyLevel(val ?? 0)}
        value={keyDetails.keyLevel}
      />
      <OnOffStateSelector
        label="Affix"
        label1="Fortified"
        label2="Tyrannical"
        enabled={keyDetails.isTyran}
        setIsEnabled={setIsTyran}
      />
    </div>
  )
}
