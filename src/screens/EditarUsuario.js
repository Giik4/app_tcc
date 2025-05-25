import {
  View,
  TouchableOpacity,
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
import {launchImageLibrary} from 'react-native-image-picker';
import {Image} from 'react-native';

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
  const [imagem, setImagem] = useState(null);
  const regexEmail = /^[A-Za-z0-9.+_-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$/;

  const limparCampos = () => {
    setNome('');
    setUsername('');
    setEmail('');
    setSenha('');
    setConfSenha('');
    setImagem(null);
  };

  const selecionarImagem = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Usuário cancelou a seleção de imagem');
      } else if (response.errorCode) {
        console.log('Erro ao selecionar imagem:', response.errorMessage);
      } else {
        const asset = response.assets[0];
        setImagem(asset);
      }
    });
  };

  const atualizar = async () => {
    try {
      const payload = {};

      console.log('URL', api.defaults.baseURL + '/users/image');

      if (nome.trim() !== '') payload.name = nome;
      if (username.trim() !== '') payload.username = username;
      if (email.trim() !== '') payload.email = email;
      if (senha.trim() !== '') payload.password = senha;

      if (imagem) {
        const formData = new FormData();
        formData.append('file', {
          uri: imagem.uri,
          type: imagem.type,
          name: imagem.fileName,
        });

        const resImg = await api.post(`/users/image`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Imagem de perfil enviada:', resImg.data);
      }

      if (Object.keys(payload).length !== 0) {
        const res = await api.patch(`/users/${user.id}`, payload, {
          headers: {Authorization: `Bearer ${token}`},
        });

        console.log(res.data);
      }

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
    if (
      nome.trim() === '' &&
      username.trim() === '' &&
      email.trim() === '' &&
      senha.trim() === '' &&
      !imagem
    ) {
      setAviso('Preencha pelo menos um campo para atualizar');
      return;
    }

    if (email.trim() !== '' && regexEmail.test(email) === false) {
      setAviso('E-mail inválido');
    } else if (senha.trim() !== '' && senha !== confSenha) {
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
            placeholder={user.name}
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
          <TouchableOpacity style={estilos.foto} onPress={selecionarImagem}>
            {imagem ? (
              <Image
                source={{uri: imagem.uri}}
                style={{width: 100, height: 100, borderRadius: 5}}
              />
            ) : (
              <Icon name="upload" size={70} color="black" />
            )}
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
    width: '85%',
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
    fontSize: 18,
    backgroundColor: '#DEDDF6',
    width: '100%',
    fontFamily: 'AveriaLibre-Regular',
    height: '55%',
    borderRadius: 5,
  },

  foto: {
    backgroundColor: '#DEDDF6',
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
