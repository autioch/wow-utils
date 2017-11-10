import leven from 'leven';

/* eslint no-magic-numbers: 0 */
export default function markClusters(points, epsilon = 30, minPts = 3) {
  let clusterId = 0;

  function findNeighbours(masterPoint) {
    return points.filter((point) => {
      if (masterPoint === point) {
        return false;
      }
      const distance = leven(masterPoint.content.join('\n'), point.content.join('\n'));

      return distance <= epsilon;
    });
  }

  points.forEach((point) => {
    if (point.clusterId) {
      return;
    }

    const neighbours = findNeighbours(point);

    if (neighbours.length < minPts) {
      point.clusterId = 'Noise';

      return;
    }

    clusterId++; // eslint-disable-line no-plusplus
    point.clusterId = clusterId.toString();

    neighbours.forEach((neighbour) => {
      if (neighbour.clusterId === 'Noise') {
        neighbour.clusterId = clusterId.toString();
      }
      if (neighbour.clusterId) {
        return;
      }
      neighbour.clusterId = clusterId.toString();

      const nextNeighbours = findNeighbours(neighbour);

      if (neighbours.length >= minPts) {
        neighbours.push(...nextNeighbours);
      }
    });
  });

  return points;
}
