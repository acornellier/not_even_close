import { SimulatorWithDefaultEnemySpell } from '../../../components/SimulatorWithDefaultEnemySpell'
import { dungeons } from '../../../backend/enemyAbilities/dungeons'

export default function SpellIdPage({ params: { slug } }: { params: { slug: string } }) {
  return <SimulatorWithDefaultEnemySpell dungeons={dungeons} spellId={Number(slug)} />
}
