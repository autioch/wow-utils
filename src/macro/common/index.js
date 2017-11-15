const findCommon = require('./findCommon');
const saveJson = require('../../utils/saveJson');

module.exports = function extractCommon(minifiedMacros) {
  const common = findCommon(minifiedMacros);

  return saveJson(common, 'common').then(() => minifiedMacros);
};

if (require.main === module) {
  module.exports(require('../../../output/minified.json'));
}
