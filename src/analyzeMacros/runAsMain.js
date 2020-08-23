const { join } = require('path');
const { readFile, saveFile, output } = require('../utils');
const addTags = require('./addTags');
const markSimilar = require('./markSimilar');
const mergeMacros = require('./mergeMacros');
const tokenize = require('./tokenize');
const tokenizeReport = require('./tokenizeReport');

(async () => {
  const { fileContents: macrosJson } = await readFile(join(output, 'macros.json'));
  const { fileContents: tagsJson } = await readFile(join(output, 'tags.json'));
  const tags = JSON.parse(tagsJson);
  const merged = mergeMacros(JSON.parse(macrosJson));
  const tokenized = merged.map(tokenize).map((macro) => addTags(macro, tags));

  await saveFile('macros.analyzed', markSimilar(tokenized), true);
  await saveFile('macros.html', tokenizeReport(tokenized));
})();
