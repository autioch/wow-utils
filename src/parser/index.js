const readerOutput = require('../../output/reader.json');
const flattenMacros = require('./flattenMacros');
const saveJson = require('../utils/saveJson');

const parsedMacros = flattenMacros(readerOutput);

saveJson(parsedMacros, 'parser');
