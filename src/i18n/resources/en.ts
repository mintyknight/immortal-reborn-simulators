export default {
  translations: {
    // system
    language: 'EN',
    title: 'Immortal:Reborn Perk Simulator',
    credit: 'Credit',
    creator: 'Created by MintyKnight',
    englishTranslator: 'English Translation by Ciello',
    bugReport: 'I wish to report bugs or provide suggestions on {{repoProvider}}',
    showAll: 'Show All',
    hideAll: 'Hide All',
    resetBuild: 'Reset',
    loadBuild: 'Load Build',
    load: 'Load',
    currentBuild: 'Current Build',
    search4Perk: 'Search for Perk',
    share: 'Share',
    tower: 'Tower:',
    towerLvl: 'Tower Lvls',
    remainPoints: 'Remain: {{points}} Points',
    reqiredPoints: 'Require：{{totalPoints}} Points，{{towerLevels}} Tower Levels',
    buildCopied: 'Link has been copied to clipboard, please start using it by pasting.\n{{link}}',
    points: '{{points}} Points',
    // Stats categories
    offensiveStats: 'Offensive Stats',
    defensiveStats: 'Defensive Stats',
    skills: 'Skills',
    baseStats: 'Base Stats',
    skillLvlStats: 'Skill Levels',
    special: 'Special',
    // Base Stats
    power: 'Pow',
    wisdom: 'Wis',
    luck: 'Lck',
    endurance: 'End',
    agility: 'Agi',
    allStats: 'All Stats',
    strength: 'STR',
    // Active Skill Levels
    beginnerSkillLevel: 'Beginner', // Active Skill Level
    intermediateSkillLevel: 'Intermediate', //  Active Skill Level
    advancedSkillLevel: 'Advanced', //  Active Skill Level
    masterSkillLevel: 'Master', //  Active Skill Level
    // Offensive Stats
    attack: 'ATK',
    normalAttack: 'Normal Up',
    critChance: 'Crit Chance',
    critEffect: 'Crit',
    darkDamage: 'Dark DMG',
    fireDamage: 'Fire DMG',
    iceDamage: 'Ice DMG',
    lightDamage: 'Light DMG',
    physicalDamage: 'PDMG',
    allDamage: 'All DMG',
    attackSpeed: 'ATK SPD',
    summonBoost: 'Summon Boost',
    minionAttackSpeed: 'Minion ATK SPD',
    cooldownRecovery: 'Cooldown Recovery',
    // Defensive Stats
    darkResistance: 'Dark RES',
    fireResistance: 'Fire RES',
    iceResistance: 'Ice RES',
    lightResistance: 'Light RES',
    physicalResistance: 'PRES',
    allResistance: 'All RES',
    lifesteal: 'Lifesteal',
    healthPoint: 'HP',
    blockChance: 'Block Chance',
    blockEffect: 'Block',
    armor: 'AR',
    dodge: 'Dodge',
    // Skills
    bloomOfLife: 'Bloom of Life',
    spiritRay: 'Spirit Ray',
    shieldOfChaos: 'Shield of Chaos',
    waterElement: 'Water Element',
    deadlyCrush: 'Deadly Crush',
    celestialStorm: 'Celestial Storm',
    emboldened: 'Emboldened',
    purification: 'Purification',
    chainHook: 'Chain Hook',
    earthElement: 'Earth Element',
    eyeOfReincarnation: 'Eye of Reincarnation',
    symbiosis: 'Symbiosis',
    booster: 'Booster',
    breathOfWind: 'Breath of Wind',
    // Skill Description
    bloomOfLifeDescription:
      'Heal your HP per sec for 5 secs, and reduce damage taken by 40% during the healing.\nHealing per sec = 57.4% of your ATK\n\nGrade S: After the duration, heal HP for all allies based on 45.1% of your ATK.',
    spiritRayDescription:
      'Attack targets randomly, dealing Dark DMG. The further the Range, the more the targets.\nDark DMG: 205% Main Hand Base Damage + 315\n\nGrade S: Deal Dark Abnormal DMG based on 8.2% Main Hand ATK + 46 for 5 secs.',
    shieldOfChaosDescription:
      'Grant you [Shield], and 1 stack of [Holy Shield] which can resist an attack once.\nShield = 8.6% of you Max HP\n\nGrade S: Grant you extra Shield based on 4% of your Max HP.',
    waterElementDescription:
      'Summon Water Element on the left, who deals Ice DMG to a target.\nIce DMG: 307.5% of Water Element’s Base Damage + 473\n\nGrade S: Remove all allies’ debuffs on death.',
    deadlyCrushDescription:
      'Deal PDMG to 3 targets. Cooldown corresponds to Main Hand Cooldown.\nPDMG = 133.3% Main Hand Base Damage + 205\n\nGrade S: 1.22x damage/2s. Effect resets after unleashing this skill.',
    celestialStormDescription:
      'Trigger [Aerolite], who attacks 2 random targets 4 times in 1 sec, dealing Fire DMG each time.\nFire DMG = 153.8% Main Hand Base Damage + 236\n\nGrade S: +2 attacks.',
    emboldenedDescription: 'Heal your HP by 5.5% when any target dies.',
    purificationDescription:
      'Deal Light DMG to all targets.\nLight DMG = 307.5% Main Hand Base Damage + 473\n\nGrade S: Remove all targets’ buffs.',
    chainHookDescription:
      'Sneak Attack to 2 targets, dealing PDMG; and reduce Range by 3, inflicting [Lvl.1 Bleed].\nPDMG: 184.5% Main Hand Base Damage + 284\n\nGrade S: +1 target',
    earthElementDescription:
      'Summon Earth Element on the right, who deals PDMG to a target, and knocks them back by 2 Range.\nPDMG = 422.3% of Earth Element’s Base Damage + 649\n\nGrade S: When Earth Element is attacked, stun attacker for 1 sec.',
    eyeOfReincarnationDescription: 'Launch your previous skill used per 34 secs.\n\nGrade S: -5s Cooldown.',
    symbiosisDescription:
      'Increase Minion’s damage by 11%.\nWhen any Minion lives, reduce all allies’ damage taken by 4.4%',
    boosterDescription: 'Your skill attack grants a 1.5% increased damage. (stacks)\nMax stacks: 11.',
    breathOfWindDescription:
      'Your Normal Attack has a 20% chance to trigger [Breath of Wind], dealing Pure DMG to target. Damage is affected by Normal Up.\nPure DMG = 34.1% Main Hand ATK + 96',
    // Special
    burnSpeed: '2x Burn SPD', // Reduce Burn's Cooldown by 50%
    poisonDamage: '2x Poison DMG', // Double the effect of Poison
    bleedDamage: '2x Bleed DMG', // Double the effect of Bleed
    // search terms
    skillLevel: 'Skill Level',
    offense: 'Offense',
    defense: 'Defense',
    offenseDefense: 'Offense Defense',
    activeSkill: 'Active Skill',
    passiveSkill: 'Passive Skill',
  },
};
