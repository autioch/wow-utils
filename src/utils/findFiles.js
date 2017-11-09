const path = require('path');
const bluebird = require('bluebird');
const glob = bluebird.promisify(require('glob'));

module.exports = function findFiles(dir, fileName) {
  const absoluteRoot = path.resolve(dir);
  const searchExpression = path.join(absoluteRoot, '**', fileName);
  const posixSearchExpression = searchExpression.replace(/\\/g, '/');

  return glob(posixSearchExpression);
};
