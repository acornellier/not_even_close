export function Instructions() {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold">Instructions</span>
      <span>
        Input your stats without any buffs that could affect your stamina and vers. Be
        careful not to double count Fortitude and Mark of the Wild. <i>Do</i> include your
        vers phial though, as this tool cannot account for it.
      </span>
      <span>
        Use{' '}
        <a
          className="text-blue-600 dark:text-blue-500 hover:underline"
          href="https://www.curseforge.com/wow/addons/not-even-close"
          target="_blank"
          rel="noreferrer"
        >
          my addon
        </a>{' '}
        to quickly output stats. Import them by clicking the paste icon to the right of
        the character stats (not on Firefox), or by pressing ctrl-V/cmd-V if you only have
        1 character. It accounts for Fortitude and MotW, but not other stamina/vers buffs.
      </span>
      <span>
        If you have multiple characters or builds, create profiles for them with the +
        icon to the right of the stats. Load them back with the folder icon at any time.
      </span>
      <span>
        Physical damage reduced by armor is not supported. Earthshaking Stomp and Hateful
        Charge are not reduced by armor.
      </span>
      <span>
        To give feedback or see the changelog,{' '}
        <a
          className="text-blue-600 dark:text-blue-500 hover:underline"
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
