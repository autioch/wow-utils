const { join, resolve } = require('path');
const glob = require('glob');
const qbLog = require('qb-log')('simple');

module.exports = async function findFiles(dir, fileName) {
  const posixSearchExpression = join(resolve(dir), '**', fileName).replace(/\\/g, '/');

  qbLog.info('Find files', posixSearchExpression, '...');

  const fileNames = await new Promise((res, rej) => glob(posixSearchExpression, (err, files) => err ? rej(err) : res(files))); // eslint-disable-line no-confusing-arrow

  qbLog.info('Found', fileNames.length, 'files');

  return fileNames;
};
