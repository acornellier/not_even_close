import { useCallback, useState } from 'react'
import type { MazeItem } from './mazeUtil.ts'
import { makePuzzle } from './mazeUtil.ts'
import { MazeItemImage } from './MazeItemImage.tsx'

export function Maze() {
  const [streak, setStreak] = useState(0)
  const [puzzle, setPuzzle] = useState(makePuzzle())

  const onAnswer = useCallback(
    (item: MazeItem) => {
      if (item == puzzle.choices[puzzle.solutionIdx]) {
        setStreak((val) => val + 1)
      } else {
        setStreak(0)
      }

      setPuzzle(makePuzzle())
    },
    [puzzle],
  )

  return (
    <div className="h-full flex flex-col items-between mb-12">
      <div className="h-full flex justify-center items-center">
        <div className="maze">
          {puzzle.choices.map((choice, idx) => (
            <div
              key={choice.toString()}
              className={`col-start-${idx == 0 ? 2 : idx == 1 ? 1 : 3} row-start-${idx > 0 ? 2 : 1}`}
              onClick={() => onAnswer(choice)}
            >
              <MazeItemImage item={choice} />
            </div>
          ))}
          <div className="col-start-2 row-start-2 place-self-center text-4xl">
            {streak}
          </div>
          <div
            className="col-start-2 row-start-3 place-self-center flex flex-col items-center gap-2"
            onClick={() => onAnswer(puzzle.start)}
          >
            <MazeItemImage item={puzzle.start} />
            <div>Entrance</div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <div className="font-bold">Guides</div>
        <div>
          <a href="https://www.reddit.com/r/CompetitiveWoW/comments/k32yj8/method_for_simplifying_the_mists_of_tirna_scithe/">
            Reddit - Method for simplifying the Mists of Tirna Scithe maze
          </a>
        </div>
        <div>
          <a href="https://www.youtube.com/watch?v=0WFfsidRdlM">
            Growl YouTube - One Simple Trick to Solve the Mists of Tirna Scithe
          </a>
        </div>
      </div>
    </div>
  )
}
