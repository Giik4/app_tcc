import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {API_URL} from '@env';
import FastImage from 'react-native-fast-image';

const CardPlantacao = ({onPress, nome, latitude, longitude, id}) => {
  const token = useSelector(state => state.auth.token);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={st.card}>
        <FastImage
          style={st.image}
          source={{
            uri: `${API_URL}/plantations/image/${id}/?t=${Date.now()}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
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
    height: '90%',
    aspectRatio: 1,
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
