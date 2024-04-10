import './globals.css'
import { ToastProvider } from '../components/Common/Toasts/ToastProvider'
import { Toasts } from '../components/Common/Toasts/Toasts'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <ToastProvider>
        <body>
          {children}
          <Toasts />
        </body>
      </ToastProvider>
    </html>
  )
}
