const uniq = require('lodash.uniq');

// "id": "16777217",
// "label": "bubel",
// "icon": "INV_Misc_QuestionMark",
// "content": [
//   "#showtooltip",
//   "/castsequence reset=50 Divine Shield, Hearthstone"
// ],
// "filename": "E:/projects/wow-macro/examples/WTF 0/Account/ARALD/Feronis/Alard/macros-cache.txt",
// "account": "ARALD",
// "realm": "Feronis",
// "character": "Alard"

const PROPS = ['id', 'label', 'prefix', 'icon', 'filename', 'account', 'realm', 'character'];

function newMacro(content) {
  return PROPS.reduce((macro, prop) => {
    macro[prop] = [];

    return macro;
  }, {
    content
  });
}

module.exports = function removeDuplicates(macros) {
  const seen = {};

  function setSeen(key) {
    if (!seen[key]) {
      seen[key] = newMacro(key.split('\n'));
    }

    return seen[key];
  }

  macros
    .map((macro) => ({
      macro,
      hash: macro.content.join('\n')
    }))
    .forEach((macroAndHash) => {
      const macro = setSeen(macroAndHash.hash);

      PROPS.forEach((prop) => {
        macro[prop].push(macroAndHash.macro[prop]);
      });
    });

  const uniqeMacros = Object.values(seen);

  uniqeMacros.forEach((macro) => {
    PROPS.forEach((prop) => {
      macro[prop] = uniq(macro[prop]).sort();
    });
  });

  return uniqeMacros;
};
