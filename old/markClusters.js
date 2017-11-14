/* eslint no-underscore-dangle: 0 */
// const leven = require('leven');

// function defaultDistanceFunction(pointA, pointB) {
//   return leven(pointA.content.join('\n'), pointB.content.join('\n'));
// }

function * idGenerator() {
  let nextId = 0;

  while (true) {
    nextId++; // eslint-disable-line no-plusplus
    yield nextId.toString();
  }
}

function neighbourFinder(maxDistance, points, distanceFn) {
  const cache = {};

  return function findNeighbours(mainPoint) {
    return points.filter((point) => {
      if (mainPoint === point) {
        return false;
      }
      const mainIndex = mainPoint.__arrayIndex;
      const pointIndex = point.__arrayIndex;
      const cacheIndex = mainIndex > pointIndex ? `${mainIndex}+${pointIndex}` : `${pointIndex}+${mainIndex}`;

      if (cache[cacheIndex] === undefined) { // eslint-disable-line no-undefined
        cache[cacheIndex] = distanceFn(mainPoint, point) <= maxDistance;
      }

      return cache[cacheIndex];
    });
  };
}

function createIds(points) {
  points.forEach((point, index) => {
    point.__arrayIndex = index;
  });
}

/* eslint no-magic-numbers: 0 */
export default function markClusters(points, maxDistance = 30, minNeighbours = 3, distanceFn) {
  createIds(points);

  const generateId = idGenerator();
  const findNeighbours = neighbourFinder(maxDistance, points, distanceFn);

  points.forEach((point) => {
    if (point.clusterId) {
      return;
    }

    const neighbours = findNeighbours(point);

    if (neighbours.length < minNeighbours) {
      point.clusterId = 'Noise';

      return;
    }

    point.clusterId = generateId();

    neighbours.forEach((neighbour) => {
      if (neighbour.clusterId === 'Noise') {
        neighbour.clusterId = point.clusterId;
      }
      if (neighbour.clusterId) {
        return;
      }
      neighbour.clusterId = point.clusterId;

      const nextNeighbours = findNeighbours(neighbour);

      if (neighbours.length >= minNeighbours) {
        neighbours.push(...nextNeighbours);
      }
    });
  });

  return points;
}
