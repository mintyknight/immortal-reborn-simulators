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
    offensive: 'Offensive Stats',
    defensive: 'Defensive Stats',
    passive: 'Keystones',
    baseStats: 'Base Stats',
    skilllvl: 'Skill Levels',
    special: 'Others',
    // Base Stats
    allStats: 'All Stats',
    luck: 'Lck',
    agility: 'Agi',
    power: 'Pow',
    endurance: 'End',
    wisdom: 'Wis',
   // Active Skill Levels
    beginner:  'Beginner', // Active Skill Level
    intermediate: 'Intermediate', //  Active Skill Level
    advanced: 'Advanced', //  Active Skill Level
    master: 'Master', //  Active Skill Level
   // Offensive Stats
    atk: 'ATK',
    atkboost: 'ATK%',
    summon: 'Summon',
    summonBoost: 'Summon Boost',
    critChance: 'Crit Chance',
    critEffect: 'Crit',
    dmgboost: 'DMG Boost%',
    normalup: 'Normal Up',
    attackSpeed: 'ATK SPD',
    allDamage: 'All Damage',
    physicalDamage: 'PDMG',
    fireDamage: 'Fire DMG',
    iceDamage: 'Ice DMG',
    lightDamage: 'Light DMG',
    darkDamage: 'Dark DMG',
    // Defensive Stats
    maxhp: 'HP',
    maxhpboost: 'HP%',
    armor: 'AR',
    armorboost: 'AR%',
    dmgreduction: 'DMG Reduction%',
    blockChance: 'Block Chance',
    blockEffect: 'Block',
    allResistance: 'All RES',
    physicalResistance: 'PRES',
    fireResistance: 'Fire RES',
    iceResistance: 'Ice RES',
    lightResistance: 'Light RES',
    darkResistance: 'Dark RES',
    lifesteal: 'Lifesteal',
    shieldsteal: 'Shieldsteal',
    reflect: 'Reflect',
    dodge: 'Dodge',
    // Keystones
    lostsoul: 'Lost Soul',
    martialartist:'Martial Artist',
    bravery:'Bravery',
    luckycharm:'Lucky Charm',
    doubleluck:'Double Luck',
    windrider:'Wind Rider',
    nomansland:'No Mans Land',
    breathofwind:'Breath of Wind',
    courage:'Courage',
    kiting:'Kiting',
    assassination:'Assassination',
    accuracy:'Accuracy',
    booster:'Booster',
    mirrorimage:'Mirror Image',
    ironwill:'Iron Will',
    fortress:'Fortress',
    giant:'Giant',
    grandsummoner:'Grand Summoner',
    skywardstrike:'Skyward Strike',
    wail:'Wail',
    alchemist:'Alchemist',
    unpenetrable:'Unpenetrable',
    leadership:'Leadership',
    // Keystone Description
    lostsoulDescription: 
    '生命吸取和护盾吸取分别增加0.1%，但友方无法在通过任何治疗方式恢复生命。',
    martialartistDescription:
    '战斗中，若主武器的攻击范围≤3，则攻击范围+1，武器普攻伤害降低15%。',
    braveryDescription:
    '当友方单位生命≥25%时，该单位所受到的所有伤害优先扣除生命再扣除护盾。',
    luckycharmDescription:
    '治疗效果可以产生暴击，且治疗暴击时效果固定为150%。',
    doubleluckDescription:
    '友方格挡后，5秒内降低目标12%的攻击。',
    windriderDescription:
    '友方有15%的概率躲避负面状态。',
    nomanslandDescription:
    '闪避率的上限+2%。每一个存活的敌人，使友方绝对闪避+1.5%。',
    breathofwindDescription:
    '角色武器普攻有50%的概率触发风息：对目标造成基础伤害95%的物理异常伤害，受角色普攻伤害加成影响，冷却时间6秒。',
    courageDescription:
    '友方单位生命≤50%时，友方伤害提高10%，控制延长+10%。',
    kitingDescription:
    '近距离时降低15%的伤害，远距离时提高15%的伤害。',
    assassinationDescription:
    '远距离时降低15%的伤害，近距离时提高15%的伤害。',
    accuracyDescription:
    '友方的攻击不会被闪避，但友方的暴击率固定为0%。',
    boosterDescription:
    '角色每次使用攻击技能后，使受到的伤害降低0.6%，可叠加20次。',
    mirrorimageDescription:
    '生命提高5%，伤害反射+50%',
    ironwillDescription:
    '全属性抗性+3.5%，全属性抗性上限+1%',
    fortressDescription:
    '战斗中，角色生命上限转化为开场护盾并固定变为1点，角色因治疗而溢出的生命，以12%的比例转化为护盾。',
    giantDescription:
    '战斗中不再能闪避攻击。将面板上的绝对闪避转化为角色的护甲提高。',
    grandsummonerDescription:
    '角色承受伤害的12%，由所有随从共同承担',
    skywardstrikeDescription:
    '武器攻击距离固定为最大值。但伤害降低15%。',
    wailDescription:
    '任意随从死亡时，存活的随从发射火球，对敌方单位造成随从基础伤害120%的火属性伤害，冷却时间5秒。',
    alchemistDescription:
    '敌方的伤害降低15%，但敌方的每次攻击都会附带1层[燃烧][中毒][流血]。',
    unpenetrableDescription:
    '全属性抗性+5%。全属性抗性上限+2%',
    leadershipDescription:
    '友方每一个存活的随从，使友方随从伤害提高2.5%。',
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
    passive: 'Passive',
  },
};
