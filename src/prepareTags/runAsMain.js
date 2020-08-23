const getMounts = require('./getMounts');
const getSpells = require('./getSpells');
const getTags = require('./getTags');
const { saveFile } = require('../utils');

(async () => {
  const spells = await getSpells();
  const mounts = await getMounts();

  await saveFile('spells', spells, true);
  await saveFile('mounts', mounts, true);

  const tags = getTags(spells, mounts);

  await saveFile('tags', tags, true);
})();
