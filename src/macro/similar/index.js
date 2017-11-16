const distance = require('./distance');
const markClusters = require('./markClusters');
const saveJson = require('../../utils/saveJson');
const indexBy = require('./indexBy');

module.exports = function findSimilar(minifiedMacros) {
  const clustered = markClusters(minifiedMacros, distance);
  const indexed = indexBy(clustered, 'clusterId');

  console.log(`${minifiedMacros.length} macros, ${distance.callCount()} distances counted`);

  return saveJson(indexed, 'similar').then(() => minifiedMacros);
};

if (require.main === module) {
  module.exports(require('../../../output/minified.json'));
}
