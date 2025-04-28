import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native'

const CardCaptura = ({onPress, image, coordenada }) => {
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={st.card}>
                <Image source={image} style={st.image} resizeMode='contain'/>
                <Text style={st.textoCoord}>{coordenada}</Text>
            </View>
        </TouchableOpacity>
    )
}

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
})

export default CardCaptura