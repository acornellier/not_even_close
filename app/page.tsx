import { Simulator } from '../components/Simulator'
import { dungeons } from '../backend/enemyAbilities/dungeons'

export default function Home() {
  return <Simulator dungeons={dungeons} />
}
