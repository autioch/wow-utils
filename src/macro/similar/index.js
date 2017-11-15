const distance = require('./distance');
const markClusters = require('./markClusters');

const saveJson = require('../../utils/saveJson');

module.exports = function findSimilar(minifiedMacros) {
  const clustered = markClusters(minifiedMacros, distance);

  console.log(`${minifiedMacros.length} macros, ${distance.callCount()} distances counted`);

  return saveJson(clustered, 'similar').then(() => minifiedMacros);
};

if (require.main === module) {
  module.exports(require('../../../output/minified.json'));
}
