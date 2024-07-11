import { useCallback, useState } from 'react'

type MazeItem = [boolean, boolean, boolean]
type MazeChoices = [MazeItem, MazeItem, MazeItem]
interface MazePuzzle {
  solutionIdx: number
  start: MazeItem
  choices: MazeChoices
}

function MazeItemImage({ item }: { item: MazeItem }) {
  const code = item.map((v) => (v ? 1 : 0)).join('')
  return (
    <img
      alt={code}
      src={`/maze/${code}.png`}
      className="border border-gray-500 rounded-lg"
    />
  )
}

const allItems: MazeItem[] = [
  [false, false, false],
  [false, false, true],
  [false, true, false],
  [false, true, true],
  [true, false, false],
  [true, false, true],
  [true, true, false],
  [true, true, true],
]

function shuffle<T>(array: T[]) {
  return array.sort(() => Math.random() - 0.5)
}

function randItem<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)] as T
}

function makePuzzle(): MazePuzzle {
  const puzzlePropertyIdx = Math.floor(Math.random() * 3)
  const otherProperty1 = (puzzlePropertyIdx + 1) % 2
  const otherProperty2 = (puzzlePropertyIdx + 2) % 2
  const puzzlePropertyValue = Math.random() < 0.5

  const correctSymbols = allItems.filter(
    (item) => item[puzzlePropertyIdx] === puzzlePropertyValue,
  )
  const solution = randItem(correctSymbols)

  const incorrectSymbols = allItems.filter(
    (item) =>
      item[puzzlePropertyIdx] !== puzzlePropertyValue &&
      (item[otherProperty1] !== solution[otherProperty1] ||
        item[otherProperty2] !== solution[otherProperty2]),
  )
  const threeIncorrectSymbols = shuffle(incorrectSymbols).slice(0, 3)
  const twoIncorrectSymbols = threeIncorrectSymbols.slice(0, 2)
  const start = threeIncorrectSymbols[2]!
  const choices = shuffle([solution, ...twoIncorrectSymbols]) as MazeChoices
  const solutionIdx = choices.indexOf(solution)
  if (![0, 1, 2].includes(solutionIdx))
    throw new Error(`Solution index is ${solutionIdx}`)

  return {
    solutionIdx,
    start,
    choices,
  }
}

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
    <div className="maze">
      {puzzle.choices.map((choice, idx) => (
        <div
          key={choice.toString()}
          className={`cursor-pointer col-start-${idx == 0 ? 2 : idx == 1 ? 1 : 3} row-start-${idx > 0 ? 2 : 1}`}
          onClick={() => onAnswer(choice)}
        >
          <MazeItemImage item={choice} />
        </div>
      ))}
      <div className="col-start-2 row-start-2 place-self-center text-4xl">{streak}</div>
      <div className="col-start-2 row-start-3 place-self-center">
        <MazeItemImage item={puzzle.start} />
      </div>
    </div>
  )
}
