const idGenerator = require('./idGenerator');
const nearbyFinder = require('./nearbyFinder');
const assignMarkers = require('./assignMarkers');
const nearbyAdder = require('./nearbyAdder');
const { markAsNoise } = require('./noise');

const MAX_DISTANCE = 30;
const MIN_NEARBY = 1;

module.exports = function markClusters(points, distanceFn, maxDistance = MAX_DISTANCE, minNearby = MIN_NEARBY) {
  // const generateId = idGenerator();
  const findNearby = nearbyFinder(maxDistance, points, distanceFn);
  const addNearby = nearbyAdder(findNearby, minNearby);

  assignMarkers(points);

  points.forEach((point) => {
    if (point.clusterId) {
      return;
    }

    const nearby = findNearby(point);

    if (nearby.length < minNearby) {
      markAsNoise(point);

      return;
    }

    point.clusterId = idGenerator();

    if (nearby.length >= minNearby) {
      addNearby(nearby, point.clusterId);
    }
  });

  return points;
};
