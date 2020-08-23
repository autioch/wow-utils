const { GAMEPLAY, OTHER, RACE, CATEGORIES, CLASS_COLORS } = require('./consts');

const sortText = (a, b) => a.localeCompare(b);
const sortLabel = (a, b) => a.label.localeCompare(b.label);
const spellToDict = (obj, { category: { label }, spells }) => {
  if (obj[label]) {
    obj[label].push(...spells);
  } else {
    obj[label] = [...spells];
  }

  return obj;
};

const idFromIndex = (tag, index) => ({
  ...tag,
  id: index + 1
});

function getClassTags(spells) {
  return Object.entries(spells.reduce(spellToDict, {})).map(([label, spellList]) => ({
    label,
    category: CATEGORIES.CLASS,
    matchesText: [...new Set(spellList)].sort(sortText),
    color: CLASS_COLORS[label]
  }));
}

module.exports = function getTags(spells, mounts) {
  return [
    ...getClassTags(spells),
    ...GAMEPLAY,
    ...OTHER,
    ...RACE
  ]
    .sort(sortLabel)
    .concat({
      label: 'Mount',
      category: CATEGORIES.GAMEPLAY,
      matchesText: [...mounts, 'flyable', 'noflyable', 'nomounted', 'mounted'],
      matchesCommands: ['/dismount']
    }, {
      label: 'OTHER',
      category: CATEGORIES.OTHER,
      matchesText: []
    })
    .map(idFromIndex);
};
