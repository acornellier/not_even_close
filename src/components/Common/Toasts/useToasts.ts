import { useContext } from 'react'
import { ToastContext } from './ToastProvider'

export const useToasts = () => useContext(ToastContext)!
