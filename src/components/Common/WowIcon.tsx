import { ZamIcon } from './ZamIcon.tsx'

interface Props {
  icon: string
  size: number
}

export function WowIcon({ icon, size }: Props) {
  return (
    <ZamIcon
      className="rounded border border-gray-500"
      size={size}
      src={`https://wow.zamimg.com/images/wow/icons/large/${icon}.jpg`}
      alt={icon}
    />
  )
}
