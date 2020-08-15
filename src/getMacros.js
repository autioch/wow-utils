const { findFiles, readFile } = require('./utils');

function parseMacros({ fileName, fileContents }) {
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

  return {
    fileName,
    macros
  };
}

module.exports = async function getMacros(dir) {
  const fileNames = await findFiles(dir, 'macros-cache.txt');
  const contents = await Promise.all(fileNames.map(readFile));

  return contents.map(parseMacros);
};
