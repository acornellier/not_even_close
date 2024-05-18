import { ZamIcon } from './ZamIcon.tsx'

interface Props {
  icon: string
  size: number
}

export function AbilityIcon({ icon, size }: Props) {
  return (
    <ZamIcon
      className="rounded border border-gray-500"
      size={size}
      icon={icon}
      alt={icon}
    />
  )
}
