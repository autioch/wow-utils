/* eslint-disable no-plusplus */
const { uniqBy } = require('lodash');

const pickTokenLines = ({ tokenLines }) => tokenLines;
const pickLine = ({ line }) => line;
const sortByLabel = (a, b) => a.label.localeCompare(b.label);
const sortText = (a, b) => a.localeCompare(b);

function getTokenSummary(allTokenLines) {
  const lines = uniqBy(allTokenLines, pickLine);
  const dict = lines.reduce((obj, line) => {
    line.tokens.forEach((token) => {
      if (obj[token.type]) {
        obj[token.type].push(token.value);
      } else {
        obj[token.type] = [token.value];
      }
    });

    return obj;
  }, {});

  return Object.entries(dict).map(([label, values]) => ({
    label,
    value: [...new Set(values)].sort(sortText).join(', ')
  })).sort(sortByLabel);
}

function setDict(dict, key) {
  if (key.length > 0) {
    if (!dict[key]) {
      dict[key] = 0;
    }

    dict[key]++;
  }

  return dict;
}

function summary(entryDictionary, total, label) {
  const allOccurences = Object.values(entryDictionary);
  const max = Math.max(...allOccurences);
  const maxEntries = Math.floor(total * 0.1);

  // const minOccurence = total * 0.005;
  const minOccurence = Math.floor(max * 0.05);

  const commonEntries = Object.entries(entryDictionary)
    .filter((entry) => entry[1] > minOccurence)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxEntries)
    .map(([label2, value]) => `${label2} (${value})`).join(', ');

  return [{
    label: `total ${label}`,
    value: total
  }, {
    label: `common ${label}`,
    value: commonEntries
  }];
}

module.exports = function summarize(tagged) {
  const allTokenLines = tagged.flatMap(pickTokenLines);
  const allTokens = allTokenLines.flatMap(({ tokens }) => tokens);

  const lineDict = allTokenLines.reduce((obj, { line }) => setDict(obj, line), {});
  const wordDict = allTokens.reduce((obj, { value }) => setDict(obj, value), {});

  return [
    ...summary(lineDict, allTokenLines.length, 'lines'),
    ...summary(wordDict, allTokens.length, 'words'),
    ...getTokenSummary(allTokenLines)
  ];
};
