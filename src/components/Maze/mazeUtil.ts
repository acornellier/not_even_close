export type MazeItem = [boolean, boolean, boolean]
export type MazeChoices = [MazeItem, MazeItem, MazeItem]
export interface MazePuzzle {
  solutionIdx: number
  start: MazeItem
  choices: MazeChoices
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

export function makePuzzle(): MazePuzzle {
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
