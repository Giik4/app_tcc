//sem função de polígono não intersecante

import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import MapView, {Polygon, Marker, Polyline} from 'react-native-maps';
import {createBoustrophedonGrid} from '../geoUtils/Boustrophedon';
import {polygon} from '@turf/turf';

const NovoVoo = () => {
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [selectedVertexIndex, setSelectedVertexIndex] = useState(null);
  const [gridPoints, setGridPoints] = useState([]);

  // Adiciona um novo ponto ao polígono ao clicar no mapa
  const handleMapPress = event => {
    const {coordinate} = event.nativeEvent;
    setPolygonCoordinates([...polygonCoordinates, coordinate]);
  };

  // Limpa os pontos e a grade
  const clearPoints = () => {
    setPolygonCoordinates([]);
    setGridPoints([]);
  };

  // Fecha o polígono (garantindo que o primeiro ponto se repete no final)
  const closePolygon = points => {
    if (points.length < 3) return points; // Não pode fechar com menos de 3 pontos
    const first = points[0];
    const last = points[points.length - 1];

    // Se o primeiro e último ponto forem diferentes, fechamos o polígono
    if (
      first.latitude !== last.latitude ||
      first.longitude !== last.longitude
    ) {
      return [...points, first];
    }
    return points;
  };

  // Gera a grade Boustrophedon ao clicar no botão
  const generatePath = () => {
    const closedPolygon = closePolygon(polygonCoordinates);
    setGridPoints(createBoustrophedonGrid(closedPolygon));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -15.7942,
          longitude: -47.8825,
          latitudeDelta: 15,
          longitudeDelta: 15,
        }}
        mapType="hybrid"
        onPress={handleMapPress}>
        {/* Exibir marcadores dos vértices */}
        {polygonCoordinates.map((coordinate, index) => (
          <Marker
            key={index}
            coordinate={coordinate}
            draggable
            pinColor={selectedVertexIndex === index ? 'blue' : 'red'}
            onDragStart={() => setSelectedVertexIndex(index)}
            onDragEnd={e => {
              const newCoordinate = e.nativeEvent.coordinate;
              const newPolygonCoordinates = [...polygonCoordinates];
              newPolygonCoordinates[index] = newCoordinate;
              setPolygonCoordinates(newPolygonCoordinates);
              setSelectedVertexIndex(null);
            }}
          />
        ))}

        {/* Exibir o polígono desenhado */}
        {polygonCoordinates.length > 2 && (
          <Polygon
            coordinates={closePolygon(polygonCoordinates)}
            strokeColor="#000"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={2}
          />
        )}

        {/* Exibir a grade gerada */}
        {gridPoints.map((point, index) => (
          <Marker key={index} coordinate={point} />
        ))}

        {/* Exibir a linha da grade */}
        <Polyline coordinates={gridPoints} strokeWidth={2} strokeColor="blue" />
      </MapView>

      {/* Botão para limpar os pontos */}
      <TouchableOpacity style={styles.clearButton} onPress={clearPoints}>
        <Text style={styles.clearButtonText}>Limpar Pontos</Text>
      </TouchableOpacity>

      {/* Botão para gerar o caminho */}
      <TouchableOpacity style={styles.generateButton} onPress={generatePath}>
        <Text style={styles.clearButtonText}>Gerar Caminho</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {flex: 1},
  clearButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  generateButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NovoVoo;
