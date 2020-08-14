const organizeAddonConfigs = require('./organizeAddonConfigs');
const organizeClientConfigs = require('./organizeClientConfigs');
const { SOURCE } = require('./consts');

(async () => {
  // await organizeAddonConfigs(SOURCE);
  await organizeClientConfigs(SOURCE);
})();
