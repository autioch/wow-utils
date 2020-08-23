/* eslint no-magic-numbers: 0 */
/* eslint no-undefined: 0 */

const VER_3_PREFIX = 'VER 3';

const HEADER_VER_1 = /MACRO (.+) "(.+)" (.+)/;
const HEADER_VER_3 = /VER 3 (.+) "(.+)" (.+)/;

const PREFIXES = ['!', '@', '#', '$', '%', '^', '&', '*', '_', 'x'];

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

/**
 * Parses text of a macro into props.
 * @param  {String} macro Text of a macro.
 * @return {Object}       Object representing macro.
 */
module.exports = function parseMacro(macro) {
  const [header, ...lines] = macro;
  const [, , rawLabel, icon] = parseHeader(header);
  const [prefix, label] = parseLabel(rawLabel);

  return {
    prefix,
    label,
    icon,
    lines,
    text: lines.join('\n')
  };
};
