import { bossSpell, trashSpell } from '../grimoire.ts'
import { scalingTickingDamage } from '../grimoireConverter.ts'

const flamingBarrage = trashSpell(385567, (spell) => ({
  damage: spell.damage * 16,
  tankOnly: true,
  periodic: true,
}))

const steelBarrage = trashSpell(1309705, { aoe: true })

const fireMaw = trashSpell(395292, (spell) => ({
  damage: spell.damage * 6,
  tankOnly: true,
  periodic: true,
}))

const crushingSmash = trashSpell(1305213, (spell) => ({
  damage: spell.damage * 2,
  tankOnly: true,
  periodic: true,
}))

const frigidShard = bossSpell(372808, { tankOnly: true })

const searingWounds = bossSpell(372860, (spell) => ({
  damage: spell.periodicDamage,
  tankOnly: true,
  periodic: true,
}))

const stormslam = trashSpell(381513, (spell) => ({
  damage: spell.damage * 3,
  tankOnly: true,
  periodic: true,
}))

const livingBomb = trashSpell(373693, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
}))

const flamingEmbers = trashSpell(384773, (spell) => ({
  damage: spell.damage * 4,
  periodic: true,
}))

const excavatingBlast = trashSpell(1305201, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const inferno = trashSpell(373692, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const earthboundsImprint = trashSpell(1307205, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const fieryBlast = trashSpell(1305955, { tankOnly: true })

const infernoSpit = trashSpell(381862, (spell) => ({
  damage: spell.damage * 6,
  periodic: true,
}))

const cinderbolt = trashSpell(384194)

const frostbolt = trashSpell(371984)

const hailburst = bossSpell(396044, { aoe: true })

const scorchedEarth = bossSpell(372820, (spell) => ({
  damage: spell.damage * 2,
  periodic: true,
  aoe: true,
}))

const fieryDemise = trashSpell(1307372)

const interruptingCloudburst = trashSpell(381516, { aoe: true })

const searingBlows = bossSpell(372859, () => ({
  damage: scalingTickingDamage(1, 42),
  tankOnly: true,
}))

const windsOfChange = trashSpell(381518, (spell) => ({
  damage: spell.damage * 9,
  periodic: true,
}))

export const rlpAbilities = [
  flamingBarrage,
  steelBarrage,
  fireMaw,
  crushingSmash,
  frigidShard,
  searingWounds,
  stormslam,
  livingBomb,
  flamingEmbers,
  excavatingBlast,
  inferno,
  earthboundsImprint,
  fieryBlast,
  infernoSpit,
  cinderbolt,
  frostbolt,
  hailburst,
  scorchedEarth,
  fieryDemise,
  interruptingCloudburst,
  searingBlows,
  windsOfChange,
]
