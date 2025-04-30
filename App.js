import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import NovaConta from './src/screens/NovaConta';
import PlantacoesCadastradas from './src/screens/PlantacoesCadastradas';
import NovaPlantacao from './src/screens/NovaPlantacao';
import Perfil from './src/screens/Perfil';
import Plantacao from './src/screens/Plantacao';
import Voo from './src/screens/Voo';
import BottomTabs from './src/screens/BottomTabs';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import NovoVoo from './src/screens/NovoVoo';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: '#F6F6F6'},
            headerTitleStyle: {
              fontSize: 24,
              color: 'black',
              fontFamily: 'RobotoCondensed-Medium',
            },
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PlantacoesCadastradas"
            component={PlantacoesCadastradas}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NovaConta"
            component={NovaConta}
            options={{title: 'Nova conta'}}
          />
          <Stack.Screen
            name="NovaPlantacao"
            component={NovaPlantacao}
            options={{title: 'Nova Plantação'}}
          />
          <Stack.Screen
            name="Perfil"
            component={Perfil}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Plantacao"
            component={Plantacao}
            options={({route}) => ({
              title: route.params.item.name,
            })}
          />
          <Stack.Screen
            name="Voo"
            component={Voo}
            options={({route}) => ({
              title: route.params.item.date,
            })}
          />
          <Stack.Screen
            name="NovoVoo"
            component={NovoVoo}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
