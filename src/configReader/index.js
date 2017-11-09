const path = require('path');
const findMacroFiles = require('./findMacroFiles');
const mergeConfig = require('./mergeConfig');
const writeConfig = require('./writeConfig');
const saveJson = require('../utils/saveJson');
const parseFile = require('./parseFile');

const macroDir = path.join('e:', 'backup', 'WTF');

findMacroFiles(macroDir)
  .map((fileName) => parseFile(fileName))
  .then((parsedFiles) => mergeConfig(parsedFiles))
  .then((config) => writeConfig(config))
  .then((config) => saveJson(config, 'config'));
