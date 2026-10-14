/**
 * Fails when a dungeon's generated JSON was resolved against a different grimoire-wow than the
 * one installed — i.e. grimoire was bumped without re-running `yarn write`.
 *
 * Runs in `yarn build`, so it can't rely on the scraped logs, which only exist locally.
 */
import path from 'path'
import {
  abilitiesPath,
  installedGrimoireVersion,
  readAbilitiesFile,
  seasonDungeonKeys,
} from './abilityFiles.ts'

const installed = installedGrimoireVersion()
const problems: string[] = []

for (const dungeonKey of seasonDungeonKeys) {
  const file = readAbilitiesFile(dungeonKey)
  const relative = path.relative(process.cwd(), abilitiesPath(dungeonKey))
  if (!file) problems.push(`${relative}: missing`)
  else if (file.grimoire !== installed) {
    problems.push(`${relative}: resolved against grimoire-wow ${file.grimoire}`)
  }
}

if (problems.length > 0) {
  console.error(`Ability files are out of date with grimoire-wow ${installed}:`)
  for (const problem of problems) console.error(`  ${problem}`)
  console.error('Run `yarn write` to regenerate them.')
  process.exit(1)
}
