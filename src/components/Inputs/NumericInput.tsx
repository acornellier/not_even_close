﻿import type { InputProps } from './Input'
import { Input } from './Input'

interface Props extends Omit<InputProps, 'onChange' | 'value'> {
  max?: number
  min?: number
  step?: number
  onChange: (newValue: number | undefined) => void
  value: number | undefined
}

export function NumericInput({ max, min, step = 1, onChange, ...props }: Props) {
  return (
    <Input
      type="number"
      min={min}
      max={max}
      step={step}
      onChange={(value) => {
        const num = Number(value)
        onChange(value === '' || Number.isNaN(num) ? undefined : Number(value))
      }}
      {...props}
    />
  )
}
