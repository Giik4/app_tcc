import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import api from '../services/Api';
import MapView, {Polygon, Marker, Polyline} from 'react-native-maps';
import {createBoustrophedonGrid} from '../geoUtils/boustrophedon';
import {calculateConvexHull} from '../geoUtils/convexHull';
import {calculateTotalDistance} from '../geoUtils/calculateTotalDistance';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const NovoVoo = () => {
  const route = useRoute();
  const item = route.params;
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [selectedVertexIndex, setSelectedVertexIndex] = useState(null);
  const [gridPoints, setGridPoints] = useState([]);
  const token = useSelector(state => state.auth.token);

  const stepSize = 20; // Distância entre linhas em metros
  const overlap = 0.1; // Sobreposição entre linhas
  const altura = stepSize / (1 - overlap);

  const handleMapPress = event => {
    const {coordinate} = event.nativeEvent;
    setPolygonCoordinates([...polygonCoordinates, coordinate]);
  };

  const clearPoints = () => {
    setPolygonCoordinates([]);
    setGridPoints([]);
  };

  const generatePath = () => {
    const convexHull = calculateConvexHull(polygonCoordinates);

    setGridPoints(createBoustrophedonGrid(convexHull, stepSize, overlap));
  };

  const registrarVoo = async () => {
    try {
      const distance = Math.round(calculateTotalDistance(gridPoints)); // em metros

      const pointsForApi = gridPoints.map((p, index) => ({
        latitude: p.latitude,
        longitude: p.longitude,
        altitude: altura,
        number: index,
      }));

      // Criando o voo
      const flightResponse = await api.post(
        `/plantations/${item.id}/flights`,
        {
          aircraft: 'Mavic Pro',
          flight_time: '00:45:30', // certifique-se do formato aceito pela API
          distance: distance,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Voo criado:', flightResponse.data);

      // Agora, após o voo ser criado, tentamos cadastrar os waypoints.
      const flightId = flightResponse.data.id; // id do voo criado

      // Envia os waypoints
      return api
        .post(
          `/plantations/${item.id}/flights/${flightId}/waypoints/batch`,
          {waypoints: pointsForApi},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(waypointsResponse => {
          console.log(
            'Waypoints cadastrados com sucesso:',
            waypointsResponse.data,
          );
        })
        .catch(error => {
          console.error(
            'Erro ao cadastrar waypoints:',
            error.response?.data || error.message,
          );
        });
    } catch (error) {
      console.error(
        'Erro ao criar voo:',
        error.response?.data || error.message,
      );
    }
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

        {polygonCoordinates.length > 2 && (
          <Polygon
            coordinates={calculateConvexHull(polygonCoordinates)}
            strokeColor="#000"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={2}
          />
        )}

        {gridPoints.map((point, index) => (
          <Marker key={index} coordinate={point} />
        ))}
        <Polyline coordinates={gridPoints} strokeWidth={2} strokeColor="blue" />
      </MapView>

      <TouchableOpacity style={styles.clearButton} onPress={clearPoints}>
        <Text style={styles.clearButtonText}>Limpar Pontos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.generateButton} onPress={generatePath}>
        <Text style={styles.clearButtonText}>Gerar Caminho</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.clearButton, {right: 10}]}
        onPress={() => registrarVoo()}>
        <Text style={styles.clearButtonText}>Enviar Caminho</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  clearButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'right',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  generateButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },

  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  pickerContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 5,
    width: 150,
  },
  picker: {
    color: 'white',
    height: 40,
  },
});

export default NovoVoo;
