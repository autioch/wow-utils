const { groupBy } = require('lodash');
/* eslint no-magic-numbers: 0 */
/* eslint no-undefined: 0 */

const getKeys = Object.keys.bind(Object);

const getProps = (prop, macros) => [prop, [...new Set(macros.map((macro) => macro[prop]).filter(Boolean))] ];

module.exports = function mergeMacros(macros) {
  const props = [...new Set(macros.flatMap(getKeys))];
  const groupedByLine = groupBy(macros, (macro) => macro.text);
  const groupedMacros = Object.values(groupedByLine);

  return groupedMacros.map((arr) => ({
    ...Object.fromEntries(props.map((prop) => getProps(prop, arr))),
    text: arr[0].text
  }));
};
