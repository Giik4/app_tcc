import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker, Polygon, Polyline} from 'react-native-maps';
import {createBoustrophedonGrid} from '../geoUtils/boustrophedon';

const App = () => {
  // Exemplo de polígono (não precisa ser um retângulo!)
  const polygon = [
    {latitude: -23.55052, longitude: -46.633308},
    {latitude: -23.5505, longitude: -46.6335},
    {latitude: -23.5504, longitude: -46.6336},
    {latitude: -23.5503, longitude: -46.6334},
    {latitude: -23.55042, longitude: -46.633308},
  ];

  const gridPoints = createBoustrophedonGrid(polygon);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        {/* Desenha o polígono */}
        <Polygon
          coordinates={polygon}
          fillColor="rgba(0, 0, 255, 0.2)"
          strokeColor="blue"
        />

        {/* Adiciona os pontos da grade */}
        {gridPoints.map((point, index) => (
          <Marker key={index} coordinate={point} />
        ))}

        {/* Desenha a linha da grade Boustrophedon */}
        <Polyline coordinates={gridPoints} strokeWidth={2} strokeColor="blue" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {flex: 1},
});

export default App;
