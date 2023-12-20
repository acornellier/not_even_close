export function roundTo(number: number, to: number) {
  return Math.round(number * 10 ** to) / 10 ** to
}
