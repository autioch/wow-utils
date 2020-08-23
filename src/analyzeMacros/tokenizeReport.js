const { flattenDeep, uniq, uniqBy } = require('lodash');

const styles = `
body {
  margin: 0;
  padding: 0;
  font-family: Consolas;
  font-size: 12px;
}

.App {
  width: 100%;
}

.group__header {
  font-size: 1.2em;
  padding: 1em 0;
  font-weight: bold;
  text-align: center;
}

.summary__row {
  display: flex;
  width: 100%;
  flex: auto;
  margin-bottom: 1em;
}

.summary__row:hover {
  background-color: #eee;
}

.summary__type {
  width: 8em;
  flex: none;
}

.line {
  display: flex;
  margin-bottom: .5em;
}

.line:hover {
  background-color: #eee;
}

.line__original {
  width: 25%;
  overflow: hidden;
  flex: none;
  word-break: break-all;
  word-break: break-word;
  padding: .25em;
}

.line__grammar {
  width: 4em;
  flex: none;
}

.line__results {
  /* display: flex; */
  /* width: 75%; */
  word-break: break-all;
  /* flex-wrap: wrap; */
  flex-grow: 1;
  padding: .25em;
}


/*.token:not(:last-child)::after {content:'  ';display:inline-block;width:.5em;height:.5em;background-color:#d8d8d8} */
.token--command,
.token--chat,
.token--emote,
.token--channel,
.token--tooltip,
.token--server {color: #a00}

.token--linkProfession,
.token--linkSpell,
.token--linkEnchant,
.token--linkItem {color:#b0b}

.token--spellLevel,
.token--spellMode,
.token--spellName {color: #00a}

.token--modifier {color: #dd0}

.token--numberRange,
.token--numberDecimal,
.token--number {color: #0a0}

.token--at,
.token--colon,
.token--comma,
.token--equal,
.token--exclamation,
.token--bracketSquareClose,
.token--bracketSquareOpen,
.token--semicolon,
.token--slash,
.token--dash {color: #aaa}

.token--space {color: #ccc;margin: 0 .25em;}
.token--unknown {background-color: #fa0}

.token--id {color: #d43}
.token--string {color: #0a0}
.token--keyword {color:#b0f}
.token--binop {color:#5bc}
`;

const pickTokenLines = ({ tokenLines }) => tokenLines;
const pickLine = ({ line }) => line;
const sortByLine = (a, b) => a.line.localeCompare(b.line);
const sortByType = (a, b) => a.type.localeCompare(b.type);
const sortText = (a, b) => a.localeCompare(b);

const renderSummaryItem = ({ type, values }) => `
  <div class="summary__row">
    <div class="summary__type">${type}</div>
    <div class="summary__texts">${values.join(', ')}</div>
  </div>
`;

const renderToken = ({ type, value }) => `<span class="token token--${type}" title="${type}">${type === 'space' ? '*' : value}</span>`;

const renderParsed = ({ line, tokens, grammar }) => `
  <div class="line">
    <div class="line__original">${line}</div>
    <div class="line__grammar">${grammar}</div>
    <div class="line__results">
      ${tokens.map(renderToken).join('\n')}
    </div>
  </div>
`;

const renderFailed = ({ line, message, grammar }) => `
  <div class="line">
    <div class="line__original">${line}</div>
    <div class="line__grammar">${grammar}</div>
    ${message}
  </div>
`;

const renderAmbiguous = ({ line, grammar, tokens = [] }) => `
  <div class="line">
    <div class="line__original">${line}</div>
    <div class="line__grammar">${grammar}</div>
    <div class="line__results">${JSON.stringify(tokens, null, '  ')}</div>
  </div>
`;

const GRAMMARS = {
  '': true,
  macro: true,
  lua: true,
  generic: true
};

function getSummary(lines) {
  const dict = lines.reduce((obj, lineInfo) => {
    flattenDeep(lineInfo.tokens).forEach((token) => {
      if (obj[token.type]) {
        obj[token.type].push(token.value);
      } else {
        obj[token.type] = [token.value];
      }
    });

    return obj;
  }, {});

  return Object.entries(dict).map(([type, values]) => ({
    type,
    values: uniq(values).sort(sortText)
  })).sort(sortByType);
}

module.exports = function tokenizeReport(tokenized) {
  const lines = uniqBy(tokenized.flatMap(pickTokenLines), pickLine).sort(sortByLine);
  const summary = getSummary(lines);
  const parsed = lines.filter((line) => !!GRAMMARS[line.grammar] && line.parsed && !line.ambiguous);
  const ambiguous = lines.filter((line) => !!GRAMMARS[line.grammar] && line.parsed && line.ambiguous);
  const failed = lines.filter((line) => !!GRAMMARS[line.grammar] && !line.parsed);

  return `<!DOCTYPE html>i<html lang="en">
  <head>
    <style type="text/css">${styles}</style>
  </head>
  <body>
    <div class="App">
      <div class="group__header">Summary</div>
      <div class="summary">${summary.map(renderSummaryItem).join('\n')}</div>
      <div class="group__header">Ambiguous (${ambiguous.length}/${lines.length})</div>
      ${ambiguous.map(renderAmbiguous).join('\n')}
      <div class="group__header">Failed (${failed.length}/${lines.length})</div>
      ${failed.map(renderFailed).join('\n')}
      <div class="group__header">Parsed (${parsed.length}/${lines.length})</div>
      ${parsed.map(renderParsed).join('\n')}
    </div>
  </body>
  </html>`;
};
