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
import {useEffect, useState} from 'react';
import CardVoo from '../components/CardVoo';
import Menu from '../components/Menu';
import CardCaptura from '../components/CardCaptura';
import {useRoute} from '@react-navigation/native';
import api from '../services/Api';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import Popup from '../components/Popup';

const Voo = props => {
  const route = useRoute();
  const {item} = route.params;
  const token = useSelector(state => state.auth.token);
  const [waypoints, setWaypoints] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const stepSize = 20; // Distância entre linhas em metros
  const overlap = 0.1; // Sobreposição entre linhas

  useEffect(() => {
    const fetchWaypoints = async () => {
      try {
        const response = await api.get(
          `/plantations/${item.plantationId}/flights/${item.id}/waypoints`,
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );

        const formatted = response.data.waypoints.map(waypoint => ({
          latitude: waypoint.latitude,
          longitude: waypoint.longitude,
          altitude: waypoint.altitude,
          number: waypoint.number,
        }));

        setWaypoints(formatted);
      } catch (error) {
        console.log(
          'Erro ao buscar waypoints:',
          error.response?.data || error.message,
        );
      }
    };

    fetchWaypoints();
  }, []);

  return (
    <View style={estilos.tela}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={estilos.containerInfo}>
              <Text style={estilos.informacoes}>Informações</Text>

              <View>
                <Text style={estilos.titulo}>Aeronave</Text>
                <Text style={estilos.atributo}>{item.aircraft}</Text>
              </View>

              <View>
                <Text style={estilos.titulo}>Tempo de Voo</Text>
                <Text style={estilos.atributo}>{item.flightTime}</Text>
              </View>

              <View>
                <Text style={estilos.titulo}>Data</Text>
                <Text style={estilos.atributo}>{item.date}</Text>
              </View>

              <View>
                <Text style={estilos.titulo}>Distância Percorrida</Text>
                <Text style={estilos.atributo}>{item.distance} m</Text>
              </View>
            </View>

            <Text style={estilos.informacoes}>Waypoints e Capturas</Text>
          </>
        }
        ListHeaderComponentStyle={estilos.containerInfo}
        data={waypoints}
        renderItem={({item}) => (
          <CardCaptura
            image={require('../../assets/images/ortofoto.jpeg')}
            latitude={item.latitude}
            longitude={item.longitude}
            altitude={item.altitude}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        vertical={true}
        ItemSeparatorComponent={() => <View style={{height: 5}} />}
        ListFooterComponent={
          <>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <Icon name="checkerboard" size={60} color="black" />
              <Text style={estilos.texto}>Ortomosaico</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => setModalVisible(true)}>
              <Icon name="delete" size={60} color="black" />
              <Text style={estilos.texto}>Deletar</Text>
            </TouchableOpacity>
          </>
        }
        ListFooterComponentStyle={estilos.containerOpcoes}
      />

      <Popup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={props.navigation}
        onConfirm={() => excluirPesquisa()}
      />
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
