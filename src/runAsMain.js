const organizeAddonConfigs = require('./organizeAddonConfigs');
const organizeClientConfigs = require('./organizeClientConfigs');
const getTags = require('./getTags');
const getMacros = require('./getMacros');
const getMounts = require('./getMounts');
const getSpells = require('./getSpells');
const { join } = require('path');
const fs = require('fs/promises');
const qbLog = require('qb-log')('simple');

const OUTPUT = join(__dirname, '..', 'output');
const SOURCE = join('e:', 'projects', 'wow configs', 'wow wotlk', 'WTF');

const saveFile = (fileName, fileContents) => fs.writeFile(join(OUTPUT, fileName), fileContents, 'utf-8');
const saveJson = (fileName, fileContents) => saveFile(`${fileName}.json`, JSON.stringify(fileContents, null, '  '));

(async () => {
  qbLog.info('Addon configs');
  const addonConfigs = await organizeAddonConfigs(SOURCE);

  qbLog.info('Client configs');
  const { configRaw, configText } = await organizeClientConfigs(SOURCE);

  qbLog.info('mounts');
  const mounts = await getMounts();

  qbLog.info('spells');
  const spells = await getSpells();

  qbLog.info('macros');
  const macros = await getMacros(SOURCE);

  qbLog.info('tags');
  const tags = await getTags(spells, mounts);

  qbLog.info('saving files');
  await saveJson('tags', tags);
  await saveJson('macros', macros);
  await saveJson('mounts', mounts);
  await saveJson('spells', spells);
  await saveJson('addons', addonConfigs);
  await saveJson('config', configRaw);
  await saveFile('Config.wtf', configText);
})();
