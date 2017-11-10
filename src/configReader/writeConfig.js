const path = require('path');
const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));

const OUTPUT_FOLDER = path.join(__dirname, '..', '..', 'output');

module.exports = function writeConfig(config) {
  const lines = [];

  config.forEach((setting) => {
    const { key, value } = setting;

    if (Array.isArray(value)) {
      lines.push('');
      lines.push(...value.map((val) => `SET ${key} "${val}"    ------------------------------------------`));
      lines.push('');
    } else {
      lines.push(`SET ${key} "${value}"`);
    }
  });

  const serialized = lines.join('\n');

  return fs
    .writeFileAsync(path.join(OUTPUT_FOLDER, 'Config.wtf'), serialized, 'utf-8')
    .then(() => config);
};
