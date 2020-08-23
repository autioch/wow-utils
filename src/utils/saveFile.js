const { join } = require('path');
const fs = require('fs/promises');
const output = require('./output');

module.exports = async function saveFile(fileName, fileContents, saveAsJson = false) {
  if (saveAsJson) {
    await fs.writeFile(join(output, `${fileName}.json`), JSON.stringify(fileContents, null, '  '), 'utf-8');
  } else {
    await fs.writeFile(join(output, fileName), fileContents, 'utf-8');
  }
};
