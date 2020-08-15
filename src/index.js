const organizeAddonConfigs = require('./organizeAddonConfigs');
const organizeClientConfigs = require('./organizeClientConfigs');
const getMounts = require('./getMounts');
const getSpells = require('./getSpells');

module.exports = {
  organizeAddonConfigs,
  organizeClientConfigs,
  getMounts,
  getSpells
};

if (require.main === module) {
  require('./runAsMain');
}
