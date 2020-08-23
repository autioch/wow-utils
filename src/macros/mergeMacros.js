const { groupBy } = require('lodash');
/* eslint no-magic-numbers: 0 */
/* eslint no-undefined: 0 */

const getKeys = Object.keys.bind(Object);

module.exports = function mergeMacros(macros) {
  const props = [...new Set(macros.flatMap(getKeys))];
  const groupedByLine = groupBy(macros, (macro) => macro.lines);
  const groupedMacros = Object.values(groupedByLine);

  return groupedMacros.map((arr) => Object.fromEntries(props.map((prop) => [prop, [...new Set(arr.map((macro) => macro[prop]))].filter(Boolean)])));
};
