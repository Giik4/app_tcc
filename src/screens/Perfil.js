import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Botao from '../components/Botao';
import {useSelector} from 'react-redux';
import moment from 'moment';
import 'moment/locale/pt-br';

const Perfil = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const user = useSelector(state => state.user);

  const dataIngresso = moment(user.createdAt).format('DD/MM/YYYY');

  irParaEditar = () => {
    navigation.navigate('EditarUsuario');
  };

  return (
    <View style={st.container}>
      <View style={st.cabecalho}>
        <Image
          source={require('../../assets/images/eu.png')}
          style={st.image}
          resizeMode="cover"
        />
        <Text style={st.nome}>{user.name}</Text>
      </View>

      <View style={st.infos}>
        <View>
          <Text style={st.titulo}>Usuário</Text>
          <Text style={st.atributo}>{user.username}</Text>
        </View>

        <View>
          <Text style={st.titulo}>Email</Text>
          <Text style={st.atributo}>{user.email}</Text>
        </View>

        <View>
          <Text style={st.titulo}>Data de ingresso</Text>
          <Text style={st.atributo}>{dataIngresso}</Text>
        </View>
      </View>

      <View style={st.containerEditar}>
        <Botao texto="Editar" funcao={irParaEditar} />
      </View>
    </View>
  );
};

const st = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#F6F6F6',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: '35%',
    paddingTop: '5%',
    gap: 15,
  },

  cabecalho: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 0.4,
    borderRadius: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '92%',
  },

  nome: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 24,
    color: 'black',
  },

  image: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
  },

  infos: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'start',
    width: '90%',
    flex: 0.4,
  },

  titulo: {
    fontFamily: 'RobotoCondensed-Medium',
    fontSize: 28,
    color: 'black',
  },

  atributo: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: '#515151',
  },

  containerEditar: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: '15%',
    justifyContent: 'center',
  },

  icon: {
    width: '20%',
    height: '20%',
    marginRight: 5,
  },

  containerMenu: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    width: '100%',
    position: 'absolute',
    marginTop: '175%',
  },
});

export default Perfil;
