const { findFiles, readFile, saveFile, source } = require('../utils');
const parseMacroFile = require('./parseMacroFile');

(async () => {
  const fileNames = await findFiles(source, 'macros-cache.txt');
  const contents = await Promise.all(fileNames.map(readFile));
  const macros = contents.flatMap(({ fileContents }) => parseMacroFile(fileContents));

  await saveFile('macros', macros, true);
})();
