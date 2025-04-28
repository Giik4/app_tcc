import {useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {fetchFlights} from '../redux/flightSlice';
import CardVoo from '../components/CardVoo';
import {useRoute} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

const Plantacao = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {list, loading, error} = useSelector(state => state.flight);

  const route = useRoute();
  const {item} = route.params;

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchFlights(item.id));
    }, [dispatch]),
  );

  return (
    <View style={estilos.tela}>
      <ScrollView
        vertical={true}
        style={estilos.scrollVert}
        contentContainerStyle={estilos.containerPlant}>
        <View style={estilos.cabecalho}>
          <Image
            source={require('../../assets/images/soja.jpg')}
            style={estilos.image}
            resizeMode="cover"
          />
          <Text style={estilos.nome}>{item.name}</Text>
        </View>

        <Text style={estilos.informacoes}>Voos</Text>

        <View style={estilos.voosContainer}>
          {loading ? (
            <Text>Carregando voos...</Text>
          ) : error ? (
            <Text>Erro ao carregar voos: {error}</Text>
          ) : list.length === 0 ? (
            <Text>Não há voos cadastrados.</Text>
          ) : (
            <FlatList
              horizontal={true}
              data={list}
              renderItem={({item}) => (
                <CardVoo
                  onPress={() => navigation.navigate('Voo', {item})}
                  image={require('../../assets/images/ortofoto.jpeg')}
                  data={item.date}
                />
              )}
              keyExtractor={item => item.id.toString()}
            />
          )}
        </View>

        <View style={estilos.containerInfo}>
          <Text style={estilos.informacoes}>Informações</Text>

          <View>
            <Text style={estilos.titulo}>Cultura</Text>
            <Text style={estilos.atributo}>{item.crop}</Text>
          </View>

          <View>
            <Text style={estilos.titulo}>Latitude</Text>
            <Text style={estilos.atributo}>{item.latitude}</Text>
          </View>

          <View>
            <Text style={estilos.titulo}>Longitude</Text>
            <Text style={estilos.atributo}>{item.longitude}</Text>
          </View>

          <View>
            <Text style={estilos.titulo}>Semente</Text>
            <Text style={estilos.atributo}>{item.seed}</Text>
          </View>

          <View>
            <Text style={estilos.titulo}>Descrição</Text>
            <Text style={estilos.atributo}>{item.description}</Text>
          </View>

          <View>
            <Text style={estilos.titulo}>Data de plantio</Text>
            <Text style={estilos.atributo}>{item.datePlanted}</Text>
          </View>

          <View>
            <Text style={estilos.titulo}>Última atualização</Text>
            <Text style={estilos.atributo}>{item.updatedAt}</Text>
          </View>

          <View>
            <Text style={estilos.titulo}>Criado em</Text>
            <Text style={estilos.atributo}>{item.createdAt}</Text>
          </View>
        </View>

        <View style={estilos.containerOpcoes}>
          <TouchableOpacity>
            <Icon name="pencil" size={60} color="black" />
            <Text style={estilos.texto}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity>
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

export default Plantacao;
