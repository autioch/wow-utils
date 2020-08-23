/* https://en.wikipedia.org/wiki/DBSCAN */

/* eslint-disable no-plusplus */
function calculateReplaceCost(elementA, elementB) {
  if (elementA === elementB) { // null
    return 0;
  }
  if (elementA === null || elementB === null || elementA.type !== elementB.type) {
    return 2;
  }

  return elementA.value === elementB.value ? 0 : 1;
}

function levenDistance(tokensA, tokensB) {
  const lengthA = tokensA.representation.length;
  const lengthB = tokensB.representation.length;

  if (lengthA === 0) {
    return lengthB;
  }

  if (lengthB === 0) {
    return lengthA;
  }

  const matrix = [];

  for (let i = 0; i <= lengthB; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= lengthA; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i < lengthB; i++) {
    for (let j = 1; j < lengthA; j++) {
      const replaceCost = calculateReplaceCost(tokensB[i], tokensA[j]);
      const substitue = matrix[i - 1][j - 1] + replaceCost;
      const insert = matrix[i][j - 1] + 1;
      const remove = matrix[i - 1][j] + 1;

      matrix[i][j] = Math.min(substitue, insert, remove);
    }
  }

  return matrix[lengthB - 1][lengthA - 1];
}

const MAX_DISTANCE = 2;
const MIN_NEARBY = 1;
const NOISE_ID = 'Noise';

const addRepresentation = (macro) => ({
  ...macro,
  representation: macro.tokenLines.flatMap(({ tokens }) => tokens)
});

module.exports = function markSimilar(tokenized) {
  const macros = tokenized.map(addRepresentation).filter(({ representation }) => representation.length > 0);

  let nextGroupId = 0;

  const findNearby = (macro) => macros.filter((potentialNeighour) => levenDistance(macro, potentialNeighour) <= MAX_DISTANCE);

  function assignGroup(similarityGroup) {
    return function assignGroupToMacro(macro) {
      if (macro.similarityGroup === NOISE_ID) {
        macro.similarityGroup = similarityGroup;
      }

      if (macro.similarityGroup) {
        return;
      }

      macro.similarityGroup = similarityGroup;

      /* Grow the cluster */
      // const nextNeighbours = findNearby(macro);
      //
      // if (nextNeighbours.length >= MIN_NEARBY) {
      //   nextNeighbours.forEach(assignGroupToMacro);
      // }
    };
  }

  macros.forEach((macro) => {
    if (macro.similarityGroup) {
      return;
    }

    const nearbyMacros = findNearby(macro);

    if (nearbyMacros.length < MIN_NEARBY) {
      macro.similarityGroup = NOISE_ID;

      return;
    }

    nextGroupId++;
    macro.similarityGroup = nextGroupId;

    nearbyMacros.forEach(assignGroup(nextGroupId));
  });

  return macros.map(({ representation, ...macro }) => macro); // eslint-disable-line no-unused-vars
};
