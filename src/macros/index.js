const groupSimilarTokenized = require('./groupSimilarTokenized');
const tokenize = require('./tokenize');

const addTags = require('./addTags');
const findCommon = require('./findCommon');
const getMacros = require('./getMacros');

const mergeMacros = require('./mergeMacros');
const parseMacro = require('./parseMacro');
const parseMacroFile = require('./parseMacroFile');

module.exports = {
  groupSimilarTokenized,
  tokenize,

  addTags,
  findCommon,
  getMacros,

  mergeMacros,
  parseMacro,
  parseMacroFile
};
