import './globals.css'
import type { AppProps } from 'next/app'
import { ToastProvider } from '../components/Common/Toasts/ToastProvider'
import { Toasts } from '../components/Common/Toasts/Toasts'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
      <Toasts />
    </ToastProvider>
  )
}
