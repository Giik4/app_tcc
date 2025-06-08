import {View, TextInput, Text, StyleSheet, Alert} from 'react-native';
import Botao from '../components/Botao';
import {useState} from 'react';
import api from '../services/Api';
import {useSelector} from 'react-redux';

const NovaConta = props => {
  const sair = () => {
    props.navigation.pop();
  };

  const user = useSelector(state => state.user);

  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');
  const [aviso, setAviso] = useState('');
  const regexEmail = /^[A-Za-z0-9.+_-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$/;

  const verifica = () => {
    if (
      nome != '' &&
      username != '' &&
      regexEmail.test(email) == true &&
      senha != '' &&
      senha == confSenha
    ) {
      setAviso('');
      registrar();
    } else {
      if (regexEmail.test(email) == false) {
        setAviso('E-mail inválido');
      } else if (senha != confSenha) {
        setAviso('As senhas inseridas são diferentes');
      } else {
        setAviso('Preencha todos os campos');
      }
    }
  };

  const registrar = async () => {
    try {
      const responseUser = await api.post('/users', {
        username: username,
        name: nome,
        email: email,
        password: senha,
      });

      alert('Usuário registrado com sucesso:', responseUser.data);
      sair();
    } catch (error) {
      setAviso(error.response?.data?.detail || 'Tente novamente');
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
          />
        </View>
        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Repetir senha</Text>
          <TextInput
            style={estilos.textInput}
            secureTextEntry={true}
            value={confSenha}
            onChangeText={setConfSenha}
          />
        </View>
      </View>
      <Text style={estilos.warning}>{aviso}</Text>
      <View style={estilos.containerEntrar}>
        <Botao texto="Cadastrar" funcao={verifica} />
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

  containerCad: {
    display: 'flex',
    flex: 0.7,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
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
});

export default NovaConta;
