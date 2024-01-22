import Head from 'next/head'
import Script from 'next/script'
import { Header } from '../components/Header/Header'
import { Simulator } from '../components/Simulator'

export default function Home() {
  return (
    <div className="px-4 lg:px-6 xl:px-24 2xl:px-48 dark:bg-[#181a1b]">
      <Head>
        <title>Not Even Close</title>
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

      <main className="min-h-screen py-8 flex flex-col gap-4">
        <Header />
        <Simulator />
      </main>
    </div>
  )
}
