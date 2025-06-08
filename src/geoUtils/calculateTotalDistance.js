import {getDistance} from 'geolib';

export const calculateTotalDistance = grid => {
  let totalDistance = 0;

  for (let i = 0; i < grid.length - 1; i++) {
    const pointA = grid[i];
    const pointB = grid[i + 1];

    totalDistance += getDistance(
      {latitude: pointA.latitude, longitude: pointA.longitude},
      {latitude: pointB.latitude, longitude: pointB.longitude},
    );
  }

  return totalDistance;
};
