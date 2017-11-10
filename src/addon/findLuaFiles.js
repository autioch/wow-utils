const path = require('path');
const bluebird = require('bluebird');
const glob = bluebird.promisify(require('glob'));

const GLOB_EXPRESSION = path.join('**', '*.lua');

module.exports = function findLuaFiles(dir) {
  const absoluteRoot = path.resolve(dir);
  const searchExpression = path.join(absoluteRoot, GLOB_EXPRESSION);
  const posixSearchExpression = searchExpression.replace(/\\/g, '/');

  return glob(posixSearchExpression);
};
