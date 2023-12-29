import { DiscordButton } from './DiscordButton'
import { GitHubButton } from './GithubButton'
import { DarkModeButton } from './DarkModeButton'

export function Header() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-end gap-4">
          <span className="text-4xl font-bold text-center text-teal-500">
            Not Even Close
          </span>
          <span className="font-bold text-center text-teal-500 hidden md:block">
            {"by Ortemist-Zul'jin"}
          </span>
        </div>
        <div className="flex items-center">
          <DarkModeButton />
          <DiscordButton href="https://discord.com/invite/Ykb6AbYHHZ" />
          <GitHubButton href="https://github.com/acornellier/not_even_close" />
        </div>
      </div>
    </div>
  )
}
