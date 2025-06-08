import React, {useState, useCallback} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CardPlantacao from '../components/CardPlantacao';
import {useSelector, useDispatch} from 'react-redux';
import {
  adicionarAcesso,
  filtrarAcessosInvalidos,
  limparAcessos,
} from '../redux/recentesSlice';
import {clearUser} from '../redux/userSlice';
import {clearPlantations} from '../redux/plantationSlice';
import {clearFlight} from '../redux/flightSlice';
import {clearAuth} from '../redux/authSlice';

const Inicio = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const plantations = useSelector(state => state.plantation.list); // <- cuidado aqui!
  const acessosRecentes = useSelector(state => state.recentes.acessos || []);

  const logout = () => {
    dispatch(limparAcessos());
    dispatch(clearFlight());
    dispatch(clearPlantations());
    dispatch(clearUser());
    dispatch(clearAuth());
    props.navigation.popToTop();
  };

  useFocusEffect(
    useCallback(() => {
      const idsValidos = plantations.map(p => p.id);
      dispatch(filtrarAcessosInvalidos(idsValidos));
    }, [plantations, dispatch]),
  );

  return (
    <View style={st.container}>
      <View style={st.cabecalho}>
        <Text style={st.titulo}>Olá, {user.name}</Text>
        <TouchableOpacity onPress={logout}>
          <Icon name="logout" size={40} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={st.acesso}>Acesso Recente</Text>

      <View style={st.containerCards}>
        {Array.isArray(acessosRecentes) && acessosRecentes.length > 0 ? (
          acessosRecentes.map(p => (
            <CardPlantacao
              key={p.id}
              nome={p.name}
              latitude={p.latitude}
              longitude={p.longitude}
              id={p.id}
              onPress={() => {
                dispatch(adicionarAcesso(p));
                navigation.navigate('Plantacao', {item: p});
              }}
            />
          ))
        ) : (
          <Text style={{marginLeft: 10, color: 'gray', fontSize: 18}}>
            Nenhum acesso recente
          </Text>
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
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    color: 'black',
  },

  acesso: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
    gap: 5,
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

  icon: {
    width: '20%',
    height: '20%',
    marginRight: 5,
  },
});

export default Inicio;
