import { classSpecs, WowClass, WowSpec } from '../../backend/classes'
import { Image } from './Image.tsx'

interface Props {
  wowClass: WowClass
  spec: WowSpec
  size: number
  className?: string
}

export function SpecIcon({ wowClass, spec, size, className }: Props) {
  return (
    <Image
      className={`rounded ${className}`}
      src={`https://wow.zamimg.com/images/wow/icons/medium/${classSpecs[wowClass][spec]!.icon}.jpg`}
      size={size}
      alt={spec}
    />
  )
}
