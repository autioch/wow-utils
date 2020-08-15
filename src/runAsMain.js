const organizeAddonConfigs = require('./organizeAddonConfigs');
const organizeClientConfigs = require('./organizeClientConfigs');
const getMounts = require('./getMounts');
const getSpells = require('./getSpells');
const { join } = require('path');
const fs = require('fs/promises');

const OUTPUT = join(__dirname, '..', 'output');
const SOURCE = join('e:', 'projects', 'wow configs', 'wow wotlk', 'WTF');

const saveFile = (fileName, fileContents) => fs.writeFile(join(OUTPUT, fileName), fileContents, 'utf-8');
const saveJson = (fileName, fileContents) => saveFile(`${fileName}.json`, JSON.stringify(fileContents, null, '  '));

(async () => {
  const addonConfigs = await organizeAddonConfigs(SOURCE);
  const { configRaw, configText } = await organizeClientConfigs(SOURCE);
  const mounts = getMounts();
  const spells = getSpells();

  await saveJson('mounts', mounts);
  await saveJson('spells', spells);
  await saveJson('addons', addonConfigs);
  await saveJson('config', configRaw);
  await saveFile('Config.wtf', configText);
})();
