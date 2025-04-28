import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import MapView, {Polygon, Marker, Polyline} from 'react-native-maps';
import {createBoustrophedonGrid} from '../geoUtils/Boustrophedon';
import {calculateConvexHull} from '../geoUtils/ConvexHull';
import {createStcGrid} from '../geoUtils/SpanningTree';

const NovoVoo = () => {
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [selectedVertexIndex, setSelectedVertexIndex] = useState(null);
  const [gridPoints, setGridPoints] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('stc');

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
    let grid;

    if (selectedMethod === 'boustrophedon') {
      grid = createBoustrophedonGrid(convexHull);
    } else {
      grid = createStcGrid(convexHull);
    }

    setGridPoints(grid);
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

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMethod}
          onValueChange={itemValue => setSelectedMethod(itemValue)}
          style={styles.picker}
          dropdownIconColor="white">
          <Picker.Item label="STC" value="stc" />
          <Picker.Item label="Boustrophedon" value="boustrophedon" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.clearButton} onPress={clearPoints}>
        <Text style={styles.clearButtonText}>Limpar Pontos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.generateButton} onPress={generatePath}>
        <Text style={styles.clearButtonText}>Gerar Caminho</Text>
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
