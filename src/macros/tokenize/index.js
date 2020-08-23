const parseLine = require('./parseLine');
const render = require('./render');

const isAmbiguousLine = (line) => !!line.ambiguous;
const isValidLine = (line) => !!line.parsed;

const parseLines = (macro) => {
  const tokenLines = macro.lines.map(parseLine);

  return {
    ...macro,
    tokenLines,
    isAmbiguous: tokenLines.some(isAmbiguousLine),
    isValid: tokenLines.every(isValidLine)
  };
};

module.exports = function tokenize(macros) {
  const tokenized = macros.map(parseLines);

  return {
    macros: tokenized,
    htmlReport: render(tokenized)
  };
};
