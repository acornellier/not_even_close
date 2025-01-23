import { NumericInput } from './NumericInput'

import type { KeyDetails } from '../../backend/sim/simTypes'
import { Button } from '../Common/Button.tsx'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline'
import { SelectableAbilityIcon } from '../Common/SelectableAbilityIcon.tsx'
import {
  bothFortTyranActive,
  fortActive,
  guileActive,
  tyranActive,
} from '../../util/utils.ts'
import { TooltipStyled } from '../Common/TooltipStyled.tsx'
import { AbilityIcon } from '../Common/AbilityIcon.tsx'

interface Props {
  keyDetails: KeyDetails
  setKeyDetails: (keyDetails: KeyDetails) => void
}

export function KeyDetailsInput({ keyDetails, setKeyDetails }: Props) {
  const setKeyLevel = (keyLevel: number) =>
    setKeyDetails({ ...keyDetails, keyLevel: Math.max(0, keyLevel) })
  const setIsTyran = (isTyran: boolean) => setKeyDetails({ ...keyDetails, isTyran })

  return (
    <div className="flex gap-4 flex-wrap items-end">
      <div className="flex gap-1 items-end">
        <NumericInput
          label="Key level"
          hideArrows
          min={2}
          onChange={(val) => setKeyLevel(val ?? 0)}
          value={keyDetails.keyLevel}
        />
        <Button
          className="[&]:py-2 [&]:px-3"
          onClick={() => setKeyLevel(keyDetails.keyLevel - 1)}
        >
          <ArrowDownIcon height={20} />
        </Button>
        <Button
          className="[&]:py-2 [&]:px-3"
          onClick={() => setKeyLevel(keyDetails.keyLevel + 1)}
        >
          <ArrowUpIcon height={20} />
        </Button>
      </div>
      <div className="flex gap-1 items-end">
        {fortActive(keyDetails) && (
          <SelectableAbilityIcon
            icon="ability_toughness"
            size={36}
            onClick={() => setIsTyran(!keyDetails.isTyran)}
            disabled={bothFortTyranActive(keyDetails)}
            tooltipId="fort-tooltip"
          />
        )}
        {tyranActive(keyDetails) && (
          <SelectableAbilityIcon
            icon="achievement_boss_archaedas"
            size={36}
            onClick={() => setIsTyran(!keyDetails.isTyran)}
            disabled={bothFortTyranActive(keyDetails)}
            tooltipId="tyran-tooltip"
          />
        )}
        {guileActive(keyDetails) && (
          <div data-tooltip-id="guile-tooltip">
            <AbilityIcon icon="ability_racial_chillofnight" size={36} />
          </div>
        )}
      </div>
      <TooltipStyled id="fort-tooltip">
        <p>Fortified Affix. 20% more trash damage.</p>
        <p>{!bothFortTyranActive(keyDetails) && 'Click to swap'}</p>
      </TooltipStyled>
      <TooltipStyled id="tyran-tooltip">
        <p>Tyrannical Affix. 15% more boss damage.</p>
        <p>{!bothFortTyranActive(keyDetails) && 'Click to swap'}</p>
      </TooltipStyled>
      <TooltipStyled id="guile-tooltip">
        Xal&apos;atath&apos;s Guile. 12% scaling per key level instead of 10%.
      </TooltipStyled>
    </div>
  )
}
