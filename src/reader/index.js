const path = require('path');
const findMacroFiles = require('./findMacroFiles');
const saveJson = require('../utils/saveJson');
const parseFile = require('./parseFile');

const macroDir = path.join(__dirname, '..', '..', 'examples');

findMacroFiles(macroDir)
  .map((fileName) => parseFile(fileName))
  .then((parsedFiles) => saveJson(parsedFiles, 'reader'));
