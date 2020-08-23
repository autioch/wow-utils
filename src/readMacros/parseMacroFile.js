const parseMacro = require('./parseMacro');

const LINE_SEP = '\n';
const MACRO_END = 'END';

const trim = (text) => text.trim();
const getLines = (text) => text.trim().split(LINE_SEP).map(trim);
const hasAnyLines = (lines) => lines.join('').length > 0;

/**
 * Extracts macros from a text content of a macro file.
 * @param  {String} fileTextContent Contents of a macro file.
 * @return {Array}                  Array of parsed macros.
 */
module.exports = function parseMacroFile(fileTextContent) {
  return fileTextContent.split(MACRO_END).map(getLines).filter(hasAnyLines).map(parseMacro);
};
