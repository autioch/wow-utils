const { findFiles, readFile } = require('../utils');
const { parseMacroFile, mergeMacros } = require('./macros');

module.exports = async function getMacros(dir) {
  const fileNames = await findFiles(dir, 'macros-cache.txt');
  const contents = await Promise.all(fileNames.map(readFile));
  const parsed = contents.flatMap(parseMacroFile);

  return mergeMacros(parsed);
};
