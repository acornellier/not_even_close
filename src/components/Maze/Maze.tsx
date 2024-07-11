import { useCallback, useState } from 'react'
import type { MazeItem } from './mazeUtil.ts'
import { makePuzzle } from './mazeUtil.ts'
import { MazeItemImage } from './MazeItemImage.tsx'
import { Timer } from './Timer.tsx'

const mazeLength = 7

export function Maze() {
  const [streak, setStreak] = useState(0)
  const [puzzle, setPuzzle] = useState(makePuzzle())
  const [startTime, setStartTime] = useState<DOMHighResTimeStamp | null>(null)
  const [endTime, setEndTime] = useState<DOMHighResTimeStamp | null>(null)

  const solved = streak >= mazeLength

  const onAnswer = useCallback(
    (item: MazeItem) => {
      const correct = item == puzzle.solution

      if (!correct || solved) {
        setStreak(0)
        setStartTime(() => null)
        setEndTime(() => null)
      }

      if (correct) {
        setStreak((val) => val + 1)
        if (streak + 1 == mazeLength) {
          setEndTime(() => performance.now())
        } else {
          setStartTime((v) => (v == null ? performance.now() : v))
        }
      }

      setPuzzle(makePuzzle())
    },
    [puzzle.solution, solved, startTime, streak],
  )

  console.log(startTime)
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
          <div className="col-start-2 row-start-2 place-self-center flex flex-col justify-center items-center">
            <div className="text-4xl">{solved ? 'Solved!' : streak}</div>
            <Timer startTime={startTime} endTime={endTime} />
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
