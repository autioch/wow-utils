const { findFiles } = require('../utils');
const dedupe = require('./dedupe');
const writeConfig = require('./writeConfig');
const saveJson = require('../utils/saveJson');
const parseFile = require('./parseFile');

module.exports = function cleanupConfig(dir) {
  return findFiles(dir, 'Config.wtf')
    .map((fileName) => parseFile(fileName))
    .then((parsedFiles) => dedupe(parsedFiles))
    .then((config) => writeConfig(config))
    .then((config) => saveJson(config, 'config'));
};
