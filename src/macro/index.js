const reader = require('./reader');
const parser = require('./parser');
const dedupe = require('./dedupe');
const tagger = require('./tagger');
const minifier = require('./minifier');
const common = require('./common');

module.exports = function getMacros(dir) {
  return reader(dir)
    .then(parser)
    .then(dedupe)
    .then(tagger)
    .then(minifier)
    .then(common);
};
