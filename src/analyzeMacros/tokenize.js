const { Parser } = require('nearley');
const { flattenDeep, pick } = require('lodash');
const { luaGrammar, macroGrammar, genericGrammar } = require('./grammar');

function tryParse(line, grammar, grammarName) {
  let tokens = [];

  let message = '';

  try {
    tokens = new Parser(grammar).feed(line.trim()).results;
  } catch (err) {
    message = err.message; // eslint-disable-line prefer-destructuring
  }
  const parsed = !message && tokens.length > 0;

  return {
    tokens: tokens.length ? tokens[0] : [],
    parsed,
    message: message || 'No tokens returned',
    ambiguous: tokens.length > 1,
    grammar: grammarName
  };
}

module.exports = function tokenize(macro) {
  const tokenLines = macro.text.split('\n').map((line) => line.trim()).map((rawLine) => {
    const line = rawLine.endsWith(';') ? rawLine.slice(0, -1).trim() : rawLine;

    let result;

    if (line.startsWith('/run ') || line.startsWith('/script ')) {
      const words = line.split(' ');

      result = tryParse(words.slice(1).join(' '), luaGrammar, 'lua');

      result.tokens.unshift({
        type: 'command',
        value: words[0]
      }, {
        type: 'space',
        value: ' '
      });
    } else {
      result = tryParse(line, macroGrammar, 'macro');
      if (!result.parsed) {
        result = tryParse(line, genericGrammar, 'generic');
      }
    }

    return {
      ...result,
      line,
      tokens: flattenDeep(result.tokens).filter(Boolean).map((item) => pick(item, ['type', 'value']))
    };
  });

  return {
    ...macro,
    tokenLines,
    isAmbiguous: tokenLines.some((line) => !!line.ambiguous),
    isValid: tokenLines.every((line) => !!line.parsed)
  };
};
