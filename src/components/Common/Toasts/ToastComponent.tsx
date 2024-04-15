import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import type { Toast } from './ToastProvider'
import { Label } from '../Label'

interface Props {
  toast: Toast
}

export function ToastComponent({ toast }: Props) {
  const Icon =
    toast.type === 'success'
      ? CheckCircleIcon
      : toast.type === 'info'
      ? InformationCircleIcon
      : ExclamationTriangleIcon

  const background =
    toast.type === 'error'
      ? 'bg-red-600'
      : toast.type === 'success'
      ? 'bg-green-600'
      : 'bg-blue-600'

  return (
    <Label
      className={`flex items-center gap-2 transition-opacity duration-500
                  ${background} 
                  ${toast.removing ? 'opacity-0' : ''}`}
    >
      <Icon width={24} height={24} className="min-w-6" />
      <div>{toast.message}</div>
    </Label>
  )
}
