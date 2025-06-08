import {computeDestinationPoint, isPointInPolygon} from 'geolib';

export const createBoustrophedonGrid = (polygonVertices, stepSize, overlap) => {
  if (polygonVertices.length < 3) return []; // Precisa de pelo menos 3 pontos para formar um polígono

  // Caixa delimitadora do polígono (bounding box)
  const minLat = Math.min(...polygonVertices.map(p => p.latitude));
  const maxLat = Math.max(...polygonVertices.map(p => p.latitude));
  const minLng = Math.min(...polygonVertices.map(p => p.longitude));
  const maxLng = Math.max(...polygonVertices.map(p => p.longitude));

  // Parâmetros de varredura
  const stepSizeOverlap = stepSize * (1 - overlap);

  let grid = [];
  let moveRight = true;

  // Começa no canto superior esquerdo
  let startPoint = {latitude: maxLat, longitude: minLng};

  while (startPoint.latitude > minLat) {
    let row = [];
    let currentPoint = {...startPoint};

    while (currentPoint.longitude < maxLng) {
      // Adiciona somente os pontos dentro do polígono
      if (isPointInPolygon(currentPoint, polygonVertices)) {
        row.push(currentPoint);
      }
      currentPoint = computeDestinationPoint(currentPoint, stepSize, 90); // 90° - Leste
    }

    if (!moveRight) row.reverse(); // Inverte direção a cada linha
    moveRight = !moveRight;

    grid = grid.concat(row);

    // Move para a próxima linha para o sul
    startPoint = computeDestinationPoint(startPoint, stepSizeOverlap, 180); // 180° - Sul
  }

  return grid;
};
