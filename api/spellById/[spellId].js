import { getGrimoireSpell } from 'grimoire-wow'

export default async function handler(request, response) {
  const spellId = Number(request.query.spellId)
  if (Number.isNaN(spellId)) {
    response.status(404).json('Invalid or missing spellId')
    return
  }

  const spell = getGrimoireSpell(spellId)
  response.status(200).json(spell)
}
