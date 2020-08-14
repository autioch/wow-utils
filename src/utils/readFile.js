const fs = require('fs/promises');

module.exports = async function readFile(fileName) {
  const fileContents = await fs.readFile(fileName, 'utf-8');

  return {
    fileName,
    fileContents
  };
};
