import { fileURLToPath } from 'url'
import path from 'path'
import * as fs from 'fs'
import { dungeonsUncompiled } from '../src/backend/enemyAbilities/dungeonsUncompiled.ts'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const allSpells = dungeonsUncompiled
  .filter(({ key }) => !key.startsWith('all_'))
  .flatMap(({ abilities }) => abilities)

fs.writeFileSync(
  path.join(dirname, '../src/backend/enemyAbilities/spellDiff.json'),
  JSON.stringify(allSpells, null, 2),
)
