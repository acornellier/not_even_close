import { bossSpell, trashSpell } from '../grimoire.ts'
import { scalingTickingDamage } from '../grimoireConverter.ts'

const earthboundsImprint = trashSpell(1307205, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const excavatingBlast = trashSpell(1305201, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const crushingSmash = trashSpell(1305213, { tankOnly: true })

const crushingSmash372730 = trashSpell(372730, { tankOnly: true })

const frostbolt = trashSpell(371984, { avoidable: true })

const steelBarrage372794 = trashSpell(372794, { tankOnly: true })

const hailburst = bossSpell(396044, { aoe: true })

const chillstorm = bossSpell(397077, (spell) => ({
  damage: spell.damage * 6,
  periodic: true,
  aoe: true,
}))

const frigidShard = bossSpell(372808, { tankOnly: true })

const inferno = trashSpell(373692, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const flamingBarrage1305865 = trashSpell(1305865, { tankOnly: true })

const livingBomb = trashSpell(373693, (spell) => ({
  damage: spell.periodicDamage,
  avoidable: true,
  periodic: true,
}))

const fieryDemise = trashSpell(1307372, { avoidable: true })

const cinderbolt = trashSpell(384194, { avoidable: true })

const fieryBlast = trashSpell(1305955, { tankOnly: true })

const fireMaw392394 = trashSpell(392394, { tankOnly: true })

const fireMaw = trashSpell(395292, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  tankOnly: true,
  periodic: true,
}))

const searingBlows = bossSpell(372859, () => ({
  damage: scalingTickingDamage(1, 42),
  tankOnly: true,
}))

const searingWounds = bossSpell(372860, (spell) => ({
  damage: spell.periodicDamage,
  tankOnly: true,
  periodic: true,
}))

const inferno384823 = trashSpell(384823, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const scorchedEarth = bossSpell(372820, (spell) => ({
  damage: spell.damage * 2,
  avoidable: true,
  periodic: true,
  aoe: true,
}))

const stormslam = bossSpell(381513, { tankOnly: true })

const stormslam381514 = bossSpell(381514, { tankOnly: true })

const windsOfChange = bossSpell(381518, (spell) => ({
  damage: spell.damage * 9,
  avoidable: true,
  periodic: true,
}))

const infernoSpit = bossSpell(381862, (spell) => ({
  damage: spell.damage * 6,
  periodic: true,
}))

const interruptingCloudburst = bossSpell(381516, { aoe: true })

const flamingEmbers = bossSpell(384773, (spell) => ({
  damage: spell.damage * 4,
  avoidable: true,
  periodic: true,
}))

export const rlpAbilities = [
  earthboundsImprint,
  excavatingBlast,
  crushingSmash,
  crushingSmash372730,
  frostbolt,
  steelBarrage372794,
  hailburst,
  chillstorm,
  frigidShard,
  inferno,
  flamingBarrage1305865,
  livingBomb,
  fieryDemise,
  cinderbolt,
  fieryBlast,
  fireMaw392394,
  fireMaw,
  searingBlows,
  searingWounds,
  inferno384823,
  scorchedEarth,
  stormslam,
  stormslam381514,
  windsOfChange,
  infernoSpit,
  interruptingCloudburst,
  flamingEmbers,
]
