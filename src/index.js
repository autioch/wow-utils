const addon = require('./addon');
const config = require('./config');
const macro = require('./macro');

module.exports = function wowUtils(backupDir) {
  return macro(backupDir)
    .then(() => config(backupDir))
    .then(() => addon(backupDir));
};
