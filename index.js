const path = require('path');
const wowUtils = require('./src');

const BACKUP_DIR = path.join('e:', 'backup', 'WTF');

wowUtils(BACKUP_DIR);
