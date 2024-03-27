import { DiscordButton } from './DiscordButton'
import { GitHubButton } from './GithubButton'
import { KofiWidget } from './KofiButton'

export function Header() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-end gap-4">
          <h1 className="text-4xl font-bold text-center text-teal-500">Not Even Close</h1>
          <span className="hidden md:block"></span>
        </div>
        <div className="flex items-center">
          <DiscordButton href="https://discord.gg/chfMzG6q2W" />
          <GitHubButton href="https://github.com/acornellier/not_even_close" />
          <KofiWidget />
        </div>
      </div>
    </div>
  )
}
