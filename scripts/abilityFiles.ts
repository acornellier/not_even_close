/** Where the generated dungeon JSON lives and how to read it. Shared by the scripts. */
import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import type { DungeonAbilitiesFile } from '../src/backend/enemyAbilities/dungeons.ts'

export type { DungeonAbilitiesFile }

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const abilitiesDir = path.resolve(__dirname, '../src/backend/enemyAbilities/midnight_s2')

export const seasonDungeonKeys = ['murd', 'nalo', 'vale', 'void', 'fang', 'rlp', 'tos', 'kr']

export function abilitiesPath(dungeonKey: string) {
  return path.join(abilitiesDir, `${dungeonKey}.json`)
}

export function readAbilitiesFile(dungeonKey: string): DungeonAbilitiesFile | null {
  const filePath = abilitiesPath(dungeonKey)
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

export function installedGrimoireVersion(): string {
  const require = createRequire(import.meta.url)
  return require('grimoire-wow/package.json').version
}
