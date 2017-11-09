const path = require('path');
const reader = require('./reader');
const parser = require('./parser');
const tagger = require('./tagger');
const dedupe = require('./dedupe');

const macroDir = path.join(__dirname, '..', 'examples');

reader(macroDir)
  .then(parser)
  .then(dedupe)
  .then(tagger);
