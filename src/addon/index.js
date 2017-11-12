const { findFiles } = require('../utils');
const mergeConfig = require('./mergeConfig');
const saveJson = require('../utils/saveJson');
const parseFile = require('./parseFile');

module.exports = function getAddons(dir) {
  return findFiles(dir, '*.lua')
    .map((fileName) => parseFile(fileName, dir))
    .then((parsedFiles) => mergeConfig(parsedFiles))
    .then((addons) => saveJson(addons, 'addons'));
};
