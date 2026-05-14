const multiplier = 5084.50981336997

export const scalingTickingDamage = (ticks: number, baseDamage: number) =>
  multiplier * baseDamage * ticks

export const scaledDamage = (baseDamage: number) => multiplier * baseDamage
