import React, {useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  ImageComponent,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import CardPlantacao from '../components/CardPlantacao';
import {fetchPlantations} from '../redux/plantationSlice';
import {useSelector, useDispatch} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {adicionarAcesso} from '../redux/recentesSlice';

const PlantacoesCadastradas = props => {
  const dispatch = useDispatch();
  const {list, loading, error} = useSelector(state => state.plantation);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchPlantations());
    }, [dispatch]),
  );

  return (
    <View style={st.container}>
      <View style={st.cabecalho}>
        <Text style={st.titulo}>Plantações Cadastradas</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('NovaPlantacao')}>
          <Icon name="plus" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Cards */}

      <View style={st.containerCards}>
        {loading ? (
          <Text style={st.textoInicial}>Carregando...</Text>
        ) : error ? (
          <Text style={st.textoInicial}>Erro ao carregar plantações</Text>
        ) : list.length === 0 ? (
          <Text style={st.textoInicial}>Não há plantações cadastradas</Text>
        ) : (
          <FlatList
            data={list}
            renderItem={({item}) => (
              <CardPlantacao
                nome={item.name}
                latitude={item.latitude}
                longitude={item.longitude}
                id={item.id}
                onPress={() => {
                  dispatch(adicionarAcesso(item));
                  navigation.navigate('Plantacao', {item});
                }}
              />
            )}
            keyExtractor={item => item.id.toString()}
            vertical={true}
          />
        )}
      </View>
    </View>
  );
};

const st = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#F6F6F6',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'start',
    flexDirection: 'column',
    gap: 15,
  },
  cabecalho: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '2%',
    flex: 0.1,
  },

  titulo: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 24,
    color: 'black',
  },

  containerCards: {
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'stretch',
    gap: 5,
    flex: 1,
    width: '100%',
    paddingHorizontal: '2%',
  },

  textoInicial: {
    marginLeft: 10,
    color: 'gray',
    fontSize: 18,
  },

  input: {
    flex: 1,
    paddingBottom: 7,
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 18,
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

export default PlantacoesCadastradas;
