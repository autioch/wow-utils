/* eslint no-magic-numbers: 0 */
import macros from './macros.json';

const tagGroups = [{
  label: 'Class',
  tags: [{
    id: 0,
    label: 'Paladin',
    isSelected: true,
    color: '#F58CBA'
  }, {
    id: 1,
    label: 'Priest',
    isSelected: false,
    color: '#FFFFFF'
  }, {
    id: 2,
    label: 'Warlock',
    isSelected: false,
    color: '#9482C9'
  }, {
    id: 3,
    label: 'Druid',
    isSelected: false,
    color: '#FF7D0A'
  }, {
    id: 4,
    label: 'Warrior',
    isSelected: false,
    color: '#C79C6E'
  }, {
    id: 5,
    label: 'Hunter',
    isSelected: false,
    color: '#ABD473'
  }, {
    id: 6,
    label: 'Mage',
    isSelected: false,
    color: '#69CCF0'
  }, {
    id: 7,
    label: 'Death Knight',
    isSelected: false,
    color: '#C41F3B'
  }, {
    id: 8,
    label: 'Rogue',
    isSelected: false,
    color: '#FFF569'
  }, {
    id: 9,
    label: 'Shaman',
    isSelected: false,
    color: '#0070DE'
  }]
}, {
  label: 'Race',
  tags: [{
    id: 10,
    label: 'Human',
    isSelected: false
  }, {
    id: 11,
    label: 'Draenei',
    isSelected: false
  }, {
    id: 12,
    label: 'Night Elf',
    isSelected: false
  }, {
    id: 13,
    label: 'Dwarf',
    isSelected: false
  }, {
    id: 14,
    label: 'Gnome',
    isSelected: false
  }, {
    id: 15,
    label: 'Blood Elf',
    isSelected: false
  }, {
    id: 16,
    label: 'Tauren',
    isSelected: false
  }, {
    id: 17,
    label: 'Troll',
    isSelected: false
  }, {
    id: 18,
    label: 'Orc',
    isSelected: false
  }, {
    id: 19,
    label: 'Undead',
    isSelected: false
  }]
}];

export default function seed() {
  const tagLabels = tagGroups.reduce((tags, group) => tags.concat(...group.tags.map((tag) => tag.label)), []);
  const macroTagDict = {};

  macros.forEach((macro) => {
    macro.isHidden = false;
    macro.tags.forEach((tag) => {
      if (!macroTagDict[tag]) {
        macroTagDict[tag] = true;
      }
    });
  });

  const otherGroup = {
    label: 'Other',
    tags: Object
      .keys(macroTagDict)
      .filter((macroTagLabel) => tagLabels.every((label) => label !== macroTagLabel))
      .map((label, index) => ({
        id: index + 100,
        label,
        isSelected: false
      }))
  };

  return {
    tagGroups: tagGroups.concat(otherGroup),
    macros
  };
}
