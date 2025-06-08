import {
  View,
  TouchableOpacity,
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
import {useRoute} from '@react-navigation/native';
import {fetchPlantations} from '../redux/plantationSlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';
import {launchImageLibrary} from 'react-native-image-picker';
import {Image} from 'react-native';

const EditarPlantacao = props => {
  const route = useRoute();
  const {item} = route.params;

  const [nome, setNome] = useState('');
  const [cultura, setCultura] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [semente, setSemente] = useState('');
  const [dataPlantio, setDataPlantio] = useState('');
  const [descricao, setDescricao] = useState('');

  const [imagem, setImagem] = useState(null);

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

  const [showDatePicker, setShowDatePicker] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  const limparCampos = () => {
    setNome('');
    setCultura('');
    setLatitude('');
    setLongitude('');
    setSemente('');
    setDataPlantio('');
    setDescricao('');
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = moment(selectedDate)
        .locale('pt-br')
        .format('DD/MM/YYYY');
      setDataPlantio(formatted);
    }
  };

  const atualizar = async () => {
    try {
      const payload = {};

      if (nome.trim() !== '') payload.name = nome;
      if (cultura.trim() !== '') payload.crop = cultura;
      if (latitude.trim() !== '') payload.latitude = parseFloat(latitude);
      if (longitude.trim() !== '') payload.longitude = parseFloat(longitude);
      if (semente.trim() !== '') payload.seed = semente;
      if (descricao.trim() !== '') payload.description = descricao;
      if (dataPlantio.trim() !== '')
        payload.date_planted = moment(dataPlantio, 'DD/MM/YYYY').format(
          'YYYY-MM-DD',
        );

      const res = await api.patch(`/plantations/${item.id}`, payload, {
        headers: {Authorization: `Bearer ${token}`},
      });

      console.log(res.data);

      if (imagem) {
        const formData = new FormData();
        formData.append('file', {
          uri: imagem.uri,
          type: imagem.type,
          name: imagem.fileName,
        });

        const resImg = await api.post(
          `/plantations/image/${item.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        console.log('Imagem da plantação enviada:', resImg.data);
      }

      limparCampos();
      dispatch(fetchPlantations);
      props.navigation.pop();

      alert('Plantação atualizada com sucesso!');
    } catch (error) {
      console.log(error);
      alert('Erro ao editar a plantação!/n' + error.message);
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
            placeholder={item.name}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Cultura</Text>
          <TextInput
            style={estilos.textInput}
            value={cultura}
            onChangeText={setCultura}
            placeholder={item.crop}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Latitude</Text>
          <TextInput
            style={estilos.textInput}
            value={latitude}
            onChangeText={setLatitude}
            placeholder={item.latitude}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Longitude</Text>
          <TextInput
            style={estilos.textInput}
            value={longitude}
            onChangeText={setLongitude}
            placeholder={item.longitude}
          />
        </View>
        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Semente</Text>
          <TextInput
            style={estilos.textInput}
            value={semente}
            onChangeText={setSemente}
            placeholder={item.seed}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Data de Plantio</Text>
          <TextInput
            style={estilos.textInput}
            value={dataPlantio}
            onChangeText={setDataPlantio}
            onFocus={() => setShowDatePicker(true)}
          />

          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={onChangeDate}
              locale="pt-BR"
            />
          )}
        </View>

        <View style={estilos.caixaDescricao}>
          <Text style={estilos.texto}>Descricao</Text>
          <TextInput
            style={estilos.textInput}
            value={descricao}
            onChangeText={setDescricao}
            multiline={true}
            numberOfLines={7}
            placeholder={item.description}
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

        <View style={estilos.containerEntrar}>
          <Botao texto="Editar" funcao={atualizar} />
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

  containerEntrar: {
    paddingVertical: '5%',
    display: 'flex',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  textInput: {
    paddingBottom: 4,
    fontSize: 16,
    backgroundColor: '#DEDDF6',
    width: '100%',
    fontFamily: 'Roboto-Regular',
    height: '62.5%',
    borderRadius: 5,
  },

  foto: {
    backgroundColor: '#DEDDF6',
    width: '40%',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default EditarPlantacao;
