interface Props {
  icon: string
  size: number
}

export function WowIcon({ icon, size }: Props) {
  return (
    <img
      className="rounded border border-gray-500"
      height={size}
      width={size}
      src={`https://wow.zamimg.com/images/wow/icons/large/${icon}.jpg`}
      alt={icon}
    />
  )
}
