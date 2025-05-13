import {
  View,
  TouchableOpacity,
  Pressable,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import Botao from '../components/Botao';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import api from '../services/Api';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUser} from '../redux/userSlice';

const EditarUsuario = props => {
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');
  const [aviso, setAviso] = useState('');
  const regexEmail = /^[A-Za-z0-9.+_-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$/;

  const limparCampos = () => {
    setNome('');
    setUsername('');
    setEmail('');
    setSenha('');
    setConfSenha('');
  };

  const atualizar = async () => {
    try {
      const payload = {};

      if (nome.trim() !== '') payload.name = nome;
      if (username.trim() !== '') payload.username = username;
      if (email.trim() !== '') payload.email = email;
      if (senha.trim() !== '') payload.password = senha;

      if (Object.keys(payload).length === 0) {
        return;
      }

      const res = await api.patch(`/users/${user.id}`, payload, {
        headers: {Authorization: `Bearer ${token}`},
      });

      console.log(res.data);

      limparCampos();
      dispatch(fetchUser());
      props.navigation.pop();

      alert('Conta atualizada com sucesso!');
    } catch (error) {
      console.log(error);
      alert(
        'Erro ao editar a conta:\n' + error.response?.data.detail ||
          error.message,
      );
    }
  };

  const verifica = () => {
    if (email.trim() !== '' && regexEmail.test(email) == false) {
      setAviso('E-mail inválido');
    } else if (senha.trim() !== '' && senha != confSenha) {
      setAviso('As senhas inseridas são diferentes');
    } else {
      setAviso('');
      atualizar();
    }
  };

  return (
    <View style={estilos.tela}>
      <View style={estilos.containerCad}>
        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Nome</Text>
          <TextInput
            style={estilos.textInput}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Usuário</Text>
          <TextInput
            style={estilos.textInput}
            value={username}
            onChangeText={setUsername}
            placeholder={user.username}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>E-mail</Text>
          <TextInput
            style={estilos.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder={user.email}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Senha</Text>
          <TextInput
            style={estilos.textInput}
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
            placeholder="********"
          />
        </View>
        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Repetir senha</Text>
          <TextInput
            style={estilos.textInput}
            secureTextEntry={true}
            value={confSenha}
            onChangeText={setConfSenha}
            placeholder="********"
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Foto</Text>
          <TouchableOpacity style={estilos.foto}>
            <Icon name="upload" size={70} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={estilos.warning}>{aviso}</Text>
      <View style={estilos.containerEntrar}>
        <Botao texto="Atualizar" funcao={verifica} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '3%',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 0.1,
    //paddingBottom: '2%',
  },
  containerCad: {
    display: 'flex',
    flex: 0.7,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  containerBtn: {
    display: 'flex',
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '20%',
    marginTop: '3%',
  },
  caixaDeTexto: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '80%',
    flex: 0.5,
    marginBottom: '1%',
  },
  texto: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Roboto-Condensed',
  },
  warning: {
    color: 'red',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
  containerEntrar: {
    display: 'flex',
    flex: 0.1,
    margin: '2.25%',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textInput: {
    paddingBottom: 4,
    fontSize: 16,
    backgroundColor: '#E5E5E5',
    width: '100%',
    fontFamily: 'AveriaLibre-Regular',
    height: '62.5%',
    borderRadius: 5,
  },

  foto: {
    backgroundColor: '#E5E5E5',
    width: '40%',
    alignItems: 'center',
    borderRadius: 5,
  },

  botaoEntrar: {
    fontSize: 28,
    //fontWeight: 400,
    display: 'flex',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#37BD6D',
    width: '80%',
    height: '70%',
  },
});

export default EditarUsuario;
