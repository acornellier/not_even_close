export function Instructions() {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold">Instructions</span>
      <span>
        Click a boss ability in the bottom left to set the base damage. If your ability is
        missing, find the base damage in the dungeon journal.
      </span>
      <span>Only magic damage is supported.</span>
      <span>Several abilities are simplified, or may have errors</span>
    </div>
  )
}
