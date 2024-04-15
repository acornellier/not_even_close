import type { LabelProps } from './Label';
import { Label } from './Label'

export interface ButtonProps extends Omit<LabelProps, 'Button'> {}

export function Button(props: ButtonProps) {
  return <Label button {...props} />
}
