import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native'

const CardPlantacao = ({onPress, image, data }) => {
    return(
      <TouchableOpacity onPress={onPress}>
      <View style={st.card}>
          <Image source={image} style={st.image} resizeMode='cover'/>
          <Text style={st.textoData}>{data}</Text>
      </View>
  </TouchableOpacity>
    )
}

const st = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40
  },
  image: {
    height: 80, 
    width: 100,
    borderRadius: 10 
  },
  
  textoData: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 18,
    color: 'black'
  },
})

export default CardPlantacao