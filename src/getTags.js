const sortText = (a, b) => a.localeCompare(b);
const sortLabel = (a, b) => a.label.localeCompare(b.label);
const spellToDict = (obj, { category: { label }, spells: spellList }) => {
  if (obj[label]) {
    obj[label].push(...spellList);
  } else {
    obj[label] = [...spellList];
  }

  return obj;
};
const assignId = (tag, index) => ({
  ...tag,
  id: index
});
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

const gameplay = [{
  label: 'Teleport',
  category: CATEGORIES.GAMEPLAY,
  tokens: [
    'Death Gate', 'Hearthstone', 'Dalaran Hearthstone', 'Garrison Hearthstone', 'Wormhole Generator: Northrend',
    'Wormhole Generator: Pandaria', 'Admiral\'s Compass', 'Argent Crusader\'s Tabard'
  ]
}, {
  label: 'Search & Target',
  category: CATEGORIES.GAMEPLAY,
  tokens: ['SetRaidTarget'],
  commandNames: ['/tar', '/who', '/target', '/focus']
}, {
  label: 'Quest',
  category: CATEGORIES.GAMEPLAY,
  tokens: ['Warts-B-Gone Lip Balm']
}, {
  label: 'Equipment',
  category: CATEGORIES.GAMEPLAY,
  commandNames: ['/equip', '/equipslot', 'linkItem', '/use']
}, {
  label: 'Emote',
  category: CATEGORIES.OTHER,
  tokenTypes: ['emote']
}, {
  label: 'Party',
  category: CATEGORIES.GAMEPLAY,
  commandNames: ['/follow', '/inv', '/invite', '/petfollow', '/promote'],
  tokens: ['LeaveParty']
}];

const other = [{
  label: 'Chat',
  category: CATEGORIES.OTHER,
  tokenTypes: ['chat', 'channel'],
  tokens: ['SendChatMessage', 'GetChannelName']
}, {
  label: 'Profession',
  category: CATEGORIES.OTHER,
  tokenTypes: ['linkEnchant', 'linkProfession', 'linkSpell'],
  tokens: ['Cooking', 'Basic Campfire', 'Archaeology', 'Engineering', 'Jewelcrafting', 'Enchanting', 'Smelting', 'Mining', 'Mining Skills', 'Disenchant', 'Prospecting']
}, {
  label: 'Script & Config',
  category: CATEGORIES.OTHER,
  commandNames: ['/console', '/run'],
  tokens: ['SetCVar']
}, {
  label: 'Wintergrasp',
  category: CATEGORIES.OTHER,
  tokens: ['GetWintergraspWaitTime']
}, {
  label: 'Server',
  category: CATEGORIES.OTHER,
  tokenTypes: ['server']
}];

const race = [{
  label: 'Draenei',
  category: CATEGORIES.RACE,
  tokens: ['Gift of the Naaru']
}, {
  label: 'Blood Elf',
  category: CATEGORIES.RACE,
  tokens: ['Arcane Torrent']
}, {
  label: 'Goblin',
  category: CATEGORIES.RACE,
  tokens: ['Mobile Banking', 'Pack Hobgoblin']
}];

module.exports = function getTags(spells, mounts) {
  const classTags = Object.values(spells.reduce(spellToDict, {})).map(([label, spellList]) => ({
    label,
    category: CATEGORIES.CLASS,
    tokens: [...new Set(spellList)].sort(sortText),
    color: CLASS_COLORS[label]
  }));

  return [
    ...classTags,
    ...gameplay,
    ...other,
    ...race
  ]
    .sort(sortLabel)
    .concat({
      label: 'Mount',
      category: CATEGORIES.GAMEPLAY,
      tokens: mounts,
      commandNames: ['/dismount']
    }, {
      label: 'OTHER',
      category: CATEGORIES.OTHER,
      tokens: []
    })
    .map(assignId);
};
