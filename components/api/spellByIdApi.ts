import { EnemyAbility } from '../../backend/enemyAbilities/enemies'

const url = '/api/spellById'

export const spellByIdApi = (spellId: number): Promise<EnemyAbility> =>
  fetch(`${url}/${spellId}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }).then(async (res) => {
    if (res.ok) return res.json()
    else throw await res.text()
  })
