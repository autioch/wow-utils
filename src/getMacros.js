const { findFiles, readFile } = require('./utils');
const { parseMacro, mergeMacros } = require('wow-macro-utils');
/* eslint no-magic-numbers: 0 */
/* eslint no-undefined: 0 */

function parseMacros({ fileContents }) {
  const macros = [];

  let currentMacroLines = [];

  fileContents
    .split('\n')
    .map((line) => line.trim())
    .forEach((line) => {
      currentMacroLines.push(line);
      if (line === 'END') {
        macros.push(currentMacroLines);
        currentMacroLines = [];
      }
    });

  return macros.map(parseMacro);
}

module.exports = async function getMacros(dir) {
  const fileNames = await findFiles(dir, 'macros-cache.txt');
  const contents = await Promise.all(fileNames.map(readFile));

  const parsed = contents.flatMap(parseMacros);

  return mergeMacros(parsed);
};
