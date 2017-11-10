const path = require('path');
const findLuaFiles = require('./findLuaFiles');
const mergeConfig = require('./mergeConfig');
const saveJson = require('../utils/saveJson');
const parseFile = require('./parseFile');

const macroDir = path.join('e:', 'backup', 'WTF');

findLuaFiles(macroDir)
  .map((fileName) => parseFile(fileName))
  .then((parsedFiles) => mergeConfig(parsedFiles))
  .then((addons) => saveJson(addons, 'addons'));
