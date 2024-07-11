import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode
  color: string
  textColor?: string
}

export function AbilityDetailsChip({
  children,
  color,
  textColor,
  className,
  ...props
}: Props) {
  return (
    <div
      className={`flex rounded-lg px-2 whitespace-nowrap ${color} ${
        textColor ?? 'text-white'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
