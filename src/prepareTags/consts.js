const CATEGORIES = {
  CLASS: 1,
  RACE: 2,
  GAMEPLAY: 3,
  OTHER: 4
};

const CLASS_COLORS = {
  Warrior: '#C79C6E',
  Hunter: '#ABD473',
  Mage: '#69CCF0',
  Warlock: '#9482C9',
  Shaman: '#0070DE',
  Priest: '#FFFFFF',
  Druid: '#FF7D0A',
  'Death Knight': '#C41F3B',
  Paladin: '#F58CBA',
  Rogue: '#FFF569'
};

const GAMEPLAY = [{
  label: 'Teleport',
  category: CATEGORIES.GAMEPLAY,
  matchesText: [
    'Death Gate', 'Hearthstone', 'Dalaran Hearthstone', 'Garrison Hearthstone', 'Wormhole Generator: Northrend',
    'Wormhole Generator: Pandaria', 'Admiral\'s Compass', 'Argent Crusader\'s Tabard'
  ]
}, {
  label: 'Search & Target',
  category: CATEGORIES.GAMEPLAY,
  matchesText: ['SetRaidTarget'],
  matchesCommands: ['/tar', '/who', '/target', '/focus']
}, {
  label: 'Quest',
  category: CATEGORIES.GAMEPLAY,
  matchesText: ['Warts-B-Gone Lip Balm']
}, {
  label: 'Equipment',
  category: CATEGORIES.GAMEPLAY,
  matchesCommands: ['/equip', '/equipslot', 'linkItem', '/use']
}, {
  label: 'Emote',
  category: CATEGORIES.OTHER,
  matchesTypes: ['emote']
}, {
  label: 'Party',
  category: CATEGORIES.GAMEPLAY,
  matchesCommands: ['/follow', '/inv', '/invite', '/petfollow', '/promote'],
  matchesText: ['LeaveParty']
}];

const OTHER = [{
  label: 'Chat',
  category: CATEGORIES.OTHER,
  matchesTypes: ['chat', 'channel'],
  matchesText: [
    'SendChatMessage', 'GetChannelName',
    '/g ', '/o ', '/rw ', '/ra ', '/r ', '/p ', '/s ', '/y ', '/yell ', '/w ',
    '/1 ', '/2 ', '/3 ', '/4 ', '/5 ', '/6 ', '/7 ', '/8 ', '/9 '
  ]
}, {
  label: 'Profession',
  category: CATEGORIES.OTHER,
  matchesTypes: ['linkEnchant', 'linkProfession', 'linkSpell'],
  matchesText: ['Cooking', 'Basic Campfire', 'Archaeology', 'Engineering', 'Jewelcrafting', 'Enchanting', 'Smelting', 'Mining', 'Mining Skills', 'Disenchant', 'Prospecting']
}, {
  label: 'Script & Config',
  category: CATEGORIES.OTHER,
  matchesCommands: ['/console', '/run'],
  matchesText: ['SetCVar']
}, {
  label: 'Wintergrasp',
  category: CATEGORIES.OTHER,
  matchesText: ['GetWintergraspWaitTime']
}, {
  label: 'Server',
  category: CATEGORIES.OTHER,
  matchesTypes: ['server']
}];

const RACE = [{
  label: 'Draenei',
  category: CATEGORIES.RACE,
  matchesText: ['Gift of the Naaru']
}, {
  label: 'Blood Elf',
  category: CATEGORIES.RACE,
  matchesText: ['Arcane Torrent']
}, {
  label: 'Goblin',
  category: CATEGORIES.RACE,
  matchesText: ['Mobile Banking', 'Pack Hobgoblin']
}];

module.exports = {
  GAMEPLAY,
  OTHER,
  RACE,
  CATEGORIES,
  CLASS_COLORS
};
