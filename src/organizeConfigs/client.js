const { uniq } = require('lodash');
const { findFiles, readFile, setDict } = require('../utils');

const settingToText = ({ key, values }) => {
  if (values.length > 1) {
    return ['', ...values.map((value) => `------------------------------------------ SET ${key} "${value}"`), ''];
  }

  return `SET ${key} "${values[0]}"`;
};

const lineToKeyValue = (line) => line.trim().split(' ').map((text) => text.replace(/"/g, '')).slice(1);
const fileToKeyValue = ({ fileContents }) => fileContents.trim().split('\n').map(lineToKeyValue);

function dedupe(contents) {
  const settings = {};

  const allSettings = contents.flatMap(fileToKeyValue);

  allSettings.forEach(([key, value]) => setDict(settings, key, []).push(value));

  const keysInOrderOfAppearance = uniq(allSettings.map(([key]) => key));

  keysInOrderOfAppearance.forEach((key) => {
    if (!settings[key]) {
      throw Error(`Missing key ${key}`);
    }
  });

  return keysInOrderOfAppearance.map((key) => ({
    key,
    values: uniq(settings[key]).sort()
  }));
}

module.exports = async function organizeClientConfigs(dir) {
  const fileNames = await findFiles(dir, 'Config.wtf');
  const contents = await Promise.all(fileNames.map(readFile));
  const deduped = dedupe(contents);

  return {
    configRaw: deduped,
    configText: deduped.flatMap(settingToText).join('\n')
  };
};
