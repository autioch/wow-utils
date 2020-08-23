const organizeConfigs = require('./organizeConfigs');
const prepareTags = require('./prepareTags');

module.exports = {
  ...organizeConfigs,
  ...prepareTags
};
