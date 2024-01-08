import { DetailedHTMLProps, HTMLAttributes } from 'react'

export function Label({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div
      className={`text-white bg-teal-700 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-teal-600 select-none ${className}`}
      {...props}
    />
  )
}
