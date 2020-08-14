const organizeAddonConfigs = require('./organizeAddonConfigs');
const organizeClientConfigs = require('./organizeClientConfigs');

module.exports = {
  organizeAddonConfigs,
  organizeClientConfigs
};

if (require.main === module) {
  require('./runAsMain');
}
