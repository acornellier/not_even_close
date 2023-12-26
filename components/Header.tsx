import { Component } from 'react'
import GitHubButton from 'react-github-btn'

export class Header extends Component {
  render() {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-end gap-4">
            <span className="text-6xl font-bold text-center text-teal-500">
              Not Even Close
            </span>
            <span className="font-bold text-center text-teal-500">
              by Ortemist-Zul'jin
            </span>
          </div>
          <GitHubButton href="https://github.com/acornellier/not_even_close" />
        </div>
        <span className="font-bold text-teal-500">
          Disclaimer: Very WIP! Expect errors and bugs.{' '}
          <a className="text-blue-500" href="https://discord.gg/Ykb6AbYHHZ">
            Click here to join my Discord community for feedback
          </a>
        </span>
      </div>
    )
  }
}
