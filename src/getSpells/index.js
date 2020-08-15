const qbLog = require('qb-log');
const { uniq } = require('lodash');
const cheerio = require('cheerio');
const request = require('request');
const categories = require('./categories.json');
const expansions = require('./expansions.json');

const BASE_URL = '-twinhead.twinstar.cz/?spells=';

function fetchSpells(expansion, categoryId) {
  const uri = `https://${expansion}${BASE_URL}${categoryId}`;

  qbLog.info(uri);

  return new Promise((resolve, reject) => {
    request({
      uri
    }, (err, response, body) => {
      if (err) {
        return reject(err);
      }

      if (response.status < 200 || response.status > 299) { // eslint-disable-line no-magic-numbers
        return reject(new Error(`Invalid response status ${response.status} ${uri}`));
      }

      if (!body.length) {
        return reject(new Error(`Missing body for ${uri}`));
      }

      return resolve(body);
    });
  });
}

const sortText = (a, b) => a.localeCompare(b);
const sortId = (a, b) => a.id.localeCompare(b.id);
const cleanupSpellName = (spell) => spell.name.replace(/\([^)]+\)/g, '').trim();
const fixKey = (match, prefix, key) => `${prefix}"${key}":`;// eslint-disable-line no-unused-vars

const sortedCategories = categories.sort(sortId);

function parseSpells(bodyText) {
  const scriptText = cheerio.load(bodyText)('#main-contents > script').html().trim();
  const spellsText = scriptText
    .slice(scriptText.indexOf(',data:[') + 6, -3) // eslint-disable-line no-magic-numbers
    .replace(/({|,)([a-z]+):/gi, fixKey)
    .replace(/'/g, '"');

  const spellNames = JSON.parse(spellsText).map(cleanupSpellName);
  const uniqSpellNames = uniq(spellNames);

  qbLog.info('SPELL CLEANUP', uniqSpellNames.length, 'out of', spellNames.length);

  return uniqSpellNames.sort(sortText);
}

async function getSpellsForDefinition({ expansion, category }) {
  qbLog.info('FETCH', expansion.label, category.label);
  const bodyText = await fetchSpells(expansion.id, category.id);

  return {
    expansion,
    category,
    spells: parseSpells(bodyText)
  };
}

module.exports = function getSpells() {
  const definitions = expansions.flatMap((expansion) => sortedCategories.map((category) => ({
    expansion,
    category
  })));

  return Promise.all(definitions.map(getSpellsForDefinition));
};
