import type { WowClass, WowSpec } from '../../backend/classes'
import { classSpecs } from '../../backend/classes'
import { ZamIcon } from './ZamIcon.tsx'

interface Props {
  wowClass: WowClass
  spec: WowSpec
  size: number
  className?: string
}

export function SpecIcon({ wowClass, spec, size, className }: Props) {
  return (
    <ZamIcon
      className={`rounded ${className}`}
      icon={classSpecs[wowClass][spec]!.icon}
      size={size}
      alt={spec}
    />
  )
}
