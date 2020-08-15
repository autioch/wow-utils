const { uniq } = require('lodash');

/* Ripped from wowhead :( */
const two = require('./two');
const three = require('./three');
const four = require('./four');

const getName = ({ name_enus }) => name_enus;
const getName2 = (spell) => spell.name.slice(1);
const sortLabel = (a, b) => a.localeCompare(b);

module.exports = function getMounts() {
  const twos = Object.values(two).map(getName);
  const threes = Object.values(three).map(getName);
  const fours = four.map(getName2);
  const all = [...twos, ...threes, ...fours];
  const allFiltered = all.filter(Boolean);

  if (all.length !== allFiltered.length) {
    console.log(`Not all mounts have names? Total: ${all.length}, filtered: ${allFiltered.length}`);
  }

  return uniq(all).sort(sortLabel);
};
