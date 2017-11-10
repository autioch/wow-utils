const path = require('path');
const reader = require('./reader');
const parser = require('./parser');
const dedupe = require('./dedupe');
const tagger = require('./tagger');

const macroDir = path.join(__dirname, '..', 'examples');

reader(macroDir)
  .then(parser)
  .then(dedupe)
  .then(tagger);
