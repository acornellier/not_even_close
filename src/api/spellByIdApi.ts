import { GrimoireSpell } from 'grimoire-wow'

export const spellByIdApi = (spellId: number): Promise<GrimoireSpell> =>
  fetch(`/api/spellById/${spellId}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }).then(async (res) => {
    if (res.ok) return res.json()
    else throw await res.text()
  })
