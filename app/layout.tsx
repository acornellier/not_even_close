import './globals.css'
import { ToastProvider } from '../components/Common/Toasts/ToastProvider'
import { Toasts } from '../components/Common/Toasts/Toasts'
import { ReactNode } from 'react'
import Script from 'next/script'
import { Header } from '../components/Header/Header'
import { TailwindBreakpoint } from '../components/Header/TailwindBreakpoint'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Not Even Close',
  description:
    'Not Even Close is a tool for World of Warcraft that will determine if you will live or die to enemy abilities in Mythic+ dungeon keys, given your stats and defensives',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <ToastProvider>
        <body>
          <div className="flex justify-center bg-[#181a1b] px-4 lg:px-0">
            <Script src="/wowheadtooltips.js" />

            <Script src="https://www.googletagmanager.com/gtag/js?id=G-0XXET0NQC8" />
            <Script id="google-analytics">
              {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-0XXET0NQC8');
        `}
            </Script>

            <main className="min-h-screen py-4 flex flex-col gap-4 lg:w-[1125px]">
              <Header />
              {children}
              <TailwindBreakpoint />
            </main>
          </div>
          <Toasts />
        </body>
      </ToastProvider>
    </html>
  )
}
