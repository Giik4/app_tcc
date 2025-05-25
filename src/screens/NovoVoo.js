import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import api from '../services/Api';
import MapView, {Polygon, Marker, Polyline} from 'react-native-maps';
import {createBoustrophedonGrid} from '../geoUtils/boustrophedon';
import {calculateConvexHull} from '../geoUtils/convexHull';
import {calculateTotalDistance} from '../geoUtils/calculateTotalDistance';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const NovoVoo = () => {
  const route = useRoute();
  const item = route.params;

  const navigation = useNavigation();
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

  const sair = () => {
    navigation.goBack();
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

      const flightResponse = await api.post(
        `/plantations/${item.id}/flights`,
        {
          aircraft: 'Mavic Pro',
          flight_time: '00:45:30',
          distance: distance,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Voo criado:', flightResponse.data);

      const flightId = flightResponse.data.id;

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
          alert('Waypoints cadastrados com sucesso:', waypointsResponse.data);
          clearPoints();
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

      <View style={styles.containerButtons}>
        <TouchableOpacity onPress={sair}>
          <Icon name="exit-to-app" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.clearButton, {backgroundColor: '#FF8383'}]}
          onPress={clearPoints}>
          <Text style={styles.clearButtonText}>Limpar Pontos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.clearButton, {backgroundColor: '#F6C500'}]}
          onPress={generatePath}>
          <Text style={styles.clearButtonText}>Gerar Caminho</Text>
        </TouchableOpacity>
      </View>

      {gridPoints.length > 0 && (
        <View style={styles.containerRegister}>
          <TouchableOpacity
            style={[
              styles.clearButton,
              {backgroundColor: 'black', width: '100%'},
            ]}
            onPress={() => registrarVoo()}>
            <Text style={styles.clearButtonText}>Enviar Caminho</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  clearButton: {
    padding: 10,
    borderRadius: 5,
  },
  generateButton: {
    bottom: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },

  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 15,
  },

  containerButtons: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.08,
    width: '100%',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  containerRegister: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 30,
    paddingHorizontal: '34%',
    alignItems: 'center',
  },
});

export default NovoVoo;
