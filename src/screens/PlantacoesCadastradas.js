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

  if (loading) {
    return <Text>Carregando...</Text>;
  }
  if (error) {
    return <Text>Erro ao carregar plantações</Text>;
  }
  if (list.lenght === 0) {
    return <Text>Não há plantações cadastradas</Text>;
  }

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
        <FlatList
          data={list}
          renderItem={({item}) => (
            <CardPlantacao
              nome={item.name}
              latitude={item.latitude}
              longitude={item.longitude}
              onPress={() => {
                dispatch(adicionarAcesso(item));
                navigation.navigate('Plantacao', {item});
              }}
            />
          )}
          keyExtractor={item => item.id}
          vertical={true}
        />
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

  barraPesquisa: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 1,
    height: '12%',
    width: '95%',
    marginBottom: 10,
    paddingLeft: 10,
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
