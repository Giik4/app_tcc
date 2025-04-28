import {
  getDistance,
  getRhumbLineBearing,
  computeDestinationPoint,
} from 'geolib';
import {polygon, bbox, booleanPointInPolygon} from '@turf/turf';

/**
 * Gera uma grade Boustrophedon (vaivém) dentro de um polígono arbitrário.
 * @param {Array} polygonVertices - Lista de vértices [{ latitude, longitude }]
 * @returns {Array} Lista de coordenadas no padrão Boustrophedon
 */
export const createBoustrophedonGrid = polygonVertices => {
  if (polygonVertices.length < 3) return [];

  // **Fechar o polígono** se necessário
  const closedPolygon = [...polygonVertices];
  if (
    closedPolygon[0].latitude !==
      closedPolygon[closedPolygon.length - 1].latitude ||
    closedPolygon[0].longitude !==
      closedPolygon[closedPolygon.length - 1].longitude
  ) {
    closedPolygon.push(closedPolygon[0]);
  }

  // Criar um polígono Turf.js para garantir precisão nos cálculos
  const turfPolygon = polygon([
    closedPolygon.map(p => [p.longitude, p.latitude]),
  ]);

  // Definir bounding box para limitar a grade
  const [minLng, minLat, maxLng, maxLat] = bbox(turfPolygon);

  // Determinar a orientação da grade baseado no primeiro lado do polígono
  const bearing = getRhumbLineBearing(closedPolygon[0], closedPolygon[1]);

  // Parâmetros de geração da grade
  const stepSize = 10; // Distância entre pontos (em metros)
  const overlap = 0.2; // Percentual de sobreposição entre células
  const stepSizeOverlap = stepSize * (1 - overlap);

  let grid = [];
  let moveRight = true;

  // Ponto inicial no canto superior esquerdo da bounding box
  let startPoint = {latitude: maxLat, longitude: minLng};

  while (startPoint.latitude > minLat) {
    let row = [];
    let currentPoint = {...startPoint};

    while (currentPoint.longitude < maxLng) {
      // Rotacionar os pontos para alinhar a grade ao polígono
      const rotatedPoint = computeDestinationPoint(currentPoint, 0, bearing);

      // **Converter corretamente para `{ latitude, longitude }`**
      const formattedPoint = {
        latitude: rotatedPoint.latitude,
        longitude: rotatedPoint.longitude,
      };

      // Adiciona somente pontos dentro do polígono
      if (
        booleanPointInPolygon(
          [formattedPoint.longitude, formattedPoint.latitude],
          turfPolygon,
        )
      ) {
        row.push(formattedPoint);
      }

      currentPoint = computeDestinationPoint(currentPoint, stepSize, 90); // Move para o leste (90°)
    }

    if (!moveRight) row.reverse(); // Alternar direção para padrão "vaivém"
    moveRight = !moveRight;

    grid = grid.concat(row);

    // Move para a próxima linha no sul
    startPoint = computeDestinationPoint(startPoint, stepSizeOverlap, 180);
  }

  return grid;
};
