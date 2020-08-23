const { join, basename } = require('path');
const { outputRoot } = require('../../utils');
const { uniqBy } = require('lodash');
const fs = require('fs');
const download = require('image-downloader');

const ignored = new Set(['132319']);
const EXTENSION = '.jpg';

module.exports = async function downloadIcons(macros) {
  const iconsFolder = join(outputRoot, 'macroIcons');

  fs.mkdir(iconsFolder, {
    recursive: true
  }, (err) => err && throw err);

  const existingIcons = new Set(fs.readdirSync(iconsFolder).map((fileName) => basename(fileName, EXTENSION)));// eslint-disable-line no-sync
  const allIcons = macros.flatMap(({ icon }) => icon);
  const missingIcons = uniqBy(allIcons, (icon) => icon.toLowerCase()).filter((icon) => !existingIcons.has(icon) && !ignored.has(icon));

  const iconPromises = missingIcons.sort((a, b) => a.localeCompare(b)).map((icon) => download.image({
    url: `http://wow.zamimg.com/images/wow/icons/large/${icon.toLowerCase()}${EXTENSION}`,
    dest: join(outputRoot, 'macroIcons', `${icon}${EXTENSION}`)
  }));

  await Promise.all(iconPromises);
};
