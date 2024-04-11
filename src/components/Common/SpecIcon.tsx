import { classSpecs, WowClass, WowSpec } from '../../backend/classes'

interface Props {
  wowClass: WowClass
  spec: WowSpec
  size: number
  className?: string
}

export function SpecIcon({ wowClass, spec, size, className }: Props) {
  return (
    <img
      className={`rounded ${className}`}
      src={`https://wow.zamimg.com/images/wow/icons/medium/${classSpecs[wowClass][spec]!.icon}.jpg`}
      height={size}
      width={size}
      alt={spec}
    />
  )
}
