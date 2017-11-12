const crypto = require('crypto'); // eslint-disable-line no-shadow
const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));

const GLOB_PATH_SEP = '/';

module.exports = function parseFile(filePath) {
  return fs
    .readFileAsync(filePath, 'utf8')
    .then((fileContents) => {
      const pathParts = filePath.split(GLOB_PATH_SEP);
      const wtfDate = pathParts.slice(0);

      /* TODO Fix this. */
      wtfDate.shift();
      wtfDate.shift();
      wtfDate.shift();

      return {
        hash: crypto.createHash('md5').update(fileContents).digest('hex'),
        filePath,
        fileSize: fileContents.length,
        fileName: pathParts.slice(0).pop().replace('.lua', ''),
        wtfDate: wtfDate.join('/')
      };
    });
};
