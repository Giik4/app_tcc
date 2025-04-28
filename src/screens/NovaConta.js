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

const NovaConta = props => {
  const sair = () => {
    props.navigation.pop();
  };

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');
  const [aviso, setAviso] = useState('');
  const regexEmail = /^[A-Za-z0-9.+_-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$/;

  const verifica = () => {
    if (regexEmail.test(email) == true && senha != '' && senha == confSenha) {
      let regEmail = email;
      let regSenha = senha;
      console.log(regEmail, regSenha);
      setAviso(' ');
      sair();
    } else {
      if (regexEmail.test(email) == false && senha == '') {
        setAviso('E-mail e senha inválidos');
      } else if (senha == '') {
        setAviso('Senha inválida');
      } else if (regexEmail.test(email) == false) {
        setAviso('E-mail inválido');
      } else if (senha != confSenha) {
        setAviso('O campo repetir senha difere da senha');
      }
    }
  };

  return (
    <View style={estilos.tela}>
      <View style={estilos.containerCad}>
        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Nome</Text>
          <TextInput
            style={estilos.textInput}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Usuário</Text>
          <TextInput
            style={estilos.textInput}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>E-mail</Text>
          <TextInput
            style={estilos.textInput}
            value={email}
            onChangeText={setEmail}
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

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Foto</Text>
          <TouchableOpacity style={estilos.foto}>
            <Icon name="upload" size={70} color="black" />
          </TouchableOpacity>
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

export default NovaConta;
