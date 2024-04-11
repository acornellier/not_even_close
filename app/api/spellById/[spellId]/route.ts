import { getEnemySpellS4 } from '../../../../backend/enemyAbilities/grimoire'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { spellId: string } },
) {
  const spellId = Number(params.spellId)
  if (Number.isNaN(spellId)) {
    return Response.json('Invalid or missing spellId', { status: 422 })
  }

  try {
    const spell = getEnemySpellS4(spellId)
    return Response.json(spell)
  } catch (err: any) {
    return Response.json(err.message, { status: 404 })
  }
}
