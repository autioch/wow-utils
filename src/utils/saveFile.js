const { join } = require('path');
const fs = require('fs/promises');
const { OUTPUT } = require('../consts');

module.exports = function saveFile(fileContents, fileName) {
  return fs.writeFile(join(OUTPUT, fileName), fileContents, 'utf-8');
};
