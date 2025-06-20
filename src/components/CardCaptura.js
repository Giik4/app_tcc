import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';

const CardCaptura = ({onPress, image, latitude, longitude, altitude}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={st.card}>
        <Image source={image} style={st.image} resizeMode="contain" />
        <Text style={st.textoCoord}>
          {latitude}, {longitude}, {altitude.toFixed(2)} m
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const st = StyleSheet.create({
  card: {
    width: '100%',
    height: 75,
    paddingHorizontal: 5,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#C4C4C4',
    justifyContent: 'start',
    alignItems: 'center',
    gap: 20,
  },
  image: {
    width: 55,
  },
  textoCoord: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: 'black',
  },
});

export default CardCaptura;
