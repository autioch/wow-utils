const organizeAddonConfigs = require('./organizeAddonConfigs');
const organizeClientConfigs = require('./organizeClientConfigs');
const getMacros = require('./getMacros');
const getMounts = require('./getMounts');
const getSpells = require('./getSpells');

module.exports = {
  organizeAddonConfigs,
  organizeClientConfigs,
  getMacros,
  getMounts,
  getSpells
};

if (require.main === module) {
  require('./runAsMain');
}
