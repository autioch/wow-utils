/* eslint-disable no-plusplus */
const { flattenDeep } = require('lodash');

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
  const lengthA = tokensA.length;
  const lengthB = tokensB.length;

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

const isCloseEnough = (macro1, macro2) => levenDistance(macro1.representation, macro2.representation) <= MAX_DISTANCE;

/* https://en.wikipedia.org/wiki/DBSCAN */

function markClusters(macros) {
  let nextClusterId = 0;

  const findNearby = (macro) => macros.filter((potentialNeighour) => isCloseEnough(macro, potentialNeighour));

  function assignCluster(clusterId) {
    return function assignClusterToMacro(macro) {
      if (macro.clusterId === NOISE_ID) {
        macro.clusterId = clusterId;
      }

      if (macro.clusterId) {
        return;
      }

      macro.clusterId = clusterId;

      /* Grow the cluster */
      // const nextNeighbours = findNearby(macro);
      //
      // if (nextNeighbours.length >= MIN_NEARBY) {
      //   nextNeighbours.forEach(assignClusterToMacro);
      // }
    };
  }

  macros.forEach((macro) => {
    if (macro.clusterId) {
      return;
    }

    const nearbyMacros = findNearby(macro);

    if (nearbyMacros.length < MIN_NEARBY) {
      macro.clusterId = NOISE_ID;

      return;
    }

    nextClusterId++;
    macro.clusterId = nextClusterId;

    nearbyMacros.forEach(assignCluster(nextClusterId));
  });

  return macros;
}

const isClusterable = ({ representation }) => representation.length > 0;
const addRepresentation = (macro) => ({
  ...macro,
  representation: flattenDeep(macro.lines)
});

module.exports = function groupSimilarTokenized(tokanized) {
  const preparedMacros = tokanized.map(addRepresentation).filter(isClusterable);

  return markClusters(preparedMacros);
};
