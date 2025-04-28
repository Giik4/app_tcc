import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Botao from '../components/Botao';
import {useState} from 'react';
import api from '../services/Api';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/userSlice';
import {setAuth} from '../redux/authSlice';

const Login = props => {
  const irParaNovaConta = () => {
    props.navigation.navigate('NovaConta');
  };

  const irParaRecuperarSenha = () => {};

  const irParaHome = () => {
    props.navigation.navigate('BottomTabs');
  };

  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [aviso, setAviso] = useState('');
  const dispatch = useDispatch();

  async function login(username, senha) {
    const params = new URLSearchParams();

    params.append('username', username);
    params.append('password', senha);
    params.append('grant_type', 'password');

    try {
      const responseAuth = await api.post('/auth/token', params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const responseUser = await api.get('/users/', {
        headers: {
          Authorization: `Bearer ${responseAuth.data.access_token}`,
        },
      });

      dispatch(
        setUser({
          username: responseUser.data.username,
          email: responseUser.data.email,
          name: responseUser.data.name,
          id: responseUser.data.id,
          createdAt: responseUser.data.created_at,
        }),
      );

      dispatch(
        setAuth({
          token: responseAuth.data.access_token,
          refreshToken: responseAuth.data.refresh_token,
          expiresIn: responseAuth.data.expires_in,
        }),
      );
    } catch (error) {
      console.error(
        'Erro ao fazer login:',
        error.response?.data || error.message,
      );
      throw error;
    }

    irParaHome();
  }

  return (
    <View style={estilos.tela}>
      <Text style={estilos.logoText}>Login</Text>
      <View style={estilos.containerLogin}>
        <Text style={estilos.warning}>{aviso}</Text>
        <TextInput
          style={estilos.textInput}
          placeholder="Usuário"
          placeholderTextColor="#8E88FD"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={estilos.textInput}
          placeholder="Senha"
          placeholderTextColor="#8E88FD"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />
        <View style={{width: '100%', alignItems: 'flex-end'}}>
          <TouchableOpacity>
            <Text style={estilos.texto}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
        <View style={estilos.containerEntrar}>
          <Botao texto="Entrar" funcao={() => login(username, senha)} />
        </View>
      </View>

      <View style={estilos.containerCadastro}>
        <Text style={estilos.texto}>Não possui conta?</Text>
        <Botao texto="Cadastrar-se" funcao={irParaNovaConta} />
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  tela: {
    backgroundColor: '#F6F6F6',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: '8%',
  },
  logoText: {
    fontSize: 40,
    color: '#F6C500',
    fontFamily: 'Poppins-Medium',
  },
  containerLogin: {
    display: 'flex',
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  caixaDeTexto: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '80%',
    flex: 0.5,
    marginBottom: '1%',
  },
  warning: {
    color: '#FD7979',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
  containerEntrar: {
    display: 'flex',
    flex: 0.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  containerCadastro: {
    width: '100%',
    height: '25%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  textInput: {
    fontSize: 18,
    backgroundColor: '#DEDDF6',
    color: 'black',
    width: '100%',
    fontFamily: 'Roboto-Regular',
  },

  texto: {
    fontSize: 18,
    color: '515151',
    fontFamily: 'Roboto-Regular',
  },
});

export default Login;
