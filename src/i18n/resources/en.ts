export default {
  translations: {
    // system
    language: 'EN',
    title: 'Immortal:Reborn Perk Simulator',
    credit: 'Credit',
    creator: 'Created by MintyKnight',
    dataProvider: 'Data Provided by Ciello',
    askForUpdate: 'Ask 4 Update',
    forum: 'Click me to leave comments in Taptap forum',
    bugReport: 'Click me to report bugs or provide suggestions on {{repoProvider}}',
    showAll: 'Show All',
    hideAll: 'Hide All',
    resetBuild: 'Reset',
    loadBuild: 'Load Build',
    load: 'Load',
    currentBuild: 'Current Build',
    search4Perk: 'Search for Perk',
    share: 'Share',
    level: 'Level Limit:',
    currentLevel: 'Level',
    remainPoints: 'Remain: {{points}} Points',
    reqiredPoints: 'Require：{{totalPoints}} Points，Level {{Levels}}',
    buildCopied: 'Following link had been copied to the clipboard, please start using it by pasting.\n\n{{link}}',
    points: '{{points}} Points',
    // Stats categories
    offensiveStats: 'Offensive Stats',
    defensiveStats: 'Defensive Stats',
    passive: 'Keystones',
    baseStats: 'Base Stats',
    skillLvlStats: 'Skill Levels',
    specialStats: 'Others',
    // Base Stats
    allStats: 'All Stats',
    lck: 'Lck',
    agi: 'Agi',
    pow: 'Pow',
    end: 'End',
    wis: 'Wis',
    // Active Skill Levels
    beginner: 'Beginner', // Active Skill Level
    intermediate: 'Intermediate', //  Active Skill Level
    advanced: 'Advanced', //  Active Skill Level
    master: 'Master', //  Active Skill Level
    // Offensive Stats
    atk: 'ATK',
    atkboost: 'ATK%',
    summon: 'Summon',
    summonboost: 'Summon Boost',
    critchance: 'Crit Chance',
    criteffect: 'Crit',
    dmgboost: 'DMG Boost%',
    normalup: 'Normal Up',
    atkspd: 'ATK SPD',
    allDamage: 'All Damage',
    pdmg: 'PDMG',
    firedmg: 'Fire DMG',
    icedmg: 'Ice DMG',
    lightdmg: 'Light DMG',
    darkdmg: 'Dark DMG',
    // Defensive Stats
    maxhp: 'HP',
    maxhpboost: 'HP%',
    armor: 'AR',
    armorboost: 'AR%',
    dmgreduction: 'DMG Reduction%',
    blockchance: 'Block Chance',
    blockeffect: 'Block',
    allResistance: 'All RES',
    pres: 'PRES',
    fireres: 'Fire RES',
    iceres: 'Ice RES',
    lightres: 'Light RES',
    darkres: 'Dark RES',
    maxpres: 'MAX PRES',
    maxiceres: 'MAX Ice RES',
    maxlightres: 'MAX Light RES',
    maxdarkres: 'MAX Dark RES',
    lifesteal: 'Lifesteal',
    shieldsteal: 'Shieldsteal',
    reflect: 'Reflect',
    dodge: 'Dodge',
    // Keystones
    souldouse: 'Soul Douse',
    pugilist: 'Pugilist',
    opposingheaven: 'Opposing Heaven',
    stress: 'Stress',
    luckyblessing: 'Lucky Blessing',
    musclememory: 'Muscle Memory',
    doubleluck: 'Double Luck',
    knightofwind: 'Knight of Wind',
    deadland: 'Dead Land',
    shade: 'Shade',
    breathofwind: 'Breath of Wind',
    moraleboost: 'Morale Boost',
    kite: 'Kite',
    impale: 'Impale',
    guranteedhit: 'Guranteed Hit',
    booster: 'Booster',
    mirrorimage: 'Mirror Image',
    rampart: 'Rampart',
    bastion: 'Bastion',
    giant: 'Giant',
    minionmaster: 'Minion Master',
    cloudripper: 'Cloud Ripper',
    wailofcompanion: 'Wail of Companion',
    alchemist: 'Alchemist',
    invulnerability: 'Invulnerability',
    leader: 'Leader',
    spiritmaster: 'Spirit Master',
    kipup: 'Kip Up',
    // Keystone Description
    souldouseDescription: '+0.1% allies Lifesteal & Shieldsteal. Allies cannot recieve [Heal].',
    pugilistDescription:
      'If Main Hand Weapon target ≤3, You have +1 Normal Attack target. You have -6% Normal Up.',
    opposingheavenDescription: 'When allies have ≥25% HP, DMG taken reduce HP instead of [Shield].',
    stressDescription: 'When an ally blocks, [Heal] it based on 0.6% of its Max HP. This [Heal] is affected by Block%',
    luckyblessingDescription: '[Heal] can Crit. [Heal] Crit is always 150%.',
    musclememoryDescription: 
      'When an ally blocks, [Shield] it based on 8% of its ATK. Cannot Stack. This [Shield] is affected by Block%. Allocating this node disables [Stress]',
    doubleluckDescription: 'When allies Block, Attacker has -12% ATK, and takes +6% DMG for 5 secs.',
    knightofwindDescription: 'Allies have +15% chance to avoid [Debuffs].',
    deadlandDescription: '+2% Max Dodge. Allies have +1.5% Dodge per enemy alive.',
    shadeDescription: 'When an ally is attacked, give it +15% Dodge & Max Dodge. This effect is removed on Dodge',
    breathofwindDescription:
      'Your Normal Attacks have 50% chance to deal 175% Physical [abnormal DMG]. DMG affected by Normal Up. This effect has 6 secs. CD. CD affected by ATK SPD.',
    moraleboostDescription: 'When allies have ≤50% HP, they have +10% DMG & Control Duration',
    kiteDescription: 'Allies have -15% (+3% per distance) DMG.',
    impaleDescription: 'Allies have +17.5% (-2.5% per distance) DMG.',
    guranteedhitDescription: 'Enemies cannot Dodge. Allies Crit Chance is set to 0%.',
    boosterDescription: 'Each DMG Skill you use grant you 0.6% DMG Reduction, up to 20 stacks.',
    mirrorimageDescription: '+5% Max HP, +200% Reflect',
    rampartDescription: '+3.5% All RES, +1% Max All RES',
    bastionDescription:
      'Your Max HP is converted to [Shield] at start, with 1 Max HP left. 12% [Heal] converted to [Shield].',
    giantDescription: 'You cannot Dodge. Your AR is affeced by Dodge%, up to 50%',
    minionmasterDescription: 'When you have minions, they take 12% DMG for you.',
    cloudripperDescription: 'You have 12 Attack Range. You have -5% DMG.',
    wailofcompanionDescription:
      'When any minion dies, Each alive minion deal 248% Fire DMG to a target. This effect has 5 secs. CD.',
    alchemistDescription: 'Enemies attacks deal -15% DMG, but inflict [Lvl.1 Poison, Bleed, Burn].',
    invulnerabilityDescription: '+5% All RES, +2% Max All RES',
    leaderDescription: 'Minions have +2.5% DMG per minion alive. Allies have +8% DMG Reduction per minion alive',
    spiritmasterDescription: '+8% Minion ATK SPD, +4% Summon Boost',
    kipupDescription: 'You have -5% Summon Boost. Minions have +4% ATK & +8% ATK SPD',
    // Others
    cdr: 'CDR',
    shieldatstart: '[Shield] at start',
    hpregen: 'HP/3secs.',
    str: 'STR',
    // Search Terms
    skillLevel: 'Skill level',
    offense: 'Offense',
    defense: 'Defense',
    offenseDefense: 'Offense Defense',
  },
};
