module.exports = function findCommonLines(macros) {
  const lines = {};

  macros.forEach((macro) => {
    macro.content.filter((line) => line.length > 0)
      .forEach((line) => {
        if (!lines[line]) {
          lines[line] = 0;
        }

        lines[line]++; // eslint-disable-line no-plusplus
      });
  });

  return Object.entries(lines).filter((entry) => entry[1] > 2).sort((entryA, entryB) => entryB[1] - entryA[1]);
};
