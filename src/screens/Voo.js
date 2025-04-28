import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Botao from '../components/Botao';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import CardVoo from '../components/CardVoo';
import Menu from '../components/Menu';
import CardCaptura from '../components/CardCaptura';

const Voo = props => {
  return (
    <View style={estilos.tela}>
      <ScrollView
        vertical={true}
        style={estilos.scrollVert}
        contentContainerStyle={estilos.containerPlant}>
        <View style={estilos.containerInfo}>
          <Text style={estilos.informacoes}>Informações</Text>

          <View>
            <Text style={estilos.titulo}>Aeronave</Text>
            <Text style={estilos.atributo}>Mavic Pro</Text>
          </View>

          <View>
            <Text style={estilos.titulo}>Tempo de Voo</Text>
            <Text style={estilos.atributo}>0:22:15</Text>
          </View>

          <View>
            <Text style={estilos.titulo}>Data</Text>
            <Text style={estilos.atributo}>10/10/2023 15:10:23</Text>
          </View>

          <View>
            <Text style={estilos.titulo}>Distância Percorrida</Text>
            <Text style={estilos.atributo}>1557 m</Text>
          </View>
        </View>

        <Text style={estilos.informacoes}>Waypoints e Capturas</Text>

        <CardCaptura
          image={require('../../assets/images/ortofoto.jpeg')}
          coordenada="-41.876167, 0.984000, 292.3m"
        />

        <CardCaptura
          image={require('../../assets/images/ortofoto.jpeg')}
          coordenada="-41.876167, 0.984000, 292.3m"
        />

        <CardCaptura
          image={require('../../assets/images/ortofoto.jpeg')}
          coordenada="-41.876167, 0.984000, 292.3m"
        />

        <CardCaptura
          image={require('../../assets/images/ortofoto.jpeg')}
          coordenada="-41.876167, 0.984000, 292.3m"
        />

        <CardCaptura
          image={require('../../assets/images/ortofoto.jpeg')}
          coordenada="-41.876167, 0.984000, 292.3m"
        />

        <View style={estilos.containerOpcoes}>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Icon name="checkerboard" size={60} color="black" />
            <Text style={estilos.texto}>Ortomosaico</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Icon name="delete" size={60} color="black" />
            <Text style={estilos.texto}>Deletar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const estilos = StyleSheet.create({
  tela: {
    backgroundColor: '#F6F6F6',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cabecalho: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    height: 200,
    paddingVertical: 10,
  },

  informacoes: {
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 32,
    color: 'black',
  },

  containerInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'start',
    width: '100%',
    gap: 5,
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

  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '5%',
    //paddingBottom: '2%',
  },
  scrollVert: {
    width: '100%',
    paddingHorizontal: '4%',
  },

  containerPlant: {
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start',
    width: '100%',
    gap: 15,
  },

  scrollHori: {
    height: 130,
  },

  containerVoo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '2.5%',
  },

  texto: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Roboto-Condensed',
  },

  containerOpcoes: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 50,
    height: 250,
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

export default Voo;
