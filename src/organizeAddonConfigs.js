const crypto = require('crypto'); // eslint-disable-line no-shadow
const { relative } = require('path');
const { findFiles, readFile, setDict } = require('./utils');

const hashFile = (dir) => ({ fileContents, fileName }) => ({
  hash: crypto.createHash('md5').update(fileContents).digest('hex'),
  filePath: relative(dir, fileName),
  fileSize: fileContents.length,
  fileName: fileName.split('/').pop().replace('.lua', '')
});

const groupFile = (dict, { fileName, hash, fileSize, filePath }) => {
  setDict(dict, fileName, {});
  setDict(dict[fileName], hash, {
    fileSize,
    files: []
  });

  dict[fileName][hash].files.push(filePath);

  return dict;
};

module.exports = async function organizeAddonConfigs(dir) {
  const fileNames = await findFiles(dir, '*.lua');
  const contents = await Promise.all(fileNames.map(readFile));

  return contents.map(hashFile(dir)).reduce(groupFile, {});
};
