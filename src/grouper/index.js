const parserOutput = require('../../output/parser.json');
const removeDuplicates = require('./removeDuplicates');
const saveJson = require('../utils/saveJson');
const findCommonWords = require('./findCommonWords');
const findCommonLines = require('./findCommonLines');
const group = require('./group');

const macros = removeDuplicates(parserOutput);

console.log(`${parserOutput.length} macros at start`);
console.log(`${macros.length} unique macros`);

saveJson(macros, 'grouper.unique');
saveJson(findCommonWords(macros), 'grouper.words');
saveJson(findCommonLines(macros), 'grouper.lines');
saveJson(group(macros), 'grouper.groups');
