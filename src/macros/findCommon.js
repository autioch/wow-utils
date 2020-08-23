/* eslint no-plusplus: 0 */
/* eslint no-magic-numbers: 0 */
/* eslint id-length: 0 */
function setDict(dict, key) {
  if (key.length > 0) {
    if (!dict[key]) {
      dict[key] = 0;
    }

    dict[key]++;
  }
}

function pickMostCommon(entryDictionary, total, max) {
  const maxEntries = Math.floor(total * 0.1);

  // const minOccurence = total * 0.005;
  const minOccurence = Math.floor(max * 0.05);

  return Object.entries(entryDictionary)
    .filter((entry) => entry[1] > minOccurence)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxEntries)
    .map(([entry, occurences]) => ({
      entry,
      occurences
    }));
}

function summary(entryDictionary, total) {
  const allOccurences = Object.values(entryDictionary);
  const max = Math.max(...allOccurences);

  return {
    max,
    total,
    variety: allOccurences.length,
    commonEntries: pickMostCommon(entryDictionary, total, max)
  };
}

module.exports = function findCommon(minifiedMacros) {
  const lineDict = {};
  const wordDict = {};

  let lineCount = 0;

  let wordCount = 0;

  minifiedMacros.forEach((macro) => {
    macro.content.forEach((line) => {
      lineCount++;
      setDict(lineDict, line);
      line.split(' ').forEach((word) => {
        setDict(wordDict, word);
        wordCount++;
      });
    });
  });

  return {
    lines: summary(lineDict, lineCount),
    words: summary(wordDict, wordCount)
  };
};
