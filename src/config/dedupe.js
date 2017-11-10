const uniq = require('lodash.uniq');

module.exports = function mergeConfig(parsedFiles) {
  const settingsArray = [];

  const settingsDict = parsedFiles.reduce((settings, parsedFile) => {
    parsedFile.settings.forEach((setting) => {
      if (!settings[setting.key]) {
        settings[setting.key] = [];
      }
      if (!settingsArray.some((item) => item.key === setting.key)) { // eslint-disable-line id-blacklist
        settingsArray.push({
          key: setting.key
        });
      }
      settings[setting.key].push(setting.value);
    });

    return settings;
  }, {});

  settingsArray.forEach((setting) => {
    const values = uniq(settingsDict[setting.key]).sort();

    if (values.length === 1) {
      [setting.value] = values;
    }
    if (values.length > 1) {
      setting.value = values;
    }
  });

  return settingsArray;
};
