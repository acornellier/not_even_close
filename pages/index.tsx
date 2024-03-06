import Head from 'next/head'
import Script from 'next/script'
import { Header } from '../components/Header/Header'
import { Simulator } from '../components/Simulator'
import { TailwindBreakpoint } from '../components/Header/TailwindBreakpoint'

export default function Home() {
  return (
    <div className="flex justify-center bg-gray-100 dark:bg-[#181a1b] px-4 lg:px-0">
      <Head>
        <title>Not Even Close</title>
        <meta
          name="description"
          content="Not Even Close is a tool for World of Warcraft that will determine if you will
          live or die to enemy abilities in Mythic+ dungeon keys, given your stats and defensives"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

      <main className="min-h-screen py-8 flex flex-col gap-4 lg:w-[1125px]">
        <Header />
        <Simulator />
        <TailwindBreakpoint />
      </main>
    </div>
  )
}
