import { DetailedHTMLProps, HTMLAttributes } from 'react'

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  button?: boolean
  short?: boolean
}

export function Label({ className, short, button, ...props }: Props) {
  const shortClass = short ? 'py-1' : 'py-2.5'
  const buttonClass = button ? 'cursor-pointer' : ''

  return (
    <div
      className={`text-white bg-teal-700 font-medium rounded-lg text-sm text-center inline-flex items-center dark:bg-teal-600 select-none px-4 ${shortClass} ${buttonClass} ${className}`}
      {...props}
    />
  )
}
