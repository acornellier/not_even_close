import type { Dungeon } from './enemies.ts'

type Dungeons = Dungeon[]
export const dungeons = import.meta.compileTime<Dungeons>('./dungeonsUncompiled.ts')
