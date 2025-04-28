import {useState} from 'react';
import {
  createBottomTabNavigator,
  createDrawerNavigator,
} from '@react-navigation/bottom-tabs';
import Inicio from './Inicio';
import Perfil from './Perfil';
import PlantacoesCadastradas from './PlantacoesCadastradas';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/Api';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomTabs = props => {
  // const [listaPlantations, setListaPlantations] = useState([]);

  // async function getPlantations() {
  //   try {
  //     const response = await api.get('/plantations/list', {
  //       headers: {
  //         Authorization: `Bearer ${useSelector(state => state.token.token)}`,
  //       },
  //     });

  //     console.log(response.data);

  //     const listaPlantations = response.data.map(plantation => ({
  //       id: plantation.id,
  //       name: plantation.name,
  //       crop: plantation.crop,
  //       latitude: plantation.latitude,
  //       longitude: plantation.longitude,
  //       seed: plantation.seed,
  //       description: plantation.description,
  //       datePlanted: plantation.date_planted,
  //       createdAt: plantation.created_at,
  //       updatedAt: plantation.updated_at,
  //     }));

  //     setListaPlantations(listaPlantations);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#F6C500',
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          color: 'black',
          fontFamily: 'Roboto-Medium',
        },
      }}>
      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{
          tabBarIcon: ({color, size, focused}) => {
            if (focused) {
              return <Icon name="home" size={60} color="black" />;
            }
            return <Icon name="home-outline" size={60} color="black" />;
          },
        }}
      />

      <Tab.Screen
        name="Plantações"
        component={PlantacoesCadastradas}
        options={{
          tabBarIcon: ({color, size, focused}) => {
            if (focused) {
              return <Icon name="sprout" size={60} color="black" />;
            }
            return <Icon name="sprout-outline" size={60} color="black" />;
          },
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({color, size, focused}) => {
            if (focused) {
              return <Icon name="account-cowboy-hat" size={60} color="black" />;
            }
            return (
              <Icon name="account-cowboy-hat-outline" size={60} color="black" />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
