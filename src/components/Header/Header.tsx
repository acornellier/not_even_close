import { DiscordButton } from './DiscordButton'
import { GitHubButton } from './GithubButton'
import { KofiWidget } from './KofiButton.tsx'
import { Button } from '../Common/Button.tsx'

export function Header() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col sm:flex-row items-end gap-4">
          <h1 className="text-4xl font-bold text-teal-500">Not Even Close</h1>
          <h1 className="hidden lg:block text-xl font-bold text-teal-500">by Ortemis</h1>
        </div>
        <div className="items-center hidden md:flex">
          <DiscordButton href="https://discord.gg/chfMzG6q2W" />
          <GitHubButton href="https://github.com/acornellier/not_even_close" />
          <a
            href="https://threechest.io"
            target="_blank"
            rel="noreferrer"
            className="mr-2"
          >
            <Button short className="gap-2">
              <img src="/threechest_64x64.png" alt="Threechest" width={16} height={16} />
              Threechest
            </Button>
          </a>
          <KofiWidget />
        </div>
      </div>
    </div>
  )
}
