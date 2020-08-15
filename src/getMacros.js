const { findFiles, readFile } = require('./utils');
const { groupBy } = require('lodash');
/* eslint no-magic-numbers: 0 */
/* eslint no-undefined: 0 */

const VER_3_PREFIX = 'VER 3';

const HEADER_VER_1 = /MACRO (.+) "(.+)" (.+)/;
const HEADER_VER_3 = /VER 3 (.+) "(.+)" (.+)/;

const PREFIXES = ['!', '@', '#', '$', '%', '^', '&', '*', '_', 'x'];
const getKeys = Object.keys.bind(Object);

function parseLabel(rawLabel) {
  if (!rawLabel || rawLabel.length < 2) {
    return [undefined, rawLabel];
  }

  if (PREFIXES.includes(rawLabel[0])) {
    return [rawLabel[0], rawLabel.slice(1)];
  }

  return [undefined, rawLabel];
}

function parseHeader(headerLine) {
  if (!headerLine) {
    return ['?', '?', '?'];
  }

  const details = headerLine.match(headerLine.startsWith(VER_3_PREFIX) ? HEADER_VER_3 : HEADER_VER_1);

  if (!details || details.length < 3) {
    return ['?', '?', '?'];
  }

  return details.map((text) => text.replace(/"/g, ''));
}

function parseMacro(macro) {
  const [, id, rawLabel, icon] = parseHeader(macro[0]);
  const [prefix, label] = parseLabel(rawLabel);

  return {
    id,
    prefix,
    label,
    icon,
    lines: macro.slice(1, -1).join('\n') // remove header line and "END"
  };
}

function parseMacros({ fileContents }) {
  const macros = [];

  let currentMacroLines = [];

  fileContents
    .split('\n')
    .map((line) => line.trim())
    .forEach((line) => {
      currentMacroLines.push(line);
      if (line === 'END') {
        macros.push(currentMacroLines);
        currentMacroLines = [];
      }
    });

  return macros.map(parseMacro);
}

module.exports = async function getMacros(dir) {
  const fileNames = await findFiles(dir, 'macros-cache.txt');
  const contents = await Promise.all(fileNames.map(readFile));

  const parsed = contents.flatMap(parseMacros);
  const props = [...new Set(parsed.flatMap(getKeys))];
  const groupedByLine = groupBy(parsed, (macro) => macro.lines);
  const groupedMacros = Object.values(groupedByLine);

  const unique = groupedMacros.map((arr) => Object.fromEntries(props.map((prop) => [prop, [...new Set(arr.map((macro) => macro[prop]))].filter(Boolean)])));

  console.log(`${parsed.length} macros, ${unique.length} unique`);

  return unique;
};
