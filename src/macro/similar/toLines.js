const uniq = require('lodash.uniq');

module.exports = function toLines(macros) {
  const allLines = macros.reduce((lines, macro) => lines.concat(macro.content), []);

  return uniq(allLines).sort();
};
