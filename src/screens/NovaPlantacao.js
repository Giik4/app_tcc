import {
  View,
  TouchableOpacity,
  Pressable,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Botao from '../components/Botao';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import api from '../services/Api';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {fetchPlantations} from '../redux/plantationSlice';

const NovaPlantacao = props => {
  const [nome, setNome] = useState('');
  const [cultura, setCultura] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [semente, setSemente] = useState('');
  const [dataPlantio, setDataPlantio] = useState(null);
  const [descricao, setDescricao] = useState('');

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  const limparCampos = () => {
    setNome('');
    setCultura('');
    setLatitude('');
    setLongitude('');
    setSemente('');
    setDataPlantio(null);
    setDescricao('');
  };

  const cadastrar = async () => {
    if (nome === '' || cultura === '' || latitude === '' || longitude === '') {
      alert('Preencha todos os campos obrigatórios!');
    } else {
      try {
        const res = await api.post(
          '/plantations/',
          {
            name: nome,
            crop: cultura,
            latitude: latitude,
            longitude: longitude,
            seed: semente,
            description: descricao,
            date_planted: dataPlantio,
          },
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );
        console.log(res.data);
        limparCampos();
        alert('Plantação cadastrada com sucesso!');
      } catch (error) {
        console.log(error);
        alert('Erro ao cadastrar a plantação!/n' + error.message);
      }
    }
  };

  return (
    <View style={estilos.tela}>
      <ScrollView
        vertical={true}
        style={estilos.scroll}
        contentContainerStyle={estilos.containerCad}>
        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Nome da plantação</Text>
          <TextInput
            style={estilos.textInput}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Cultura</Text>
          <TextInput
            style={estilos.textInput}
            value={cultura}
            onChangeText={setCultura}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Latitude</Text>
          <TextInput
            style={estilos.textInput}
            value={latitude}
            onChangeText={setLatitude}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Longitude</Text>
          <TextInput
            style={estilos.textInput}
            value={longitude}
            onChangeText={setLongitude}
          />
        </View>
        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Semente</Text>
          <TextInput
            style={estilos.textInput}
            value={semente}
            onChangeText={setSemente}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Data de Plantio</Text>
          <TextInput
            style={estilos.textInput}
            value={dataPlantio}
            onChangeText={setDataPlantio}
          />
        </View>

        <View style={estilos.caixaDescricao}>
          <Text style={estilos.texto}>Descricao</Text>
          <TextInput
            style={estilos.textInput}
            value={descricao}
            onChangeText={setDescricao}
            multiline={true}
            numberOfLines={7}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Foto</Text>
          <TouchableOpacity style={estilos.foto}>
            <Icon name="upload" size={70} color="black" />
          </TouchableOpacity>
        </View>

        <View style={estilos.containerEntrar}>
          <Botao texto="Cadastrar" funcao={cadastrar} />
        </View>
      </ScrollView>
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
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 0.07,
    //paddingBottom: '2%',
  },
  scroll: {
    flex: 0.9,
    width: '100%',
    paddingHorizontal: '4%',
    paddingVertical: '2%',
  },
  containerCad: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
    flex: 0.5,
    marginBottom: '1%',
  },
  caixaDescricao: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: 200,
    flex: 0.5,
  },
  texto: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto-Condensed',
  },
  warning: {
    color: 'red',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
  containerEntrar: {
    paddingVertical: '5%',
    display: 'flex',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  descricaoInput: {
    fontSize: 16,
    backgroundColor: '#E5E5E5',
    width: '100%',
    fontFamily: 'Roboto-Regular',
    height: '100%',
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  textInput: {
    paddingBottom: 4,
    fontSize: 16,
    backgroundColor: '#E5E5E5',
    width: '100%',
    fontFamily: 'Roboto-Regular',
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

export default NovaPlantacao;
