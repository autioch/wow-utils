const { join } = require('path');
const fs = require('fs/promises');

const OUTPUT = join(__dirname, '..', '..', 'output');

module.exports = async function saveFile(fileName, fileContents, saveAsJson = false) {
  if (saveAsJson) {
    await fs.writeFile(join(OUTPUT, `${fileName}.json`), JSON.stringify(fileContents, null, '  '), 'utf-8');
  } else {
    await fs.writeFile(join(OUTPUT, fileName), fileContents, 'utf-8');
  }
};
