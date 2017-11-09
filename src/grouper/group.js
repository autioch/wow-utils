/* eslint max-len: 0 */
// const KEYWORDS = [
//
//   /* Various */
//   '/cast [target=',
//   '/equip',
//   '/use',
//   '/script',
//   '/cast'
// ];
//
const definitions = require('./definitions');

module.exports = function groupMacros(macros) {
  const groups = definitions();

  function hasKeyword(macro, keyword) {
    return macro.content.join('\n').includes(keyword);
  }

  const simpleGroup = {
    label: 'Simple',
    macros: [],
    keywords: []
  };

  const advancedMacros = macros
    .filter((macro) => macro.content.join('').length > 1)
    .filter((macro) => {
      const has = hasKeyword(macro, '/') || hasKeyword(macro, '.');

      if (!has) {
        simpleGroup.macros.push(macro);
      }

      return has;
    });

  const otherMacros = groups.reduce((remainingMacros, group) => remainingMacros.filter((macro) => {
    const has = group.keywords.some((keyword) => hasKeyword(macro, keyword));

    if (has) {
      group.macros.push(macro);
    }

    return !has;
  }), advancedMacros);

  groups.unshift(simpleGroup);
  groups.push({
    label: 'Other',
    macros: otherMacros.map((macro) => macro),
    keywords: []
  });

  return groups;

  // return Object.entries(groups);
};
