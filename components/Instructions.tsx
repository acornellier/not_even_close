export function Instructions() {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold">Instructions</span>
      <span>
        Input your stats without any buffs that could affect those stats. Be careful not
        to double count Fortitude and Mark of the Wild. Do include your vers phial though,
        as this tool cannot account for it.
      </span>
      <span>
        Click a boss ability in the bottom left to set the base damage. If your ability is
        missing, find the base damage in the dungeon journal.
      </span>
      <span>Only magic damage is supported.</span>
      <span>
        To give feedback or see the changelog, join the discord (link in top right)
      </span>
    </div>
  )
}
