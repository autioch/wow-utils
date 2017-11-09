/* eslint no-magic-numbers: 0 */
const DEFAULT_ICON = 'INV_Misc_QuestionMark';
const TOOLTIP = '#showtooltip';

const CHARACTER = /[a-zA-Z0-9]/;

function parseHeader(line) {
  if (!line) {
    return ['?', '?', '?'];
  }
  let id;
  let label;
  let icon;

  if (line.startsWith('VER 3')) {
    [, id, label, icon] = line.match(/VER 3 (.+) "(.+)" (.+)/);
  } else {
    [, id, label, icon] = line.match(/MACRO (.+) "(.+)" (.+)/);
  }

  return [id, label, icon.replace(/"/g, '')];
}

function analyzeMacro(lines) {
  let version = 1;

  if (lines[0].startsWith('VER 3')) {
    version = 3;
  }

  const [id, label, icon] = parseHeader(lines[0]);
  const hasTooltip = lines[1].includes(TOOLTIP);
  const content = lines.slice(1, -1);

  if (hasTooltip) {
    content.shift();
  }

  let labelStart = 0;
  let prefix;

  // console.log(label, label[1].match(CHARACTER));
  try {
    if (!label[0].match(CHARACTER)) {
      labelStart = 1;
      prefix = label[0];
    }
  } catch (err) {
    console.log('#', lines, '#');
  }

  return {
    id,
    label: label.slice(labelStart),
    prefix,
    icon,
    hasCustomIcon: icon !== DEFAULT_ICON,
    hasTooltip,
    tooltip: hasTooltip ? lines[1].replace(TOOLTIP, '').trim() : false,
    content,
    lines,
    version
  };
}

module.exports = function parseMacros(macros) {
  return macros.map(analyzeMacro);
};
