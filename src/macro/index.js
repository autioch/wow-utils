const reader = require('./reader');
const parser = require('./parser');
const dedupe = require('./dedupe');
const tagger = require('./tagger');

module.exports = function getMacros(dir) {
  return reader(dir)
    .then(parser)
    .then(dedupe)
    .then(tagger);
};
