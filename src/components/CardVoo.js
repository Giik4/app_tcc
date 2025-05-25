import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

const CardPlantacao = ({onPress, image, data}) => {
  const dataVoo = moment(data).format('DD/MM/YYYY HH:mm');

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={st.card}>
        <Image source={image} style={st.image} resizeMode="cover" />
        <Text style={st.textoData}>{dataVoo}</Text>
      </View>
    </TouchableOpacity>
  );
};

const st = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
  },
  image: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 5,
  },

  textoData: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 18,
    color: 'black',
  },
});

export default CardPlantacao;
