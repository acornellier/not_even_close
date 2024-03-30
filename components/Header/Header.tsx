import { DiscordButton } from './DiscordButton'
import { GitHubButton } from './GithubButton'
import Image from 'next/image'
import { Button } from '../Common/Button'

export function Header() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <h1 className="text-4xl font-bold text-center text-teal-500">Not Even Close</h1>
          <a href="https://threechest.io" target="_blank" rel="noreferrer">
            <Button short className="gap-2 text-lg bg-[#7f1d1d] [&]:hover:bg-red-800">
              <Image
                src="/threechest_64x64.png"
                alt="Threechest"
                width={32}
                height={32}
              />
              Threechest: MDT on the web, by me!
            </Button>
          </a>
        </div>
        <div className="items-center hidden md:flex">
          <DiscordButton href="https://discord.gg/chfMzG6q2W" />
          <GitHubButton href="https://github.com/acornellier/not_even_close" />
          {/*<KofiWidget />*/}
        </div>
      </div>
    </div>
  )
}
