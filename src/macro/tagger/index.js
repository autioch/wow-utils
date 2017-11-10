const tag = require('./tag');
const { saveJson } = require('../../utils');

module.exports = function tagger(grouperUnique) {
  return saveJson(tag(grouperUnique), 'tagger');
};
