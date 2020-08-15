const organizeAddonConfigs = require('./organizeAddonConfigs');
const organizeClientConfigs = require('./organizeClientConfigs');
const getTags = require('./getTags');
const getMacros = require('./getMacros');
const getMounts = require('./getMounts');
const getSpells = require('./getSpells');

module.exports = {
  organizeAddonConfigs,
  organizeClientConfigs,
  getTags,
  getMacros,
  getMounts,
  getSpells
};

if (require.main === module) {
  require('./runAsMain');
}
