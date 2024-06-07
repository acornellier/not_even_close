export function Instructions() {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold">Instructions</span>
      <span>
        Input your stats without any buffs that could affect your stamina and vers. Be
        careful not to double count vers flask, Fortitude, Mark of the Wild.
      </span>
      <span>
        Use{' '}
        <a
          className="text-blue-500 hover:underline"
          href="https://www.curseforge.com/wow/addons/not-even-close"
          target="_blank"
          rel="noreferrer"
        >
          my addon
        </a>{' '}
        to quickly output your stats as well as your teammates&apos;. Import them by
        clicking the paste icon to the right of the character stats, or by pressing
        ctrl-V/cmd-V if you only have 1 character. It accounts for vers flask, Fortitude
        and Mark of the Wild.
      </span>
      <span>
        If you have multiple characters or builds, create profiles for them with the +
        icon to the right of the stats. Load them back with the folder icon at any time.
        Changes made while a profile is loaded are automatically saved.
      </span>
      <span>
        To give feedback or view the changelog,{' '}
        <a
          className="text-blue-500 hover:underline"
          href="https://discord.com/invite/Ykb6AbYHHZ"
          target="_blank"
          rel="noreferrer"
        >
          join the discord
        </a>
        .
      </span>
    </div>
  )
}
