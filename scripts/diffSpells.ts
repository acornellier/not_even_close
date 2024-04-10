import { dungeons } from '../backend/enemyAbilities/dungeons'
import { fileURLToPath } from 'url'
import path from 'path'
import * as fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const allSpells = dungeons
  .filter(({ key }) => !key.startsWith('all_'))
  .flatMap(({ abilities }) => abilities)

fs.writeFileSync(
  path.join(dirname, '../backend/enemyAbilities/differ.json'),
  JSON.stringify(allSpells, null, 2),
)
