import { bossSpell, trashSpell } from '../grimoire.ts'
import { scalingTickingDamage } from '../grimoireConverter.ts'

const fireMaw = trashSpell(395292, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  tankOnly: true,
  periodic: true,
}))

const crushingSmash = trashSpell(1305213, { tankOnly: true })

const frigidShard = bossSpell(372808, { tankOnly: true })

const searingWounds = bossSpell(372860, (spell) => ({
  damage: spell.periodicDamage,
  tankOnly: true,
  periodic: true,
}))

const stormslam = bossSpell(381513, { tankOnly: true })

const livingBomb = trashSpell(373693, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
}))

const flamingEmbers = bossSpell(384773, (spell) => ({
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

const infernoSpit = bossSpell(381862, (spell) => ({
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

const interruptingCloudburst = bossSpell(381516, { aoe: true })

const searingBlows = bossSpell(372859, () => ({
  damage: scalingTickingDamage(1, 42),
  tankOnly: true,
}))

const windsOfChange = bossSpell(381518, (spell) => ({
  damage: spell.damage * 9,
  periodic: true,
}))

const fireMaw392394 = trashSpell(392394, { tankOnly: true })

const inferno384823 = trashSpell(384823, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const crushingSmash372730 = trashSpell(372730, { tankOnly: true })

const stormslam381514 = bossSpell(381514, { tankOnly: true })

const chillstorm = bossSpell(397077, (spell) => ({
  damage: spell.damage * 6,
  periodic: true,
  aoe: true,
}))

const flamingBarrage1305865 = trashSpell(1305865, { tankOnly: true })

const steelBarrage372794 = trashSpell(372794, { tankOnly: true })

export const rlpAbilities = [
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
  fireMaw392394,
  inferno384823,
  crushingSmash372730,
  stormslam381514,
  chillstorm,
  flamingBarrage1305865,
  steelBarrage372794,
]
