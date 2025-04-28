import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';

const CardPlantacao = ({onPress, nome, latitude, longitude}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={st.card}>
        {/* <Image source={image} style={st.image} resizeMode='contain'/> */}
        <View>
          <Text style={st.tituloCard}>{nome}</Text>
          <Text style={st.textoCoord}>
            {latitude}, {longitude}
          </Text>
        </View>
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
  tituloCard: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Roboto-Regular',
  },
  textoCoord: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
});

export default CardPlantacao;
