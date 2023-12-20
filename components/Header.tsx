import { Component } from 'react'
import GitHubButton from 'react-github-btn'

export class Header extends Component {
  render() {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-end gap-4">
            <h1 className="text-6xl font-bold text-center text-teal-500">
              Not Even Close
            </h1>
            <h1 className="font-bold text-center text-teal-500">
              {"by Ortemist-Zul'jin"}
            </h1>
          </div>
          <GitHubButton href="https://github.com/acornellier/not_even_close" />
        </div>
        <span className="text-l font-bold">
          Disclaimer: WIP. Many assumptions, for example it assumes all damage
          is magic.
        </span>
      </div>
    )
  }
}
