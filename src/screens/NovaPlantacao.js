import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Botao from '../components/Botao';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import api from '../services/Api';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';
import {launchImageLibrary} from 'react-native-image-picker';
import {Image} from 'react-native';

const NovaPlantacao = props => {
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
    setDataPlantio(null);
    setDescricao('');
    setImagem(null);
  };

  const cadastrar = async () => {
    if (nome === '' || cultura === '' || latitude === '' || longitude === '') {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      const isoDate = dataPlantio
        ? moment(dataPlantio, 'DD/MM/YYYY').format('YYYY-MM-DD')
        : null;

      // 1. Envia os dados da nova plantação
      const res = await api.post(
        '/plantations/',
        {
          name: nome,
          crop: cultura,
          latitude: latitude,
          longitude: longitude,
          seed: semente,
          description: descricao,
          date_planted: isoDate,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      const plantacaoId = res.data?.id;

      console.log('Plantação cadastrada com ID:', plantacaoId);

      // 2. Se houver imagem, envia para /plantations/image/{id}
      if (imagem && plantacaoId) {
        const formData = new FormData();
        formData.append('file', {
          uri: imagem.uri,
          type: imagem.type,
          name: imagem.fileName,
        });

        const resImg = await api.post(
          `/plantations/image/${plantacaoId}`,
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
      alert('Plantação cadastrada com sucesso!');
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert('Erro ao cadastrar a plantação:\n' + error.message);
    }
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
  return (
    <View style={estilos.tela}>
      <ScrollView
        vertical={true}
        style={estilos.scroll}
        contentContainerStyle={estilos.containerCad}>
        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Nome da plantação*</Text>
          <TextInput
            style={estilos.textInput}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Cultura*</Text>
          <TextInput
            style={estilos.textInput}
            value={cultura}
            onChangeText={setCultura}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Latitude*</Text>
          <TextInput
            style={estilos.textInput}
            value={latitude}
            onChangeText={setLatitude}
          />
        </View>

        <View style={estilos.caixaDeTexto}>
          <Text style={estilos.texto}>Longitude*</Text>
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
    fontSize: 18,
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
