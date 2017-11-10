module.exports = function findCommonWords(macros) {
  const words = {};

  macros.forEach((macro) => {
    macro.content.join(' ').split(' ').filter((word) => word.length > 0)
      .forEach((word) => {
        if (!words[word]) {
          words[word] = 0;
        }

        words[word]++; // eslint-disable-line no-plusplus
      });
  });

  return Object.entries(words).filter((entry) => entry[1] > 2).sort((entryA, entryB) => entryB[1] - entryA[1]);
};
