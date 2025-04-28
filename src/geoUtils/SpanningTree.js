import {isPointInPolygon} from 'geolib';

export const createStcGrid = (polygon, cellSize = 0.0001) => {
  if (polygon.length < 3) return [];

  // Caixa delimitadora do polígono (bounding box)
  const minLat = Math.min(...polygon.map(p => p.latitude));
  const maxLat = Math.max(...polygon.map(p => p.latitude));
  const minLon = Math.min(...polygon.map(p => p.longitude));
  const maxLon = Math.max(...polygon.map(p => p.longitude));

  // Gera todas as células possíveis dentro da caixa delimitadora
  const cells = [];
  for (let lat = minLat; lat <= maxLat; lat += cellSize) {
    for (let lon = minLon; lon <= maxLon; lon += cellSize) {
      const center = {
        latitude: lat + cellSize / 2,
        longitude: lon + cellSize / 2,
      };
      if (isPointInPolygon(center, polygon)) {
        cells.push({
          latStart: lat,
          lonStart: lon,
          center: center,
        });
      }
    }
  }

  if (cells.length === 0) return [];

  // Cria um mapa para busca rápida de células vizinhas
  const cellMap = new Map();
  cells.forEach((cell, index) => {
    cellMap.set(`${cell.latStart}_${cell.lonStart}`, index);
  });

  // Constrói a lista de adjacências
  const adjacencyList = Array(cells.length)
    .fill()
    .map(() => []);
  cells.forEach((cell, index) => {
    const {latStart, lonStart} = cell;
    const neighbors = [
      `${latStart + cellSize}_${lonStart}`, // norte
      `${latStart - cellSize}_${lonStart}`, // sul
      `${latStart}_${lonStart + cellSize}`, // leste
      `${latStart}_${lonStart - cellSize}`, // oeste
    ];
    neighbors.forEach(key => {
      if (cellMap.has(key)) {
        const neighborIndex = cellMap.get(key);
        adjacencyList[index].push(neighborIndex);
      }
    });
  });

  // Algoritmo de Prim para calcular a MST
  const parent = new Array(cells.length).fill(-1);
  const key = new Array(cells.length).fill(Infinity);
  const inMST = new Array(cells.length).fill(false);

  key[0] = 0;

  for (let i = 0; i < cells.length - 1; i++) {
    let u = -1;
    for (let j = 0; j < cells.length; j++) {
      if (!inMST[j] && (u === -1 || key[j] < key[u])) {
        u = j;
      }
    }

    if (u === -1) break;
    inMST[u] = true;

    adjacencyList[u].forEach(v => {
      const distance = Math.sqrt(
        Math.pow(cells[u].center.latitude - cells[v].center.latitude, 2) +
          Math.pow(cells[u].center.longitude - cells[v].center.longitude, 2),
      );
      if (!inMST[v] && distance < key[v]) {
        parent[v] = u;
        key[v] = distance;
      }
    });
  }

  // Busca em profundidade para gerar a árvore
  const visited = new Array(cells.length).fill(false);
  const path = [];

  const dfs = u => {
    visited[u] = true;
    path.push(cells[u].center);
    for (let v = 0; v < cells.length; v++) {
      if (parent[v] === u && !visited[v]) {
        dfs(v);
        path.push(cells[u].center); // Backtrack
      }
    }
  };

  dfs(0);

  return path;
};
