const organizeAddonConfigs = require('./addon');
const organizeClientConfigs = require('./client');
const { saveFile, source } = require('../utils');

(async () => {
  const result = await organizeAddonConfigs(source);
  const { configRaw, configText } = await organizeClientConfigs(source);

  await saveFile('addons', result, true);
  await saveFile('config', configRaw, true);
  await saveFile('Config.wtf', configText);
})();
