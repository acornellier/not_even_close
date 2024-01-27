import { classSpecs, WowClass, WowSpec } from '../../backend/classes'
import Image from 'next/image'

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
      src={`https://wow.zamimg.com/images/wow/icons/medium/${classSpecs[wowClass][spec].icon}.jpg`}
      height={size}
      width={size}
      alt={spec}
    />
  )
}
