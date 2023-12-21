import { Ability } from '../ability'

export const obsidianScales: Ability = {
  name: 'Obsidian Scales',
  spellId: 363916,
  dr: 0.3,
  iconName: 'inv_artifact_dragonscales',
  wowheadLink: 'https://www.wowhead.com/spell=363916/obsidian-scales',
}

export const twinGuardian: Ability = {
  name: 'Twin Guardian (Rescue)',
  spellId: 370888,
  healthIncrease: 0.3,
  iconName: 'ability_skyreach_shielded',
  wowheadLink: 'https://www.wowhead.com/spell=370888/twin-guardian',
}

export const evokerAbilities = [obsidianScales, twinGuardian]
